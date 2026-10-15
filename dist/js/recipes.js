/**
 * Smart Pantry - Real-Time Recipe Recommendation & Matching Engine
 * 100% Free • Real-Time Pantry Synchronization • Zero Paywalls
 * Worldwide Recipe Library • Verified Food Photos • Step-by-Step Cooking Mode
 */

class RecipeEngineManager {
  constructor() {
    this.recipes = window.MASTER_RECIPES || [];
    this.sections = window.CUISINE_SECTIONS || [];
    this.activeCategory = "all";
    this.searchQuery = "";
    this.viewMode = "sections"; // "sections" (Screenshot mockup) or "grid" (Full cards)
    this.currentDetailRecipe = null;
    this.originalServings = 4;
    this.currentServings = 4;
    this.cookingStepIndex = 0;
    this.cookingTimerInterval = null;
    this.cookingTimerSeconds = 0;
    this.init();
  }

  init() {
    // If recipes-data.js loads asynchronously, sync recipes
    if ((!this.recipes || this.recipes.length === 0) && window.MASTER_RECIPES) {
      this.recipes = window.MASTER_RECIPES;
      this.sections = window.CUISINE_SECTIONS || [];
    }

    // Listen for pantry inventory changes to update recipes automatically
    if (window.store && typeof window.store.subscribe === "function") {
      window.store.subscribe(() => {
        console.log("[Recipe Engine] Pantry updated. Recalculating real-time recipe matches...");
        this.renderRecipeKitchen();
        this.updateExpiringBanner();
      });
    }

    // Initial render when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.renderCategoryChips();
        this.renderRecipeKitchen();
        this.updateExpiringBanner();
      });
    } else {
      setTimeout(() => {
        this.renderCategoryChips();
        this.renderRecipeKitchen();
        this.updateExpiringBanner();
      }, 50);
    }
  }

  getUserKey() {
    const userRaw = localStorage.getItem("smartpantry_user");
    if (!userRaw) return "default";
    try {
      const u = JSON.parse(userRaw);
      return u.id || (u.email ? u.email.replace(/[^a-zA-Z0-9]/g, "_") : "default");
    } catch (e) {
      return "default";
    }
  }

  getFavoritesKey() {
    return `smart_pantry_favs_${this.getUserKey()}`;
  }

  getShoppingListKey() {
    return `smart_pantry_shopping_${this.getUserKey()}`;
  }

  getCookingHistoryKey() {
    return `smart_pantry_cooking_history_${this.getUserKey()}`;
  }

  getFavorites() {
    try {
      const raw = localStorage.getItem(this.getFavoritesKey());
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  isFavorite(recipeId) {
    const favs = this.getFavorites();
    return favs.includes(recipeId);
  }

  async toggleFavorite(recipeId) {
    let favs = this.getFavorites();
    let isNowFav = false;
    if (favs.includes(recipeId)) {
      favs = favs.filter(id => id !== recipeId);
      if (window.showToast) window.showToast("Removed recipe from favorites ❤️");
    } else {
      favs.push(recipeId);
      isNowFav = true;
      if (window.showToast) window.showToast("Saved to My Favorites! ❤️");
    }
    localStorage.setItem(this.getFavoritesKey(), JSON.stringify(favs));
    this.renderRecipeKitchen();

    if (this.currentDetailRecipe && this.currentDetailRecipe.id === recipeId) {
      this.updateDetailFavoriteBtn();
    }

    // Sync to Supabase if authenticated
    try {
      if (window.supabaseClient && window.supabaseClient.auth) {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session && session.user) {
          if (isNowFav) {
            await window.supabaseClient.from("user_recipe_favorites").upsert({
              user_id: session.user.id,
              recipe_id: recipeId,
              created_at: new Date().toISOString()
            }, { onConflict: "user_id, recipe_id" });
          } else {
            await window.supabaseClient.from("user_recipe_favorites")
              .delete()
              .eq("user_id", session.user.id)
              .eq("recipe_id", recipeId);
          }
        }
      }
    } catch (err) {
      console.warn("[Recipe Engine] Supabase favorites sync skipped:", err.message);
    }
  }

  getShoppingList() {
    try {
      const raw = localStorage.getItem(this.getShoppingListKey());
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  addToShoppingList(itemNames) {
    const list = this.getShoppingList();
    const toAdd = Array.isArray(itemNames) ? itemNames : [itemNames];
    let addedCount = 0;

    toAdd.forEach(item => {
      const name = (typeof item === "string" ? item : (item.name || "")).trim();
      if (!name) return;
      const exists = list.some(i => (typeof i === "string" ? i : i.name).toLowerCase() === name.toLowerCase());
      if (!exists) {
        list.push({
          id: "shop_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
          name: name,
          addedAt: new Date().toISOString(),
          checked: false
        });
        addedCount++;
      }
    });

    localStorage.setItem(this.getShoppingListKey(), JSON.stringify(list));
    if (window.updateMetricsDisplay) window.updateMetricsDisplay();
    return addedCount;
  }

  removeShoppingListItem(itemId) {
    let list = this.getShoppingList();
    list = list.filter(i => (typeof i === "string" ? i !== itemId : i.id !== itemId));
    localStorage.setItem(this.getShoppingListKey(), JSON.stringify(list));
    this.renderShoppingListModal();
    if (window.updateMetricsDisplay) window.updateMetricsDisplay();
  }

  clearShoppingList() {
    localStorage.setItem(this.getShoppingListKey(), JSON.stringify([]));
    this.renderShoppingListModal();
    if (window.updateMetricsDisplay) window.updateMetricsDisplay();
    if (window.showToast) window.showToast("Shopping list cleared.");
  }

  // ==========================================
  // SMART INGREDIENT MATCHING ALGORITHM
  // ==========================================
  normalizeString(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  stemIngredientWord(word) {
    let w = word.toLowerCase().trim();
    if (w.endsWith("ies")) return w.slice(0, -3) + "y";
    if (w.endsWith("es") && (w.endsWith("toes") || w.endsWith("ches") || w.endsWith("shes") || w.endsWith("xes"))) {
      return w.slice(0, -2);
    }
    if (w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us") && !w.endsWith("is")) {
      return w.slice(0, -1);
    }
    return w;
  }

  getSynonyms(term) {
    const synonymsMap = {
      "curd": ["yogurt", "yoghurt", "dahi"],
      "yogurt": ["curd", "dahi"],
      "atta": ["wheat", "flour", "wheatflour"],
      "maida": ["flour", "allpurposeflour", "refinedflour"],
      "flour": ["atta", "maida", "wheat"],
      "paneer": ["cottagecheese", "cheese"],
      "cottagecheese": ["paneer"],
      "soyasauce": ["soysauce"],
      "soysauce": ["soyasauce"],
      "ghee": ["butter", "clarifiedbutter"],
      "butter": ["ghee"],
      "coriander": ["cilantro", "dhania"],
      "cilantro": ["coriander"],
      "capsicum": ["bellpepper", "pepper"],
      "bellpepper": ["capsicum"],
      "brinjal": ["eggplant", "aubergine"],
      "eggplant": ["brinjal", "aubergine"],
      "prawns": ["shrimp"],
      "shrimp": ["prawns"],
      "chicken": ["poultry", "chickenthighs", "chickenbreast"],
      "potato": ["potatoes", "aloo"],
      "tomato": ["tomatoes", "tamatar"],
      "onion": ["onions", "pyaz", "shallot", "shallots"]
    };
    return synonymsMap[term] || [];
  }

  matchIngredientWithPantry(ingName, pantryItems) {
    if (!ingName) return null;
    const cleanName = ingName.toLowerCase();
    const cleanTokens = cleanName.split(/[\s,()\/]+/).map(t => this.stemIngredientWord(t)).filter(t => t.length > 2);
    const normIng = this.normalizeString(cleanName);

    for (const item of pantryItems) {
      const pName = (item.name || "").toLowerCase();
      const normPantry = this.normalizeString(pName);

      // Direct substring match
      if (normPantry.includes(normIng) || normIng.includes(normPantry)) {
        return item;
      }

      // Token word-stem match
      const pTokens = pName.split(/[\s,()\/]+/).map(t => this.stemIngredientWord(t)).filter(t => t.length > 2);
      for (const t of cleanTokens) {
        if (pTokens.includes(t)) {
          return item;
        }
        // Check synonyms
        const syns = this.getSynonyms(t);
        for (const s of syns) {
          if (pTokens.includes(s) || normPantry.includes(s)) {
            return item;
          }
        }
      }
    }
    return null;
  }

  calculateRecipeMatch(recipe) {
    const pantryItems = (window.store && typeof window.store.getItems === "function") 
      ? window.store.getItems() 
      : [];

    const available = [];
    const missing = [];
    const expiring = [];

    const recipeIngredients = recipe.ingredients || [];

    recipeIngredients.forEach(ing => {
      const ingName = typeof ing === "string" ? ing : (ing.name || "");
      const matchedPantryItem = this.matchIngredientWithPantry(ingName, pantryItems);

      if (matchedPantryItem) {
        available.push(ing);
        const isExp = matchedPantryItem.status === "Expiring Soon" || 
                      matchedPantryItem.status === "Expired" || 
                      (window.getDaysDifference && window.getDaysDifference(matchedPantryItem.expiryDate) <= 3);
        if (isExp) {
          expiring.push(ing);
        }
      } else {
        missing.push(ing);
      }
    });

    const totalCount = recipeIngredients.length || 1;
    const matchPercent = Math.round((available.length / totalCount) * 100);

    return {
      matchPercent,
      available,
      missing,
      expiring,
      hasExpiringIngredient: expiring.length > 0,
      isFullyCookable: matchPercent >= 80
    };
  }

  getMatchedRecipes() {
    const all = (this.recipes || []).map(recipe => {
      const matchData = this.calculateRecipeMatch(recipe);
      return {
        ...recipe,
        ...matchData
      };
    });

    // Filter by category
    let filtered = all;

    if (this.activeCategory && this.activeCategory !== "all") {
      if (this.activeCategory === "pantry") {
        filtered = filtered.filter(r => r.matchPercent >= 30);
      } else if (this.activeCategory === "expiring") {
        filtered = filtered.filter(r => r.hasExpiringIngredient);
      } else if (this.activeCategory === "favorites") {
        const favs = this.getFavorites();
        filtered = filtered.filter(r => favs.includes(r.id));
      } else if (this.activeCategory === "quick-meals") {
        filtered = filtered.filter(r => (r.totalMinutes || 30) <= 30);
      } else if (this.activeCategory === "vegetarian") {
        filtered = filtered.filter(r => r.isVegetarian);
      } else if (this.activeCategory === "vegan") {
        filtered = filtered.filter(r => r.isVegan);
      } else {
        const catKey = this.activeCategory.toLowerCase().replace(/-/g, " ");
        filtered = filtered.filter(r => {
          const mainCat = (r.category || "").toLowerCase();
          const cuisine = (r.cuisine || "").toLowerCase();
          const cats = (r.categories || []).map(c => c.toLowerCase());
          return mainCat === catKey || cuisine === catKey || cats.includes(catKey);
        });
      }
    }

    // Filter by search query
    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(r => {
        const nameMatch = (r.name || "").toLowerCase().includes(q);
        const localMatch = (r.localName || "").toLowerCase().includes(q);
        const cuisineMatch = (r.cuisine || "").toLowerCase().includes(q);
        const catMatch = (r.category || "").toLowerCase().includes(q);
        const ingMatch = (r.ingredients || []).some(i => {
          const n = typeof i === "string" ? i : (i.name || "");
          return n.toLowerCase().includes(q);
        });
        return nameMatch || localMatch || cuisineMatch || catMatch || ingMatch;
      });
    }

    // Smart Priority Sort:
    // 1. Recipes with expiring ingredients first
    // 2. Highest Match %
    // 3. Quickest cooking time
    filtered.sort((a, b) => {
      if (a.hasExpiringIngredient && !b.hasExpiringIngredient) return -1;
      if (!a.hasExpiringIngredient && b.hasExpiringIngredient) return 1;
      if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
      return (a.totalMinutes || 30) - (b.totalMinutes || 30);
    });

    return filtered;
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.renderRecipeKitchen();
  }

  setCategory(catId) {
    this.activeCategory = catId;
    if (catId !== "all") {
      this.viewMode = "grid";
    }
    this.renderCategoryChips();
    this.renderRecipeKitchen();
    this.scrollToRecipeKitchen();
  }

  setSearchQuery(query) {
    this.searchQuery = query;
    if (query && query.trim()) {
      this.viewMode = "grid";
    }
    this.renderRecipeKitchen();
  }

  showPantryMatches() {
    this.activeCategory = "pantry";
    this.viewMode = "grid";
    this.renderCategoryChips();
    this.renderRecipeKitchen();
    this.scrollToRecipeKitchen();
  }

  showExpiringRecipes() {
    this.activeCategory = "expiring";
    this.viewMode = "grid";
    this.renderCategoryChips();
    this.renderRecipeKitchen();
    this.scrollToRecipeKitchen();
  }

  showFavorites() {
    this.activeCategory = "favorites";
    this.viewMode = "grid";
    this.renderCategoryChips();
    this.renderRecipeKitchen();
    this.scrollToRecipeKitchen();
  }

  scrollToRecipeKitchen() {
    const section = document.getElementById("recipesSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  renderCategoryChips() {
    const container = document.getElementById("recipeCategoryChips");
    if (!container) return;

    const categories = window.RECIPE_CATEGORIES || [];
    container.innerHTML = categories.map(cat => {
      const isActive = this.activeCategory === cat.id;
      return `
        <button type="button" class="recipe-chip-btn ${isActive ? 'active' : ''}" onclick="window.RecipeEngine.setCategory('${cat.id}')">
          <span class="chip-emoji">${cat.emoji}</span>
          <span>${cat.name}</span>
        </button>
      `;
    }).join("");
  }

  updateExpiringBanner() {
    const banner = document.getElementById("recipeExpiringBanner");
    if (!banner) return;

    const pantryItems = (window.store && typeof window.store.getItems === "function") 
      ? window.store.getItems() 
      : [];

    const expiringItems = pantryItems.filter(i => 
      i.status === "Expiring Soon" || i.status === "Expired" || (window.getDaysDifference && window.getDaysDifference(i.expiryDate) <= 3)
    );

    if (expiringItems.length === 0) {
      banner.style.display = "none";
      return;
    }

    const itemNames = expiringItems.map(i => i.name).slice(0, 3).join(", ");
    banner.style.display = "flex";
    banner.innerHTML = `
      <div class="expiring-banner-content">
        <div class="expiring-flame">🔥</div>
        <div class="expiring-text-wrap">
          <h4>Use Before It Expires</h4>
          <p>You have <strong>${escapeHTML(itemNames)}</strong> expiring soon. Discover tasty recipes to use them today!</p>
        </div>
      </div>
      <button class="expiring-banner-btn" onclick="window.RecipeEngine.showExpiringRecipes()">
        View Expiring Recipes ➔
      </button>
    `;
  }

  // ==========================================
  // MASTER RENDERER: CUISINE SECTIONS & GRID
  // ==========================================
  renderRecipeKitchen() {
    const grid = document.getElementById("recipesGrid");
    const countEl = document.getElementById("recipesMatchCount");
    const sectionsContainer = document.getElementById("cuisineSectionsContainer");
    if (!grid) return;

    const pantryItems = (window.store && typeof window.store.getItems === "function") 
      ? window.store.getItems() 
      : [];

    // Empty pantry state
    if (pantryItems.length === 0) {
      if (countEl) {
        countEl.innerHTML = `Pantry is empty • Add products to unlock real-time recipe matching`;
      }
      if (sectionsContainer) sectionsContainer.style.display = "none";
      grid.style.display = "grid";
      grid.innerHTML = `
        <div class="no-recipes-card" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border-radius: 20px; border: 1.5px dashed #e2e8f0;">
          <div style="font-size: 44px; margin-bottom: 12px;">🍳</div>
          <h3 style="font-size: 18px; font-weight: 800; color: #1e392a; margin-bottom: 6px;">Your pantry is empty. Add your first product to discover recipes!</h3>
          <p style="font-size: 13.5px; color: #64748b; margin-bottom: 18px;">Once you add items to your pantry, our smart kitchen engine will instantly match and prioritize recipes with what you have.</p>
          <button class="recipe-action-btn primary" onclick="openAddEditModal()" style="padding: 10px 22px; font-size: 13px; margin: 0 auto;">+ Add Your First Product</button>
        </div>
      `;
      return;
    }

    const recipes = this.getMatchedRecipes();
    const readyToCookCount = recipes.filter(r => r.matchPercent >= 80).length;

    // View Switcher Buttons Header
    const viewSwitchHtml = `
      <div class="recipe-view-mode-toggle">
        <button type="button" class="view-toggle-btn ${this.viewMode === 'sections' ? 'active' : ''}" onclick="window.RecipeEngine.setViewMode('sections')">
          📑 Browse by Cuisine
        </button>
        <button type="button" class="view-toggle-btn ${this.viewMode === 'grid' ? 'active' : ''}" onclick="window.RecipeEngine.setViewMode('grid')">
          🗂️ All Recipe Cards (${recipes.length})
        </button>
      </div>
    `;

    if (countEl) {
      countEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; width:100%;">
          <span>Showing <strong>${recipes.length}</strong> recipes • <strong>${readyToCookCount}</strong> ready to cook with your pantry</span>
          ${viewSwitchHtml}
        </div>
      `;
    }

    // Condition to show 15 Cuisine Section Panels matching user mockup
    const shouldShowSections = (this.viewMode === "sections" && this.activeCategory === "all" && !this.searchQuery);

    if (shouldShowSections) {
      if (sectionsContainer) {
        sectionsContainer.style.display = "grid";
        this.renderCuisineSectionPanels();
      }
      grid.style.display = "none";
      return;
    }

    // Otherwise render the full Recipe Grid
    if (sectionsContainer) sectionsContainer.style.display = "none";
    grid.style.display = "grid";

    if (recipes.length === 0) {
      grid.innerHTML = `
        <div class="no-recipes-card" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border-radius: 20px; border: 1.5px dashed #e2e8f0;">
          <div style="font-size: 42px; margin-bottom: 12px;">🍳</div>
          <h3 style="font-size: 18px; font-weight: 800; color: #1e392a; margin-bottom: 6px;">No matching recipes found</h3>
          <p style="font-size: 13.5px; color: #64748b; margin-bottom: 18px;">Try searching for a different ingredient or select "All Recipes".</p>
          <button class="recipe-action-btn primary" onclick="window.RecipeEngine.setCategory('all')" style="padding: 10px 20px; font-size: 13px;">View All 175+ Free Recipes</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = recipes.map(recipe => {
      const isFav = this.isFavorite(recipe.id);
      let matchBadgeClass = "match-low";
      if (recipe.matchPercent >= 80) matchBadgeClass = "match-high";
      else if (recipe.matchPercent >= 50) matchBadgeClass = "match-med";

      const vegBadge = recipe.isVegetarian 
        ? `<span class="diet-pill veg">🥦 Veg</span>` 
        : `<span class="diet-pill non-veg">🍗 Non-Veg</span>`;

      return `
        <div class="recipe-card" onclick="window.RecipeEngine.openRecipeDetail('${recipe.id}')">
          <div class="recipe-img-container">
            <img src="${recipe.image}" alt="${escapeHTML(recipe.name)}" class="recipe-card-img" loading="lazy" onerror="this.src='${recipe.fallbackImage || 'assets/categories/other-pantry.png'}'">
            
            <div class="recipe-card-badges">
              <span class="match-badge ${matchBadgeClass}">${recipe.matchPercent}% Match</span>
              ${recipe.hasExpiringIngredient ? '<span class="expiring-badge">🔥 Use Soon</span>' : ''}
            </div>

            <button type="button" class="recipe-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); window.RecipeEngine.toggleFavorite('${recipe.id}')" aria-label="Favorite recipe">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>

          <div class="recipe-card-body">
            <div class="recipe-card-top-meta">
              <span class="recipe-cuisine-tag">${escapeHTML(recipe.cuisine || recipe.category)}</span>
              ${vegBadge}
            </div>

            <h3 class="recipe-card-title">${escapeHTML(recipe.name)}</h3>
            <p class="recipe-card-desc">${escapeHTML(recipe.description)}</p>

            <div class="recipe-ingredient-summary">
              <div class="have-summary">
                <span class="check-icon">✓</span>
                <span>${recipe.available.length} of ${recipe.ingredients.length} in pantry</span>
              </div>
              ${recipe.missing.length > 0 ? `
                <div class="missing-summary">
                  <span>○ ${recipe.missing.length} missing</span>
                </div>
              ` : `
                <div class="ready-summary">
                  <span>✨ Ready to Cook!</span>
                </div>
              `}
            </div>

            <div class="recipe-card-footer">
              <div class="recipe-time-info">
                <span>⏱ ${recipe.totalMinutes || 25} min</span>
                <span>•</span>
                <span>${recipe.difficulty || 'Easy'}</span>
              </div>
              <button type="button" class="recipe-view-btn" onclick="event.stopPropagation(); window.RecipeEngine.openRecipeDetail('${recipe.id}')">
                View Recipe ➔
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // ==========================================
  // 15 CUISINE SECTION PANELS (Mockup 1:1)
  // ==========================================
  renderCuisineSectionPanels() {
    const container = document.getElementById("cuisineSectionsContainer");
    if (!container) return;

    const sections = window.CUISINE_SECTIONS || [];
    const recipeMap = new Map();
    (this.recipes || []).forEach(r => recipeMap.set(r.id, r));

    container.innerHTML = sections.map(sec => {
      const sectionRecipes = (sec.recipeIds || []).map(id => {
        const r = recipeMap.get(id);
        if (!r) return null;
        return {
          ...r,
          ...this.calculateRecipeMatch(r)
        };
      }).filter(Boolean);

      const rowsHtml = sectionRecipes.map(recipe => {
        const dietDot = recipe.isVegetarian ? "🟢" : "🔴";
        let matchPill = "";
        if (recipe.matchPercent >= 80) {
          matchPill = `<span class="sec-match-pill ready">✓ In Pantry</span>`;
        } else if (recipe.matchPercent > 0) {
          matchPill = `<span class="sec-match-pill partial">${recipe.matchPercent}% Match</span>`;
        }

        return `
          <div class="cuisine-panel-item" onclick="window.RecipeEngine.openRecipeDetail('${recipe.id}')">
            <div class="cuisine-item-thumb-wrap">
              <img src="${recipe.image}" alt="${escapeHTML(recipe.name)}" class="cuisine-item-thumb" loading="lazy" onerror="this.src='${recipe.fallbackImage || 'assets/categories/other-pantry.png'}'">
            </div>
            <div class="cuisine-item-info">
              <div class="cuisine-item-title-row">
                <span class="diet-dot">${dietDot}</span>
                <span class="cuisine-item-name">${escapeHTML(recipe.name)}</span>
              </div>
              <div class="cuisine-item-sub-row">
                <span class="cuisine-item-time">⏱ ${recipe.totalMinutes || 25} min</span>
                ${matchPill}
              </div>
            </div>
            <div class="cuisine-item-arrow">➔</div>
          </div>
        `;
      }).join("");

      return `
        <div class="cuisine-panel-card" id="panel_${sec.id}">
          <div class="cuisine-panel-header">
            <div class="cuisine-panel-title">
              <span class="cuisine-panel-icon">${sec.icon}</span>
              <h3>${escapeHTML(sec.title)}</h3>
            </div>
            <button type="button" class="cuisine-panel-viewall-btn" onclick="window.RecipeEngine.setCategory('${sec.filter}')">
              View All ➔
            </button>
          </div>
          <div class="cuisine-panel-list">
            ${rowsHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  // ==========================================
  // RECIPE DETAIL MODAL & DYNAMIC SERVINGS
  // ==========================================
  openRecipeDetail(recipeId) {
    const recipe = (this.recipes || []).find(r => r.id === recipeId);
    if (!recipe) return;

    const matchData = this.calculateRecipeMatch(recipe);
    this.currentDetailRecipe = { ...recipe, ...matchData };
    this.originalServings = Number(recipe.servings) || 4;
    this.currentServings = this.originalServings;

    const modal = document.getElementById("recipeDetailModal");
    if (!modal) return;

    // Top Header & Hero Image
    const imgEl = document.getElementById("detailRecipeImg");
    if (imgEl) {
      imgEl.src = recipe.image;
      imgEl.onerror = () => { imgEl.src = recipe.fallbackImage || 'assets/categories/other-pantry.png'; };
    }

    document.getElementById("detailRecipeTitle").textContent = recipe.name;
    document.getElementById("detailRecipeDesc").textContent = recipe.description;
    document.getElementById("detailCuisineTag").textContent = `${recipe.cuisine || recipe.category} • ${recipe.isVegetarian ? '🥦 Vegetarian' : '🍗 Non-Vegetarian'}`;
    document.getElementById("detailPrepTime").textContent = recipe.prepTime || "10 mins";
    document.getElementById("detailCookTime").textContent = recipe.cookTime || "15 mins";
    document.getElementById("detailDifficulty").textContent = recipe.difficulty || "Easy";

    // Servings Stepper
    this.renderDetailServingsAndNutrition();

    // Match Progress Bar
    const matchBar = document.getElementById("detailMatchBar");
    const matchText = document.getElementById("detailMatchText");
    if (matchBar) matchBar.style.width = `${matchData.matchPercent}%`;
    if (matchText) matchText.textContent = `${matchData.matchPercent}% Match (${matchData.available.length} of ${recipe.ingredients.length} available)`;

    // Render Scaled Ingredients Checklist
    this.renderDetailIngredients();

    // Step-by-Step Instructions
    const instContainer = document.getElementById("detailInstructionsList");
    if (instContainer) {
      instContainer.innerHTML = (recipe.instructions || []).map((step, idx) => `
        <div class="detail-step-item">
          <div class="step-num">${idx + 1}</div>
          <div class="step-text">${escapeHTML(step)}</div>
        </div>
      `).join("");
    }

    // Extra details: Allergens, Equipment, Storage
    this.renderDetailMetaExtras(recipe);

    this.updateDetailFavoriteBtn();
    modal.classList.add("active");
  }

  changeDetailServings(delta) {
    if (!this.currentDetailRecipe) return;
    const next = this.currentServings + delta;
    if (next >= 1 && next <= 24) {
      this.currentServings = next;
      this.renderDetailServingsAndNutrition();
      this.renderDetailIngredients();
    }
  }

  renderDetailServingsAndNutrition() {
    const recipe = this.currentDetailRecipe;
    if (!recipe) return;

    const servingsEl = document.getElementById("detailServings");
    if (servingsEl) {
      servingsEl.innerHTML = `
        <div class="servings-stepper">
          <button type="button" class="servings-btn" onclick="window.RecipeEngine.changeDetailServings(-1)" title="Decrease Servings">-</button>
          <span class="servings-count">${this.currentServings} Servings</span>
          <button type="button" class="servings-btn" onclick="window.RecipeEngine.changeDetailServings(1)" title="Increase Servings">+</button>
        </div>
      `;
    }

    // Scale Nutrition
    const nut = recipe.nutrition || { calories: 350, protein: "18g", carbs: "45g", fat: "12g" };
    const factor = this.currentServings / this.originalServings;
    const scaledCalories = Math.round(nut.calories * factor);

    const calEl = document.getElementById("detailCalories");
    if (calEl) calEl.innerHTML = `${scaledCalories} kcal <small style="display:block; font-size:10px; color:#64748b;">(${nut.calories}/serv)</small>`;

    const protEl = document.getElementById("detailProtein");
    if (protEl) protEl.textContent = nut.protein || "--";

    const carbsEl = document.getElementById("detailCarbs");
    if (carbsEl) carbsEl.textContent = nut.carbs || "--";

    const fatEl = document.getElementById("detailFat");
    if (fatEl) fatEl.textContent = nut.fat || "--";
  }

  formatAmount(val) {
    if (!val || isNaN(val)) return "";
    const rounded = Math.round(val * 100) / 100;
    if (rounded === 0.5) return "1/2";
    if (rounded === 0.25) return "1/4";
    if (rounded === 0.75) return "3/4";
    if (rounded === 0.33) return "1/3";
    if (rounded === 0.67) return "2/3";
    if (rounded === 1.5) return "1 1/2";
    if (rounded === 2.5) return "2 1/2";
    return rounded.toString();
  }

  renderDetailIngredients() {
    const ingContainer = document.getElementById("detailIngredientsList");
    if (!ingContainer || !this.currentDetailRecipe) return;

    const recipe = this.currentDetailRecipe;
    const factor = this.currentServings / this.originalServings;
    const matchData = this.calculateRecipeMatch(recipe);

    ingContainer.innerHTML = (recipe.ingredients || []).map(ing => {
      const ingName = typeof ing === "string" ? ing : (ing.name || "");
      const isHave = matchData.available.some(a => (typeof a === "string" ? a : a.name) === ingName);
      const isExp = matchData.expiring.some(e => (typeof e === "string" ? e : e.name) === ingName);

      let amountText = "";
      if (typeof ing === "object" && ing.amount) {
        const scaled = Number(ing.amount) * factor;
        amountText = `<strong class="ing-amount">${this.formatAmount(scaled)} ${ing.unit || ''}</strong> `;
      }

      let statusHtml = `<span class="ing-status have">✓ In Pantry</span>`;
      if (isExp) {
        statusHtml = `<span class="ing-status expiring">🔥 Expiring Soon</span>`;
      } else if (!isHave) {
        statusHtml = `
          <button type="button" class="ing-status missing-add-btn" onclick="window.RecipeEngine.addSingleIngredientToShopping('${escapeHTML(ingName)}')" title="Add to Shopping List">
            + Shopping List
          </button>
        `;
      }

      return `
        <div class="detail-ing-item ${isHave ? 'available' : 'missing'}">
          <div class="detail-ing-name">
            <span class="ing-bullet">${isHave ? '✓' : '○'}</span>
            <span>${amountText}${escapeHTML(ingName)}</span>
          </div>
          ${statusHtml}
        </div>
      `;
    }).join("");
  }

  renderDetailMetaExtras(recipe) {
    let extraWrap = document.getElementById("detailMetaExtrasWrap");
    if (!extraWrap) {
      extraWrap = document.createElement("div");
      extraWrap.id = "detailMetaExtrasWrap";
      extraWrap.className = "detail-meta-extras-container";
      const instList = document.getElementById("detailInstructionsList");
      if (instList && instList.parentNode) {
        instList.parentNode.insertBefore(extraWrap, instList.nextSibling);
      }
    }

    const allergensList = (recipe.allergens && recipe.allergens.length) ? recipe.allergens.join(", ") : "None reported";
    const equipList = (recipe.equipment && recipe.equipment.length) ? recipe.equipment.join(", ") : "Standard Cookware";
    const storageText = recipe.storage || "Refrigerate leftovers in airtight container.";

    extraWrap.innerHTML = `
      <div class="detail-extra-cards-grid">
        <div class="extra-card">
          <span class="extra-icon">⚠️</span>
          <div>
            <strong>Allergens</strong>
            <p>${escapeHTML(allergensList)}</p>
          </div>
        </div>
        <div class="extra-card">
          <span class="extra-icon">🍳</span>
          <div>
            <strong>Equipment</strong>
            <p>${escapeHTML(equipList)}</p>
          </div>
        </div>
        <div class="extra-card">
          <span class="extra-icon">❄️</span>
          <div>
            <strong>Storage & Leftovers</strong>
            <p>${escapeHTML(storageText)}</p>
          </div>
        </div>
      </div>
    `;
  }

  closeRecipeDetail() {
    const modal = document.getElementById("recipeDetailModal");
    if (modal) modal.classList.remove("active");
  }

  updateDetailFavoriteBtn() {
    const btn = document.getElementById("detailFavBtn");
    if (!btn || !this.currentDetailRecipe) return;
    const isFav = this.isFavorite(this.currentDetailRecipe.id);
    btn.innerHTML = isFav ? "❤️ Saved in Favorites" : "🤍 Save Recipe";
  }

  toggleCurrentDetailFavorite() {
    if (!this.currentDetailRecipe) return;
    this.toggleFavorite(this.currentDetailRecipe.id);
    this.updateDetailFavoriteBtn();
  }

  addSingleIngredientToShopping(name) {
    if (!name) return;
    const count = this.addToShoppingList(name);
    if (window.showToast) {
      window.showToast(count > 0 ? `Added "${name}" to your Shopping List! 🛒` : `"${name}" is already in your Shopping List!`);
    }
  }

  addCurrentMissingToShopping() {
    if (!this.currentDetailRecipe) return;
    const missing = (this.currentDetailRecipe.missing || []).map(i => typeof i === "string" ? i : (i.name || ""));
    if (missing.length === 0) {
      if (window.showToast) window.showToast("You already have all ingredients in your pantry! 🎉");
      return;
    }
    const count = this.addToShoppingList(missing);
    if (window.showToast) window.showToast(`Added ${count} missing item(s) to your Shopping List! 🛒`);
  }

  shareCurrentRecipe() {
    if (!this.currentDetailRecipe) return;
    const recipe = this.currentDetailRecipe;
    const text = `Check out this delicious recipe: ${recipe.name} (${recipe.cuisine} • ${recipe.totalMinutes} min) on IntelliPantry!`;
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`).then(() => {
        if (window.showToast) window.showToast("Recipe link copied to clipboard! 📋");
      }).catch(() => {});
    }
  }

  // ==========================================
  // FULL-SCREEN INTERACTIVE COOKING MODE
  // ==========================================
  openCookingMode() {
    if (!this.currentDetailRecipe) return;
    this.cookingStepIndex = 0;
    const modal = document.getElementById("cookingModeModal");
    if (!modal) return;

    this.renderCookingModeStep();
    modal.classList.add("active");
  }

  closeCookingMode() {
    const modal = document.getElementById("cookingModeModal");
    if (modal) modal.classList.remove("active");
    if (this.cookingTimerInterval) {
      clearInterval(this.cookingTimerInterval);
      this.cookingTimerInterval = null;
    }
  }

  renderCookingModeStep() {
    const recipe = this.currentDetailRecipe;
    if (!recipe) return;

    const instructions = recipe.instructions || [];
    const totalSteps = instructions.length || 1;
    const stepText = instructions[this.cookingStepIndex] || "Ready to serve!";

    document.getElementById("cookingModalTitle").textContent = recipe.name;
    document.getElementById("cookingStepCounter").textContent = `Step ${this.cookingStepIndex + 1} of ${totalSteps}`;

    const progressPct = Math.round(((this.cookingStepIndex + 1) / totalSteps) * 100);
    const progBar = document.getElementById("cookingProgressBar");
    if (progBar) progBar.style.width = `${progressPct}%`;

    const textEl = document.getElementById("cookingStepInstruction");
    if (textEl) textEl.textContent = stepText;

    // Detect minutes in step for one-tap timer
    const timerBox = document.getElementById("cookingStepTimerBox");
    if (timerBox) {
      const matchMin = stepText.match(/(\d+)\s*(?:mins|min|minutes)/i);
      if (matchMin && matchMin[1]) {
        const mins = parseInt(matchMin[1], 10);
        timerBox.style.display = "block";
        timerBox.innerHTML = `
          <button type="button" class="cooking-timer-btn" onclick="window.RecipeEngine.startCookingTimer(${mins})">
            ⏱ Start ${mins} Minute Timer
          </button>
          <span id="cookingTimerCountdown" style="display:none; margin-left:12px; font-weight:700; color:#059669; font-size:16px;"></span>
        `;
      } else {
        timerBox.style.display = "none";
      }
    }

    // Previous / Next Buttons
    const prevBtn = document.getElementById("cookingPrevBtn");
    const nextBtn = document.getElementById("cookingNextBtn");
    if (prevBtn) prevBtn.disabled = (this.cookingStepIndex === 0);
    if (nextBtn) {
      if (this.cookingStepIndex === totalSteps - 1) {
        nextBtn.innerHTML = "🎉 Complete & Deduct Stock";
        nextBtn.onclick = () => this.finishCooking();
      } else {
        nextBtn.innerHTML = "Next Step ➔";
        nextBtn.onclick = () => this.nextCookingStep();
      }
    }

    // Scaled Ingredients Reference drawer
    const ingDrawer = document.getElementById("cookingIngredientsDrawer");
    if (ingDrawer) {
      const factor = this.currentServings / this.originalServings;
      ingDrawer.innerHTML = (recipe.ingredients || []).map(ing => {
        const n = typeof ing === "string" ? ing : (ing.name || "");
        let amt = "";
        if (typeof ing === "object" && ing.amount) {
          amt = `<strong>${this.formatAmount(ing.amount * factor)} ${ing.unit || ''}</strong> `;
        }
        return `<li>${amt}${escapeHTML(n)}</li>`;
      }).join("");
    }
  }

  prevCookingStep() {
    if (this.cookingStepIndex > 0) {
      this.cookingStepIndex--;
      this.renderCookingModeStep();
    }
  }

  nextCookingStep() {
    const totalSteps = (this.currentDetailRecipe.instructions || []).length;
    if (this.cookingStepIndex < totalSteps - 1) {
      this.cookingStepIndex++;
      this.renderCookingModeStep();
    }
  }

  startCookingTimer(mins) {
    if (this.cookingTimerInterval) clearInterval(this.cookingTimerInterval);
    this.cookingTimerSeconds = mins * 60;
    const countEl = document.getElementById("cookingTimerCountdown");
    if (countEl) countEl.style.display = "inline-block";

    this.cookingTimerInterval = setInterval(() => {
      if (this.cookingTimerSeconds <= 0) {
        clearInterval(this.cookingTimerInterval);
        this.cookingTimerInterval = null;
        if (countEl) countEl.textContent = "⏰ Time's up!";
        if (window.showToast) window.showToast("⏰ Timer finished for step!");
        return;
      }
      this.cookingTimerSeconds--;
      const m = Math.floor(this.cookingTimerSeconds / 60);
      const s = this.cookingTimerSeconds % 60;
      if (countEl) countEl.textContent = `⏱ ${m}:${s < 10 ? '0' : ''}${s}`;
    }, 1000);
  }

  async finishCooking() {
    const recipe = this.currentDetailRecipe;
    if (!recipe) return;

    // Deduct available matching pantry items by 1
    if (window.store && typeof window.store.getItems === "function") {
      const pantry = window.store.getItems();
      for (const ing of (recipe.ingredients || [])) {
        const ingName = typeof ing === "string" ? ing : (ing.name || "");
        const matched = this.matchIngredientWithPantry(ingName, pantry);
        if (matched && Number(matched.quantity) > 0) {
          const newQty = Math.max(0, Number(matched.quantity) - 1);
          await window.store.updateItem(matched.id, { quantity: newQty });
        }
      }
    }

    // Save to cooking history
    const historyItem = {
      id: "cook_" + Date.now(),
      recipeId: recipe.id,
      recipeName: recipe.name,
      cuisine: recipe.cuisine,
      servings: this.currentServings,
      cookedAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem(this.getCookingHistoryKey()) || "[]");
      existing.unshift(historyItem);
      localStorage.setItem(this.getCookingHistoryKey(), JSON.stringify(existing.slice(0, 50)));

      // Sync to Supabase if authenticated
      if (window.supabaseClient && window.supabaseClient.auth) {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session && session.user) {
          await window.supabaseClient.from("user_cooking_history").insert({
            user_id: session.user.id,
            recipe_id: recipe.id,
            recipe_name: recipe.name,
            servings: this.currentServings,
            cooked_at: historyItem.cookedAt
          });
        }
      }
    } catch (e) {
      console.warn("[Recipe Engine] Cooking history record skipped:", e.message);
    }

    this.closeCookingMode();
    this.closeRecipeDetail();

    if (window.showToast) {
      window.showToast(`🎉 Delicious! You cooked ${recipe.name}! Pantry inventory updated.`);
    }
  }

  // ==========================================
  // SHOPPING LIST MODAL
  // ==========================================
  openShoppingListModal() {
    const modal = document.getElementById("shoppingListModal");
    if (!modal) return;
    this.renderShoppingListModal();
    modal.classList.add("active");
  }

  closeShoppingListModal() {
    const modal = document.getElementById("shoppingListModal");
    if (modal) modal.classList.remove("active");
  }

  renderShoppingListModal() {
    const container = document.getElementById("shoppingListItemsContainer");
    if (!container) return;

    const list = this.getShoppingList();
    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 36px 16px; color: #94a3b8;">
          <div style="font-size: 36px; margin-bottom: 8px;">🛒</div>
          <p style="font-weight: 700; color: #475569;">Your shopping list is empty</p>
          <small>Add missing recipe ingredients with 1-click!</small>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => {
      const id = typeof item === "string" ? item : item.id;
      const name = typeof item === "string" ? item : item.name;
      const checked = (typeof item === "object" && item.checked) ? "checked" : "";

      return `
        <div class="shopping-item-row" id="shop_row_${id}">
          <label class="shopping-item-label">
            <input type="checkbox" ${checked} onchange="window.RecipeEngine.toggleShoppingItemCheck('${id}', this.checked)">
            <span class="shopping-item-text ${checked ? 'completed' : ''}">${escapeHTML(name)}</span>
          </label>
          <div class="shopping-item-actions">
            <button class="shop-add-pantry-btn" onclick="window.RecipeEngine.moveShoppingItemToPantry('${id}', '${escapeHTML(name)}')" title="Add directly to Pantry">
              + Pantry
            </button>
            <button class="shop-delete-btn" onclick="window.RecipeEngine.removeShoppingListItem('${id}')" title="Remove">
              ✕
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  toggleShoppingItemCheck(itemId, isChecked) {
    const list = this.getShoppingList();
    const item = list.find(i => (typeof i === "string" ? i === itemId : i.id === itemId));
    if (item && typeof item === "object") {
      item.checked = isChecked;
      localStorage.setItem(this.getShoppingListKey(), JSON.stringify(list));
      this.renderShoppingListModal();
    }
  }

  moveShoppingItemToPantry(itemId, itemName) {
    if (window.store && typeof window.store.addItem === "function") {
      window.store.addItem({
        name: itemName,
        category: "Pantry",
        quantity: 1,
        unit: "pcs",
        expiryDate: window.getRelativeDateISO ? window.getRelativeDateISO(7) : null
      });
      this.removeShoppingListItem(itemId);
      if (window.showToast) window.showToast(`Added ${itemName} to your pantry! 🌿`);
    }
  }
}

// Global Recipe Engine instance
window.RecipeEngine = new RecipeEngineManager();

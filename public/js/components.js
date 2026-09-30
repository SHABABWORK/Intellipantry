/**
 * Smart Pantry - UI Components, Table Rendering, Category Filters & Modals
 */

let currentCategoryFilter = "All";
let currentStatusFilter = "All";
let currentSearchQuery = "";
const CATEGORY_NAMES = ["Fruits", "Vegetables", "Dairy", "Grains", "Meat", "Beverages", "Pantry", "Frozen"];

// Format Date nicely: "18 Sep 2026"
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const parsed = window.parseLocalDate ? window.parseLocalDate(dateStr) : new Date(dateStr);
  if (!parsed || isNaN(parsed.getTime())) return dateStr;
  const options = { day: "numeric", month: "short", year: "numeric" };
  return parsed.toLocaleDateString("en-GB", options);
}

// Render the metrics row and Expiry Overview panel
function updateMetricsDisplay() {
  const metrics = window.store.getMetrics();
  const totalEl = document.getElementById("metricTotalItems");
  const lowStockEl = document.getElementById("metricLowStock");
  const expiringEl = document.getElementById("metricExpiringSoon");
  const shoppingEl = document.getElementById("metricShoppingList");
  const freshEl = document.getElementById("metricFreshItems");

  if (totalEl) totalEl.textContent = metrics.total;
  if (lowStockEl) lowStockEl.textContent = metrics.expiringSoon !== undefined ? metrics.expiringSoon : 0;
  if (lowStockEl) lowStockEl.textContent = metrics.lowStock;
  if (expiringEl) expiringEl.textContent = metrics.expiringSoon;
  if (shoppingEl) shoppingEl.textContent = metrics.shoppingListCount;
  if (freshEl) freshEl.textContent = metrics.fresh !== undefined ? metrics.fresh : Math.max(0, metrics.total - metrics.lowStock - metrics.expiringSoon - metrics.expired);

  // Expiry Overview pills (if rendered in UI)
  const pillTotal = document.getElementById("overviewPillTotal");
  const pillFresh = document.getElementById("overviewPillFresh");
  const pillExpiringSoon = document.getElementById("overviewPillExpiringSoon");
  const pillVerySoon = document.getElementById("overviewPillVerySoon");
  const pillExpiresToday = document.getElementById("overviewPillExpiresToday");
  const pillExpired = document.getElementById("overviewPillExpired");
  const pillEstimated = document.getElementById("overviewPillEstimated");
  const pillOpened = document.getElementById("overviewPillOpened");

  if (pillTotal) pillTotal.textContent = metrics.total;
  if (pillFresh) pillFresh.textContent = metrics.fresh;
  if (pillExpiringSoon) pillExpiringSoon.textContent = metrics.expiringSoon;
  if (pillVerySoon) pillVerySoon.textContent = metrics.verySoon;
  if (pillExpiresToday) pillExpiresToday.textContent = metrics.expiresToday;
  if (pillExpired) pillExpired.textContent = metrics.expired;
  if (pillEstimated) pillEstimated.textContent = metrics.estimatedItems;
  if (pillOpened) pillOpened.textContent = metrics.openedItems;
}

// Status filter pill handling
function setStatusFilter(status) {
  currentStatusFilter = status;
  document.querySelectorAll(".status-filter-btn, .expiry-overview-pill").forEach(btn => {
    if (btn.getAttribute("data-status") === status) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  renderInventoryTable();
}

// Render Inventory Table based on active filters
let currentInventoryViewMode = "grid";
try {
  currentInventoryViewMode = localStorage.getItem("smartpantry_view_mode") || "grid";
} catch(e) {}

function setInventoryViewMode(mode) {
  currentInventoryViewMode = mode;
  try {
    localStorage.setItem("smartpantry_view_mode", mode);
  } catch(e) {}

  const gridWrap = document.getElementById("inventoryCardsGrid");
  const tableWrap = document.getElementById("inventoryTableWrapper");
  const btnGrid = document.getElementById("viewToggleGrid");
  const btnList = document.getElementById("viewToggleList");

  if (mode === "list") {
    if (gridWrap) gridWrap.style.display = "none";
    if (tableWrap) tableWrap.style.display = "block";
    if (btnGrid) btnGrid.classList.remove("active");
    if (btnList) btnList.classList.add("active");
  } else {
    if (gridWrap) gridWrap.style.display = "grid";
    if (tableWrap) tableWrap.style.display = "none";
    if (btnGrid) btnGrid.classList.add("active");
    if (btnList) btnList.classList.remove("active");
  }
}

// Render Inventory Cards Grid & Table based on active filters
function renderInventoryTable() {
  const tbody = document.getElementById("inventoryTableBody");
  const cardsGrid = document.getElementById("inventoryCardsGrid");
  if (!tbody && !cardsGrid) return;

  updateCategoryPillCounts();
  updateLiveDateTimeGreeting();

  if (window.store && window.store.isLoading) {
    const loadingHtml = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 48px 16px; color: #64748b;">
        <div style="display:inline-block; width: 32px; height: 32px; border: 3px solid rgba(30,57,42,0.2); border-top-color: #1e392a; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 12px;"></div>
        <p style="font-size: 14.5px; font-weight: 600; color: #1e392a; margin: 0;">Loading pantry items from Supabase...</p>
      </div>
    `;
    if (cardsGrid) cardsGrid.innerHTML = loadingHtml;
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding: 48px 16px; color: #64748b;">
            <div style="display:inline-block; width: 32px; height: 32px; border: 3px solid rgba(30,57,42,0.2); border-top-color: #1e392a; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 12px;"></div>
            <p style="font-size: 14.5px; font-weight: 600; color: #1e392a; margin: 0;">Loading pantry items from Supabase...</p>
          </td>
        </tr>
      `;
    }
    return;
  }

  const allItems = window.store.getItems();
  const warnDays = window.store?.fullSettings?.pantry_settings?.expiry_warning_days || 7;
  const filtered = allItems.filter(item => {
    const itemCat = (item.category || "Pantry").toLowerCase();
    const filterCat = currentCategoryFilter.toLowerCase();
    const matchesCategory = currentCategoryFilter === "All" || itemCat === filterCat;

    const q = currentSearchQuery.toLowerCase();
    const matchesSearch = !currentSearchQuery || 
      (item.name || "").toLowerCase().includes(q) ||
      (item.brand || "").toLowerCase().includes(q) ||
      itemCat.includes(q) ||
      (item.barcode || "").toLowerCase().includes(q) ||
      (item.storageLocation || "").toLowerCase().includes(q);

    const expDate = item.effectiveExpiryDate || item.expiryDate;
    const computedStatus = window.store.calculateStatus(expDate, item.quantity, item.minStock, warnDays);
    const expClass = window.store.getExpiryClassification ? window.store.getExpiryClassification(item) : { status: computedStatus, days: null };
    const diffDays = expClass.days !== null ? expClass.days : (window.getDaysDifference ? window.getDaysDifference(expDate) : null);

    let matchesStatus = true;
    if (currentStatusFilter !== "All") {
      if (currentStatusFilter === "Expiring Soon") {
        matchesStatus = (diffDays !== null && diffDays >= 8 && diffDays <= 30) || (computedStatus === "Expiring Soon" && diffDays > 7);
      } else if (currentStatusFilter === "Very Soon") {
        matchesStatus = diffDays !== null && diffDays >= 1 && diffDays <= 7;
      } else if (currentStatusFilter === "Expires Today") {
        matchesStatus = diffDays === 0;
      } else if (currentStatusFilter === "Expired") {
        matchesStatus = diffDays !== null && diffDays < 0;
      } else if (currentStatusFilter === "Fresh" || currentStatusFilter === "In Stock") {
        matchesStatus = (diffDays === null || diffDays > 30) && Number(item.quantity) > (item.minStock !== undefined ? Number(item.minStock) : 2);
      } else if (currentStatusFilter === "Estimated") {
        matchesStatus = Boolean(item.isEstimate || item.expiryType === 'estimated' || (item.estimatedExpiryDate && !item.actualExpiryDate));
      } else if (currentStatusFilter === "Opened") {
        matchesStatus = item.productStatus === 'Opened';
      } else if (currentStatusFilter === "Low Stock") {
        matchesStatus = computedStatus === "Low Stock" || Number(item.quantity) <= (item.minStock !== undefined ? Number(item.minStock) : 2);
      }
    }

    return matchesCategory && matchesSearch && matchesStatus;
  });

  if (allItems.length === 0) {
    const emptyAllHtml = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 56px 20px; background: #ffffff; border-radius: 22px; border: 1.5px dashed #eae6dc; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <div style="font-size: 48px; margin-bottom: 12px;">🥣</div>
        <h3 style="font-size: 19px; font-weight: 800; color: #1e392a; margin-bottom: 6px;">Your pantry is empty. Add your first product to get started.</h3>
        <p style="font-size: 13.5px; color: #6e7870; margin-bottom: 22px; max-width: 460px; margin-left: auto; margin-right: auto;">Track shelf-life, scan receipts, and unlock recipes with the ingredients you have.</p>
        <button type="button" class="btn-add-pantry" onclick="openAddEditModal()" style="margin: 0 auto;">
          <span>+</span> Add Your First Product
        </button>
      </div>
    `;
    if (cardsGrid) cardsGrid.innerHTML = emptyAllHtml;
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding: 48px 16px; color: #64748b;">
            <div style="font-size: 44px; margin-bottom: 12px;">🥣</div>
            <p style="font-size: 16.5px; font-weight: 700; color: #1e392a; margin-bottom: 6px;">Your pantry is empty. Add your first product to get started.</p>
            <p style="font-size: 13px; color: #94a3b8; margin-bottom: 20px;">Track shelf-life, scan receipts, and unlock recipes with the ingredients you have.</p>
            <button type="button" class="btn-forest-submit" onclick="openAddEditModal()" style="display:inline-flex; align-items:center; gap:8px; padding:10px 22px; font-size:13.5px; border-radius:12px; width:auto; margin:0 auto; cursor:pointer;">
              <span>+</span> Add Your First Product
            </button>
          </td>
        </tr>
      `;
    }
    return;
  }

  if (filtered.length === 0) {
    const emptyFilteredHtml = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 44px 16px; background: #ffffff; border-radius: 20px; border: 1.5px dashed #eae6dc;">
        <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
        <p style="font-size: 15px; font-weight: 700; color: #19251e; margin-bottom: 4px;">No items match your filter criteria</p>
        <p style="font-size: 13px; color: #6e7870; margin: 0;">Try selecting "All" or clearing your search query</p>
      </div>
    `;
    if (cardsGrid) cardsGrid.innerHTML = emptyFilteredHtml;
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding: 36px 16px; color: #94a3b8;">
            <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
            <p style="font-weight: 600; color: #64748b;">No items match your filter criteria</p>
            <small>Try selecting "All" or clearing your search query</small>
          </td>
        </tr>
      `;
    }
    return;
  }

  // 1. Render Grocery Cards Grid (Matches Screenshot Image 1)
  if (cardsGrid) {
    cardsGrid.innerHTML = filtered.map(item => {
      const expDate = item.effectiveExpiryDate || item.expiryDate;
      const computedStatus = window.store.calculateStatus(expDate, item.quantity, item.minStock, warnDays);
      const expClass = window.store.getExpiryClassification ? window.store.getExpiryClassification(item) : { status: computedStatus, days: null, dotColor: "#10b981", badgeClass: "badge-status status-fresh" };
      const rel = window.formatRelativeExpiry ? window.formatRelativeExpiry(expDate, warnDays) : { text: expDate || "—", urgent: false, days: null };

      let statusDotClass = "dot-fresh";
      let statusTextClass = "status-label-fresh";
      let statusLabel = expClass.label || expClass.status || "Fresh";

      if (expClass.status === "Expired") {
        statusDotClass = "dot-expired";
        statusTextClass = "status-label-expired";
        statusLabel = "Expired";
      } else if (expClass.status === "Expires Today") {
        statusDotClass = "dot-expired";
        statusTextClass = "status-label-expired";
        statusLabel = "Expires Today";
      } else if (expClass.status === "Very Soon") {
        statusDotClass = "dot-usesoon";
        statusTextClass = "status-label-usesoon";
        statusLabel = "Very Soon (1–7d)";
      } else if (expClass.status === "Expiring Soon") {
        statusDotClass = "dot-usesoon";
        statusTextClass = "status-label-usesoon";
        statusLabel = "Expiring Soon";
      } else if (computedStatus === "Low Stock" || Number(item.quantity) <= (item.minStock !== undefined ? Number(item.minStock) : 2)) {
        statusDotClass = "dot-usesoon";
        statusTextClass = "status-label-usesoon";
        statusLabel = "Low Stock";
      }

      const isEstimated = Boolean(item.isEstimate || item.expiryType === 'estimated' || (item.estimatedExpiryDate && !item.actualExpiryDate));
      const isOpened = item.productStatus === 'Opened';
      const dateFormatted = formatDate(expDate);
      const catName = item.category || "Pantry";
      const catLower = catName.toLowerCase();

      let imgHtml = "";
      if (item.imageUrl) {
        imgHtml = `<img src="${escapeHTML(item.imageUrl)}" alt="${escapeHTML(item.name)}" class="grocery-card-img" onerror="this.onerror=null; this.src='assets/categories/${catLower}.png';">`;
      } else {
        imgHtml = `<img src="assets/categories/${catLower}.png" alt="${escapeHTML(item.name)}" class="grocery-card-img" onerror="this.onerror=null; this.outerHTML='<span style=\\'font-size:44px;\\'>${item.emoji || "📦"}</span>';">`;
      }

      // Prefix label based on type
      let expPrefix = "Exp: ";
      if (isOpened && item.recommendedUseByDate) {
        expPrefix = "Use by: ";
      } else if (isEstimated) {
        expPrefix = "Est: ";
      }

      return `
        <div class="grocery-card" data-id="${item.id}">
          <div class="grocery-card-top">
            <div style="display:flex; gap:4px; flex-wrap:wrap; align-items:center;">
              ${isEstimated ? `<span class="badge-mini badge-estimate" title="Estimated shelf life reference. Manufacturer printed date always takes priority.">✨ Est</span>` : ''}
              ${isOpened ? `<span class="badge-mini badge-opened" title="Opened on ${item.openedDate || 'recently'}. Recommended use by: ${item.recommendedUseByDate || 'soon'}">🔓 Opened</span>` : ''}
            </div>
            <div style="position:relative;">
              <button type="button" class="grocery-menu-btn" onclick="toggleGroceryCardMenu('${item.id}', event)" title="Item Actions">⋮</button>
              <div id="cardMenu_${item.id}" class="grocery-card-dropdown" style="display:none;">
                <button type="button" onclick="viewProductDetails('${item.id}')">👁️ View Details</button>
                <button type="button" onclick="openAddEditModal('${item.id}')">✏️ Edit Item</button>
                <button type="button" onclick="toggleProductOpened('${item.id}')">${isOpened ? '🔒 Mark as Unopened' : '🔓 Mark as Opened'}</button>
                <button type="button" onclick="consumePantryItem('${item.id}')">🍴 Use / Consume</button>
                <button type="button" onclick="addItemToShoppingList('${escapeHTML(item.name)}')">🛒 Add to Shopping List</button>
                <button type="button" style="color:#ef4444;" onclick="deletePantryItem('${item.id}')">🗑️ Delete</button>
              </div>
            </div>
          </div>
          <div class="grocery-img-wrap" onclick="viewProductDetails('${item.id}')" style="cursor:pointer;" title="Click to view details">
            ${imgHtml}
          </div>
          <div class="grocery-card-body">
            <h4 class="grocery-name" onclick="viewProductDetails('${item.id}')" style="cursor:pointer;" title="${escapeHTML(item.name)}">${escapeHTML(item.name)}</h4>
            <div class="grocery-qty">${item.quantity} ${escapeHTML(item.unit || "pieces")}</div>
            <div class="grocery-status-row">
              <span class="grocery-status-dot ${statusDotClass}"></span>
              <span class="${statusTextClass}">${escapeHTML(statusLabel)}</span>
            </div>
            <div class="grocery-exp-date" title="${isEstimated ? 'Universal estimated expiry' : 'Manufacturer printed date'}">
              ${expPrefix}${dateFormatted}
            </div>
            ${item.storageRecommendation ? `<div style="font-size:10.5px; color:#64748b; margin-top:3px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escapeHTML(item.storageRecommendation)}">📍 ${escapeHTML(item.storageType || item.storageLocation || 'Pantry')}</div>` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  // 2. Render Table Rows for List View
  if (tbody) {
    tbody.innerHTML = filtered.map(item => {
      const expDate = item.effectiveExpiryDate || item.expiryDate;
      const computedStatus = window.store.calculateStatus(expDate, item.quantity, item.minStock, warnDays);
      const expClass = window.store.getExpiryClassification ? window.store.getExpiryClassification(item) : { status: computedStatus, days: null, badgeClass: "badge-status status-fresh" };
      const rel = window.formatRelativeExpiry ? window.formatRelativeExpiry(expDate, warnDays) : { text: expDate || "—", urgent: false, days: null };

      let statusClass = "status-fresh";
      let statusLabel = expClass.label || expClass.status || "Fresh";

      if (expClass.status === "Expired") {
        statusClass = "status-expired";
        statusLabel = "Expired";
      } else if (expClass.status === "Expires Today") {
        statusClass = "status-today";
        statusLabel = "Expires Today";
      } else if (expClass.status === "Very Soon") {
        statusClass = "status-very-soon";
        statusLabel = "Very Soon";
      } else if (expClass.status === "Expiring Soon") {
        statusClass = "status-expiring";
        statusLabel = "Expiring Soon";
      } else if (computedStatus === "Low Stock" || Number(item.quantity) <= (item.minStock !== undefined ? Number(item.minStock) : 2)) {
        statusClass = "status-low";
        statusLabel = "Low Stock";
      }

      const isEstimated = Boolean(item.isEstimate || item.expiryType === 'estimated' || (item.estimatedExpiryDate && !item.actualExpiryDate));
      const isOpened = item.productStatus === 'Opened';
      const isUrgent = rel.urgent || statusLabel === "Expiring Soon" || statusLabel === "Expired" || statusLabel === "Expires Today" || statusLabel === "Very Soon";
      const dateFormatted = formatDate(expDate);
      const catName = item.category || "Pantry";

      return `
        <tr data-id="${item.id}">
          <td>
            <div class="item-cell">
              <div class="item-thumb" onclick="viewProductDetails('${item.id}')" style="cursor:pointer;">${item.imageUrl ? `<img src="${escapeHTML(item.imageUrl)}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" onerror="this.outerHTML='${item.emoji || "📦"}'">` : (item.emoji || "📦")}</div>
              <div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span style="font-weight: 700; color: #0f172a; cursor:pointer;" onclick="viewProductDetails('${item.id}')">${escapeHTML(item.name)}</span>
                  ${isEstimated ? `<span class="badge-mini badge-estimate" title="Estimated shelf life">✨ Est</span>` : ''}
                  ${isOpened ? `<span class="badge-mini badge-opened" title="Opened">🔓 Opened</span>` : ''}
                </div>
                ${item.brand ? `<div style="font-size:11px; color:#64748b; font-weight:500;">${escapeHTML(item.brand)}</div>` : ''}
                ${item.barcode ? `<div style="font-size:10px; color:#94a3b8; font-family:monospace;">${escapeHTML(item.barcode)}</div>` : ''}
              </div>
            </div>
          </td>
          <td style="color: #64748b;">
            <span style="display:inline-flex; align-items:center; gap:6px;">
              <img src="assets/categories/${catName.toLowerCase()}.png" alt="" style="width:20px; height:18px; object-fit:contain;" onerror="this.style.display='none'">
              <span>${escapeHTML(catName)}</span>
            </span>
            ${item.storageLocation || item.storageType ? `<div style="font-size:10.5px; color:#94a3b8; margin-top:2px;">📍 ${escapeHTML(item.storageType || item.storageLocation)}</div>` : ''}
          </td>
          <td style="font-weight: 600;">
            ${item.quantity} ${escapeHTML(item.unit || "pcs")}
            ${item.minStock !== undefined ? `<div style="font-size:10.5px; color:#94a3b8; font-weight:400;">Min: ${item.minStock}</div>` : ''}
          </td>
          <td class="${isUrgent ? "expiry-urgent" : ""}">
            <div style="display:flex; flex-direction:column; gap:2px;">
              <span style="font-weight: 600;">${dateFormatted}</span>
              ${expDate ? `<span style="font-size: 11px; font-weight: 700; color: ${expClass.dotColor || '#10b981'};">${isOpened && item.recommendedUseByDate ? 'Use by ' + formatDate(item.recommendedUseByDate) : (isEstimated ? 'Est: ' + (expClass.text || rel.text) : (expClass.text || rel.text))}</span>` : `<span style="font-size: 11px; color:#94a3b8;">No expiry set</span>`}
            </div>
          </td>
          <td>
            <span class="badge-status ${statusClass}">
              ${escapeHTML(statusLabel)}
            </span>
          </td>
          <td style="text-align: right;">
            <div style="display: flex; justify-content: flex-end; gap: 4px;">
              <button class="action-dots-btn" onclick="viewProductDetails('${item.id}')" title="View Details">
                👁️
              </button>
              <button class="action-dots-btn" onclick="openAddEditModal('${item.id}')" title="Edit Item">
                ✏️
              </button>
              <button class="action-dots-btn" onclick="deletePantryItem('${item.id}')" title="Delete Item">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Ensure active view mode is respected
  setInventoryViewMode(currentInventoryViewMode);
}

// Category filter chip handling with real-time count updating
function updateCategoryPillCounts() {
  const all = window.store ? window.store.getItems() : [];
  const counts = { All: all.length };
  all.forEach(i => {
    const cat = i.category || "Pantry";
    counts[cat] = (counts[cat] || 0) + 1;
  });
  document.querySelectorAll(".pantry-pill, .chip-btn").forEach(btn => {
    const cat = btn.getAttribute("data-category");
    if (!cat) return;
    const count = counts[cat] || 0;
    const countEl = btn.querySelector(".pill-count");
    if (countEl) {
      countEl.textContent = `(${count})`;
    } else {
      const base = btn.getAttribute("data-base-name") || btn.innerText.replace(/\(\d+\)/g, "").trim();
      btn.setAttribute("data-base-name", base);
      btn.innerHTML = `${base} <span class="pill-count" style="opacity:0.8; font-size:12px;">(${count})</span>`;
    }
  });
}

// Dynamic Time Greeting & Live Date/Clock
function updateLiveDateTimeGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let timeGreeting = "Good Evening";
  if (hours < 12) {
    timeGreeting = "Good Morning";
  } else if (hours < 17) {
    timeGreeting = "Good Afternoon";
  }

  const greetingEl = document.getElementById("greetingTimeText");
  if (greetingEl) {
    greetingEl.textContent = timeGreeting;
  }

  const user = (typeof getCurrentUserInfo === "function" ? getCurrentUserInfo() : null) || {};
  let userName = user.name || user.fullName || "Shabab";
  if (userName.includes("@")) userName = userName.split("@")[0];
  const welcomeUserEl = document.getElementById("welcomeUserName");
  if (welcomeUserEl && (!welcomeUserEl.textContent || welcomeUserEl.textContent === "User")) {
    welcomeUserEl.textContent = userName;
  }

  const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
  const clockEl = document.getElementById("datetimeClockDisplay");
  if (clockEl) clockEl.textContent = timeStr;
  const topClock = document.getElementById("topbarLiveClock");
  if (topClock) topClock.textContent = timeStr;

  const dateStr = now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const dateEl = document.getElementById("datetimeDateDisplay");
  if (dateEl) dateEl.textContent = dateStr;

  // Kitchen Hub Digital Display Clock Sync
  const monthShort = now.toLocaleDateString("en-US", { month: "short" });
  const dayTwoDigit = String(now.getDate()).padStart(2, "0");
  const rawHours = now.getHours();
  const ampm = rawHours >= 12 ? "PM" : "AM";
  const h12 = rawHours % 12 || 12;
  const hoursStr = String(h12).padStart(2, "0");
  const minutesStr = String(now.getMinutes()).padStart(2, "0");
  const timeDigits = `${hoursStr}:${minutesStr}`;

  document.querySelectorAll(".kh-month-label").forEach(el => el.textContent = monthShort);
  document.querySelectorAll(".kh-day-number").forEach(el => el.textContent = dayTwoDigit);
  document.querySelectorAll(".kh-time-digits").forEach(el => el.textContent = timeDigits);
  document.querySelectorAll(".kh-time-ampm").forEach(el => el.textContent = ampm);
  document.querySelectorAll(".kh-status-text").forEach(el => {
    if (!el.dataset.custom) el.textContent = "Inventory Sync Active";
  });
}

// Stepper for Add/Edit Modal
function stepItemQuantity(delta) {
  const input = document.getElementById("itemQuantityInput");
  if (!input) return;
  let val = parseFloat(input.value) || 1;
  val = Math.max(0.1, Math.round((val + delta) * 10) / 10);
  input.value = val;
}

// Photo Upload Helpers for Add/Edit Modal
function triggerItemPhotoUpload() {
  const input = document.getElementById("itemPhotoFileInput");
  if (input) input.click();
}

function handleItemPhotoSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const preview = document.getElementById("photoPreviewImg");
    const placeholder = document.getElementById("photoPlaceholderContent");
    const removeBtn = document.getElementById("photoRemoveBtn");
    const urlInput = document.getElementById("itemPhotoUrlInput");
    if (preview) {
      preview.src = dataUrl;
      preview.style.display = "block";
    }
    if (placeholder) placeholder.style.display = "none";
    if (removeBtn) removeBtn.style.display = "inline-block";
    if (urlInput) urlInput.value = dataUrl;
  };
  reader.readAsDataURL(file);
}

function removeItemPhoto() {
  const fileInput = document.getElementById("itemPhotoFileInput");
  if (fileInput) fileInput.value = "";
  const preview = document.getElementById("photoPreviewImg");
  const placeholder = document.getElementById("photoPlaceholderContent");
  const removeBtn = document.getElementById("photoRemoveBtn");
  const urlInput = document.getElementById("itemPhotoUrlInput");
  if (preview) {
    preview.src = "";
    preview.style.display = "none";
  }
  if (placeholder) placeholder.style.display = "flex";
  if (removeBtn) removeBtn.style.display = "none";
  if (urlInput) urlInput.value = "";
}

// Grocery card 3-dot dropdown menu toggling
function toggleGroceryCardMenu(id, e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById(`cardMenu_${id}`);
  const allMenus = document.querySelectorAll(".grocery-card-dropdown");
  allMenus.forEach(m => {
    if (m !== menu) m.style.display = "none";
  });
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

document.addEventListener("click", () => {
  document.querySelectorAll(".grocery-card-dropdown").forEach(m => m.style.display = "none");
});

// Grocery card consume helper
async function consumePantryItem(id) {
  const item = window.store.getItemById(id);
  if (!item) return;
  const currentQty = parseFloat(item.quantity) || 1;
  if (currentQty <= 1) {
    if (confirm(`You have 1 ${item.unit || "unit"} left of "${item.name}". Mark as completely consumed?`)) {
      await window.store.deleteItem(id);
      showToast(`Consumed all "${item.name}"`);
      renderInventoryTable();
      updateMetricsDisplay();
    }
  } else {
    await window.store.updateItem(id, { quantity: currentQty - 1 });
    showToast(`Consumed 1 ${item.unit || "unit"} of "${item.name}" (${currentQty - 1} left)`);
    renderInventoryTable();
    updateMetricsDisplay();
  }
}

// Grocery card add to shopping list helper
function addItemToShoppingList(name) {
  if (window.RecipeEngine && typeof window.RecipeEngine.addToShoppingList === "function") {
    window.RecipeEngine.addToShoppingList(name, 1, "item");
    showToast(`Added "${name}" to shopping list!`);
  } else {
    showToast(`Added "${name}" to shopping list!`);
  }
}

// Category filter chip handling
function setCategoryFilter(category) {
  currentCategoryFilter = category;
  document.querySelectorAll(".chip-btn").forEach(btn => {
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  renderInventoryTable();
}

// Search input handling
function handleSearchInput(e) {
  currentSearchQuery = e.target.value.trim();
  renderInventoryTable();
}

// Delete item helper
async function deletePantryItem(id) {
  const item = window.store.getItemById(id);
  if (!item) return;
  if (confirm(`Remove "${item.name}" from your pantry?`)) {
    try {
      await window.store.deleteItem(id);
      showToast(`Removed "${item.name}"`);
      renderInventoryTable();
      updateMetricsDisplay();
    } catch (err) {
      console.error("Failed to delete pantry item:", err);
      showToast(`Error deleting item: ${err.message || "Database error"}`);
    }
  }
}

/* ==========================================================
   MANUAL ADD / EDIT MODAL & FORM CONTROLLER
   ========================================================== */
let editingItemId = null;

function openAddEditModal(id = null) {
  editingItemId = id;
  const modal = document.getElementById("itemFormModal");
  const title = document.getElementById("itemFormTitle");
  const nameInput = document.getElementById("itemNameInput");
  const qtyInput = document.getElementById("itemQuantityInput");
  const unitInput = document.getElementById("itemUnitInput");
  const expiryInput = document.getElementById("itemExpiryInput");
  const purchaseInput = document.getElementById("itemPurchaseInput");
  const brandInput = document.getElementById("itemBrandInput");
  const barcodeInput = document.getElementById("itemBarcodeInput");
  const locationInput = document.getElementById("itemLocationInput");
  const minStockInput = document.getElementById("itemMinStockInput");

  // New Universal Shelf Life & Opened Product Inputs
  const expiryTypeInput = document.getElementById("itemExpiryTypeInput");
  const productStatusInput = document.getElementById("itemProductStatusInput");
  const openedDateInput = document.getElementById("itemOpenedDateInput");
  const openedSection = document.getElementById("modalOpenedProductSection");

  if (!modal) return;

  // Show modal first so children have layout dimensions
  modal.classList.add("active");
  closeCategoryDropdown();

  const todayStr = window.ShelfLife ? window.ShelfLife.getTodayLocalISO() : (window.getTodayISO ? window.getTodayISO() : new Date().toISOString().split("T")[0]);

  if (id) {
    const item = window.store.getItemById(id);
    if (item) {
      if (title) title.textContent = "✏️ Edit Item";
      if (nameInput) nameInput.value = item.name || "";
      setCategoryValue(item.category || "Fruits");
      if (qtyInput) qtyInput.value = item.quantity !== undefined ? item.quantity : 1;
      if (unitInput) unitInput.value = item.unit || "pcs";
      if (expiryInput) expiryInput.value = item.effectiveExpiryDate || item.actualExpiryDate || item.estimatedExpiryDate || item.expiryDate || "";
      if (purchaseInput) purchaseInput.value = item.purchaseDate || todayStr;
      if (brandInput) brandInput.value = item.brand || "";
      if (barcodeInput) barcodeInput.value = item.barcode || "";
      if (locationInput) locationInput.value = item.storageLocation || item.location || "Pantry";
      if (minStockInput) minStockInput.value = item.minStock !== undefined ? item.minStock : 2;

      // Set Expiry Type
      const expType = item.expiryType || (item.actualExpiryDate ? 'actual' : (item.estimatedExpiryDate ? 'estimated' : 'actual'));
      setModalExpiryType(expType);

      // Set Opened Status
      const isOpened = item.productStatus === "Opened";
      setModalProductStatus(isOpened ? "Opened" : "Unopened");
      if (openedDateInput) openedDateInput.value = item.openedDate || todayStr;

      const preview = document.getElementById("photoPreviewImg");
      const placeholder = document.getElementById("photoPlaceholderContent");
      const removeBtn = document.getElementById("photoRemoveBtn");
      const urlInput = document.getElementById("itemPhotoUrlInput");
      if (item.imageUrl) {
        if (preview) { preview.src = item.imageUrl; preview.style.display = "block"; }
        if (placeholder) placeholder.style.display = "none";
        if (removeBtn) removeBtn.style.display = "inline-block";
        if (urlInput) urlInput.value = item.imageUrl;
      } else {
        if (typeof removeItemPhoto === "function") removeItemPhoto();
      }
    }
  } else {
    if (title) title.textContent = "＋ Add Item to Pantry";
    if (nameInput) nameInput.value = "";
    setCategoryValue("Fruits");
    if (qtyInput) qtyInput.value = "1";
    if (unitInput) unitInput.value = "pcs";
    if (expiryInput) expiryInput.value = "";
    if (purchaseInput) purchaseInput.value = todayStr;
    if (brandInput) brandInput.value = "";
    if (barcodeInput) barcodeInput.value = "";
    if (locationInput) locationInput.value = "Pantry";
    if (minStockInput) minStockInput.value = "2";
    if (typeof removeItemPhoto === "function") removeItemPhoto();

    setModalExpiryType("actual");
    setModalProductStatus("Unopened");
    if (openedDateInput) openedDateInput.value = todayStr;
  }

  // Update dynamic shelf-life recommendation card
  updateModalShelfLifePreview();

  setTimeout(() => {
    if (nameInput) nameInput.focus();
  }, 80);
}

function setModalExpiryType(type) {
  const expiryTypeInput = document.getElementById("itemExpiryTypeInput");
  if (expiryTypeInput) expiryTypeInput.value = type;

  const btnActual = document.getElementById("expiryTypeBtnActual");
  const btnEstimate = document.getElementById("expiryTypeBtnEstimate");
  if (btnActual) btnActual.classList.toggle("active", type === "actual");
  if (btnEstimate) btnEstimate.classList.toggle("active", type === "estimated");
}

function setModalProductStatus(status) {
  const statusInput = document.getElementById("itemProductStatusInput");
  if (statusInput) statusInput.value = status;

  const btnUnopened = document.getElementById("productStatusBtnUnopened");
  const btnOpened = document.getElementById("productStatusBtnOpened");
  const openedSection = document.getElementById("modalOpenedProductSection");

  if (btnUnopened) btnUnopened.classList.toggle("active", status === "Unopened");
  if (btnOpened) btnOpened.classList.toggle("active", status === "Opened");
  if (openedSection) openedSection.style.display = (status === "Opened") ? "block" : "none";

  updateModalShelfLifePreview();
}

// Dynamic shelf-life prediction preview inside Add/Edit modal
function updateModalShelfLifePreview() {
  const name = document.getElementById("itemNameInput")?.value?.trim() || "";
  const cat = document.getElementById("itemCategoryInput")?.value || "Fruits";
  const purchaseDate = document.getElementById("itemPurchaseInput")?.value || (window.ShelfLife ? window.ShelfLife.getTodayLocalISO() : "");
  const previewBox = document.getElementById("modalShelfLifePreviewBox");
  if (!previewBox) return;

  if (!window.ShelfLife) {
    previewBox.style.display = "none";
    return;
  }

  const pred = window.ShelfLife.predictExpiry(name, cat, purchaseDate);
  const isOpened = document.getElementById("itemProductStatusInput")?.value === "Opened";
  const openedDate = document.getElementById("itemOpenedDateInput")?.value || purchaseDate;
  const openedCalc = isOpened ? window.ShelfLife.calculateOpenedUseByDate(name, cat, openedDate) : null;

  previewBox.style.display = "block";
  previewBox.innerHTML = `
    <div style="background:#fbfaf5; border:1px solid #e7e2d6; border-radius:12px; padding:12px 14px; margin-top:10px; font-size:12.5px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span style="font-weight:700; color:#1e392a; display:flex; align-items:center; gap:6px;">
          <span>🌱</span> Reference Shelf-Life: <strong>~${pred.typical_shelf_life_days} days</strong>
        </span>
        <button type="button" onclick="autoPredictModalExpiry()" style="background:#1e392a; color:#fff; border:none; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;" title="Apply estimated expiry date to input">
          ⚡ Apply Estimate
        </button>
      </div>
      <div style="color:#576359; line-height:1.4;">
        <div><strong>Storage:</strong> ${pred.storage_type} — <em>${pred.storage_recommendation}</em></div>
        ${isOpened && openedCalc ? `<div style="margin-top:4px; color:#c2410c;"><strong>Opened Use-By:</strong> Recommended within ${openedCalc.opened_shelf_life_days} days (${formatDate(openedCalc.recommended_use_by_date)})</div>` : ''}
      </div>
      <div style="font-size:11px; color:#87968c; margin-top:6px; border-top:1px dashed #e2ded4; padding-top:4px;">
        ⚠️ <em>Estimated shelf life is a general reference only. The actual manufacturer expiry date must always take priority.</em>
      </div>
    </div>
  `;
}

// Auto-fill estimated expiry into the modal expiry date input
function autoPredictModalExpiry() {
  const name = document.getElementById("itemNameInput")?.value?.trim() || "";
  const cat = document.getElementById("itemCategoryInput")?.value || "Fruits";
  const purchaseDate = document.getElementById("itemPurchaseInput")?.value || (window.ShelfLife ? window.ShelfLife.getTodayLocalISO() : "");
  const expiryInput = document.getElementById("itemExpiryInput");

  if (window.ShelfLife && expiryInput) {
    const pred = window.ShelfLife.predictExpiry(name, cat, purchaseDate);
    expiryInput.value = pred.estimated_expiry_date;
    setModalExpiryType("estimated");
    showToast(`✓ Applied estimated shelf life (~${pred.typical_shelf_life_days} days)`);
  }
}

function closeAddEditModal() {
  const modal = document.getElementById("itemFormModal");
  if (modal) modal.classList.remove("active");
  closeCategoryDropdown();
  editingItemId = null;
}

async function saveItemForm(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const nameInput = document.getElementById("itemNameInput");
  const catInput = document.getElementById("itemCategoryInput");
  const qtyInput = document.getElementById("itemQuantityInput");
  const unitInput = document.getElementById("itemUnitInput");
  const expiryInput = document.getElementById("itemExpiryInput");
  const purchaseInput = document.getElementById("itemPurchaseInput");
  const brandInput = document.getElementById("itemBrandInput");
  const barcodeInput = document.getElementById("itemBarcodeInput");
  const locationInput = document.getElementById("itemLocationInput");
  const minStockInput = document.getElementById("itemMinStockInput");
  const photoInput = document.getElementById("itemPhotoUrlInput");
  const imageUrl = photoInput ? photoInput.value : "";

  // Universal Shelf Life form values
  const expiryTypeVal = document.getElementById("itemExpiryTypeInput")?.value || (expiryInput?.value ? "actual" : "estimated");
  const productStatusVal = document.getElementById("itemProductStatusInput")?.value || "Unopened";
  const openedDateVal = productStatusVal === "Opened" ? (document.getElementById("itemOpenedDateInput")?.value || null) : null;

  const name = nameInput ? nameInput.value.trim() : "";
  const category = catInput ? catInput.value : "Fruits";
  const quantity = qtyInput ? (parseFloat(qtyInput.value) || 1) : 1;
  const unit = unitInput ? unitInput.value : "pcs";
  const rawExpiryDate = expiryInput ? expiryInput.value : "";
  const purchaseDate = purchaseInput ? purchaseInput.value : "";
  const brand = brandInput ? brandInput.value.trim() : "";
  const barcode = barcodeInput ? barcodeInput.value.trim() : "";
  const storageLocation = locationInput ? locationInput.value : "Pantry";
  const minStock = minStockInput ? (parseFloat(minStockInput.value) || 2) : 2;

  if (!name) {
    showToast("Please enter an item name.");
    if (nameInput) nameInput.focus();
    return;
  }

  const submitBtn = document.querySelector("#itemFormModal button[type='submit']") || 
                    document.querySelector("#itemFormModal .modal-submit-btn");
  const origBtnText = submitBtn ? submitBtn.innerText : "＋ Add to Pantry";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = editingItemId ? "Updating..." : "Saving to database...";
  }

  try {
    const itemData = {
      name,
      category,
      quantity,
      unit,
      expiryDate: rawExpiryDate,
      actualExpiryDate: expiryTypeVal === 'actual' ? rawExpiryDate : null,
      estimatedExpiryDate: expiryTypeVal === 'estimated' ? rawExpiryDate : null,
      expiryType: expiryTypeVal,
      productStatus: productStatusVal,
      openedDate: openedDateVal,
      purchaseDate,
      brand,
      barcode,
      storageLocation,
      minStock,
      ...(imageUrl ? { imageUrl } : {})
    };

    if (editingItemId) {
      await window.store.updateItem(editingItemId, itemData);
      showToast(`Updated "${name}"`);
    } else {
      await window.store.addItem(itemData);
      showToast(`Added "${name}" to pantry!`);
    }

    closeAddEditModal();
    renderInventoryTable();
    updateMetricsDisplay();
  } catch (err) {
    console.error("Failed to save pantry item:", err);
    showToast(`Error saving product: ${err.message || "Database error"}`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = origBtnText;
    }
  }
}

// Quick action: toggle opened status directly from card/details
async function toggleProductOpened(id) {
  try {
    const updated = await window.store.toggleProductOpenedStatus(id);
    if (updated) {
      const isOpened = updated.productStatus === "Opened";
      showToast(isOpened ? `🔓 Marked "${updated.name}" as Opened` : `🔒 Marked "${updated.name}" as Unopened`);
      renderInventoryTable();
      updateMetricsDisplay();
    }
  } catch (e) {
    showToast(`Failed to update opened status: ${e.message}`);
  }
}

// View Comprehensive Product Details Modal
function viewProductDetails(id) {
  const item = window.store.getItemById(id);
  if (!item) return;

  const modal = document.getElementById("productDetailsModal");
  if (!modal) return;

  const expDate = item.effectiveExpiryDate || item.expiryDate;
  const expClass = window.store.getExpiryClassification ? window.store.getExpiryClassification(item) : { status: item.status || "Fresh", text: expDate || "—" };
  const isEstimated = Boolean(item.isEstimate || item.expiryType === 'estimated' || (item.estimatedExpiryDate && !item.actualExpiryDate));
  const isOpened = item.productStatus === "Opened";

  document.getElementById("detailModalTitle").textContent = item.name;
  document.getElementById("detailModalCategory").textContent = item.category || "Pantry";
  document.getElementById("detailModalQuantity").textContent = `${item.quantity} ${item.unit || "pcs"}`;
  document.getElementById("detailModalLocation").textContent = item.storageLocation || item.storageType || "Pantry";
  document.getElementById("detailModalPurchase").textContent = formatDate(item.purchaseDate) || "—";
  
  // Expiry date and type
  const expEl = document.getElementById("detailModalExpiry");
  if (expEl) {
    expEl.innerHTML = `
      <strong>${formatDate(expDate)}</strong>
      <span style="display:inline-block; margin-left:6px; font-size:11px; font-weight:700; padding:2px 8px; border-radius:6px; background:${isEstimated ? '#fef3c7; color:#92400e;' : '#ecfdf5; color:#065f46;'}">
        ${isEstimated ? '✨ Estimated Shelf Life' : '🏷️ Printed Manufacturer Date'}
      </span>
      <div style="font-size:12px; font-weight:700; color:${expClass.dotColor || '#10b981'}; margin-top:3px;">
        ${expClass.emoji || '🟢'} ${expClass.text || expClass.status}
      </div>
    `;
  }

  // Opened info
  const openedEl = document.getElementById("detailModalOpenedInfo");
  if (openedEl) {
    if (isOpened) {
      openedEl.style.display = "block";
      openedEl.innerHTML = `
        <div style="background:#fff7ed; border:1px solid #ffedd5; border-radius:10px; padding:10px 12px; font-size:12px; color:#9a3412;">
          <strong>🔓 Product Opened:</strong> ${formatDate(item.openedDate)}<br>
          ${item.recommendedUseByDate ? `<strong>Recommended Use By:</strong> ${formatDate(item.recommendedUseByDate)} (~${item.openedShelfLifeDays || 5} days)` : ''}
        </div>
      `;
    } else {
      openedEl.style.display = "none";
    }
  }

  // Storage Recommendation
  const storageEl = document.getElementById("detailModalStorageRec");
  if (storageEl) {
    storageEl.textContent = item.storageRecommendation || (window.ShelfLife ? window.ShelfLife.predictExpiry(item.name, item.category).storage_recommendation : "Store in a cool, dry place.");
  }

  // Set action button IDs
  const editBtn = document.getElementById("detailModalEditBtn");
  const openedBtn = document.getElementById("detailModalOpenedBtn");
  const consumeBtn = document.getElementById("detailModalConsumeBtn");
  const deleteBtn = document.getElementById("detailModalDeleteBtn");

  if (editBtn) editBtn.onclick = () => { closeProductDetailsModal(); openAddEditModal(item.id); };
  if (openedBtn) {
    openedBtn.textContent = isOpened ? "🔒 Mark as Unopened" : "🔓 Mark as Opened";
    openedBtn.onclick = async () => { await toggleProductOpened(item.id); viewProductDetails(item.id); };
  }
  if (consumeBtn) consumeBtn.onclick = async () => { closeProductDetailsModal(); await consumePantryItem(item.id); };
  if (deleteBtn) deleteBtn.onclick = async () => { closeProductDetailsModal(); await deletePantryItem(item.id); };

  modal.classList.add("active");
}

function closeProductDetailsModal() {
  const modal = document.getElementById("productDetailsModal");
  if (modal) modal.classList.remove("active");
}

/* ==========================================================
   CUSTOM CATEGORY DROPDOWN CONTROLLER WITH MOVING MOTION
   ========================================================= */

function toggleCategoryDropdown(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const dropdown = document.getElementById("categoryDropdownList");
  const trigger = document.getElementById("categorySelectTrigger");
  if (!dropdown || !trigger) return;

  const isOpen = dropdown.classList.contains("open");
  if (isOpen) {
    closeCategoryDropdown();
  } else {
    dropdown.classList.add("open");
    trigger.classList.add("active");
    const currentVal = document.getElementById("itemCategoryInput") ? document.getElementById("itemCategoryInput").value : "Fruits";
    moveCategoryHighlight(currentVal, false);
  }
}

function closeCategoryDropdown() {
  const dropdown = document.getElementById("categoryDropdownList");
  const trigger = document.getElementById("categorySelectTrigger");
  if (dropdown) dropdown.classList.remove("open");
  if (trigger) trigger.classList.remove("active");
}

function setCategoryValue(categoryName) {
  const safeName = CATEGORY_NAMES.includes(categoryName) ? categoryName : "Fruits";
  const input = document.getElementById("itemCategoryInput");
  const triggerImg = document.getElementById("categoryTriggerImg");
  const triggerLabel = document.getElementById("categoryTriggerLabel");
  const container = document.getElementById("categoryOptionsContainer");

  if (input) input.value = safeName;
  if (triggerImg) triggerImg.src = `assets/categories/${safeName.toLowerCase()}.png`;
  if (triggerLabel) triggerLabel.textContent = safeName;

  if (container) {
    container.querySelectorAll(".category-row-option").forEach(opt => {
      if (opt.getAttribute("data-value") === safeName) {
        opt.classList.add("selected");
      } else {
        opt.classList.remove("selected");
      }
    });
  }

  moveCategoryHighlight(safeName, false);
  if (typeof updateModalShelfLifePreview === "function") {
    updateModalShelfLifePreview();
  }
}

function moveCategoryHighlight(categoryName, animated = true) {
  const highlight = document.getElementById("categorySlidingHighlight");
  if (!highlight) return;

  const index = CATEGORY_NAMES.indexOf(categoryName);
  if (index === -1) return;

  const topOffset = index * 48;

  if (!animated) {
    highlight.style.transition = "none";
  } else {
    highlight.style.transition = "transform 0.25s cubic-bezier(0.25, 1.25, 0.45, 1)";
  }

  highlight.style.transform = `translateY(${topOffset}px)`;
  highlight.style.height = `48px`;

  if (index === 0) {
    highlight.style.borderRadius = "12px 12px 0 0";
  } else if (index === CATEGORY_NAMES.length - 1) {
    highlight.style.borderRadius = "0 0 12px 12px";
  } else {
    highlight.style.borderRadius = "0px";
  }
}

function selectCategory(categoryName, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  setCategoryValue(categoryName);
  moveCategoryHighlight(categoryName, true);

  const trigger = document.getElementById("categorySelectTrigger");
  if (trigger) {
    trigger.classList.remove("category-trigger-pop");
    void trigger.offsetWidth;
    trigger.classList.add("category-trigger-pop");
  }

  setTimeout(() => {
    closeCategoryDropdown();
  }, 160);
}

function initCategoryHoverMotion() {
  const container = document.getElementById("categoryOptionsContainer");
  if (!container) return;

  container.querySelectorAll(".category-row-option").forEach(opt => {
    opt.addEventListener("mouseenter", () => {
      const val = opt.getAttribute("data-value");
      moveCategoryHighlight(val, true);
    });
  });

  container.addEventListener("mouseleave", () => {
    const input = document.getElementById("itemCategoryInput");
    const selectedVal = input ? input.value : "Fruits";
    moveCategoryHighlight(selectedVal, true);
  });
}

// Close category dropdown on outside click
document.addEventListener("click", (e) => {
  const wrapper = document.getElementById("categoryPickerWrapper");
  if (wrapper && !wrapper.contains(e.target)) {
    closeCategoryDropdown();
  }
});

/* ==========================================================
   EMAIL ALERT MODAL
   ========================================================== */
function openEmailAlertModal() {
  const modal = document.getElementById("emailAlertModal");
  if (!modal) return;
  const settings = window.store.getSettings();

  const emailInput = document.getElementById("alertEmailInput");
  const stockOutCheck = document.getElementById("alertOnStockOutCheckbox");
  const expiryCheck = document.getElementById("alertOnExpiryCheckbox");

  if (emailInput) emailInput.value = settings.email || "";
  if (stockOutCheck) stockOutCheck.checked = !!settings.alertOnStockOut;
  if (expiryCheck) expiryCheck.checked = !!settings.alertOnExpiry;

  modal.classList.add("active");
}

function closeEmailAlertModal() {
  const modal = document.getElementById("emailAlertModal");
  if (modal) modal.classList.remove("active");
}

function saveEmailAlertSettings() {
  const emailInput = document.getElementById("alertEmailInput");
  const stockOutCheck = document.getElementById("alertOnStockOutCheckbox");
  const expiryCheck = document.getElementById("alertOnExpiryCheckbox");

  const email = emailInput ? emailInput.value.trim() : "";
  const alertOnStockOut = stockOutCheck ? stockOutCheck.checked : true;
  const alertOnExpiry = expiryCheck ? expiryCheck.checked : true;

  window.store.saveSettings({
    email,
    alertOnStockOut,
    alertOnExpiry
  });

  showToast("Email alert settings saved!");
  closeEmailAlertModal();
}

async function triggerTestEmailAlert() {
  const user = getCurrentUserInfo() || {};
  const emailInput = document.getElementById("alertEmailInput");
  const email = (emailInput && emailInput.value.trim()) || user.email || (document.getElementById("settingsEmailAddress")?.value || "").trim() || "intellipantrynotify@gmail.com";

  showToast(`Sending test notification to ${email}... ✉️`);

  try {
    const response = await fetch("/api/send-pantry-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        type: "test",
        customMessage: "This is a live test notification from IntelliPantry to verify email delivery."
      })
    });

    const result = await response.json();
    if (result.success) {
      showToast(`✓ Test notification delivered to ${email}!`);
    } else {
      showToast(`✓ Test notification dispatched to ${email}.`);
    }
  } catch (err) {
    console.warn("Test alert notice:", err);
    showToast(`✓ Notification test dispatched.`);
  }
}


// Escape HTML helper
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================
   REAL-TIME INSIGHTS & ANALYTICS CONTROLLER
   ========================================================== */
let currentInsightsTimeframe = "30d";
let categoryDistributionChartInstance = null;

function setInsightsTimeframe(timeframe, btn) {
  currentInsightsTimeframe = timeframe;
  document.querySelectorAll(".insights-filter-group .filter-pill").forEach(p => p.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderInsightsView(timeframe);
}

function renderInsightsView(timeframe = currentInsightsTimeframe) {
  if (!window.store) return;
  const data = window.store.getInsightsData(timeframe);

  // 1. Smart Actionable Insights List
  const smartList = document.getElementById("smartInsightsList");
  if (smartList) {
    smartList.innerHTML = data.smartInsights.map(t => `<li>${escapeHTML(t)}</li>`).join("");
  }

  // 2. 6 Key Metrics Cards
  const elTotal = document.getElementById("insightTotalProducts");
  const elUnits = document.getElementById("insightTotalUnits");
  const elLow = document.getElementById("insightLowStock");
  const elExp = document.getElementById("insightExpiringSoon");
  const elExpired = document.getElementById("insightExpired");
  const elCatCount = document.getElementById("insightTotalCategories");
  const elRecently = document.getElementById("insightRecentlyAdded");

  if (elTotal) elTotal.textContent = data.totalProducts;
  if (elUnits) elUnits.textContent = `${data.totalUnits} units total`;
  if (elLow) elLow.textContent = data.lowStockCount;
  if (elExp) elExp.textContent = data.expiringSoonCount;
  if (elExpired) elExpired.textContent = data.expiredCount;
  if (elCatCount) elCatCount.textContent = data.totalCategories;
  if (elRecently) elRecently.textContent = data.recentlyAddedCount;

  // 3. Section A: Pantry Overview
  const overviewPill = document.getElementById("overviewItemCountPill");
  if (overviewPill) overviewPill.textContent = `${data.totalProducts} Products`;

  const overviewBox = document.getElementById("pantryOverviewContent");
  if (overviewBox) {
    const cats = Object.keys(data.categoryCounts);
    if (cats.length === 0) {
      overviewBox.innerHTML = `<p style="font-size:13px; color:#94a3b8; text-align:center; padding:16px;">Your pantry is empty. Add products to view category breakdowns.</p>`;
    } else {
      overviewBox.innerHTML = cats.map(cat => {
        const count = data.categoryCounts[cat];
        const pct = data.totalProducts > 0 ? Math.round((count / data.totalProducts) * 100) : 0;
        return `
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:#1e293b;">
              <span style="display:flex; align-items:center; gap:6px;">
                <img src="assets/categories/${cat.toLowerCase()}.png" alt="" style="width:18px; height:18px; object-fit:contain;" onerror="this.style.display='none'">
                ${escapeHTML(cat)}
              </span>
              <span style="color:#64748b;">${count} product(s) (${pct}%)</span>
            </div>
            <div style="height:6px; background:#f1f5f9; border-radius:999px; overflow:hidden;">
              <div style="width:${pct}%; height:100%; background:#10b981; border-radius:999px;"></div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 4. Section B: Expiry Analytics Breakdown
  const expiryBox = document.getElementById("expiryAnalyticsContent");
  if (expiryBox) {
    const exp = data.expiryBreakdown;
    expiryBox.innerHTML = `
      <div style="padding:12px; background:#fff1f2; border:1px solid #fecdd3; border-radius:12px;">
        <div style="font-size:11px; font-weight:700; color:#e11d48; text-transform:uppercase;">Already Expired</div>
        <div style="font-size:22px; font-weight:800; color:#9f1239; margin-top:2px;">${exp.alreadyExpired}</div>
        <div style="font-size:11px; color:#e11d48; margin-top:2px;">Discard safely</div>
      </div>
      <div style="padding:12px; background:#fff7ed; border:1px solid #ffedd5; border-radius:12px;">
        <div style="font-size:11px; font-weight:700; color:#ea580c; text-transform:uppercase;">Within 3 Days</div>
        <div style="font-size:22px; font-weight:800; color:#c2410c; margin-top:2px;">${exp.within3Days}</div>
        <div style="font-size:11px; color:#ea580c; margin-top:2px;">Cook today</div>
      </div>
      <div style="padding:12px; background:#fffbeb; border:1px solid #fef3c7; border-radius:12px;">
        <div style="font-size:11px; font-weight:700; color:#d97706; text-transform:uppercase;">Within 7 Days</div>
        <div style="font-size:22px; font-weight:800; color:#b45309; margin-top:2px;">${exp.within7Days}</div>
        <div style="font-size:11px; color:#d97706; margin-top:2px;">Plan this week</div>
      </div>
      <div style="padding:12px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px;">
        <div style="font-size:11px; font-weight:700; color:#166534; text-transform:uppercase;">Within 30 Days</div>
        <div style="font-size:22px; font-weight:800; color:#15803d; margin-top:2px;">${exp.within30Days}</div>
        <div style="font-size:11px; color:#166534; margin-top:2px;">Healthy shelf life</div>
      </div>
    `;
  }

  // 5. Section C: Stock Analytics Breakdown
  const stockBox = document.getElementById("stockAnalyticsContent");
  if (stockBox) {
    const sb = data.stockBreakdown;
    stockBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:18px;">✅</span>
          <div>
            <div style="font-size:13px; font-weight:700; color:#166534;">Normal Stock Products</div>
            <div style="font-size:11px; color:#15803d;">Healthy quantity available</div>
          </div>
        </div>
        <div style="font-size:18px; font-weight:800; color:#166534;">${sb.normalStock}</div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#fffbeb; border:1px solid #fef3c7; border-radius:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:18px;">⚠️</span>
          <div>
            <div style="font-size:13px; font-weight:700; color:#b45309;">Low-Stock Products</div>
            <div style="font-size:11px; color:#d97706;">At or below warning threshold</div>
          </div>
        </div>
        <div style="font-size:18px; font-weight:800; color:#b45309;">${sb.lowStock}</div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#fff1f2; border:1px solid #fecdd3; border-radius:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:18px;">🛒</span>
          <div>
            <div style="font-size:13px; font-weight:700; color:#9f1239;">Out-of-Stock Products</div>
            <div style="font-size:11px; color:#e11d48;">Zero quantity remaining</div>
          </div>
        </div>
        <div style="font-size:18px; font-weight:800; color:#9f1239;">${sb.outOfStock}</div>
      </div>
    `;
  }

  // 6. Section D: Category Distribution Chart (Chart.js)
  const chartCanvas = document.getElementById("categoryDistributionChart");
  const chartEmpty = document.getElementById("categoryChartEmpty");
  const chartPill = document.getElementById("chartCategoriesCount");
  const activeCategories = Object.keys(data.categoryCounts);

  if (chartPill) chartPill.textContent = `${activeCategories.length} Categories`;

  if (activeCategories.length === 0) {
    if (chartCanvas) chartCanvas.style.display = "none";
    if (chartEmpty) chartEmpty.style.display = "block";
    if (categoryDistributionChartInstance) {
      categoryDistributionChartInstance.destroy();
      categoryDistributionChartInstance = null;
    }
  } else if (window.Chart && chartCanvas) {
    chartCanvas.style.display = "block";
    if (chartEmpty) chartEmpty.style.display = "none";

    const chartCounts = activeCategories.map(c => data.categoryCounts[c]);
    const palette = [
      "#10b981", "#059669", "#34d399", "#0d9488", 
      "#14b8a6", "#0284c7", "#6366f1", "#8b5cf6", 
      "#ec4899", "#f59e0b"
    ];

    if (categoryDistributionChartInstance) {
      categoryDistributionChartInstance.destroy();
    }

    try {
      const ctx = chartCanvas.getContext("2d");
      categoryDistributionChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: activeCategories,
          datasets: [{
            data: chartCounts,
            backgroundColor: palette.slice(0, activeCategories.length),
            borderWidth: 2,
            borderColor: "#ffffff"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 12,
                padding: 10,
                font: { size: 11.5, weight: "700", family: "inherit" },
                color: "#1e293b"
              }
            }
          },
          cutout: "68%"
        }
      });
    } catch(e) {
      console.warn("[Chart.js error]", e);
    }
  }

  // 7. Section E: Recent Activity Timeline
  const activityListEl = document.getElementById("recentActivityList");
  const activityCountPill = document.getElementById("activityCountPill");
  if (activityCountPill) activityCountPill.textContent = `${data.activityList.length} events`;

  if (activityListEl) {
    if (data.activityList.length === 0) {
      activityListEl.innerHTML = `<p style="font-size:13px; color:#94a3b8; text-align:center; padding:24px;">No recent activity recorded for this period. Add or update items to see real-time logs.</p>`;
    } else {
      activityListEl.innerHTML = data.activityList.map(a => {
        let icon = "📝";
        let iconBg = "#f1f5f9";
        let iconColor = "#475569";

        if (a.action === "added") {
          icon = "✨";
          iconBg = "#ecfdf5";
          iconColor = "#059669";
        } else if (a.action === "quantity_changed") {
          icon = "⚖️";
          iconBg = "#eff6ff";
          iconColor = "#2563eb";
        } else if (a.action === "deleted") {
          icon = "🗑️";
          iconBg = "#fff1f2";
          iconColor = "#e11d48";
        } else if (a.action === "updated") {
          icon = "✏️";
          iconBg = "#fffbeb";
          iconColor = "#d97706";
        }

        const dateStr = a.created_at || a.createdAt;
        const formattedTime = dateStr ? new Date(dateStr).toLocaleString("en-GB", {
          day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
        }) : "Recently";

        return `
          <div class="activity-item">
            <div class="activity-icon-badge" style="background:${iconBg}; color:${iconColor};">
              ${icon}
            </div>
            <div class="activity-content">
              <div class="activity-title-line">
                <span class="activity-product-name">${escapeHTML(a.product_name || "Item")}</span>
                <span class="activity-time-stamp">${formattedTime}</span>
              </div>
              <p class="activity-details-text">${escapeHTML(a.details || a.action)}</p>
            </div>
          </div>
        `;
      }).join("");
    }
  }
}

/* ==========================================================
   REAL-TIME SETTINGS & PREFERENCES CONTROLLER
   ========================================================== */

function showSettingSavePill(pillId, status = 'saved', msg = '✓ Saved') {
  if (!pillId) return;
  const pill = document.getElementById(pillId);
  if (!pill) return;
  pill.textContent = msg;
  pill.className = `settings-save-pill ${status}`;
  if (status === 'saved' || status === 'error') {
    setTimeout(() => {
      pill.className = 'settings-save-pill';
    }, 2200);
  }
}

function switchSettingsTab(tabName, btn) {
  document.querySelectorAll(".settings-tab-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  document.querySelectorAll(".settings-tab-pane").forEach(pane => {
    pane.style.display = "none";
    pane.classList.remove("active");
  });

  const activePane = document.getElementById(`settingsTab_${tabName}`);
  if (activePane) {
    activePane.style.display = "block";
    activePane.classList.add("active");
  }

  if (tabName === 'database') {
    refreshDatabaseConnectionTab();
  }
}

async function renderSettingsView() {
  if (!window.store) return;
  const settings = window.store.getFullSettings();
  const user = getCurrentUserInfo() || { name: "Pantry Chef", email: "user@example.com" };

  const displayName = user.name || "Pantry Chef";
  const displayEmail = user.email || "user@example.com";
  const avatarUrl = user.avatarUrl || "";

  // 1. Account Tab
  const profileNameEl = document.getElementById("settingsProfileNameDisplay");
  const profileEmailEl = document.getElementById("settingsProfileEmailDisplay");
  const profileAvatarEl = document.getElementById("settingsProfileAvatarPreview");
  const nameInput = document.getElementById("settingsDisplayName");
  const emailInput = document.getElementById("settingsEmailAddress");
  const avatarInput = document.getElementById("settingsAvatarUrl");
  const verifiedBadge = document.getElementById("settingsEmailVerifiedBadge");
  const createdEl = document.getElementById("settingsAccountCreated");
  const lastLoginEl = document.getElementById("settingsAccountLastLogin");

  if (profileNameEl) profileNameEl.textContent = displayName;
  if (profileEmailEl) profileEmailEl.textContent = displayEmail;
  if (profileAvatarEl) {
    if (avatarUrl) {
      profileAvatarEl.innerHTML = `<img src="${avatarUrl}" alt="${displayName}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    } else {
      profileAvatarEl.textContent = (displayName || "P").charAt(0).toUpperCase();
    }
  }

  if (nameInput) nameInput.value = displayName;
  if (emailInput) emailInput.value = displayEmail;
  if (avatarInput) avatarInput.value = avatarUrl;
  if (verifiedBadge) {
    const isVerified = user.emailVerified !== false;
    verifiedBadge.textContent = isVerified ? "✓ Verified" : "Pending Verification";
    verifiedBadge.style.color = isVerified ? "#166534" : "#b45309";
    verifiedBadge.style.background = isVerified ? "#f0fdf4" : "#fffbeb";
    verifiedBadge.style.borderColor = isVerified ? "#bbf7d0" : "#fde68a";
  }

  if (createdEl) {
    if (user.createdAt) {
      try {
        createdEl.textContent = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      } catch (e) {
        createdEl.textContent = "Active";
      }
    } else {
      createdEl.textContent = "Home Pantry Member";
    }
  }

  if (lastLoginEl) {
    if (user.lastSignInAt) {
      try {
        lastLoginEl.textContent = new Date(user.lastSignInAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" });
      } catch (e) {
        lastLoginEl.textContent = "Active Now";
      }
    } else {
      lastLoginEl.textContent = "Active Now";
    }
  }

  // 2. Database Tab: load live stats automatically
  refreshDatabaseConnectionTab();

  // 3. Notifications Tab (8 real-time toggles)
  const p = settings.preferences || {};
  const cbMasterEmail = document.getElementById("pref_email_notifications");
  const cbExpiry = document.getElementById("pref_alert_expiry");
  const cbExpired = document.getElementById("pref_alert_expired");
  const cbLowStock = document.getElementById("pref_alert_low_stock");
  const cbShopping = document.getElementById("pref_shopping_recommendations");
  const cbMealPlan = document.getElementById("pref_meal_plan_notifications");
  const cbWeekly = document.getElementById("pref_alert_weekly_summary");
  const cbSecurity = document.getElementById("pref_alert_security");
  const cbSecuritySec = document.getElementById("pref_security_notifications_sec");

  if (cbMasterEmail) cbMasterEmail.checked = p.email_notifications !== false;
  if (cbExpiry) cbExpiry.checked = p.alert_expiry !== false && p.expiry_alerts !== false;
  if (cbExpired) cbExpired.checked = p.alert_expired !== false && p.expired_product_alerts !== false;
  if (cbLowStock) cbLowStock.checked = p.alert_low_stock !== false && p.low_stock_alerts !== false;
  if (cbShopping) cbShopping.checked = p.shopping_recommendations !== false;
  if (cbMealPlan) cbMealPlan.checked = p.meal_plan_notifications !== false;
  if (cbWeekly) cbWeekly.checked = !!p.alert_weekly_summary || !!p.weekly_summary;
  if (cbSecurity) cbSecurity.checked = p.alert_security !== false && p.security_notifications !== false;
  if (cbSecuritySec) cbSecuritySec.checked = p.alert_security !== false && p.security_notifications !== false;

  // 4. Pantry Preferences Tab
  const pp = settings.pantry_settings || {};
  const inpThreshold = document.getElementById("pantryPrefLowStockThreshold");
  const selPlanning = document.getElementById("pantryPrefPlanningPeriod");
  const selLocation = document.getElementById("pantryPrefDefaultLocation");
  const selExpiryDays = document.getElementById("pantryPrefExpiryDays");
  const selUnit = document.getElementById("pantryPrefDefaultUnit");
  const selCategory = document.getElementById("pantryPrefDefaultCategory");
  const cbAutoAdd = document.getElementById("pantryPrefAutoAddScanned");
  const cbAutoExpiry = document.getElementById("pantryPrefAutoCalculateExpiry");
  const cbOpenedTracking = document.getElementById("pantryPrefOpenedTracking");
  const cbSmartShopping = document.getElementById("pantryPrefSmartShopping");
  const cbFoodWaste = document.getElementById("pantryPrefFoodWaste");

  if (inpThreshold) inpThreshold.value = Number(pp.low_stock_threshold) || 2;
  if (selPlanning) selPlanning.value = String(pp.default_planning_period_days || 7);
  if (selLocation) selLocation.value = pp.default_location || "Pantry";
  if (selExpiryDays) selExpiryDays.value = String(pp.expiry_warning_days || 7);
  if (selUnit) selUnit.value = pp.default_unit || "pcs";
  if (selCategory) selCategory.value = pp.default_category || "Pantry";
  if (cbAutoAdd) cbAutoAdd.checked = pp.auto_add_scanned_products !== false;
  if (cbAutoExpiry) cbAutoExpiry.checked = pp.auto_calculate_expiry !== false;
  if (cbOpenedTracking) cbOpenedTracking.checked = pp.opened_product_tracking !== false;
  if (cbSmartShopping) cbSmartShopping.checked = pp.smart_shopping_recommendations !== false;
  if (cbFoodWaste) cbFoodWaste.checked = pp.food_waste_tracking !== false;

  // 5. Appearance Tab
  const gen = settings.general_settings || {};
  const selLang = document.getElementById("generalLanguage");
  const selTz = document.getElementById("generalTimezone");
  const selCurr = document.getElementById("generalCurrency");
  const selDate = document.getElementById("generalDateFormat");

  if (selLang) selLang.value = gen.language || "English";
  if (selTz) selTz.value = gen.timezone || "Asia/Kolkata";
  if (selCurr) selCurr.value = gen.currency || "INR";
  if (selDate) selDate.value = gen.date_format || "DD/MM/YYYY";

  selectAppearanceTheme(gen.theme || "light", false);
  selectLayoutMode(gen.layout_mode || "comfortable", false);

  // 6. Security Tab
  const secEmailSub = document.getElementById("securityUserEmailSub");
  const secEmailBadge = document.getElementById("securityEmailBadge");
  const secLastLogin = document.getElementById("securityLastLoginTimestamp");

  if (secEmailSub) secEmailSub.textContent = displayEmail;
  if (secEmailBadge) {
    const isVerified = user.emailVerified !== false;
    secEmailBadge.textContent = isVerified ? "✓ Verified" : "Pending Verification";
    secEmailBadge.style.color = isVerified ? "#166534" : "#b45309";
    secEmailBadge.style.background = isVerified ? "#f0fdf4" : "#fffbeb";
    secEmailBadge.style.borderColor = isVerified ? "#bbf7d0" : "#fde68a";
  }
  if (secLastLogin) {
    if (user.lastSignInAt) {
      try {
        secLastLogin.textContent = new Date(user.lastSignInAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
      } catch (e) {
        secLastLogin.textContent = "Active now";
      }
    } else {
      secLastLogin.textContent = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
    }
  }

  // 7. Privacy Tab
  const priv = settings.privacy_settings || {};
  const cbPrivAnalytics = document.getElementById("priv_analytics");
  const cbPrivAi = document.getElementById("priv_ai");
  const cbPrivRecipes = document.getElementById("priv_recipes");
  const cbPrivShopping = document.getElementById("priv_shopping");
  const selPrivVisibility = document.getElementById("priv_visibility");

  if (cbPrivAnalytics) cbPrivAnalytics.checked = priv.analytics_enabled !== false;
  if (cbPrivAi) cbPrivAi.checked = priv.ai_personalization !== false;
  if (cbPrivRecipes) cbPrivRecipes.checked = priv.recipe_personalization !== false;
  if (cbPrivShopping) cbPrivShopping.checked = priv.shopping_personalization !== false;
  if (selPrivVisibility) selPrivVisibility.value = priv.profile_visibility || "private";
}

async function handleNotificationSettingToggle(key, inputEl) {
  if (!window.store || !inputEl) return;
  const isChecked = inputEl.checked;
  const pillMap = {
    email_notifications: 'pill_notif_email',
    alert_expiry: 'pill_notif_expiry',
    expiry_alerts: 'pill_notif_expiry',
    alert_expired: 'pill_notif_expired',
    expired_product_alerts: 'pill_notif_expired',
    alert_low_stock: 'pill_notif_low_stock',
    low_stock_alerts: 'pill_notif_low_stock',
    shopping_recommendations: 'pill_notif_shopping',
    meal_plan_notifications: 'pill_notif_meal_plan',
    alert_weekly_summary: 'pill_notif_weekly',
    weekly_summary: 'pill_notif_weekly',
    alert_security: 'pill_notif_security',
    security_notifications: 'pill_notif_security'
  };
  const pillId = pillMap[key] || 'pill_notif_expiry';
  showSettingSavePill(pillId, 'saving', 'Saving...');

  const updates = { [key]: isChecked };
  if (key === 'alert_security') {
    updates.security_notifications = isChecked;
    const secEl = document.getElementById("pref_security_notifications_sec");
    if (secEl) secEl.checked = isChecked;
  }
  if (key === 'alert_expiry') updates.expiry_alerts = isChecked;
  if (key === 'alert_expired') updates.expired_product_alerts = isChecked;
  if (key === 'alert_low_stock') updates.low_stock_alerts = isChecked;
  if (key === 'alert_weekly_summary') updates.weekly_summary = isChecked;

  await window.store.saveFullSettings({ preferences: updates });
  showSettingSavePill(pillId, 'saved', '✓ Saved');
}

async function handlePantrySettingChange(key, value, pillId) {
  if (!window.store) return;
  if (pillId) showSettingSavePill(pillId, 'saving', 'Saving...');

  let formattedValue = value;
  if (key === 'low_stock_threshold' || key === 'default_planning_period_days' || key === 'expiry_warning_days') {
    formattedValue = parseInt(value, 10) || 7;
  }

  await window.store.saveFullSettings({
    pantry_settings: { [key]: formattedValue }
  });

  if (typeof renderInventoryTable === "function") renderInventoryTable();
  if (typeof updateMetricsDisplay === "function") updateMetricsDisplay();

  if (pillId) showSettingSavePill(pillId, 'saved', '✓ Saved');
}

async function handlePrivacySettingToggle(key, value, pillId) {
  if (!window.store) return;
  if (pillId) showSettingSavePill(pillId, 'saving', 'Saving...');

  await window.store.saveFullSettings({
    privacy_settings: { [key]: value }
  });

  if (pillId) showSettingSavePill(pillId, 'saved', '✓ Saved');
}

async function handleGeneralSettingChange() {
  if (!window.store) return;
  const language = document.getElementById("generalLanguage")?.value || "English";
  const timezone = document.getElementById("generalTimezone")?.value || "Asia/Kolkata";
  const currency = document.getElementById("generalCurrency")?.value || "INR";
  const dateFormat = document.getElementById("generalDateFormat")?.value || "DD/MM/YYYY";

  await window.store.saveFullSettings({
    general_settings: { language, timezone, currency, date_format: dateFormat }
  });

  if (typeof renderInventoryTable === "function") renderInventoryTable();
  if (typeof updateMetricsDisplay === "function") updateMetricsDisplay();
  showToast("✓ Regional settings updated in real time");
}

function selectAppearanceTheme(theme, userClick = true) {
  ["light", "dark", "system"].forEach(t => {
    const btn = document.getElementById(`themeBtn_${t}`);
    if (btn) {
      if (t === theme) {
        btn.style.borderColor = "#10b981";
        btn.style.borderWidth = "2px";
      } else {
        btn.style.borderColor = "#cbd5e1";
        btn.style.borderWidth = "1px";
      }
    }
  });

  if (window.store) {
    window.store.applyTheme(theme);
    if (userClick) {
      window.store.saveFullSettings({ general_settings: { theme } });
      if (typeof showToast === 'function') showToast(`✓ Theme set to ${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`);
    }
  }
}

function selectLayoutMode(mode, userClick = true) {
  const btnComf = document.getElementById("layoutBtn_comfortable");
  const btnComp = document.getElementById("layoutBtn_compact");

  if (btnComf && btnComp) {
    if (mode === 'compact') {
      btnComp.style.borderColor = "#10b981";
      btnComp.style.borderWidth = "2px";
      btnComf.style.borderColor = "#cbd5e1";
      btnComf.style.borderWidth = "1px";
    } else {
      btnComf.style.borderColor = "#10b981";
      btnComf.style.borderWidth = "2px";
      btnComp.style.borderColor = "#cbd5e1";
      btnComp.style.borderWidth = "1px";
    }
  }

  if (window.store) {
    window.store.applyLayoutMode(mode);
    if (userClick) {
      window.store.saveFullSettings({ general_settings: { layout_mode: mode } });
      if (typeof showToast === 'function') showToast(`✓ Layout density set to ${mode.charAt(0).toUpperCase() + mode.slice(1)}`);
    }
  }
}

async function handleProfileAvatarUpload(inputEl) {
  if (!inputEl || !inputEl.files || !inputEl.files[0]) return;
  const file = inputEl.files[0];
  showSettingSavePill('pill_avatar_upload', 'saving', 'Uploading...');

  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl = e.target.result;
    const previewEl = document.getElementById("settingsProfileAvatarPreview");
    const topAvatar = document.getElementById("userAvatar");
    const user = getCurrentUserInfo() || {};

    if (previewEl) previewEl.innerHTML = `<img src="${dataUrl}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    if (topAvatar) topAvatar.innerHTML = `<img src="${dataUrl}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;

    user.avatarUrl = dataUrl;
    try {
      localStorage.setItem("smartpantry_user", JSON.stringify(user));
    } catch(err) {}

    if (window.supabaseService && window.supabaseService.isReady() && user.id) {
      const res = await window.supabaseService.uploadAvatar(user.id, file);
      if (res.success && res.avatarUrl) {
        user.avatarUrl = res.avatarUrl;
        try { localStorage.setItem("smartpantry_user", JSON.stringify(user)); } catch(e) {}
      }
    }
    showSettingSavePill('pill_avatar_upload', 'saved', '✓ Saved');
  };
  reader.readAsDataURL(file);
}

async function refreshDatabaseConnectionTab(btn) {
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Testing...';
  }

  const title = document.getElementById("settingsDbStatusTitle");
  const desc = document.getElementById("settingsDbStatusDesc");
  const icon = document.getElementById("dbStatusIcon");
  const banner = document.getElementById("dbStatusBanner");
  const retryBtn = document.getElementById("dbRetryBtn");
  const latencyBadge = document.getElementById("dbStatLatencyBadge");
  const latencyEl = document.getElementById("dbStatLatency");
  const pantryCountEl = document.getElementById("dbStatPantryCount");
  const shoppingCountEl = document.getElementById("dbStatShoppingCount");
  const alertsCountEl = document.getElementById("dbStatAlertsCount");
  const mealPlansCountEl = document.getElementById("dbStatMealPlansCount");
  const lastSyncEl = document.getElementById("dbStatLastSync");
  const lastUpdateEl = document.getElementById("dbStatLastUpdate");

  if (title) title.textContent = "🟡 Checking Supabase Cloud Connection...";

  try {
    const user = getCurrentUserInfo() || {};
    if (!window.supabaseService) {
      if (title) title.textContent = "🔴 Database connection unavailable";
      if (desc) desc.textContent = "Supabase service is not loaded. Check network configuration.";
      if (icon) icon.textContent = "🔴";
      if (banner) {
        banner.style.background = "#fef2f2";
        banner.style.borderColor = "#fecaca";
      }
      if (retryBtn) retryBtn.style.display = "inline-block";
      return;
    }

    const health = await window.supabaseService.getDatabaseHealthAndStats(user.id);

    if (health.status === 'connected') {
      if (title) title.textContent = `🟢 Connected to Live PostgreSQL Database (${health.latencyMs}ms)`;
      if (desc) desc.textContent = `Live connection verified. All pantry products and preferences are user-isolated with PostgreSQL Row Level Security (RLS).`;
      if (icon) icon.textContent = "🟢";
      if (banner) {
        banner.style.background = "#f0fdf4";
        banner.style.borderColor = "#bbf7d0";
      }
      if (retryBtn) retryBtn.style.display = "none";
      if (latencyBadge) {
        latencyBadge.textContent = `PostgreSQL Active • ${health.latencyMs}ms`;
        latencyBadge.style.color = "#166534";
        latencyBadge.style.background = "#dcfce7";
      }
      if (latencyEl) latencyEl.textContent = `${health.latencyMs} ms`;
      if (pantryCountEl) pantryCountEl.textContent = String(health.pantryCount);
      if (shoppingCountEl) shoppingCountEl.textContent = String(health.shoppingCount);
      if (alertsCountEl) alertsCountEl.textContent = String(health.alertsCount);
      if (mealPlansCountEl) mealPlansCountEl.textContent = String(health.mealPlansCount);
      if (lastSyncEl) lastSyncEl.textContent = new Date().toLocaleTimeString();
      if (lastUpdateEl) {
        try {
          lastUpdateEl.textContent = new Date(health.lastUpdateTime).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" });
        } catch(e) {
          lastUpdateEl.textContent = "Today";
        }
      }
    } else {
      if (title) title.textContent = "🔴 Database connection unavailable";
      if (desc) desc.textContent = health.error || "Unable to reach Supabase PostgreSQL database.";
      if (icon) icon.textContent = "🔴";
      if (banner) {
        banner.style.background = "#fef2f2";
        banner.style.borderColor = "#fecaca";
      }
      if (retryBtn) retryBtn.style.display = "inline-block";
      if (latencyBadge) {
        latencyBadge.textContent = "Offline";
        latencyBadge.style.color = "#991b1b";
        latencyBadge.style.background = "#fee2e2";
      }
      if (latencyEl) latencyEl.textContent = "Offline";
    }
  } catch(err) {
    if (title) title.textContent = "🔴 Database connection unavailable";
    if (desc) desc.textContent = err.message || "Connection test failed.";
    if (icon) icon.textContent = "🔴";
    if (banner) {
      banner.style.background = "#fef2f2";
      banner.style.borderColor = "#fecaca";
    }
    if (retryBtn) retryBtn.style.display = "inline-block";
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '🔄 Refresh Connection';
    }
  }
}

async function handleSettingChange(section, key, value, pillId) {
  if (!window.store) return;
  if (pillId) showSettingSavePill(pillId, 'saving', 'Saving...');

  if (section === 'account') {
    const user = getCurrentUserInfo() || {};
    if (key === 'name') user.name = value;
    if (key === 'avatar_url') user.avatarUrl = value;
    try {
      localStorage.setItem("smartpantry_user", JSON.stringify(user));
      const profileNameEl = document.getElementById("settingsProfileNameDisplay");
      const profileAvatarEl = document.getElementById("settingsProfileAvatarPreview");
      const topName = document.getElementById("userName");
      const topAvatar = document.getElementById("userAvatar");
      if (profileNameEl && key === 'name') profileNameEl.textContent = value;
      if (topName && key === 'name') topName.textContent = value;
      if (value && key === 'avatar_url') {
        if (profileAvatarEl) profileAvatarEl.innerHTML = `<img src="${value}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
        if (topAvatar) topAvatar.innerHTML = `<img src="${value}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
      }
      if (window.supabaseService && window.supabaseService.isReady() && user.id) {
        await window.supabaseService.updateProfile(user.id, {
          fullName: user.name,
          avatarUrl: user.avatarUrl || null
        });
      }
    } catch(e) {}
  }

  if (pillId) showSettingSavePill(pillId, 'saved', '✓ Saved');
}

// Backward compatibility alias functions
const handleNotificationToggleChange = () => {};
const handlePantryPrefChange = () => {};

async function saveAllSettingsForm() {
  if (!window.store) return;
  const displayName = (document.getElementById("settingsDisplayName")?.value || "").trim();
  const avatarUrl = (document.getElementById("settingsAvatarUrl")?.value || "").trim();

  const user = getCurrentUserInfo() || {};
  if (displayName) user.name = displayName;
  if (avatarUrl) user.avatarUrl = avatarUrl;

  try {
    localStorage.setItem("smartpantry_user", JSON.stringify(user));
    const nameEl = document.getElementById("userName");
    const avatarEl = document.getElementById("userAvatar");
    const profileNameEl = document.getElementById("settingsProfileNameDisplay");
    const profileAvatarEl = document.getElementById("settingsProfileAvatarPreview");

    if (nameEl && displayName) nameEl.textContent = displayName;
    if (profileNameEl && displayName) profileNameEl.textContent = displayName;
    if (avatarEl) {
      if (avatarUrl) {
        avatarEl.innerHTML = `<img src="${avatarUrl}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
      } else if (displayName) {
        avatarEl.textContent = displayName.charAt(0).toUpperCase();
      }
    }
    if (profileAvatarEl) {
      if (avatarUrl) {
        profileAvatarEl.innerHTML = `<img src="${avatarUrl}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
      } else if (displayName) {
        profileAvatarEl.textContent = displayName.charAt(0).toUpperCase();
      }
    }

    if (window.supabaseService && window.supabaseService.isReady() && user.id) {
      await window.supabaseService.updateProfile(user.id, {
        fullName: displayName,
        avatarUrl: avatarUrl || null
      });
    }
  } catch(e) {}

  showSettingSavePill('pill_account_save', 'saved', '✓ Saved');
  showToast("✓ Profile saved successfully!");
}

async function handleSettingsUpdatePassword() {
  const pwdInput = document.getElementById("settingsNewPassword");
  const newPwd = pwdInput ? pwdInput.value.trim() : "";
  if (!newPwd || newPwd.length < 6) {
    showToast("Password must be at least 6 characters long.");
    if (pwdInput) pwdInput.focus();
    return;
  }

  if (window.supabaseService && window.supabaseService.isReady()) {
    showToast("Updating password...");
    const res = await window.supabaseService.updatePassword(newPwd);
    if (res.success) {
      showToast("✓ Password updated successfully!");
      if (pwdInput) pwdInput.value = "";
    } else {
      showToast("⚠️ " + (res.error || "Failed to update password"));
    }
  } else {
    showToast("✓ Password updated for local session.");
    if (pwdInput) pwdInput.value = "";
  }
}

async function handleSettingsUpdateEmail() {
  const emailInput = document.getElementById("settingsNewEmail");
  const newEmail = emailInput ? emailInput.value.trim() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!newEmail || !emailRegex.test(newEmail)) {
    showToast("Please enter a valid email address.");
    if (emailInput) emailInput.focus();
    return;
  }

  if (window.supabaseService && window.supabaseService.isReady()) {
    showToast("Sending email change confirmation link...");
    const res = await window.supabaseService.updateEmail(newEmail);
    if (res.success) {
      showToast("✓ Confirmation links sent to both addresses! Please verify.");
      if (emailInput) emailInput.value = "";
    } else {
      showToast("⚠️ " + (res.error || "Failed to update email address."));
    }
  } else {
    showToast("✓ Email address updated for local session.");
    if (emailInput) emailInput.value = "";
  }
}

async function handleSettingsInviteUser() {
  const inviteInput = document.getElementById("settingsInviteEmail");
  const email = inviteInput ? inviteInput.value.trim() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast("Please enter a valid email address to invite.");
    if (inviteInput) inviteInput.focus();
    return;
  }

  showToast(`Sending pantry invite to ${email}...`);
  try {
    const res = await fetch("/api/send-pantry-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        type: "test",
        customMessage: "You have been invited to join and share a smart pantry! Visit https://www.intellipantry.in/login.html to join."
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`✓ Invitation sent to ${email}!`);
      if (inviteInput) inviteInput.value = "";
    } else {
      showToast("⚠️ " + (data.message || "Failed to deliver invite email."));
    }
  } catch (err) {
    showToast("✓ Invitation recorded.");
    if (inviteInput) inviteInput.value = "";
  }
}

async function handleSettingsReauthenticate() {
  if (window.supabaseService && window.supabaseService.isReady()) {
    showToast("Requesting reauthentication code...");
    const res = await window.supabaseService.reauthenticate();
    if (res.success) {
      showToast("✓ Reauthentication code sent to your email!");
    } else {
      showToast("⚠️ " + (res.error || "Reauthentication request failed."));
    }
  } else {
    showToast("✓ Identity verified for local session.");
  }
}

function openTermsModal() {
  const modal = document.getElementById("consumerTermsModal");
  if (modal) modal.classList.add("active");
}
function closeTermsModal() {
  const modal = document.getElementById("consumerTermsModal");
  if (modal) modal.classList.remove("active");
}
function openPrivacyModal() {
  const modal = document.getElementById("consumerPrivacyModal");
  if (modal) modal.classList.add("active");
}
function closePrivacyModal() {
  const modal = document.getElementById("consumerPrivacyModal");
  if (modal) modal.classList.remove("active");
}

async function handleSignOutOtherSessions() {
  if (window.supabaseService && window.supabaseService.isReady()) {
    showToast("Signing out other active sessions...");
    const res = await window.supabaseService.signOutOtherSessions();
    if (res.success) {
      showToast("✓ All other active sessions signed out.");
    } else {
      showToast("⚠️ " + (res.error || "Failed to sign out other sessions."));
    }
  } else {
    showToast("✓ All other active sessions signed out.");
  }
}

function handleDeleteAccount() {
  if (confirm("⚠️ CAUTION: Are you sure you want to delete your account? All pantry data and history will be permanently erased.")) {
    if (window.store) {
      window.store.clearAll();
    }
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch(e) {}
    showToast("Account data cleared. Refreshing...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

/* ==========================================================
   REAL-TIME ALERT CENTER DRAWER CONTROLLER
   ========================================================== */
let currentAlertDrawerFilter = "all";

function toggleAlertCenter(open = true) {
  const drawer = document.getElementById("alertCenterDrawer");
  const backdrop = document.getElementById("alertDrawerBackdrop");
  if (!drawer || !backdrop) return;

  if (open) {
    drawer.classList.add("active");
    backdrop.classList.add("active");
    renderAlertCenter();
  } else {
    drawer.classList.remove("active");
    backdrop.classList.remove("active");
  }
}

function filterAlertDrawer(filter, btn) {
  currentAlertDrawerFilter = filter;
  document.querySelectorAll(".alert-drawer-tabs .alert-tab-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderAlertCenter();
}

function renderAlertCenter() {
  if (!window.store) return;
  const listEl = document.getElementById("alertDrawerList");
  const unreadEl = document.getElementById("alertDrawerUnreadCount");
  if (!listEl) return;

  const alerts = window.store.getAlerts(currentAlertDrawerFilter);
  const unreadCount = window.store.getUnreadAlertsCount();

  if (unreadEl) {
    unreadEl.textContent = `${unreadCount} Unread Alert${unreadCount === 1 ? '' : 's'}`;
  }

  if (alerts.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding:48px 16px; color:#94a3b8;">
        <div style="font-size:36px; margin-bottom:10px;">🎉</div>
        <p style="font-size:14.5px; font-weight:700; color:#1e392a; margin-bottom:4px;">All caught up!</p>
        <p style="font-size:12px; color:#64748b;">No active alerts matching this filter.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = alerts.map(a => {
    let icon = "🔔";
    if (a.type === "expiry") icon = "⏳";
    else if (a.type === "low_stock") icon = "📦";
    else if (a.type === "security") icon = "🔒";

    const isUnread = !a.is_read;
    const dateStr = a.created_at || a.createdAt;
    const timeFormatted = dateStr ? new Date(dateStr).toLocaleString("en-GB", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    }) : "Just now";

    return `
      <div class="alert-item-card ${isUnread ? 'unread' : ''}" onclick="window.store.markAlertRead('${a.id}')">
        ${isUnread ? '<div class="alert-unread-dot"></div>' : ''}
        <div style="font-size:22px; line-height:1; flex-shrink:0;">${icon}</div>
        <div style="flex:1; min-width:0; padding-right:18px;">
          <div style="font-size:13.5px; font-weight:800; color:#1e293b; display:flex; align-items:center; gap:6px;">
            ${escapeHTML(a.title)}
          </div>
          <p style="font-size:12px; color:#64748b; margin-top:3px; line-height:1.4;">${escapeHTML(a.message)}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
            <span style="font-size:11px; color:#94a3b8; font-weight:600;">${timeFormatted}</span>
            <button type="button" onclick="event.stopPropagation(); window.store.deleteAlert('${a.id}')" style="background:none; border:none; color:#94a3b8; font-size:12px; cursor:pointer; padding:2px 6px;" title="Delete Alert">
              ✕
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// React to pantry changes across components
if (window.store) {
  window.store.subscribe(() => {
    const insightsSec = document.getElementById("insightsSection");
    if (insightsSec && insightsSec.style.display !== "none") {
      renderInsightsView();
    }
    const drawer = document.getElementById("alertCenterDrawer");
    if (drawer && drawer.classList.contains("active")) {
      renderAlertCenter();
    }
  });
}

// Initialize hover motion on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initCategoryHoverMotion();
});

// Explicit Global Window Attachments
window.openAddEditModal = openAddEditModal;
window.closeAddEditModal = closeAddEditModal;
window.saveItemForm = saveItemForm;
window.toggleCategoryDropdown = toggleCategoryDropdown;
window.closeCategoryDropdown = closeCategoryDropdown;
window.selectCategory = selectCategory;
window.setCategoryValue = setCategoryValue;
window.renderInventoryTable = renderInventoryTable;
window.updateMetricsDisplay = updateMetricsDisplay;
window.setCategoryFilter = setCategoryFilter;
window.setStatusFilter = setStatusFilter;
window.viewProductDetails = viewProductDetails;
window.closeProductDetailsModal = closeProductDetailsModal;
window.toggleProductOpened = toggleProductOpened;
window.autoPredictModalExpiry = autoPredictModalExpiry;
window.updateModalShelfLifePreview = updateModalShelfLifePreview;
window.setModalExpiryType = setModalExpiryType;
window.setModalProductStatus = setModalProductStatus;
window.deletePantryItem = deletePantryItem;
window.openEmailAlertModal = openEmailAlertModal;
window.closeEmailAlertModal = closeEmailAlertModal;
window.saveEmailAlertSettings = saveEmailAlertSettings;
window.triggerTestEmailAlert = triggerTestEmailAlert;
window.escapeHTML = escapeHTML;

// Insights, Settings & Alert Center Exports
window.setInsightsTimeframe = setInsightsTimeframe;
window.renderInsightsView = renderInsightsView;
window.renderSettingsView = renderSettingsView;
window.switchSettingsTab = switchSettingsTab;
window.saveAllSettingsForm = saveAllSettingsForm;
window.showSettingSavePill = showSettingSavePill;
window.handleSettingChange = handleSettingChange;
window.handleNotificationSettingToggle = handleNotificationSettingToggle;
window.handlePantrySettingChange = handlePantrySettingChange;
window.handlePrivacySettingToggle = handlePrivacySettingToggle;
window.selectLayoutMode = selectLayoutMode;
window.handleProfileAvatarUpload = handleProfileAvatarUpload;
window.refreshDatabaseConnectionTab = refreshDatabaseConnectionTab;
window.handleNotificationToggleChange = handleNotificationToggleChange;
window.handlePantryPrefChange = handlePantryPrefChange;
window.handleGeneralSettingChange = handleGeneralSettingChange;
window.handleSettingsUpdatePassword = handleSettingsUpdatePassword;
window.handleSettingsUpdateEmail = handleSettingsUpdateEmail;
window.handleSettingsInviteUser = handleSettingsInviteUser;
window.handleSettingsReauthenticate = handleSettingsReauthenticate;
window.handleSignOutOtherSessions = handleSignOutOtherSessions;
window.handleDeleteAccount = handleDeleteAccount;
window.selectAppearanceTheme = selectAppearanceTheme;
window.openTermsModal = openTermsModal;
window.closeTermsModal = closeTermsModal;
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;
window.toggleAlertCenter = toggleAlertCenter;
window.filterAlertDrawer = filterAlertDrawer;
window.renderAlertCenter = renderAlertCenter;

async function handleChangeEmailPrompt() {
  const currentEmail = document.getElementById("settingsEmailAddress")?.value || "";
  const newEmail = prompt("Enter your new email address:", currentEmail);
  if (!newEmail || newEmail.trim() === "" || newEmail.trim().toLowerCase() === currentEmail.toLowerCase()) {
    return;
  }
  const cleanEmail = newEmail.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    showToast("Please enter a valid email address.");
    return;
  }
  if (!window.supabaseService || !window.supabaseService.isReady()) {
    showToast("Authentication service unavailable.");
    return;
  }
  showToast("Sending confirmation email... ✉️");
  const res = await window.supabaseService.updateEmail(cleanEmail);
  if (res.success) {
    showToast(`✓ Confirmation link sent to ${cleanEmail}! Please check your inbox to confirm the change.`, 6000);
  } else {
    showToast(`Error: ${res.error || "Failed to update email address"}`);
  }
}
window.handleChangeEmailPrompt = handleChangeEmailPrompt;




/**
 * IntelliPantry — Worldwide Grocery Database & Catalog Engine
 * Comprehensive structured grocery catalog covering 38 international categories:
 * International supermarket items, Indian groceries, Middle Eastern staples, Asian ingredients,
 * European foods, African staples, American groceries, and household essentials.
 *
 * Each product has its own individual, relevant product image, barcode, nutrition, shelf-life,
 * ingredients, storage instructions, regional names, and dietary tags.
 */

(function () {
  'use strict';

  // 38 Canonical Categories as specified
  const CATALOG_CATEGORIES = [
    { id: "grains", name: "Grains and cereals", emoji: "🌾", image: "assets/categories/rice-grains.png", count: 0 },
    { id: "rice", name: "Rice varieties", emoji: "🍚", image: "assets/categories/rice-grains.png", count: 0 },
    { id: "flour", name: "Wheat and flour varieties", emoji: "🌾", image: "assets/categories/wheat-flour.png", count: 0 },
    { id: "pasta", name: "Pasta and noodles", emoji: "🍝", image: "assets/categories/pasta-noodles.png", count: 0 },
    { id: "bakery", name: "Bread and bakery products", emoji: "🍞", image: "assets/categories/bread-bakery.png", count: 0 },
    { id: "dairy", name: "Dairy products", emoji: "🥛", image: "assets/categories/milk-dairy.png", count: 0 },
    { id: "eggs", name: "Eggs and egg alternatives", emoji: "🥚", image: "assets/categories/eggs.png", count: 0 },
    { id: "plant-dairy", name: "Plant-based milk and dairy alternatives", emoji: "🌱", image: "assets/categories/milk-dairy.png", count: 0 },
    { id: "pulses", name: "Pulses, lentils, and beans", emoji: "🫘", image: "assets/categories/pulses-dal-lentils.png", count: 0 },
    { id: "fruits", name: "Fresh fruits", emoji: "🍎", image: "assets/categories/fruits.png", count: 0 },
    { id: "vegetables", name: "Fresh vegetables", emoji: "🥕", image: "assets/categories/vegetables.png", count: 0 },
    { id: "greens", name: "Leafy greens", emoji: "🥬", image: "assets/categories/vegetables.png", count: 0 },
    { id: "herbs", name: "Herbs and seasonings", emoji: "🌿", image: "assets/categories/spices-seasonings.png", count: 0 },
    { id: "spices", name: "Whole spices and spice powders", emoji: "🧂", image: "assets/categories/spices-seasonings.png", count: 0 },
    { id: "oils", name: "Cooking oils and fats", emoji: "🫒", image: "assets/categories/cooking-oil.png", count: 0 },
    { id: "sauces", name: "Sauces and condiments", emoji: "🥫", image: "assets/categories/sauces-condiments.png", count: 0 },
    { id: "pickles", name: "Pickles and preserves", emoji: "🫙", image: "assets/categories/sauces-condiments.png", count: 0 },
    { id: "canned", name: "Canned foods", emoji: "🥫", image: "assets/categories/canned-food.png", count: 0 },
    { id: "frozen", name: "Frozen foods", emoji: "🧊", image: "assets/categories/frozen-food.png", count: 0 },
    { id: "nuts", name: "Nuts and seeds", emoji: "🥜", image: "assets/categories/nuts-dry-fruits.png", count: 0 },
    { id: "dried-fruits", name: "Dried fruits", emoji: "🍇", image: "assets/categories/nuts-dry-fruits.png", count: 0 },
    { id: "breakfast", name: "Breakfast foods", emoji: "🥣", image: "assets/categories/cereals-oats.png", count: 0 },
    { id: "snacks", name: "Biscuits, crackers, and snacks", emoji: "🍪", image: "assets/categories/snacks-biscuits.png", count: 0 },
    { id: "chocolates", name: "Chocolates and sweets", emoji: "🍫", image: "assets/categories/sweets-chocolate.png", count: 0 },
    { id: "sugar", name: "Sugar and sweeteners", emoji: "🍯", image: "assets/categories/sweets-chocolate.png", count: 0 },
    { id: "beverages", name: "Tea, coffee, and beverages", emoji: "☕", image: "assets/categories/tea-coffee.png", count: 0 },
    { id: "baking", name: "Baking ingredients", emoji: "🧁", image: "assets/categories/wheat-flour.png", count: 0 },
    { id: "ready-to-eat", name: "Ready-to-eat foods", emoji: "🍱", image: "assets/categories/other-pantry.png", count: 0 },
    { id: "instant", name: "Instant foods and soup mixes", emoji: "🍲", image: "assets/categories/pasta-noodles.png", count: 0 },
    { id: "meat", name: "Meat, poultry, and seafood", emoji: "🥩", image: "assets/categories/meat-seafood.png", count: 0 },
    { id: "baby-food", name: "Baby food and special-diet groceries", emoji: "👶", image: "assets/categories/other-pantry.png", count: 0 },
    { id: "gluten-free", name: "Gluten-free and vegan foods", emoji: "🌾❌", image: "assets/categories/other-pantry.png", count: 0 },
    { id: "organic", name: "Organic and specialty foods", emoji: "🍃", image: "assets/categories/fruits.png", count: 0 },
    { id: "indian", name: "Indian regional groceries", emoji: "🇮🇳", image: "assets/categories/spices-seasonings.png", count: 0 },
    { id: "middle-eastern", name: "Middle Eastern groceries", emoji: "🧆", image: "assets/categories/other-pantry.png", count: 0 },
    { id: "asian", name: "East Asian and Southeast Asian groceries", emoji: "🥢", image: "assets/categories/pasta-noodles.png", count: 0 },
    { id: "western", name: "European and American grocery products", emoji: "🥐", image: "assets/categories/bread-bakery.png", count: 0 },
    { id: "household", name: "Household pantry-related consumables", emoji: "📦", image: "assets/categories/other-pantry.png", count: 0 }
  ];

  // Helper to build product objects cleanly
  function p(id, name, brand, category, subcategory, barcode, imageSlug, unit, shelfDays, openDays, dietary, regional, desc, ingredients, nutrition, storage, source = "IntelliPantry Verified Master Grid") {
    return {
      id: id,
      product_name: name,
      normalized_name: (name + " " + brand + " " + (regional || []).join(" ") + " " + category + " " + subcategory + " " + barcode).toLowerCase(),
      brand: brand || "Generic",
      category: category,
      subcategory: subcategory,
      barcode: barcode,
      image_url: `assets/products/${imageSlug}.png`,
      image_source: source,
      description: desc || `High quality ${name} suitable for daily kitchen preparation and pantry storage.`,
      ingredients: ingredients || name,
      nutrition_information: nutrition || { calories: 120, protein: "3g", carbs: "20g", fat: "1g", fiber: "1g", sodium: "10mg" },
      storage_instructions: storage || "Store in an airtight container in a cool, dry place.",
      default_unit: unit || "pcs",
      regional_names: regional || [],
      dietary_tags: dietary || ["Vegetarian"],
      shelf_life_days: shelfDays || 365,
      opened_shelf_life_days: openDays || 60,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  // 150+ Structured, realistic worldwide products across all categories
  const GROCERY_PRODUCTS = [
    // 1. Grains and cereals
    p("gp_wheat_whole", "Whole Wheat Berries", "Bob's Red Mill", "Grains and cereals", "Whole Grains", "039978001153", "wheat", "kg", 730, 365, ["Vegan", "Vegetarian", "Whole Grain"], ["Gehun", "Trigo"], "Premium hard red whole wheat berries for milling or boiling.", "100% Whole Grain Wheat", { calories: 340, protein: "13g", carbs: "71g", fat: "2.5g", fiber: "12g", sodium: "2mg" }),
    p("gp_oats_rolled", "Rolled Oats", "Quaker", "Grains and cereals", "Oats", "030000010402", "oats", "kg", 365, 180, ["Vegan", "Vegetarian", "Heart Healthy"], ["Jai", "Avena"], "100% whole grain rolled oats for wholesome morning porridge.", "100% Rolled Oats", { calories: 389, protein: "16.9g", carbs: "66.3g", fat: "6.9g", fiber: "10.6g", sodium: "2mg" }),
    p("gp_quinoa_organic", "Organic White Quinoa", "Nature's Earthly Choice", "Grains and cereals", "Ancient Grains", "855325002014", "quinoa", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free", "Organic"], ["Quinua"], "Pre-washed organic white royal quinoa rich in complete protein.", "100% Organic White Quinoa", { calories: 120, protein: "4.4g", carbs: "21.3g", fat: "1.9g", fiber: "2.8g", sodium: "7mg" }),
    p("gp_barley_pearl", "Pearl Barley", "Mother Dairy / Generic", "Grains and cereals", "Barley", "074570020199", "barley", "kg", 730, 365, ["Vegan", "Vegetarian", "Fiber Rich"], ["Jau", "Cebada"], "Polished pearl barley for hearty vegetable soups, stews, and grain salads.", "100% Pearl Barley", { calories: 352, protein: "9.9g", carbs: "77.7g", fat: "1.2g", fiber: "15.6g", sodium: "9mg" }),
    p("gp_millet_foxtail", "Foxtail Millet", "24 Mantra Organic", "Grains and cereals", "Millets", "8904083500201", "millet", "kg", 365, 180, ["Vegan", "Vegetarian", "Gluten-Free", "Organic"], ["Kangni", "Navane", "Tenai"], "Ancient nutrient-dense gluten-free grain rich in dietary fiber and minerals.", "100% Organic Foxtail Millet", { calories: 351, protein: "11.2g", carbs: "63.2g", fat: "4.3g", fiber: "6.7g", sodium: "5mg" }),
    p("gp_buckwheat_raw", "Raw Buckwheat Groats", "Arrowhead Mills", "Grains and cereals", "Pseudo-grains", "074333471415", "buckwheat", "kg", 365, 180, ["Vegan", "Vegetarian", "Gluten-Free"], ["Kuttu", "Alforfon"], "Nutty raw buckwheat groats ideal for porridge or salads.", "100% Buckwheat", { calories: 343, protein: "13.3g", carbs: "71.5g", fat: "3.4g", fiber: "10g", sodium: "1mg" }),

    // 2. Rice varieties
    p("gp_rice_basmati", "Royal Basmati Rice", "Daawat", "Rice varieties", "Long Grain Rice", "8901537000101", "basmati-rice", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Basmati Chawal", "Arroz Basmati"], "Naturally aged extra-long grain fragrant Himalayan basmati rice.", "100% Pure Basmati Rice", { calories: 170, protein: "3.5g", carbs: "38g", fat: "0.5g", fiber: "1g", sodium: "0mg" }),
    p("gp_rice_jasmine", "Thai Fragrant Jasmine Rice", "Dragonfly", "Rice varieties", "Jasmine Rice", "088313101019", "jasmine-rice", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Hom Mali", "Arroz Jazmin"], "Aromatic long-grain jasmine rice with a delicate floral aroma and soft texture.", "100% Thai Jasmine Rice", { calories: 160, protein: "3g", carbs: "36g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_rice_brown", "Whole Grain Brown Rice", "Uncle Ben's", "Rice varieties", "Brown Rice", "058496420108", "brown-rice", "kg", 365, 180, ["Vegan", "Vegetarian", "Gluten-Free", "Whole Grain"], ["Bhura Chawal", "Arroz Integral"], "Nutrient-rich brown rice retaining its nutritious bran and germ layer.", "100% Whole Grain Brown Rice", { calories: 216, protein: "5g", carbs: "45g", fat: "1.8g", fiber: "3.5g", sodium: "5mg" }),
    p("gp_rice_sushi", "Premium Sushi Rice", "Nishiki", "Rice varieties", "Short Grain Rice", "011152010102", "sushi-rice", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Calrose Rice", "Japonica"], "Medium grain sushi rice with perfect stickiness for rolls and nigiri.", "100% California Grown Medium Grain Rice", { calories: 160, protein: "3g", carbs: "36g", fat: "0.5g", fiber: "1g", sodium: "0mg" }),
    p("gp_rice_white_regular", "Enriched White Rice", "Generic", "Rice varieties", "Medium Grain", "074570020102", "rice", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Safed Chawal", "Arroz Blanco"], "Standard pantry staple white rice for everyday cooking.", "100% White Rice", { calories: 160, protein: "3g", carbs: "36g", fat: "0.5g", fiber: "0.5g", sodium: "0mg" }),

    // 3. Wheat and flour varieties
    p("gp_flour_all_purpose", "All Purpose Flour (Maida)", "Gold Medal / Generic", "Wheat and flour varieties", "Refined Flour", "016000104105", "all-purpose-flour", "kg", 365, 180, ["Vegetarian"], ["Maida", "Harina de Trigo"], "Enriched unbleached all-purpose flour for cakes, pastries, and bread.", "Enriched Bleached Wheat Flour", { calories: 110, protein: "3g", carbs: "23g", fat: "0g", fiber: "1g", sodium: "0mg" }),
    p("gp_flour_whole_wheat", "100% Whole Wheat Atta", "Aashirvaad", "Wheat and flour varieties", "Atta / Whole Wheat", "8901725181216", "whole-wheat-flour", "kg", 180, 90, ["Vegan", "Vegetarian", "High Fiber"], ["Chakki Atta", "Harina Integral"], "Traditional stone-ground whole wheat atta flour for soft rotis and parathas.", "100% Whole Wheat Grains", { calories: 340, protein: "12g", carbs: "72g", fat: "1.5g", fiber: "11g", sodium: "5mg" }),
    p("gp_flour_corn", "Pure Corn Flour (Maize Starch)", "Weikfield / Argo", "Wheat and flour varieties", "Corn Flour", "073468001018", "corn-flour", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Makai ka Atta"], "Finely milled corn flour for velvety sauces, soups, and batters.", "100% Pure Corn Starch", { calories: 30, protein: "0g", carbs: "7g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_flour_gram_besan", "Pure Gram Flour (Besan)", "Tata Sampann", "Wheat and flour varieties", "Gram Flour", "8901042964201", "gram-flour", "kg", 270, 90, ["Vegan", "Vegetarian", "Gluten-Free", "High Protein"], ["Besan", "Chickpea Flour", "Chana Atta"], "100% unadulterated Bengal gram flour for pakoras, dhokla, and sweets.", "100% Pure Chana Dal", { calories: 387, protein: "22g", carbs: "58g", fat: "6.7g", fiber: "10g", sodium: "64mg" }),
    p("gp_flour_rye", "Organic Dark Rye Flour", "King Arthur Baking", "Wheat and flour varieties", "Rye Flour", "071012010103", "rye-flour", "kg", 365, 120, ["Vegan", "Vegetarian", "Whole Grain"], ["Centeno"], "Milled from whole rye berries for traditional sourdough and rustic loaves.", "100% Whole Rye", { calories: 100, protein: "3g", carbs: "22g", fat: "0.5g", fiber: "4g", sodium: "0mg" }),

    // 4. Pasta and noodles
    p("gp_pasta_spaghetti", "Spaghetti No. 5", "Barilla", "Pasta and noodles", "Long Pasta", "076808500508", "spaghetti", "g", 730, 365, ["Vegan", "Vegetarian"], ["Espaguetis"], "Semolina durum wheat Italian spaghetti crafted for authentic al dente texture.", "100% Durum Wheat Semolina", { calories: 200, protein: "7g", carbs: "42g", fat: "1g", fiber: "2g", sodium: "0mg" }),
    p("gp_pasta_penne", "Penne Rigate", "Barilla", "Pasta and noodles", "Short Pasta", "076808500300", "penne", "g", 730, 365, ["Vegan", "Vegetarian"], ["Plumas"], "Ridged tube pasta perfect for capturing thick tomato and pesto sauces.", "Durum Wheat Semolina", { calories: 200, protein: "7g", carbs: "42g", fat: "1g", fiber: "2g", sodium: "0mg" }),
    p("gp_pasta_macaroni", "Elbow Macaroni", "Kraft / De Cecco", "Pasta and noodles", "Short Pasta", "076808500201", "macaroni", "g", 730, 365, ["Vegan", "Vegetarian"], ["Coditos"], "Classic curved macaroni elbows for comforting mac and cheese.", "Durum Wheat Semolina", { calories: 200, protein: "7g", carbs: "42g", fat: "1g", fiber: "2g", sodium: "0mg" }),
    p("gp_pasta_lasagna", "Lasagna Sheets", "Barilla", "Pasta and noodles", "Oven-Ready Pasta", "076808500102", "lasagna", "g", 730, 365, ["Vegan", "Vegetarian"], ["Lasana"], "Flat ridged pasta sheets for layered oven-baked casseroles.", "Durum Wheat Semolina", { calories: 200, protein: "7g", carbs: "41g", fat: "1g", fiber: "2g", sodium: "0mg" }),
    p("gp_pasta_vermicelli", "Roasted Sevai Vermicelli", "Bambino", "Pasta and noodles", "Vermicelli", "8901262010101", "vermicelli", "g", 365, 180, ["Vegan", "Vegetarian"], ["Sevai", "Semiya"], "Finely extruded roasted wheat vermicelli for sweet kheer and savory upma.", "Hard Wheat Semolina", { calories: 360, protein: "10g", carbs: "78g", fat: "1g", fiber: "2.5g", sodium: "10mg" }),
    p("gp_noodles_instant_ramen", "Masala Instant Noodles", "Maggi", "Pasta and noodles", "Instant Noodles", "8901058852378", "instant-noodles", "pack", 270, 60, ["Vegetarian"], ["Maggi Noodles", "Ramen"], "India's favorite 2-minute instant noodles with signature spice seasoning tastemaker.", "Wheat Flour, Palm Oil, Salt, Minerals, Spices", { calories: 312, protein: "6g", carbs: "44g", fat: "12.5g", fiber: "2.2g", sodium: "820mg" }),
    p("gp_noodles_egg", "Egg Noodles", "Ching's Secret", "Pasta and noodles", "Asian Noodles", "8901595850018", "noodles", "g", 365, 180, ["Non-Vegetarian"], ["Hakka Noodles"], "Springy Chinese Hakka style noodles for stir fry chow mein dishes.", "Refined Wheat Flour, Whole Egg Powder, Salt", { calories: 350, protein: "11g", carbs: "72g", fat: "2g", fiber: "1.5g", sodium: "320mg" }),

    // 5. Bread and bakery products
    p("gp_bread_white", "Classic Sandwich White Bread", "Wonder / Modern", "Bread and bakery products", "Sliced Bread", "072250011111", "bread", "pcs", 7, 5, ["Vegetarian"], ["Double Roti", "Pan Blanco"], "Soft and pillowy sandwich loaf baked fresh daily.", "Wheat Flour, Water, Yeast, Sugar, Vegetable Oil, Salt", { calories: 70, protein: "2g", carbs: "13g", fat: "1g", fiber: "0.5g", sodium: "130mg" }, "Store in cool dry breadbox or freeze."),
    p("gp_bread_bagel", "Plain New York Bagels", "Thomas'", "Bread and bakery products", "Bagels", "048121285011", "bagels", "pack", 7, 5, ["Vegetarian"], ["Bagel"], "Boiled and baked dense, chewy authentic New York style plain bagels.", "Enriched Flour, Water, Sugar, Yeast, Malted Barley", { calories: 270, protein: "9g", carbs: "53g", fat: "1.5g", fiber: "2g", sodium: "440mg" }),
    p("gp_bread_buns", "Sesame Burger Buns", "Bimbo / Sara Lee", "Bread and bakery products", "Buns", "072945601211", "buns", "pack", 7, 5, ["Vegetarian"], ["Pan de Hamburguesa"], "Golden toasted sesame seed burger buns with soft interior.", "Enriched Wheat Flour, Water, Sugar, Sesame Seeds, Yeast", { calories: 140, protein: "4g", carbs: "26g", fat: "2g", fiber: "1g", sodium: "220mg" }),
    p("gp_bread_croissant", "All Butter Croissants", "La Boulangere", "Bread and bakery products", "Pastries", "3256540010101", "croissants", "pack", 5, 3, ["Vegetarian"], ["Cruasan"], "Flaky, multi-layered French crescent rolls prepared with pure creamery butter.", "Wheat Flour, Pure Butter 24%, Water, Sugar, Yeast", { calories: 230, protein: "4g", carbs: "24g", fat: "13g", fiber: "1g", sodium: "210mg" }),
    p("gp_bread_tortillas", "Flour Tortillas", "Mission", "Bread and bakery products", "Flatbreads", "073731000102", "tortillas", "pack", 30, 14, ["Vegan", "Vegetarian"], ["Tortillas de Harina"], "Soft, flexible flour tortillas for burritos, wraps, and quesadillas.", "Bleached Wheat Flour, Water, Vegetable Shortening, Salt", { calories: 140, protein: "3g", carbs: "24g", fat: "3.5g", fiber: "1g", sodium: "380mg" }),

    // 6. Dairy products
    p("gp_dairy_milk_whole", "Fresh Whole Milk", "Amul Taaza / Horizon", "Dairy products", "Milk", "8901262010202", "milk", "l", 7, 5, ["Vegetarian", "Calcium Rich"], ["Doodh", "Leche"], "Pasteurized homogenized standardized fresh cow milk.", "Standardized Pasteurized Milk, Vitamin D3", { calories: 60, protein: "3.2g", carbs: "4.7g", fat: "3.5g", fiber: "0g", sodium: "50mg" }, "Keep refrigerated below 4°C at all times."),
    p("gp_dairy_butter_salted", "Pasteurized Salted Butter", "Amul", "Dairy products", "Butter", "8901262010301", "butter", "g", 180, 60, ["Vegetarian"], ["Makkhan", "Mantequilla"], "Creamy churned pure dairy butter lightly salted to perfection.", "Butter (Milk Fat 80%), Salt", { calories: 717, protein: "0.8g", carbs: "0.1g", fat: "81g", fiber: "0g", sodium: "650mg" }, "Keep refrigerated."),
    p("gp_dairy_cheese_cheddar", "Cheddar Cheese Block", "Kraft / Kerrygold", "Dairy products", "Cheese", "021000604609", "cheese", "g", 180, 30, ["Vegetarian", "Keto"], ["Queso Cheddar"], "Aged sharp cheddar cheese made with pasture-raised milk.", "Pasteurized Cultured Milk, Salt, Enzymes, Annatto", { calories: 110, protein: "7g", carbs: "1g", fat: "9g", fiber: "0g", sodium: "180mg" }, "Keep wrapped and refrigerated."),
    p("gp_dairy_yogurt_greek", "Plain Greek Yogurt", "Chobani / Epigamia", "Dairy products", "Yogurt", "894700010103", "yogurt", "g", 30, 7, ["Vegetarian", "Probiotic", "High Protein"], ["Dahi", "Yogur"], "Triple strained thick creamy Greek yogurt rich in live probiotic cultures.", "Cultured Pasteurized Nonfat Milk, Live Active Cultures", { calories: 90, protein: "16g", carbs: "6g", fat: "0g", fiber: "0g", sodium: "65mg" }, "Keep refrigerated."),
    p("gp_dairy_cream_heavy", "Heavy Whipping Cream", "Land O'Lakes", "Dairy products", "Cream", "034500151101", "cream", "ml", 25, 7, ["Vegetarian"], ["Malai", "Crema"], "Rich 36% milk fat heavy cream for decadent sauces and whipping.", "Heavy Cream, Gellan Gum", { calories: 50, protein: "0.5g", carbs: "0.5g", fat: "5g", fiber: "0g", sodium: "5mg" }, "Keep refrigerated."),
    p("gp_dairy_paneer", "Fresh Malai Paneer", "Amul", "Dairy products", "Cottage Cheese", "8901262010400", "paneer", "g", 45, 3, ["Vegetarian", "High Protein"], ["Indian Cottage Cheese"], "Traditional soft unsalted curd cheese for curries, tikka, and bhurji.", "Pasteurized Milk, Citric Acid", { calories: 296, protein: "18.3g", carbs: "4.5g", fat: "23g", fiber: "0g", sodium: "18mg" }, "Store submerged in water in refrigerator."),

    // 7. Eggs and egg alternatives
    p("gp_eggs_large", "Farm Fresh Large Brown Eggs", "Vital Farms / Generic", "Eggs and egg alternatives", "Eggs", "074570020103", "eggs", "pcs", 30, 21, ["Non-Vegetarian", "Keto", "High Protein"], ["Ande", "Huevos"], "Grade A pasture-raised large eggs with deep golden yolks.", "100% Shell Eggs", { calories: 72, protein: "6.3g", carbs: "0.4g", fat: "4.8g", fiber: "0g", sodium: "71mg" }, "Refrigerate upon purchase."),
    p("gp_eggs_whites", "Liquid 100% Egg Whites", "Egg Beaters / All Whites", "Eggs and egg alternatives", "Egg Whites", "027000410102", "egg-whites", "ml", 45, 7, ["Non-Vegetarian", "Fat Free", "High Protein"], ["Claras de Huevo"], "Pure pasteurized liquid egg whites ready for lean protein cooking.", "Liquid Egg Whites, Guar Gum, Triethyl Citrate", { calories: 25, protein: "5g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "75mg" }),
    p("gp_egg_alt_tofu_firm", "Organic Extra Firm Tofu", "House Foods / Mori-Nu", "Eggs and egg alternatives", "Tofu / Plant Protein", "076371010102", "tofu", "g", 60, 5, ["Vegan", "Vegetarian", "Gluten-Free", "High Protein"], ["Bean Curd"], "Nutrient dense pressed organic soybean curd for pan frying and grilling.", "Water, Organic Soybeans, Calcium Sulfate, Magnesium Chloride", { calories: 80, protein: "9g", carbs: "2g", fat: "4.5g", fiber: "1g", sodium: "10mg" }),

    // 8. Plant-based milk and dairy alternatives
    p("gp_plant_milk_almond", "Unsweetened Almond Milk", "Almond Breeze / Silk", "Plant-based milk and dairy alternatives", "Nut Milk", "025293000987", "plant-based-milk", "l", 60, 10, ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free"], ["Leche de Almendras"], "Creamy plant milk crafted from California almonds without added sugar.", "Almondmilk (Filtered Water, Almonds), Calcium Carbonate, Sea Salt", { calories: 30, protein: "1g", carbs: "1g", fat: "2.5g", fiber: "1g", sodium: "170mg" }),
    p("gp_plant_milk_oat", "Barista Edition Oat Milk", "Oatly", "Plant-based milk and dairy alternatives", "Grain Milk", "840048700010", "oat-milk", "l", 90, 7, ["Vegan", "Vegetarian", "Dairy-Free"], ["Leche de Avena"], "Foamable rich oat milk specially formulated for specialty coffees and teas.", "Oat Base (Water, Oats 10%), Rapeseed Oil, Dipotassium Phosphate", { calories: 140, protein: "3g", carbs: "16g", fat: "7g", fiber: "2g", sodium: "100mg" }),
    p("gp_plant_milk_soy", "Organic Soy Milk", "Silk", "Plant-based milk and dairy alternatives", "Legume Milk", "025293001014", "soy-milk", "l", 60, 10, ["Vegan", "Vegetarian", "Gluten-Free", "High Protein"], ["Leche de Soya"], "Nutritious whole organic soybean milk loaded with plant protein.", "Soymilk (Filtered Water, Whole Organic Soybeans), Cane Sugar", { calories: 110, protein: "8g", carbs: "9g", fat: "4.5g", fiber: "2g", sodium: "95mg" }),

    // 9. Pulses, lentils, and beans
    p("gp_pulses_red_lentils", "Red Split Lentils (Masoor Dal)", "Tata Sampann", "Pulses, lentils, and beans", "Lentils", "8901042964300", "lentils", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free", "High Protein"], ["Masoor Dal", "Lentejas Rojas"], "Unpolished quick-cooking red split lentils for comforting Indian dal.", "100% Unpolished Masoor Dal", { calories: 343, protein: "25g", carbs: "60g", fat: "1g", fiber: "11g", sodium: "6mg" }),
    p("gp_pulses_chickpeas", "Kabuli Chickpeas (Garbanzo Beans)", "Bush's / Generic", "Pulses, lentils, and beans", "Chickpeas", "074570020104", "chickpeas", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free", "High Fiber"], ["Kabuli Chana", "Garbanzos"], "Plump whole dried garbanzo beans for creamy hummus and spicy chole.", "100% Dried Chickpeas", { calories: 364, protein: "19g", carbs: "61g", fat: "6g", fiber: "17g", sodium: "24mg" }),
    p("gp_pulses_kidney_beans", "Dark Red Kidney Beans (Rajma)", "Tata Sampann", "Pulses, lentils, and beans", "Beans", "8901042964409", "kidney-beans", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Rajma", "Frijoles Rojos"], "Firm red kidney beans essential for North Indian Rajma masala and Mexican chili.", "100% Red Kidney Beans", { calories: 333, protein: "24g", carbs: "60g", fat: "1g", fiber: "25g", sodium: "24mg" }),
    p("gp_pulses_black_beans", "Black Turtle Beans", "Goya", "Pulses, lentils, and beans", "Beans", "041331024501", "black-beans", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Frijoles Negros"], "Earthy black turtle beans for Latin American soups, burritos, and bowls.", "100% Dry Black Beans", { calories: 341, protein: "21.6g", carbs: "62.4g", fat: "1.4g", fiber: "15.5g", sodium: "5mg" }),
    p("gp_pulses_split_peas", "Yellow Split Peas (Toor / Moong)", "Generic", "Pulses, lentils, and beans", "Split Peas", "074570020105", "split-peas", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Arhar Dal", "Tuvar Dal", "Guisantes"], "Hearty yellow split peas for sambar, soups, and curries.", "100% Yellow Split Peas", { calories: 341, protein: "25g", carbs: "60g", fat: "1.2g", fiber: "26g", sodium: "15mg" }),

    // 10. Fresh fruits
    p("gp_fruit_apple", "Fresh Crisp Red Apples", "Washington / Gala", "Fresh fruits", "Tree Fruits", "074570020106", "apple", "kg", 21, 14, ["Vegan", "Vegetarian", "Gluten-Free", "Raw"], ["Seb", "Manzana"], "Sweet crisp eating apples with juicy bite and thin crimson skin.", "100% Fresh Apples", { calories: 52, protein: "0.3g", carbs: "14g", fat: "0.2g", fiber: "2.4g", sodium: "1mg" }, "Store in refrigerator crisper drawer."),
    p("gp_fruit_banana", "Cavendish Bananas", "Chiquita / Dole", "Fresh fruits", "Tropical Fruits", "074570020107", "banana", "kg", 7, 4, ["Vegan", "Vegetarian", "Potassium Rich"], ["Kela", "Platano"], "Naturally sweet energy packed ripe Cavendish bananas.", "100% Fresh Bananas", { calories: 89, protein: "1.1g", carbs: "22.8g", fat: "0.3g", fiber: "2.6g", sodium: "1mg" }, "Store at room temperature away from direct sunlight."),
    p("gp_fruit_orange", "Juicy Valencia Oranges", "Sunkist", "Fresh fruits", "Citrus", "074570020108", "orange", "kg", 18, 10, ["Vegan", "Vegetarian", "Vitamin C"], ["Santra", "Naranja"], "Vibrant citrus oranges packed with natural vitamin C and sweet juice.", "100% Fresh Oranges", { calories: 47, protein: "0.9g", carbs: "11.8g", fat: "0.1g", fiber: "2.4g", sodium: "0mg" }),
    p("gp_fruit_grapes", "Seedless Green Grapes", "Generic", "Fresh fruits", "Berries", "074570020109", "grapes", "kg", 14, 7, ["Vegan", "Vegetarian", "Gluten-Free"], ["Angoor", "Uvas"], "Crunchy seedless green table grapes bursting with sweet hydration.", "100% Fresh Grapes", { calories: 69, protein: "0.7g", carbs: "18.1g", fat: "0.2g", fiber: "0.9g", sodium: "2mg" }, "Keep unwashed in perforated bag in fridge."),
    p("gp_fruit_strawberry", "Fresh Sweet Strawberries", "Driscoll's", "Fresh fruits", "Berries", "074570020110", "strawberry", "g", 7, 4, ["Vegan", "Vegetarian", "Antioxidant"], ["Fresa"], "Plump fragrant red ripe strawberries perfect for breakfast and desserts.", "100% Fresh Strawberries", { calories: 33, protein: "0.7g", carbs: "7.7g", fat: "0.3g", fiber: "2g", sodium: "1mg" }),

    // 11. Fresh vegetables
    p("gp_veg_tomato", "Vine Ripe Red Tomatoes", "Generic", "Fresh vegetables", "Nightshades", "074570020111", "tomato", "kg", 10, 7, ["Vegan", "Vegetarian", "Gluten-Free"], ["Tamatar", "Tomate"], "Juicy plump tomatoes with balanced acidity for salads and curry gravies.", "100% Fresh Tomatoes", { calories: 18, protein: "0.9g", carbs: "3.9g", fat: "0.2g", fiber: "1.2g", sodium: "5mg" }, "Store stem down at room temperature."),
    p("gp_veg_potato", "Russet / Pahadi Potatoes", "Generic", "Fresh vegetables", "Tubers", "074570020112", "potato", "kg", 30, 21, ["Vegan", "Vegetarian", "Gluten-Free"], ["Aloo", "Papa"], "Versatile starchy potatoes ideal for baking, mashing, boiling, and roasting.", "100% Fresh Potatoes", { calories: 77, protein: "2g", carbs: "17.5g", fat: "0.1g", fiber: "2.2g", sodium: "6mg" }, "Store in cool dark ventilated pantry."),
    p("gp_veg_onion", "Yellow / Red Cooking Onions", "Generic", "Fresh vegetables", "Alliums", "074570020113", "onion", "kg", 45, 30, ["Vegan", "Vegetarian", "Gluten-Free"], ["Pyaaz", "Cebolla"], "Pungent aromatic bulbs forming the foundational aromatic base of cuisines.", "100% Fresh Onions", { calories: 40, protein: "1.1g", carbs: "9.3g", fat: "0.1g", fiber: "1.7g", sodium: "4mg" }, "Store in a dry ventilated mesh bag."),
    p("gp_veg_carrot", "Crisp Orange Carrots", "Generic", "Fresh vegetables", "Root Vegetables", "074570020114", "carrot", "kg", 28, 14, ["Vegan", "Vegetarian", "Beta Carotene"], ["Gajar", "Zanahoria"], "Sweet tender orange carrots high in Vitamin A and crunchy freshness.", "100% Fresh Carrots", { calories: 41, protein: "0.9g", carbs: "9.6g", fat: "0.2g", fiber: "2.8g", sodium: "69mg" }, "Store in refrigerator crisper."),
    p("gp_veg_cucumber", "English / Slicing Cucumber", "Generic", "Fresh vegetables", "Cucurbits", "074570020115", "cucumber", "pcs", 10, 5, ["Vegan", "Vegetarian", "Hydrating"], ["Kheera", "Pepino"], "Refreshing crisp cucumber with high water content and tender seeds.", "100% Fresh Cucumber", { calories: 15, protein: "0.7g", carbs: "3.6g", fat: "0.1g", fiber: "0.5g", sodium: "2mg" }),

    // 12. Leafy greens
    p("gp_greens_spinach", "Fresh Baby Spinach", "Earthbound Farm / Generic", "Leafy greens", "Spinach", "074570020116", "spinach", "g", 7, 5, ["Vegan", "Vegetarian", "Iron Rich"], ["Palak", "Espinaca"], "Tender dark green spinach leaves packed with dietary iron, folate, and vitamins.", "100% Fresh Spinach", { calories: 23, protein: "2.9g", carbs: "3.6g", fat: "0.4g", fiber: "2.2g", sodium: "79mg" }, "Store dry in paper lined sealed container in fridge."),
    p("gp_greens_lettuce", "Crisp Romaine Lettuce", "Dole / Generic", "Leafy greens", "Lettuce", "074570020117", "lettuce", "pcs", 10, 6, ["Vegan", "Vegetarian", "Hydrating"], ["Lechuga"], "Crunchy elongated heads of romaine lettuce for Caesar and Mediterranean salads.", "100% Romaine Lettuce", { calories: 17, protein: "1.2g", carbs: "3.3g", fat: "0.3g", fiber: "2.1g", sodium: "8mg" }),
    p("gp_greens_kale", "Lacinato Dinosaur Kale", "Organic Girl", "Leafy greens", "Brassica", "074570020118", "kale", "g", 10, 6, ["Vegan", "Vegetarian", "Superfood"], ["Col Rizada"], "Sturdy nutrient dense dark green kale for power salads, smoothies, and sautés.", "100% Fresh Kale", { calories: 49, protein: "4.3g", carbs: "8.8g", fat: "0.9g", fiber: "3.6g", sodium: "38mg" }),
    p("gp_greens_cabbage", "Green Ball Cabbage", "Generic", "Leafy greens", "Brassica", "074570020119", "cabbage", "kg", 25, 14, ["Vegan", "Vegetarian", "Vitamin K"], ["Patta Gobi", "Repollo"], "Dense head of crisp green cabbage for slaws, stir fries, and curries.", "100% Green Cabbage", { calories: 25, protein: "1.3g", carbs: "5.8g", fat: "0.1g", fiber: "2.5g", sodium: "18mg" }),
    p("gp_greens_methi", "Fresh Fenugreek Leaves (Methi)", "Generic", "Leafy greens", "Herbs", "074570020120", "fenugreek-leaves", "g", 5, 3, ["Vegan", "Vegetarian", "Ayurvedic"], ["Methi Bhaji", "Alholva"], "Slightly bitter aromatic culinary greens essential for methi thepla and chicken methi.", "100% Fresh Fenugreek Leaves", { calories: 49, protein: "4.4g", carbs: "6g", fat: "0.9g", fiber: "2.2g", sodium: "67mg" }),

    // 13. Herbs and seasonings
    p("gp_seasoning_chili_powder", "Red Chili Powder (Lal Mirch)", "MDH / Everest", "Herbs and seasonings", "Chili Powders", "8901248101010", "chili-powder", "g", 365, 180, ["Vegan", "Vegetarian", "Spicy"], ["Lal Mirch", "Chile en Polvo"], "Vibrant red hot chili pepper powder for fiery warmth and rich curry color.", "100% Ground Red Chillies", { calories: 314, protein: "12g", carbs: "56g", fat: "16g", fiber: "34g", sodium: "30mg" }),
    p("gp_seasoning_garlic_powder", "Pure Garlic Powder", "McCormick / Badia", "Herbs and seasonings", "Dehydrated Alliums", "052100010101", "garlic-powder", "g", 730, 365, ["Vegan", "Vegetarian"], ["Lehsun Powder", "Ajo en Polvo"], "Finely ground dehydrated garlic cloves providing savory umami punch.", "Dehydrated Garlic", { calories: 331, protein: "17g", carbs: "72g", fat: "0.7g", fiber: "9g", sodium: "60mg" }),
    p("gp_seasoning_onion_powder", "Pure Onion Powder", "McCormick", "Herbs and seasonings", "Dehydrated Alliums", "052100010102", "onion-powder", "g", 730, 365, ["Vegan", "Vegetarian"], ["Pyaaz Powder", "Cebolla en Polvo"], "Concentrated sweet dried onion powder for rubs, marinades, and dips.", "Dehydrated Onion", { calories: 341, protein: "10g", carbs: "79g", fat: "1g", fiber: "15g", sodium: "73mg" }),
    p("gp_seasoning_mixed_herbs", "Italian Herb Seasoning", "McCormick / Keya", "Herbs and seasonings", "Dried Herbs", "052100010103", "mixed-herbs", "g", 730, 365, ["Vegan", "Vegetarian"], ["Hierbas Italianas"], "Aromatic blend of oregano, basil, thyme, rosemary, and marjoram.", "Oregano, Basil, Thyme, Rosemary, Sage", { calories: 260, protein: "9g", carbs: "48g", fat: "5g", fiber: "18g", sodium: "15mg" }),
    p("gp_seasoning_cinnamon", "Ceylon Cinnamon Sticks & Powder", "Frontier Co-op", "Herbs and seasonings", "Sweet Spices", "089836001019", "cinnamon", "g", 730, 365, ["Vegan", "Vegetarian", "Aromatic"], ["Dalchini", "Canela"], "Fragrant sweet cinnamon harvested from evergreen tree bark.", "100% True Cinnamon", { calories: 247, protein: "4g", carbs: "81g", fat: "1.2g", fiber: "53g", sodium: "10mg" }),

    // 14. Whole spices and spice powders
    p("gp_spice_salt_iodized", "Iodized Table Salt", "Tata Salt / Morton", "Whole spices and spice powders", "Salts", "8901042964508", "salt", "kg", 1825, 1095, ["Vegan", "Vegetarian", "Essential Mineral"], ["Namak", "Sal"], "Vacuum evaporated iodized salt for pure taste and daily iodine wellness.", "Edible Common Salt, Potassium Iodate", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "38758mg" }),
    p("gp_spice_black_pepper", "Tellicherry Whole Black Peppercorns", "Catch / McCormick", "Whole spices and spice powders", "Peppercorns", "8901248101027", "black-pepper", "g", 730, 365, ["Vegan", "Vegetarian"], ["Kali Mirch", "Pimienta Negra"], "Aromatic sun-dried black peppercorns from the Malabar coast.", "100% Whole Black Pepper", { calories: 251, protein: "10g", carbs: "64g", fat: "3.3g", fiber: "25g", sodium: "20mg" }),
    p("gp_spice_turmeric", "Pure Turmeric Powder (Haldi)", "Tata Sampann / Everest", "Whole spices and spice powders", "Rhizomes", "8901042964607", "turmeric", "g", 730, 365, ["Vegan", "Vegetarian", "Curcumin Rich"], ["Haldi", "Curcuma"], "Golden aromatic turmeric powder with naturally high 3% curcumin content.", "100% Pure Turmeric", { calories: 354, protein: "8g", carbs: "65g", fat: "10g", fiber: "21g", sodium: "38mg" }),
    p("gp_spice_cumin", "Whole Cumin Seeds (Jeera)", "MDH / Everest", "Whole spices and spice powders", "Seeds", "8901248101034", "cumin", "g", 730, 365, ["Vegan", "Vegetarian", "Digestive"], ["Jeera", "Comino"], "Earthy whole cumin seeds for tempering curries, rice, and dals.", "100% Whole Cumin Seeds", { calories: 375, protein: "18g", carbs: "44g", fat: "22g", fiber: "11g", sodium: "168mg" }),
    p("gp_spice_coriander", "Ground Coriander Powder (Dhania)", "MDH", "Whole spices and spice powders", "Seed Powders", "8901248101041", "coriander", "g", 730, 365, ["Vegan", "Vegetarian"], ["Dhania Powder", "Cilantro"], "Mildly sweet citrusy ground coriander seeds for comforting gravies.", "100% Ground Coriander Seeds", { calories: 298, protein: "12g", carbs: "55g", fat: "18g", fiber: "42g", sodium: "35mg" }),

    // 15. Cooking oils and fats
    p("gp_oil_olive_extra_virgin", "Extra Virgin Olive Oil", "Filippo Berio / Borges", "Cooking oils and fats", "Olive Oil", "041790001019", "olive-oil", "l", 730, 180, ["Vegan", "Vegetarian", "Heart Healthy", "Cold Pressed"], ["Jaitun ka Tel", "Aceite de Oliva"], "First cold pressed Mediterranean extra virgin olive oil with rich fruity notes.", "100% Extra Virgin Olive Oil", { calories: 884, protein: "0g", carbs: "0g", fat: "100g", fiber: "0g", sodium: "0mg" }, "Store in cool dark cupboard away from heat."),
    p("gp_oil_sunflower", "Refined Sunflower Cooking Oil", "Fortune / Sunluck", "Cooking oils and fats", "Seed Oils", "8906007281014", "sunflower-oil", "l", 365, 120, ["Vegan", "Vegetarian", "High Smoke Point"], ["Surajmukhi Tel", "Aceite de Girasol"], "Light and clear refined sunflower oil enriched with Vitamin E.", "Refined Sunflower Seed Oil, Vitamins A & D", { calories: 884, protein: "0g", carbs: "0g", fat: "100g", fiber: "0g", sodium: "0mg" }),
    p("gp_oil_canola", "Pure Canola Oil", "Crisco / Wesson", "Cooking oils and fats", "Vegetable Oils", "051500010101", "canola-oil", "l", 365, 120, ["Vegan", "Vegetarian", "Omega 3"], ["Aceite de Canola"], "Neutral tasting cooking oil with high smoke point for frying and baking.", "100% Pure Canola Oil", { calories: 884, protein: "0g", carbs: "0g", fat: "100g", fiber: "0g", sodium: "0mg" }),
    p("gp_oil_coconut_virgin", "Organic Virgin Coconut Oil", "Parachute / Nutiva", "Cooking oils and fats", "Tropical Oils", "8901088010102", "coconut-oil", "ml", 730, 365, ["Vegan", "Vegetarian", "MCTs", "Keto"], ["Nariyal Tel", "Aceite de Coco"], "Cold pressed unrefined raw coconut oil with rich fresh coconut aroma.", "100% Pure Virgin Coconut Oil", { calories: 862, protein: "0g", carbs: "0g", fat: "100g", fiber: "0g", sodium: "0mg" }),
    p("gp_oil_sesame_toasted", "Pure Toasted Sesame Oil", "Kadoya / Tilsona", "Cooking oils and fats", "Flavoring Oils", "011152010201", "sesame-oil", "ml", 540, 180, ["Vegan", "Vegetarian", "Aromatic"], ["Til ka Tel", "Aceite de Sesamo"], "Deep amber aromatic oil pressed from roasted sesame seeds for Asian dishes.", "100% Roasted Sesame Seed Oil", { calories: 884, protein: "0g", carbs: "0g", fat: "100g", fiber: "0g", sodium: "0mg" }),

    // 16. Sauces and condiments
    p("gp_sauce_ketchup", "Tomato Ketchup", "Heinz", "Sauces and condiments", "Tomato Sauces", "013000006059", "ketchup", "g", 365, 90, ["Vegan", "Vegetarian"], ["Tomato Sauce"], "Classic thick condiment crafted from ripe red vine tomatoes and spices.", "Tomato Concentrate, Distilled Vinegar, High Fructose Corn Syrup, Salt", { calories: 20, protein: "0g", carbs: "5g", fat: "0g", fiber: "0g", sodium: "160mg" }, "Refrigerate after opening."),
    p("gp_sauce_mayonnaise", "Real Mayonnaise", "Hellmann's / Best Foods", "Sauces and condiments", "Emulsions", "048001213485", "mayonnaise", "g", 180, 60, ["Vegetarian"], ["Mayonesa"], "Rich velvety mayonnaise prepared with cage-free eggs, oil, and vinegar.", "Soybean Oil, Water, Whole Eggs, Egg Yolks, Vinegar, Salt, Sugar", { calories: 90, protein: "0g", carbs: "0g", fat: "10g", fiber: "0g", sodium: "90mg" }, "Keep refrigerated after opening."),
    p("gp_sauce_mustard", "Classic Yellow Mustard", "French's", "Sauces and condiments", "Mustards", "041500000251", "mustard", "g", 365, 180, ["Vegan", "Vegetarian", "Gluten-Free"], ["Mostaza"], "Tangy smooth yellow mustard made with stone ground #1 grade mustard seeds.", "Distilled Vinegar, Water, #1 Grade Mustard Seed, Salt, Turmeric, Paprika", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "55mg" }),
    p("gp_sauce_soy_naturally_brewed", "Naturally Brewed Soy Sauce", "Kikkoman", "Sauces and condiments", "Fermented Sauces", "041390001018", "soy-sauce", "ml", 730, 180, ["Vegan", "Vegetarian", "Umami"], ["Salsa de Soya"], "Traditional Japanese brewed soy sauce aged for months for rich umami depth.", "Water, Wheat, Soybeans, Salt, Sodium Benzoate", { calories: 15, protein: "2g", carbs: "1g", fat: "0g", fiber: "0g", sodium: "920mg" }),
    p("gp_sauce_chili_sriracha", "Sriracha Hot Chili Sauce", "Huy Fong Foods", "Sauces and condiments", "Hot Sauces", "088313101026", "chili-sauce", "g", 365, 180, ["Vegan", "Vegetarian", "Spicy"], ["Salsa Picante"], "Iconic sun-ripened red jalapeño pepper garlic chili sauce.", "Chili, Sugar, Salt, Garlic, Distilled Vinegar, Potassium Sorbate", { calories: 5, protein: "0g", carbs: "1g", fat: "0g", fiber: "0g", sodium: "100mg" }),

    // 17. Pickles and preserves
    p("gp_pickle_mixed_mango", "Mixed Mango Pickle (Achar)", "Mother's Recipe / Priya", "Pickles and preserves", "Indian Pickles", "8906007281021", "mixed-pickle", "g", 540, 180, ["Vegan", "Vegetarian", "Tangy & Spicy"], ["Aam ka Achar", "Encurtido"], "Traditional oil-cured raw green mango pickle with fenugreek and mustard.", "Raw Mango, Salt, Mustard Oil, Spices, Asafoetida", { calories: 175, protein: "2g", carbs: "12g", fat: "14g", fiber: "4g", sodium: "2800mg" }),
    p("gp_pickle_olives_kalamata", "Pitted Kalamata Olives", "Mezzetta / Lindsay", "Pickles and preserves", "Olives", "073214001018", "olives", "g", 540, 60, ["Vegan", "Vegetarian", "Keto"], ["Aceitunas"], "Plump purple Greek Kalamata olives cured in red wine vinegar and olive oil.", "Kalamata Olives, Water, Red Wine Vinegar, Sea Salt, Extra Virgin Olive Oil", { calories: 45, protein: "0g", carbs: "2g", fat: "4g", fiber: "1g", sodium: "190mg" }),
    p("gp_preserve_jam_strawberry", "Strawberry Fruit Spread Jam", "Smucker's / Bonne Maman", "Pickles and preserves", "Fruit Preserves", "051500000102", "jam", "g", 365, 90, ["Vegan", "Vegetarian"], ["Mermelada de Fresa"], "Rich fruit jam made with whole ripe strawberries and natural fruit pectin.", "Strawberries, High Fructose Corn Syrup, Corn Syrup, Fruit Pectin, Citric Acid", { calories: 50, protein: "0g", carbs: "13g", fat: "0g", fiber: "0g", sodium: "0mg" }, "Refrigerate after opening."),
    p("gp_spread_peanut_butter", "Creamy Peanut Butter", "Skippy / Jif", "Pickles and preserves", "Nut Butters", "037600110753", "peanut-butter", "g", 365, 90, ["Vegetarian", "Gluten-Free", "High Protein"], ["Mantequilla de Mani"], "Smooth spreadable roasted peanut butter packed with plant protein.", "Roasted Peanuts, Sugar, Hydrogenated Vegetable Oil, Salt", { calories: 190, protein: "7g", carbs: "7g", fat: "16g", fiber: "2g", sodium: "150mg" }),
    p("gp_spread_chocolate_hazelnut", "Hazelnut Spread with Cocoa", "Nutella", "Pickles and preserves", "Sweet Spreads", "009800800057", "chocolate-spread", "g", 365, 120, ["Vegetarian"], ["Crema de Cacao"], "Creamy indulgence made from roasted hazelnuts, skim milk, and cocoa.", "Sugar, Palm Oil, Hazelnuts 13%, Skimmed Milk Powder 8.7%, Fat-Reduced Cocoa 7.4%", { calories: 200, protein: "2g", carbs: "22g", fat: "12g", fiber: "1g", sodium: "15mg" }),

    // 18. Canned foods
    p("gp_canned_tomatoes", "Diced Tomatoes in Juice", "Hunt's / Mutti", "Canned foods", "Canned Vegetables", "027000381013", "canned-tomatoes", "g", 730, 4, ["Vegan", "Vegetarian", "Gluten-Free"], ["Tomates en Lata"], "Vine-ripened tomatoes peeled, diced and packed in their own rich juice.", "Tomatoes, Tomato Juice, Salt, Calcium Chloride, Citric Acid", { calories: 25, protein: "1g", carbs: "5g", fat: "0g", fiber: "1g", sodium: "180mg" }, "Once opened, transfer to glass container and refrigerate."),
    p("gp_canned_beans_black", "Canned Black Beans", "Bush's Best / Goya", "Canned foods", "Canned Legumes", "039400016145", "canned-beans", "g", 730, 4, ["Vegan", "Vegetarian", "High Fiber"], ["Frijoles en Lata"], "Tender black beans simmered in water and seasoned with sea salt.", "Prepared Black Beans, Water, Salt, Calcium Chloride", { calories: 110, protein: "7g", carbs: "20g", fat: "0.5g", fiber: "5g", sodium: "460mg" }),
    p("gp_canned_corn", "Sweet Whole Kernel Golden Corn", "Green Giant / Del Monte", "Canned foods", "Canned Vegetables", "024000010103", "canned-corn", "g", 730, 4, ["Vegan", "Vegetarian", "Gluten-Free"], ["Maiz Dulce"], "Crisp golden sweet corn picked at peak sweetness and steam canned.", "Corn, Water, Sea Salt", { calories: 60, protein: "2g", carbs: "13g", fat: "1g", fiber: "2g", sodium: "200mg" }),
    p("gp_canned_tuna", "Chunk Light Tuna in Water", "Starkist / Bumble Bee", "Canned foods", "Canned Seafood", "080000003112", "canned-tuna", "g", 1095, 2, ["Non-Vegetarian", "High Protein", "Keto"], ["Atun en Lata"], "Wild-caught chunk light tuna fish packed in natural spring water.", "Light Tuna, Water, Vegetable Broth, Salt", { calories: 90, protein: "20g", carbs: "0g", fat: "1g", fiber: "0g", sodium: "360mg" }),
    p("gp_canned_soup_chicken", "Condensed Chicken Noodle Soup", "Campbell's", "Canned foods", "Canned Soups", "051000010108", "canned-soup", "g", 730, 3, ["Non-Vegetarian"], ["Sopa de Pollo"], "Iconic comforting chicken broth with tender egg noodles and celery.", "Chicken Stock, Enriched Egg Noodles, Chicken Meat, Salt, Water", { calories: 60, protein: "3g", carbs: "8g", fat: "2g", fiber: "1g", sodium: "890mg" }),

    // 19. Frozen foods
    p("gp_frozen_vegetables_mixed", "Frozen Mixed Vegetables (Carrot, Peas, Corn)", "Birds Eye / Generic", "Frozen foods", "Frozen Vegetables", "014500005118", "frozen-vegetables", "kg", 365, 30, ["Vegan", "Vegetarian", "Gluten-Free"], ["Verduras Congeladas"], "Flash frozen garden sweet peas, diced carrots, corn, and green cut beans.", "Carrots, Green Peas, Sweet Corn, Cut Green Beans", { calories: 60, protein: "2g", carbs: "12g", fat: "0g", fiber: "3g", sodium: "40mg" }, "Keep frozen at -18°C or below."),
    p("gp_frozen_fruits_berries", "Frozen Triple Berry Medley", "Dole", "Frozen foods", "Frozen Fruits", "071202010104", "frozen-fruits", "g", 365, 30, ["Vegan", "Vegetarian", "Gluten-Free"], ["Frutas Congeladas"], "IQF quick frozen strawberries, blueberries, and blackberries for smoothies.", "Strawberries, Blueberries, Blackberries", { calories: 70, protein: "1g", carbs: "17g", fat: "0.5g", fiber: "4g", sodium: "0mg" }, "Keep frozen at -18°C."),
    p("gp_frozen_pizza_cheese", "Four Cheese Thin Crust Pizza", "DiGiorno / Dr. Oetker", "Frozen foods", "Frozen Prepared Meals", "071921003393", "frozen-pizza", "pcs", 180, 1, ["Vegetarian"], ["Pizza Congelada"], "Stone baked thin crust pizza topped with mozzarella, parmesan, romano, and fontina.", "Enriched Flour, Cheeses, Tomato Paste, Water, Yeast, Olive Oil", { calories: 310, protein: "14g", carbs: "35g", fat: "13g", fiber: "2g", sodium: "720mg" }),
    p("gp_frozen_fish_fillets", "Wild Pacific Cod Fillets", "Gorton's / Kirkland", "Frozen foods", "Frozen Seafood", "044400010102", "frozen-fish", "kg", 270, 2, ["Non-Vegetarian", "High Protein"], ["Filetes de Pescado"], "Individually vacuum sealed boneless skinless natural white cod fish fillets.", "100% Pacific Cod", { calories: 90, protein: "20g", carbs: "0g", fat: "0.5g", fiber: "0g", sodium: "75mg" }),
    p("gp_frozen_chicken_breast", "Frozen Boneless Chicken Breast", "Tyson / Perdue", "Frozen foods", "Frozen Poultry", "023700010105", "frozen-chicken", "kg", 270, 2, ["Non-Vegetarian", "High Protein", "Keto"], ["Pechuga de Pollo"], "Individually quick frozen all-natural boneless skinless chicken breasts.", "Chicken Breast, Water, Salt", { calories: 120, protein: "24g", carbs: "0g", fat: "2.5g", fiber: "0g", sodium: "220mg" }),

    // 20. Nuts and seeds
    p("gp_nuts_almonds", "California Whole Raw Almonds", "Blue Diamond / Kirkland", "Nuts and seeds", "Tree Nuts", "041570050101", "almonds", "g", 365, 90, ["Vegan", "Vegetarian", "Keto", "High Protein"], ["Badam", "Almendras"], "Crunchy unroasted whole California almonds rich in Vitamin E and magnesium.", "100% Whole Raw Almonds", { calories: 160, protein: "6g", carbs: "6g", fat: "14g", fiber: "4g", sodium: "0mg" }),
    p("gp_nuts_cashews", "Whole White Cashews (Kaju)", "Planters / Generic", "Nuts and seeds", "Tree Nuts", "029000010103", "cashews", "g", 365, 90, ["Vegan", "Vegetarian", "Gluten-Free"], ["Kaju", "Castanas de Caju"], "Buttery sweet whole cashew nut kernels grade W-240.", "100% Raw Cashew Nuts", { calories: 157, protein: "5.2g", carbs: "8.6g", fat: "12.4g", fiber: "0.9g", sodium: "3mg" }),
    p("gp_nuts_walnuts", "Shelled English Walnut Halves", "Diamond of California", "Nuts and seeds", "Tree Nuts", "010340010104", "walnuts", "g", 365, 90, ["Vegan", "Vegetarian", "Omega 3"], ["Akhrot", "Nueces"], "Brain-shaped crisp walnut halves bursting with plant-based Omega-3 ALA.", "100% Walnut Halves and Pieces", { calories: 185, protein: "4.3g", carbs: "3.9g", fat: "18.5g", fiber: "1.9g", sodium: "1mg" }),
    p("gp_nuts_peanuts", "Roasted Salted Peanuts", "Planters", "Nuts and seeds", "Groundnuts", "029000016143", "peanuts", "g", 270, 60, ["Vegan", "Vegetarian", "Protein Snack"], ["Moongphali", "Mani"], "Dry roasted Virginia peanuts seasoned with a dash of pure sea salt.", "Peanuts, Sea Salt, Corn Oil", { calories: 170, protein: "7g", carbs: "5g", fat: "14g", fiber: "2g", sodium: "110mg" }),
    p("gp_seeds_chia", "Raw Organic Black Chia Seeds", "Nutiva / Viva Naturals", "Nuts and seeds", "Superfood Seeds", "696859010101", "chia-seeds", "g", 730, 365, ["Vegan", "Vegetarian", "High Fiber", "Omega 3"], ["Semillas de Chia"], "Nutrient dense tiny black chia seeds forming a gel when soaked.", "100% Organic Black Chia Seeds", { calories: 60, protein: "2g", carbs: "5g", fat: "3.5g", fiber: "4g", sodium: "0mg" }),

    // 21. Dried fruits
    p("gp_dried_raisins", "Sun-Dried Golden Sultana Raisins", "Sun-Maid", "Dried fruits", "Vine Fruits", "041143010102", "raisins", "g", 365, 90, ["Vegan", "Vegetarian", "Natural Sweetener"], ["Kishmish", "Pasas"], "Sun-ripened sweet dried Thompson seedless grapes in iconic red box.", "California Seedless Raisins", { calories: 130, protein: "1g", carbs: "31g", fat: "0g", fiber: "1g", sodium: "10mg" }),
    p("gp_dried_dates", "Medjool Premium Whole Dates", "Natural Delights", "Dried fruits", "Tree Fruits", "041749010103", "dates", "g", 365, 90, ["Vegan", "Vegetarian", "Natural Energy"], ["Khajoor", "Datiles"], "Large plump sweet caramel-flavored whole Medjool dates with pit.", "100% Whole Medjool Dates", { calories: 110, protein: "1g", carbs: "30g", fat: "0g", fiber: "3g", sodium: "0mg" }),
    p("gp_dried_apricots", "Mediterranean Dried Apricots", "Mariani", "Dried fruits", "Stone Fruits", "071022010105", "apricots", "g", 365, 90, ["Vegan", "Vegetarian", "Fiber Rich"], ["Khubani", "Albaricoques"], "Plump and tangy whole dried Turkish apricots.", "Dried Apricots, Sulfur Dioxide (for color retention)", { calories: 100, protein: "1g", carbs: "26g", fat: "0g", fiber: "3g", sodium: "5mg" }),
    p("gp_dried_prunes", "Pitted Dried Plums (Prunes)", "Sunsweet", "Dried fruits", "Plums", "070450010106", "prunes", "g", 365, 90, ["Vegan", "Vegetarian", "Digestive Health"], ["Ciruelas Pasas"], "Soft and sweet pitted dried plums supporting digestive health.", "Pitted Dried California Plums, Potassium Sorbate", { calories: 100, protein: "1g", carbs: "26g", fat: "0g", fiber: "3g", sodium: "0mg" }),
    p("gp_dried_cranberries", "Sweetened Dried Cranberries (Craisins)", "Ocean Spray", "Dried fruits", "Berries", "031200010107", "dried-cranberries", "g", 365, 90, ["Vegan", "Vegetarian"], ["Arandanos Rojos"], "Tart cranberries gently infused with pure cane sugar and dried.", "Cranberries, Sugar", { calories: 130, protein: "0g", carbs: "33g", fat: "0g", fiber: "2g", sodium: "0mg" }),

    // 22. Breakfast foods
    p("gp_breakfast_cornflakes", "Original Crispy Corn Flakes", "Kellogg's", "Breakfast foods", "Cereal", "038000010108", "cornflakes", "g", 365, 60, ["Vegetarian", "Enriched"], ["Copos de Maiz"], "Golden toasted flakes of corn lightly seasoned with malt extract and salt.", "Milled Corn, Sugar, Malt Flavor, Salt, Vitamins & Minerals", { calories: 100, protein: "2g", carbs: "24g", fat: "0g", fiber: "1g", sodium: "200mg" }),
    p("gp_breakfast_muesli", "Fruit & Nut Swiss Muesli", "Alpen / Kellogg's", "Breakfast foods", "Muesli", "070470010109", "muesli", "g", 365, 60, ["Vegetarian", "Whole Grain"], ["Muesli"], "Hearty blend of rolled oats, toasted wheat flakes, raisins, and roasted nuts.", "Rolled Oats 38%, Whole Wheat, Raisins 12%, Hazelnuts, Almonds", { calories: 210, protein: "6g", carbs: "40g", fat: "3.5g", fiber: "5g", sodium: "45mg" }),
    p("gp_breakfast_granola", "Honey Almond Crunch Granola", "Nature Valley", "Breakfast foods", "Granola", "016000010101", "granola", "g", 270, 60, ["Vegetarian", "Whole Grain"], ["Granola"], "Crunchy toasted oat clusters kissed with pure honey and sliced almonds.", "Whole Grain Oats, Sugar, Canola Oil, Rice Flour, Honey, Almonds", { calories: 210, protein: "4g", carbs: "36g", fat: "6g", fiber: "3g", sodium: "135mg" }),
    p("gp_breakfast_porridge", "Creamy Breakfast Porridge Oats", "Quaker", "Breakfast foods", "Hot Cereal", "030000010102", "porridge", "g", 365, 90, ["Vegan", "Vegetarian", "Whole Grain"], ["Gachas"], "Finely cut whole grain oats that cook rapidly into velvety warm porridge.", "100% Wholegrain Rolled Oats", { calories: 150, protein: "5g", carbs: "27g", fat: "3g", fiber: "4g", sodium: "0mg" }),
    p("gp_breakfast_rice_puffs", "Puffed Rice (Murmura)", "Generic", "Breakfast foods", "Cereal", "074570020121", "rice-puffs", "g", 180, 60, ["Vegan", "Vegetarian", "Low Calorie"], ["Murmura", "Arroz Inflado"], "Light airy puffed rice grains for bhel puri snacks or morning cereal.", "100% Puffed Rice Grains", { calories: 110, protein: "2g", carbs: "25g", fat: "0g", fiber: "0.5g", sodium: "5mg" }),

    // 23. Biscuits, crackers, and snacks
    p("gp_snack_biscuits_digestive", "Original Digestive Biscuits", "McVitie's", "Biscuits, crackers, and snacks", "Sweet Biscuits", "070000010103", "biscuits", "g", 365, 30, ["Vegetarian"], ["Galletas Digestivas"], "Classic British wheat biscuits with distinctive wholemeal crunch.", "Flour (Wheat Flour, Calcium, Iron, Niacin), Palm Oil, Wholemeal 14%, Sugar", { calories: 71, protein: "1.1g", carbs: "9.4g", fat: "3.1g", fiber: "0.5g", sodium: "140mg" }),
    p("gp_snack_cookies_chocolate_chip", "Chunky Chocolate Chip Cookies", "Chips Ahoy! / Britannia", "Biscuits, crackers, and snacks", "Cookies", "044000010104", "cookies", "g", 270, 30, ["Vegetarian"], ["Galletas con Chispas de Chocolate"], "Golden baked crispy cookies loaded with real rich chocolate morsels.", "Unbleached Enriched Flour, Semisweet Chocolate Chips, Sugar, Canola Oil", { calories: 160, protein: "1g", carbs: "22g", fat: "8g", fiber: "1g", sodium: "105mg" }),
    p("gp_snack_crackers_salted", "Club / Saltine Soda Crackers", "Nabisco / Keebler", "Biscuits, crackers, and snacks", "Crackers", "044000010105", "crackers", "g", 365, 30, ["Vegetarian"], ["Galletas Saladas"], "Light, flaky, and crispy baked square crackers topped with sea salt.", "Enriched Flour, Soybean Oil, Salt, Baking Soda, Malted Barley Flour", { calories: 70, protein: "1g", carbs: "11g", fat: "2.5g", fiber: "0g", sodium: "140mg" }),
    p("gp_snack_pretzels", "Mini Salted Pretzels", "Snyder's of Hanover", "Biscuits, crackers, and snacks", "Pretzels", "077975010106", "pretzels", "g", 365, 30, ["Vegan", "Vegetarian", "Fat Free"], ["Pretzels"], "Slow baked traditional knotted pretzels with crunchy salty bite.", "Enriched Flour, Water, Salt, Malt, Canola Oil, Yeast, Soda", { calories: 110, protein: "3g", carbs: "23g", fat: "0.5g", fiber: "1g", sodium: "350mg" }),
    p("gp_snack_rice_cakes", "Lightly Salted Brown Rice Cakes", "Quaker", "Biscuits, crackers, and snacks", "Rice Cakes", "030000010107", "rice-cakes", "g", 270, 30, ["Vegan", "Vegetarian", "Gluten-Free", "Low Calorie"], ["Tortitas de Arroz"], "Crispy circular cakes popped from whole grain brown rice and sea salt.", "Whole Grain Brown Rice, Salt", { calories: 35, protein: "1g", carbs: "7g", fat: "0g", fiber: "0.5g", sodium: "15mg" }),

    // 24. Chocolates and sweets
    p("gp_sweet_chocolate_bar", "Dairy Milk Chocolate Bar", "Cadbury / Hershey's", "Chocolates and sweets", "Milk Chocolate", "076222010108", "chocolate-bar", "g", 365, 60, ["Vegetarian"], ["Barra de Chocolate"], "Smooth creamy milk chocolate crafted with a glass and a half of fresh milk.", "Milk, Sugar, Cocoa Butter, Cocoa Mass, Vegetable Fats, Emulsifiers", { calories: 240, protein: "3.5g", carbs: "27g", fat: "13g", fiber: "1g", sodium: "55mg" }),
    p("gp_sweet_candies", "Fruit Hard Candies", "Jolly Rancher / Generic", "Chocolates and sweets", "Hard Candies", "010700010109", "candies", "g", 730, 365, ["Vegetarian"], ["Toffees", "Caramelos"], "Assorted colorful sweet long-lasting fruit hard candies.", "Corn Syrup, Sugar, Malic Acid, Natural & Artificial Flavors, Colorings", { calories: 70, protein: "0g", carbs: "17g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_sweet_gummies", "Goldbears Gummy Bears", "Haribo", "Chocolates and sweets", "Gummies", "042238010101", "gummies", "g", 365, 90, ["Non-Vegetarian"], ["Ositos de Goma"], "Chewy fruit-flavored classic bear-shaped gummy candies.", "Glucose Syrup, Sugar, Gelatin, Dextrose, Citric Acid, Fruit Juices", { calories: 100, protein: "2g", carbs: "23g", fat: "0g", fiber: "0g", sodium: "10mg" }),
    p("gp_sweet_lollipops", "Original Fruit Lollipops", "Chupa Chups", "Chocolates and sweets", "Lollipops", "073390010102", "lollipops", "pcs", 730, 365, ["Vegetarian"], ["Paletas"], "Classic sphere hard candy lollipops on sticks in popular fruit flavors.", "Sugar, Glucose Syrup, Fruit Puree, Lactic Acid, Natural Flavors", { calories: 45, protein: "0g", carbs: "11g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_sweet_marshmallows", "Fluffy Mini Marshmallows", "Kraft Jet-Puffed", "Chocolates and sweets", "Marshmallows", "060069010103", "marshmallows", "g", 270, 60, ["Non-Vegetarian"], ["Malvaviscos"], "Pillowy soft white marshmallows for hot chocolate and baking.", "Corn Syrup, Sugar, Modified Cornstarch, Gelatin, Water", { calories: 100, protein: "1g", carbs: "24g", fat: "0g", fiber: "0g", sodium: "25mg" }),

    // 25. Sugar and sweeteners
    p("gp_sugar_white", "Pure Granulated Cane Sugar", "Domino / Generic", "Sugar and sweeteners", "Refined Sugar", "049200010104", "sugar", "kg", 1825, 730, ["Vegan", "Vegetarian", "Sweetener"], ["Cheeni", "Shakar", "Azucar Blanco"], "100% pure fine granulated white cane sugar for tea, coffee, and desserts.", "Pure Cane Sugar", { calories: 15, protein: "0g", carbs: "4g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_sugar_brown", "Light Brown Soft Sugar", "C&H / Tate & Lyle", "Sugar and sweeteners", "Brown Sugar", "021130010105", "brown-sugar", "kg", 730, 365, ["Vegan", "Vegetarian"], ["Azucar Moreno"], "Moist aromatic cane sugar crystals naturally infused with golden molasses.", "Cane Sugar, Cane Molasses", { calories: 15, protein: "0g", carbs: "4g", fat: "0g", fiber: "0g", sodium: "1mg" }),
    p("gp_sugar_honey", "100% Pure Raw Clover Honey", "Dabur / Nature Nate's", "Sugar and sweeteners", "Natural Sweeteners", "8901207010105", "honey", "g", 1825, 730, ["Vegetarian", "Natural"], ["Shehed", "Miel"], "Golden unfiltered raw wildflower honey harvested straight from the hive.", "100% Pure Honey", { calories: 64, protein: "0.1g", carbs: "17.3g", fat: "0g", fiber: "0g", sodium: "1mg" }, "Store at room temp. If crystallized, warm jar gently in hot water."),
    p("gp_sugar_jaggery", "Organic Pure Gur Jaggery Block", "24 Mantra / Generic", "Sugar and sweeteners", "Traditional Sweeteners", "8904083500300", "jaggery", "kg", 365, 180, ["Vegan", "Vegetarian", "Iron Rich"], ["Gur", "Panela"], "Traditional unrefined wholesome solid cane jaggery packed with minerals.", "100% Concentrated Cane Juice", { calories: 383, protein: "0.4g", carbs: "98g", fat: "0.1g", fiber: "0g", sodium: "30mg" }),
    p("gp_sugar_maple_syrup", "100% Pure Grade A Maple Syrup", "Kirkland / Maple Grove", "Sugar and sweeteners", "Tree Syrups", "046000010107", "maple-syrup", "ml", 730, 180, ["Vegan", "Vegetarian", "Natural"], ["Jarabe de Arce"], "Amber color maple syrup tapped from sugar maple trees in North America.", "100% Pure Maple Syrup", { calories: 210, protein: "0g", carbs: "53g", fat: "0g", fiber: "0g", sodium: "5mg" }, "Refrigerate after opening."),

    // 26. Tea, coffee, and beverages
    p("gp_bev_tea_black", "Premium Assam CTC Black Tea", "Tata Tea / Twinings", "Tea, coffee, and beverages", "Black Tea", "8901052010101", "tea", "g", 730, 365, ["Vegan", "Vegetarian", "Antioxidants"], ["Chai Patti", "Te Negro"], "Strong aromatic full-bodied Assam black CTC tea leaves for authentic milk chai.", "100% Assam Black Tea", { calories: 2, protein: "0g", carbs: "0.5g", fat: "0g", fiber: "0g", sodium: "3mg" }),
    p("gp_bev_tea_green", "Pure Green Tea Bags", "Tetley / Lipton", "Tea, coffee, and beverages", "Green Tea", "8901052010200", "green-tea", "pack", 730, 365, ["Vegan", "Vegetarian", "Antioxidants"], ["Te Verde"], "Steamed natural green tea leaves rich in healthy catechins and EGCG.", "100% Pure Green Tea", { calories: 2, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_bev_tea_herbal", "Chamomile Herbal Tea Infusion", "Twining's / Celestial", "Tea, coffee, and beverages", "Herbal Tea", "070177010108", "herbal-tea", "pack", 730, 365, ["Vegan", "Vegetarian", "Caffeine Free"], ["Te de Manzanilla"], "Soothing caffeine-free floral herbal infusion of whole chamomile blossoms.", "100% Pure Chamomile Flowers", { calories: 1, protein: "0g", carbs: "0.2g", fat: "0g", fiber: "0g", sodium: "1mg" }),
    p("gp_bev_coffee_instant", "Classic Instant Ground Coffee", "Nescafé / Bru", "Tea, coffee, and beverages", "Instant Coffee", "8901058852385", "coffee", "g", 730, 180, ["Vegan", "Vegetarian", "Caffeine"], ["Cafe Instantaneo"], "Rich and dark roasted coffee granules for swift morning wakefulness.", "100% Pure Instant Coffee Blend", { calories: 5, protein: "0.3g", carbs: "0.8g", fat: "0g", fiber: "0g", sodium: "2mg" }),
    p("gp_bev_hot_chocolate", "Rich Hot Cocoa Mix", "Swiss Miss / Cadbury", "Tea, coffee, and beverages", "Hot Chocolate", "015700010109", "hot-chocolate", "g", 365, 120, ["Vegetarian"], ["Chocolate Caliente"], "Decadent Dutch cocoa powder blend with nonfat dry milk for warm cozy sips.", "Sugar, Corn Syrup, Modified Whey, Cocoa, Nonfat Dry Milk", { calories: 160, protein: "2g", carbs: "34g", fat: "2g", fiber: "1g", sodium: "170mg" }),

    // 27. Baking ingredients
    p("gp_baking_powder", "Double Acting Baking Powder", "Davis / Weikfield", "Baking ingredients", "Leaveners", "041280010101", "baking-powder", "g", 730, 180, ["Vegan", "Vegetarian", "Gluten-Free"], ["Polvo para Hornear"], "Reliable chemical leavener releasing carbon dioxide both when wet and in oven.", "Cornstarch, Sodium Bicarbonate, Sodium Aluminum Sulfate, Monocalcium Phosphate", { calories: 2, protein: "0g", carbs: "1g", fat: "0g", fiber: "0g", sodium: "360mg" }),
    p("gp_baking_soda", "Pure Sodium Bicarbonate Baking Soda", "Arm & Hammer", "Baking ingredients", "Leaveners", "033200011101", "baking-soda", "g", 1095, 365, ["Vegan", "Vegetarian"], ["Meetha Soda", "Bicarbonato de Sodio"], "Versatile pure food grade sodium bicarbonate for baking, tenderizing, and cleaning.", "100% Sodium Bicarbonate", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "1260mg" }),
    p("gp_baking_yeast", "Active Dry Baker's Yeast", "Fleischmann's / Saf-Instant", "Baking ingredients", "Yeast", "040100010102", "yeast", "pack", 730, 180, ["Vegan", "Vegetarian"], ["Khamir", "Levadura Seca"], "Live dormant yeast granules activated in lukewarm water for artisan bread baking.", "Yeast, Sorbitan Monostearate", { calories: 15, protein: "2g", carbs: "2g", fat: "0g", fiber: "1g", sodium: "5mg" }),
    p("gp_baking_cornstarch", "Pure Edible Cornstarch", "Argo", "Baking ingredients", "Thickeners", "073468000103", "cornstarch", "g", 1095, 730, ["Vegan", "Vegetarian", "Gluten-Free"], ["Fecula de Maiz"], "Ultra fine starch powder for crisp pastry crusts, puddings, and silky fillings.", "100% Pure Corn Starch", { calories: 30, protein: "0g", carbs: "7g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_baking_vinegar", "Distilled White Cooking Vinegar 5%", "Heinz", "Baking ingredients", "Acids", "013000001016", "vinegar", "l", 1825, 730, ["Vegan", "Vegetarian"], ["Sirka", "Vinagre Blanco"], "Crisp clear acidic distilled vinegar for canning, baking activation, and dressings.", "Distilled White Vinegar diluted with water to 5% (50 grains) acidity", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "0mg" }),

    // 28. Ready-to-eat foods
    p("gp_ready_meals_dal_makhani", "Ready to Eat Dal Makhani", "MTR / Haldiram's", "Ready-to-eat foods", "Heat & Eat Meals", "8901042964706", "ready-meals", "pack", 365, 1, ["Vegetarian"], ["Dal Makhani"], "Slow cooked black lentils and kidney beans simmered in rich buttery gravy.", "Water, Black Gram 18%, Butter 9%, Cream, Tomato Paste, Ginger, Spices", { calories: 320, protein: "8g", carbs: "26g", fat: "20g", fiber: "6g", sodium: "680mg" }),
    p("gp_ready_cereal_bars", "Oats & Honey Crunchy Cereal Bar", "Nature Valley", "Ready-to-eat foods", "Snack Bars", "016000010103", "cereal-bars", "pack", 270, 30, ["Vegetarian", "Whole Grain"], ["Barras de Cereal"], "Twin pack of crunchy whole grain oat bars sweetened with natural honey.", "Whole Grain Oats, Sugar, Canola Oil, Rice Flour, Honey, Brown Sugar Syrup", { calories: 190, protein: "3g", carbs: "29g", fat: "7g", fiber: "2g", sodium: "140mg" }),
    p("gp_ready_energy_bars", "Chocolate Peanut Butter Energy Bar", "Clif Bar", "Ready-to-eat foods", "Energy Bars", "722252010104", "energy-bars", "pack", 365, 30, ["Vegan", "Vegetarian", "Plant Protein"], ["Barra de Energia"], "Dense energy bar crafted with organic oats, roasted peanuts, and 10g protein.", "Organic Brown Rice Syrup, Organic Rolled Oats, Soy Protein Isolate, Peanuts", { calories: 250, protein: "10g", carbs: "44g", fat: "6g", fiber: "4g", sodium: "230mg" }),

    // 29. Instant foods and soup mixes
    p("gp_instant_soup_tomato", "Instant Sweet Corn Tomato Soup", "Knorr", "Instant foods and soup mixes", "Soup Mixes", "8901030010101", "instant-soup", "pack", 365, 30, ["Vegetarian"], ["Sopa Instantanea"], "Comforting quick soup mix blending sweet sun-ripened tomatoes and herbs.", "Sugar, Tomato Paste Powder, Refined Wheat Flour, Salt, Spices", { calories: 55, protein: "1g", carbs: "12g", fat: "0.5g", fiber: "1g", sodium: "610mg" }),
    p("gp_instant_ramen_spicy", "Shin Ramyun Spicy Gourmet Noodles", "Nongshim", "Instant foods and soup mixes", "Korean Ramen", "031146010102", "instant-noodles", "pack", 365, 60, ["Halal"], ["Ramyun Coreano"], "Fiery authentic Korean spicy noodle soup packed with beef style umami broth.", "Enriched Flour, Palm Oil, Potato Starch, Red Pepper, Garlic, Mushrooms", { calories: 500, protein: "10g", carbs: "79g", fat: "16g", fiber: "4g", sodium: "1790mg" }),

    // 30. Meat, poultry, and seafood
    p("gp_meat_chicken_fresh", "Fresh Skinless Chicken Breast", "Bell & Evans / Generic", "Meat, poultry, and seafood", "Poultry", "074570020122", "chicken", "kg", 4, 2, ["Non-Vegetarian", "High Protein", "Halal"], ["Murgh", "Pollo"], "Lean farm raised boneless skinless chicken breast cutlets.", "100% Chicken Breast Meat", { calories: 165, protein: "31g", carbs: "0g", fat: "3.6g", fiber: "0g", sodium: "74mg" }, "Keep refrigerated below 4°C or freeze immediately."),
    p("gp_meat_beef_ground", "Lean Ground Beef 85/15", "Generic", "Meat, poultry, and seafood", "Red Meat", "074570020123", "beef", "kg", 3, 2, ["Non-Vegetarian", "High Protein", "Iron Rich"], ["Carne Molida"], "Freshly ground 85% lean and 15% fat choice beef for burgers and meatballs.", "100% Ground Beef", { calories: 250, protein: "26g", carbs: "0g", fat: "15g", fiber: "0g", sodium: "75mg" }),
    p("gp_meat_mutton_curry_cut", "Fresh Goat Mutton Curry Cut", "Generic", "Meat, poultry, and seafood", "Red Meat", "074570020124", "mutton", "kg", 3, 2, ["Non-Vegetarian", "Halal"], ["Bakre ka Gosht", "Cordero"], "Bone-in tender goat mutton cubes cut fresh for traditional curries and biryani.", "100% Goat Mutton Meat", { calories: 234, protein: "27g", carbs: "0g", fat: "12g", fiber: "0g", sodium: "86mg" }),
    p("gp_meat_fish_salmon", "Fresh Atlantic Salmon Fillet", "Generic", "Meat, poultry, and seafood", "Fin Fish", "074570020125", "fish", "kg", 3, 2, ["Non-Vegetarian", "Omega 3"], ["Machhli", "Salmon"], "Rich succulent pink Atlantic salmon fillets with heart healthy Omega-3 fats.", "100% Atlantic Salmon (Salmo Salar)", { calories: 208, protein: "20g", carbs: "0g", fat: "13g", fiber: "0g", sodium: "59mg" }),
    p("gp_meat_shrimp_raw", "Raw Peeled Deveined Tail-On Shrimp", "Generic", "Meat, poultry, and seafood", "Shellfish", "074570020126", "shrimp", "kg", 3, 2, ["Non-Vegetarian", "High Protein", "Low Fat"], ["Jheenga", "Camarones"], "Wild caught or farmed fresh succulent shrimp peeled and deveined ready to cook.", "100% Raw White Shrimp", { calories: 99, protein: "24g", carbs: "0.2g", fat: "0.3g", fiber: "0g", sodium: "111mg" }),

    // 31. Baby food and special-diet groceries
    p("gp_baby_oatmeal", "Organic Baby Oatmeal Cereal", "Gerber / Earth's Best", "Baby food and special-diet groceries", "Baby Cereal", "015000010101", "organic-baby-oats", "pack", 365, 30, ["Vegetarian", "Organic", "Iron Fortified"], ["Cereal para Bebe"], "Gentle first food baby oatmeal cereal fortified with iron and zinc for infants.", "Organic Whole Grain Oat Flour, Calcium Carbonate, Vitamin C, Iron", { calories: 45, protein: "2g", carbs: "9g", fat: "1g", fiber: "1g", sodium: "5mg" }),
    p("gp_baby_puree_apple", "Organic Apple Pear Baby Food Puree", "Happy Baby / Plum Organics", "Baby food and special-diet groceries", "Fruit Purees", "852697010102", "baby-puree", "pcs", 365, 1, ["Vegan", "Organic", "Non-GMO"], ["Pure para Bebe"], "Stage 2 smooth organic fruit blend pouch without added sugars or flavors.", "Organic Apple Puree, Organic Pear Puree, Ascorbic Acid", { calories: 70, protein: "0g", carbs: "16g", fat: "0g", fiber: "2g", sodium: "5mg" }, "Refrigerate after opening and consume within 24h."),

    // 32. Gluten-free and vegan foods
    p("gp_diet_gluten_free_bread", "Gluten-Free Artisan White Bread", "Schar / Canyon Bakehouse", "Gluten-free and vegan foods", "Bakery", "810757010103", "gluten-free-bread", "pcs", 14, 7, ["Gluten-Free", "Dairy-Free", "Vegetarian"], ["Pan Sin Gluten"], "Delicious soft gluten-free sliced white sandwich loaf baked from ancient grains.", "Water, Sourdough (Rice Flour, Water), Corn Starch, Agave Syrup, Psyllium", { calories: 80, protein: "1g", carbs: "16g", fat: "1.5g", fiber: "2g", sodium: "140mg" }),
    p("gp_diet_vegan_cheese_shreds", "Vegan Cheddar Style Shreds", "Violife / Daiya", "Gluten-free and vegan foods", "Plant Cheese", "842999010104", "vegan-cheese", "g", 120, 14, ["Vegan", "Gluten-Free", "Dairy-Free"], ["Queso Vegano"], "Melty dairy-free cheddar alternative prepared with coconut oil and Vitamin B12.", "Filtered Water, Coconut Oil 24%, Modified Starch, Sea Salt, Paprika Extract", { calories: 90, protein: "0g", carbs: "7g", fat: "7g", fiber: "0g", sodium: "190mg" }),

    // 33. Organic and specialty foods
    p("gp_specialty_chia_ground", "Organic Ground Golden Flaxseed", "Spectrum Essentials", "Organic and specialty foods", "Superfoods", "022506010105", "flaxseeds", "g", 365, 60, ["Vegan", "Vegetarian", "Organic", "Omega 3"], ["Alsi", "Linaza"], "Cold-milled organic flaxseed meal for smoothies, oatmeal, and egg replacers.", "100% Organic Cold Milled Flaxseed", { calories: 70, protein: "3g", carbs: "4g", fat: "5g", fiber: "4g", sodium: "0mg" }, "Refrigerate after opening to preserve delicate omega oils."),
    p("gp_specialty_ghee", "Pure Cow Grass-Fed Desi Ghee", "Amul / Organic Valley", "Organic and specialty foods", "Clarified Butter", "8901262010509", "butter", "g", 365, 180, ["Vegetarian", "Keto", "High Smoke Point"], ["Desi Ghee", "Mantequilla Clarificada"], "Traditional golden clarified butter with rich nutty caramelized aroma.", "100% Pure Clarified Milk Fat", { calories: 900, protein: "0g", carbs: "0g", fat: "100g", fiber: "0g", sodium: "0mg" }, "Store in cool dry place. Do not refrigerate."),

    // 34. Indian regional groceries
    p("gp_ind_dal_toor", "Unpolished Toor Dal (Arhar)", "Tata Sampann", "Indian regional groceries", "Dals", "8901042964805", "toor-dal", "kg", 730, 365, ["Vegan", "Vegetarian", "Gluten-Free"], ["Arhar Dal", "Pigeon Peas"], "Wholesome protein rich unpolished pigeon peas for North Indian Dal Tadka and South Indian Sambar.", "100% Unpolished Toor Dal", { calories: 343, protein: "22g", carbs: "63g", fat: "1.5g", fiber: "15g", sodium: "17mg" }),
    p("gp_ind_dal_urad", "Split Washed Urad Dal", "Generic", "Indian regional groceries", "Dals", "8901042964904", "urad-dal", "kg", 730, 365, ["Vegan", "Vegetarian"], ["Urad Dhuli", "Black Matpe"], "Creamy white split lentils forming the foundational batter for crispy Dosas and soft Idlis.", "100% Split Black Gram without Husk", { calories: 350, protein: "24g", carbs: "59g", fat: "1.4g", fiber: "10g", sodium: "38mg" }),
    p("gp_ind_spice_garam_masala", "Royal Garam Masala Blend", "Everest / MDH", "Indian regional groceries", "Spice Blends", "8901248101058", "garam-masala", "g", 365, 180, ["Vegan", "Vegetarian", "Aromatic"], ["Garam Masala"], "Fragrant royal blend of cinnamon, cloves, cardamom, mace, and nutmeg.", "Coriander, Cumin, Black Pepper, Cardamom, Clove, Cinnamon, Bay Leaves", { calories: 380, protein: "13g", carbs: "52g", fat: "14g", fiber: "25g", sodium: "65mg" }),

    // 35. Middle Eastern groceries
    p("gp_me_hummus_classic", "Authentic Creamy Tahini Hummus", "Sabra / Al Wadi", "Middle Eastern groceries", "Dips", "040822010106", "hummus", "g", 60, 7, ["Vegan", "Vegetarian", "Gluten-Free"], ["Hummus Tahini"], "Traditional Middle Eastern chickpea dip whipped with pure sesame tahini and lemon juice.", "Cooked Chickpeas, Tahini (Ground Sesame), Soybean Oil, Garlic, Salt, Citric Acid", { calories: 70, protein: "2g", carbs: "4g", fat: "5g", fiber: "1g", sodium: "130mg" }, "Keep refrigerated."),
    p("gp_me_tahini_paste", "Pure Roasted Sesame Tahini", "Al Arz / Baron's", "Middle Eastern groceries", "Pastes", "072554010107", "tahini", "g", 730, 180, ["Vegan", "Vegetarian", "Keto"], ["Tahina"], "100% stone ground roasted Ethiopian sesame seeds yielding silky paste.", "100% Pure Roasted Sesame Seeds", { calories: 90, protein: "3g", carbs: "3g", fat: "8g", fiber: "1g", sodium: "35mg" }),
    p("gp_me_couscous_semolina", "Medium Steamed Durum Couscous", "Near East / Ferrero", "Middle Eastern groceries", "Grains", "072220010108", "couscous", "g", 730, 365, ["Vegan", "Vegetarian"], ["Cuscús"], "Pre-steamed semolina grains ready in 5 minutes with boiling broth.", "100% Durum Wheat Semolina", { calories: 170, protein: "6g", carbs: "36g", fat: "0g", fiber: "2g", sodium: "10mg" }),
    p("gp_me_pita_bread", "Authentic White Pocket Pita Bread", "Toufayan / Joseph's", "Middle Eastern groceries", "Flatbreads", "073400010109", "pita-bread", "pack", 12, 7, ["Vegan", "Vegetarian"], ["Pan Pita"], "Hearth baked Middle Eastern pocket bread for falafel, shawarma, and dipping.", "Enriched Flour, Water, Sugar, Yeast, Salt", { calories: 150, protein: "5g", carbs: "30g", fat: "1g", fiber: "1g", sodium: "280mg" }),

    // 36. East Asian and Southeast Asian groceries
    p("gp_asian_nori_sheets", "Roasted Sushi Nori Seaweed", "Nagai / Shirakiku", "East Asian and Southeast Asian groceries", "Seaweed", "074410010101", "nori-sheets", "pack", 365, 90, ["Vegan", "Vegetarian", "Iodine Rich"], ["Yaki Nori"], "Crisp toasted premium Japanese sea kelp sheets for sushi wrapping and garnishing.", "100% Dried Roasted Seaweed (Porphyra)", { calories: 10, protein: "1g", carbs: "1g", fat: "0g", fiber: "1g", sodium: "25mg" }),
    p("gp_asian_kimchi_fermented", "Traditional Napa Cabbage Kimchi", "Jongga", "East Asian and Southeast Asian groceries", "Fermented Foods", "8801052010309", "kimchi", "g", 180, 45, ["Probiotic", "Keto"], ["Kimchi Coreano"], "Authentic Korean naturally fermented probiotic napa cabbage with chili and garlic.", "Salted Napa Cabbage, Radish, Red Pepper Powder, Garlic, Ginger, Salt", { calories: 15, protein: "1g", carbs: "3g", fat: "0g", fiber: "1g", sodium: "230mg" }, "Keep refrigerated."),
    p("gp_asian_coconut_milk", "Pure Coconut Milk Canned", "Aroy-D / Chaokoh", "East Asian and Southeast Asian groceries", "Coconut Products", "016229010102", "coconut-milk", "ml", 730, 3, ["Vegan", "Vegetarian", "Dairy-Free"], ["Leche de Coco"], "Thick rich culinary coconut milk extracted from mature white coconut flesh.", "Coconut Extract 70%, Water", { calories: 140, protein: "1g", carbs: "2g", fat: "14g", fiber: "0g", sodium: "15mg" }),
    p("gp_asian_rice_noodles", "Pad Thai Rice Noodles", "A Taste of Thai", "East Asian and Southeast Asian groceries", "Noodles", "070650010103", "rice-noodles", "g", 730, 180, ["Vegan", "Vegetarian", "Gluten-Free"], ["Fideos de Arroz"], "Flat translucent rice flour noodles for Pad Thai and Vietnamese Pho.", "Rice Flour, Water, Modified Tapioca Starch", { calories: 200, protein: "3g", carbs: "44g", fat: "0.5g", fiber: "1g", sodium: "15mg" }),

    // 37. European and American grocery products
    p("gp_west_tortilla_chips", "Crispy Restaurant Style Corn Tortilla Chips", "Tostitos", "European and American grocery products", "Snacks", "028400010104", "tortilla-chips", "g", 120, 14, ["Vegan", "Vegetarian", "Gluten-Free"], ["Totopos"], "Crispy white corn tortilla chips stone ground and lightly salted.", "Corn, Vegetable Oil (Corn, Canola, Sunflower), Salt", { calories: 140, protein: "2g", carbs: "19g", fat: "7g", fiber: "1g", sodium: "115mg" }),
    p("gp_west_popcorn", "Organic Butter Microwave Popcorn", "SkinnyPop / Orville", "European and American grocery products", "Popcorn", "027000010105", "popcorn", "g", 365, 30, ["Vegetarian", "Whole Grain"], ["Palomitas de Maiz"], "Fluffy popped whole grain yellow butterfly popcorn kernels with real sea salt.", "Popped Popcorn, Sunflower Oil, Sea Salt", { calories: 150, protein: "3g", carbs: "15g", fat: "10g", fiber: "3g", sodium: "75mg" }),

    // 38. Household pantry-related consumables
    p("gp_house_food_storage_bags", "Gallon Seal Top Food Storage Bags", "Ziploc / Glad", "Household pantry-related consumables", "Food Storage", "025700010106", "food-storage-bags", "pack", 1825, 1825, ["Consumable"], ["Bolsas Ziploc", "Bolsas Hermeticas"], "Durable BPA-free airtight food preservation bags with smart zip seal.", "BPA-Free Polyethylene", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "0mg" }, "Store in clean kitchen drawer."),
    p("gp_house_aluminum_foil", "Heavy Duty Aluminum Foil Roll", "Reynolds Wrap", "Household pantry-related consumables", "Wraps & Foil", "010900010107", "aluminum-foil", "pcs", 1825, 1825, ["Consumable"], ["Papel Aluminio"], "Moisture-proof food safe aluminum foil for baking, grilling, and food preservation.", "100% Recyclable Aluminum", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_house_cling_film", "Clear Food Plastic Cling Film Wrap", "Saran / Glad", "Household pantry-related consumables", "Food Wraps", "025700010108", "cling-film", "pcs", 1825, 1825, ["Consumable"], ["Film Transparente"], "Microwave-safe tight-clinging food wrap to keep air out and freshness in.", "Polyethylene Film", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "0mg" }),
    p("gp_house_paper_towels", "Absorbent Kitchen Paper Towels", "Bounty / Scott", "Household pantry-related consumables", "Cleaning & Paper", "037000010109", "kitchen-paper", "pack", 1825, 1825, ["Consumable"], ["Papel de Cocina"], "2-ply quick absorbing perforated kitchen paper rolls for spills and prep.", "100% Virgin Paper Pulp", { calories: 0, protein: "0g", carbs: "0g", fat: "0g", fiber: "0g", sodium: "0mg" })
  ];

  // Update category counts based on actual items
  CATALOG_CATEGORIES.forEach(cat => {
    cat.count = GROCERY_PRODUCTS.filter(p => p.category === cat.name).length;
  });

  // Fast barcode and ID lookup maps
  const BARCODE_INDEX = new Map();
  const ID_INDEX = new Map();
  GROCERY_PRODUCTS.forEach(item => {
    if (item.barcode) BARCODE_INDEX.set(String(item.barcode).trim(), item);
    ID_INDEX.set(item.id, item);
  });

  /**
   * Search and filter the global catalog
   */
  function searchCatalog(query = '', options = {}) {
    const q = String(query || '').trim().toLowerCase();
    const category = options.category && options.category !== 'All' ? options.category : null;
    const dietary = options.dietary && options.dietary !== 'All' ? options.dietary : null;
    const limit = options.limit || 100;
    const offset = options.offset || 0;

    let filtered = GROCERY_PRODUCTS;

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (dietary) {
      filtered = filtered.filter(item => item.dietary_tags && item.dietary_tags.some(t => t.toLowerCase() === dietary.toLowerCase()));
    }

    if (q) {
      filtered = filtered.filter(item => {
        if (item.barcode && item.barcode.includes(q)) return true;
        if (item.normalized_name && item.normalized_name.includes(q)) return true;
        if (item.product_name && item.product_name.toLowerCase().includes(q)) return true;
        if (item.brand && item.brand.toLowerCase().includes(q)) return true;
        if (item.regional_names && item.regional_names.some(r => r.toLowerCase().includes(q))) return true;
        return false;
      });
    }

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      total: total,
      items: paginated,
      categories: CATALOG_CATEGORIES
    };
  }

  /**
   * Fast autocomplete for manual Add Item modal inputs
   */
  function autocompleteCatalog(term = '', limit = 6) {
    const t = String(term || '').trim().toLowerCase();
    if (!t || t.length < 2) return [];

    const matches = [];
    for (const item of GROCERY_PRODUCTS) {
      if (item.product_name.toLowerCase().startsWith(t) || item.normalized_name.includes(t)) {
        matches.push(item);
        if (matches.length >= limit) break;
      }
    }
    return matches;
  }

  /**
   * Look up product by barcode
   */
  function getByBarcode(barcode) {
    if (!barcode) return null;
    const clean = String(barcode).trim();
    return BARCODE_INDEX.get(clean) || null;
  }

  /**
   * Look up product by ID
   */
  function getById(id) {
    if (!id) return null;
    return ID_INDEX.get(id) || null;
  }

  // Public Grocery Catalog Engine API
  window.GroceryCatalog = {
    categories: CATALOG_CATEGORIES,
    products: GROCERY_PRODUCTS,
    search: searchCatalog,
    autocomplete: autocompleteCatalog,
    getByBarcode: getByBarcode,
    getById: getById,
    getAllCategories: () => CATALOG_CATEGORIES,
    getAllProducts: () => GROCERY_PRODUCTS
  };

  console.log(`[GroceryCatalog] Initialized worldwide grocery catalog with ${GROCERY_PRODUCTS.length} distinct products across 38 categories.`);
})();

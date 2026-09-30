/**
 * IntelliPantry — Universal Estimated Shelf-Life Database & Expiry Prediction Engine
 * 
 * IMPORTANT SAFETY DISCLAIMER:
 * Estimated shelf life is a general reference only, not a guaranteed expiry date.
 * Always follow the manufacturer's printed expiry/use-by/best-before date and storage instructions.
 * The actual manufacturer date must always take priority over estimated dates.
 */

(function(window) {
  'use strict';

  // ==============================================================================
  // 1. UNIVERSAL REFERENCE SHELF-LIFE DATABASE
  // ==============================================================================
  // Initial database values matching specification + common household groceries
  const SHELF_LIFE_DATABASE = [
    // Dairy
    {
      product_name: "Fresh Milk",
      product: "Fresh Milk",
      category: "Dairy",
      typical_shelf_life_days: 7,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 7,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Keep refrigerated below 4°C. Consume within 3–5 days after opening."
    },
    {
      product_name: "UHT Milk",
      category: "Dairy",
      typical_shelf_life_days: 270,
      opened_shelf_life_days: 7,
      refrigerated_shelf_life_days: 7,
      frozen_shelf_life_days: null,
      storage_type: "Pantry / Refrigerator after opening",
      storage_recommendation: "Store unopened at room temperature. Refrigerate immediately after opening and consume within 3–7 days."
    },
    {
      product_name: "Yogurt / Curd",
      category: "Dairy",
      typical_shelf_life_days: 28,
      opened_shelf_life_days: 7,
      refrigerated_shelf_life_days: 28,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Keep refrigerated below 4°C. Consume within 3–7 days of opening."
    },
    {
      product_name: "Cheese",
      category: "Dairy",
      typical_shelf_life_days: 90,
      opened_shelf_life_days: 21,
      refrigerated_shelf_life_days: 90,
      frozen_shelf_life_days: 180,
      storage_type: "Refrigerator",
      storage_recommendation: "Wrap tightly in parchment or wax paper; store in refrigerator drawer. Consume within 7–28 days."
    },
    {
      product_name: "Butter",
      category: "Dairy",
      typical_shelf_life_days: 180,
      opened_shelf_life_days: 30,
      refrigerated_shelf_life_days: 180,
      frozen_shelf_life_days: 365,
      storage_type: "Refrigerator",
      storage_recommendation: "Store refrigerated in airtight butter dish or original wrapper; can be frozen up to 1 year."
    },
    {
      product_name: "Paneer",
      category: "Dairy",
      typical_shelf_life_days: 7,
      opened_shelf_life_days: 3,
      refrigerated_shelf_life_days: 7,
      frozen_shelf_life_days: 90,
      storage_type: "Refrigerator",
      storage_recommendation: "Submerge in water in refrigerator and change water daily; consume within 2–3 days of opening."
    },
    {
      product_name: "Ghee",
      category: "Dairy",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 180,
      refrigerated_shelf_life_days: 365,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep in a clean airtight container away from direct sunlight and moisture."
    },

    // Eggs
    {
      product_name: "Eggs",
      category: "Eggs",
      typical_shelf_life_days: 35,
      opened_shelf_life_days: null,
      refrigerated_shelf_life_days: 35,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Store in original carton on an inside refrigerator shelf, not the door."
    },

    // Grains & Flours
    {
      product_name: "Rice",
      category: "Grains",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 180,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in a cool, dark, dry place in an airtight container to prevent pests."
    },
    {
      product_name: "Wheat",
      category: "Grains",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 180,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep in airtight containers in a cool and dry pantry."
    },
    {
      product_name: "Wheat Flour",
      category: "Flour",
      typical_shelf_life_days: 180,
      opened_shelf_life_days: 90,
      refrigerated_shelf_life_days: 365,
      frozen_shelf_life_days: 730,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in an airtight container in a dry cupboard or freezer to extend freshness."
    },
    {
      product_name: "Oats",
      category: "Grains",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 180,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep tightly sealed in a dry pantry away from heat and moisture."
    },
    {
      product_name: "Pasta",
      category: "Dry Food",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 365,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in dry airtight container away from moisture."
    },
    {
      product_name: "Noodles",
      category: "Dry Food",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 180,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep in original packaging or sealed airtight container in pantry."
    },

    // Pulses & Legumes
    {
      product_name: "Dal",
      category: "Pulses",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 365,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep in an airtight jar in a cool, dark pantry. Protect from moisture."
    },
    {
      product_name: "Lentils",
      category: "Pulses",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 365,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in airtight containers in a cool and dry cupboard."
    },
    {
      product_name: "Dry Beans",
      category: "Pulses",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 365,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep sealed in airtight containers in a dry, ventilated area."
    },

    // Canned Food
    {
      product_name: "Canned Vegetables",
      category: "Canned Food",
      typical_shelf_life_days: 1095,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: null,
      storage_type: "Pantry / Refrigerator after opening",
      storage_recommendation: "Store unopened in pantry. Once opened, transfer contents to glass/plastic container and refrigerate for 3–4 days."
    },
    {
      product_name: "Canned Fruits",
      category: "Canned Food",
      typical_shelf_life_days: 1095,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: null,
      storage_type: "Pantry / Refrigerator after opening",
      storage_recommendation: "Store unopened in pantry. Once opened, transfer contents to glass/plastic container and refrigerate for 3–4 days."
    },
    {
      product_name: "Canned Meat",
      category: "Canned Food",
      typical_shelf_life_days: 1825,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: null,
      storage_type: "Pantry / Refrigerator after opening",
      storage_recommendation: "Store unopened in pantry. Once opened, transfer contents to covered glass/plastic container and refrigerate for 3–4 days."
    },

    // Spices & Staples (Salt, Sugar, Honey: 1825+ days general long shelf life)
    {
      product_name: "Whole Spices",
      category: "Spices",
      typical_shelf_life_days: 1095,
      opened_shelf_life_days: 730,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in airtight glass or metal spice jars away from heat, steam, and direct light."
    },
    {
      product_name: "Ground Spices",
      category: "Spices",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 365,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store tightly sealed away from stove heat and humidity to retain aroma and potency."
    },
    {
      product_name: "Salt",
      category: "Staples",
      typical_shelf_life_days: 1825,
      opened_shelf_life_days: null,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep dry in a tightly covered container. Non-perishable mineral; 1825+ days indefinite shelf life."
    },
    {
      product_name: "Sugar",
      category: "Staples",
      typical_shelf_life_days: 1825,
      opened_shelf_life_days: null,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in an airtight container to keep out moisture, insects, and odors. 1825+ days indefinite shelf life."
    },
    {
      product_name: "Honey",
      category: "Sweeteners",
      typical_shelf_life_days: 1825,
      opened_shelf_life_days: null,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep tightly capped at room temperature. Does not spoil; crystallization is natural and reversible with gentle warming."
    },
    {
      product_name: "Cooking Oil",
      category: "Oils",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 270,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep tightly capped in a dark pantry cupboard away from stove heat."
    },

    // Condiments & Sauces
    {
      product_name: "Ketchup",
      category: "Condiments",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 30,
      refrigerated_shelf_life_days: 180,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Refrigerate after opening to maintain flavor and prevent spoilage; consume within 30 days."
    },
    {
      product_name: "Mayonnaise",
      category: "Condiments",
      typical_shelf_life_days: 180,
      opened_shelf_life_days: 60,
      refrigerated_shelf_life_days: 60,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Always refrigerate immediately after opening; do not freeze. Consume within 30–60 days."
    },
    {
      product_name: "Soy Sauce",
      category: "Sauces",
      typical_shelf_life_days: 1095,
      opened_shelf_life_days: 365,
      refrigerated_shelf_life_days: 365,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry / Refrigerator",
      storage_recommendation: "Can be kept in cool pantry; refrigerating after opening preserves peak flavor for up to 1 year."
    },
    {
      product_name: "Pickles",
      category: "Condiments",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 90,
      refrigerated_shelf_life_days: 90,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Keep brine covering pickles. Refrigerate after opening and use a dry, clean spoon."
    },

    // Bakery & Snacks
    {
      product_name: "Bread",
      category: "Bakery",
      typical_shelf_life_days: 7,
      opened_shelf_life_days: 7,
      refrigerated_shelf_life_days: 14,
      frozen_shelf_life_days: 90,
      storage_type: "Room Temperature",
      storage_recommendation: "Store in a cool dry breadbox at room temperature. Freeze sliced loaf for up to 3 months."
    },
    {
      product_name: "Biscuits",
      category: "Snacks",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 30,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in an airtight biscuit tin to prevent sogginess. Consume within 30 days."
    },
    {
      product_name: "Cookies",
      category: "Snacks",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 30,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep in an airtight jar with a moisture-absorbent seal away from direct sunlight."
    },
    {
      product_name: "Breakfast Cereal",
      category: "Cereals",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 90,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Roll inner bag tightly and clip shut or transfer to airtight cereal container."
    },
    {
      product_name: "Chocolate",
      category: "Snacks",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 30,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store between 15–18°C in a dry cupboard away from strong odors and heat."
    },

    // Nuts & Spreads
    {
      product_name: "Almonds",
      category: "Nuts",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 90,
      refrigerated_shelf_life_days: 180,
      frozen_shelf_life_days: 365,
      storage_type: "Cool & Dry / Refrigerator",
      storage_recommendation: "Keep in an airtight container; refrigerate or freeze to protect delicate natural oils from rancidity."
    },
    {
      product_name: "Cashews",
      category: "Nuts",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 90,
      refrigerated_shelf_life_days: 180,
      frozen_shelf_life_days: 365,
      storage_type: "Cool & Dry / Refrigerator",
      storage_recommendation: "Store in sealed jar in a cool pantry or refrigerator to preserve freshness."
    },
    {
      product_name: "Peanuts",
      category: "Nuts",
      typical_shelf_life_days: 180,
      opened_shelf_life_days: 60,
      refrigerated_shelf_life_days: 180,
      frozen_shelf_life_days: 365,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in airtight container in a cool, dark location."
    },
    {
      product_name: "Peanut Butter",
      category: "Spreads",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 180,
      refrigerated_shelf_life_days: 180,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry / Refrigerator",
      storage_recommendation: "Store in a cool dry pantry. Natural peanut butter without stabilizers should be refrigerated after opening."
    },

    // Beverages
    {
      product_name: "Coffee",
      category: "Beverages",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 90,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: 730,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Keep in an opaque, airtight canister at room temperature away from heat, light, and moisture."
    },
    {
      product_name: "Tea",
      category: "Beverages",
      typical_shelf_life_days: 730,
      opened_shelf_life_days: 365,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store loose leaf or tea bags in an airtight tin away from spices and moisture."
    },
    {
      product_name: "Packaged Juice",
      category: "Beverages",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 7,
      refrigerated_shelf_life_days: 7,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator after opening",
      storage_recommendation: "Unopened in pantry; refrigerate immediately after breaking seal and consume within 5–7 days."
    },
    {
      product_name: "Soft Drinks",
      category: "Beverages",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 3,
      refrigerated_shelf_life_days: 3,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator after opening",
      storage_recommendation: "Keep refrigerated after opening to preserve carbonation and flavor. Consume in 1–3 days."
    },

    // Vegetables
    {
      product_name: "Potatoes",
      category: "Vegetables",
      typical_shelf_life_days: 75,
      opened_shelf_life_days: 5,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dark Place",
      storage_recommendation: "Store in a well-ventilated basket in a cool, dark spot (not the fridge). Keep away from onions."
    },
    {
      product_name: "Onions",
      category: "Vegetables",
      typical_shelf_life_days: 75,
      opened_shelf_life_days: 10,
      refrigerated_shelf_life_days: 10,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in open mesh bags or ventilated bin in dry room. Once cut, refrigerate in airtight container up to 10 days."
    },
    {
      product_name: "Garlic",
      category: "Vegetables",
      typical_shelf_life_days: 135,
      opened_shelf_life_days: 10,
      refrigerated_shelf_life_days: 10,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store whole bulbs at room temperature in open mesh bag. Peeled cloves must be refrigerated."
    },
    {
      product_name: "Tomatoes",
      category: "Vegetables",
      typical_shelf_life_days: 7,
      opened_shelf_life_days: 3,
      refrigerated_shelf_life_days: 7,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Store stem-side down. Unripe tomatoes can ripen at room temp; refrigerate fully ripe tomatoes."
    },
    {
      product_name: "Carrots",
      category: "Vegetables",
      typical_shelf_life_days: 25,
      opened_shelf_life_days: 5,
      refrigerated_shelf_life_days: 25,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Remove green tops, keep in perforated produce bag in vegetable crisper drawer."
    },

    // Fruits
    {
      product_name: "Apples",
      category: "Fruits",
      typical_shelf_life_days: 45,
      opened_shelf_life_days: 5,
      refrigerated_shelf_life_days: 45,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Refrigerate in the crisper drawer. Keep separate from other produce as apples emit ethylene gas."
    },
    {
      product_name: "Bananas",
      category: "Fruits",
      typical_shelf_life_days: 5,
      opened_shelf_life_days: 2,
      refrigerated_shelf_life_days: 5,
      frozen_shelf_life_days: 60,
      storage_type: "Room Temperature / Refrigerator",
      storage_recommendation: "Keep at room temperature until ripe. Peel and freeze overripe bananas for smoothies/baking."
    },
    {
      product_name: "Oranges",
      category: "Fruits",
      typical_shelf_life_days: 21,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 21,
      frozen_shelf_life_days: null,
      storage_type: "Refrigerator",
      storage_recommendation: "Can stay at room temp for 5 days or refrigerated in crisper drawer for up to 3 weeks."
    },
    {
      product_name: "Grapes",
      category: "Fruits",
      typical_shelf_life_days: 10,
      opened_shelf_life_days: 3,
      refrigerated_shelf_life_days: 10,
      frozen_shelf_life_days: 180,
      storage_type: "Refrigerator",
      storage_recommendation: "Do not wash until ready to eat. Store unwashed in ventilated bag in the refrigerator."
    },

    // Meat & Seafood
    {
      product_name: "Raw Chicken",
      category: "Meat",
      typical_shelf_life_days: 2,
      opened_shelf_life_days: 2,
      refrigerated_shelf_life_days: 2,
      frozen_shelf_life_days: 270,
      storage_type: "Refrigerator",
      storage_recommendation: "Store on lowest refrigerator shelf to prevent drips. Cook within 1–2 days or freeze immediately."
    },
    {
      product_name: "Raw Beef",
      category: "Meat",
      typical_shelf_life_days: 4,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: 365,
      storage_type: "Refrigerator",
      storage_recommendation: "Keep refrigerated in cold meat drawer; cook or freeze within 3–5 days."
    },
    {
      product_name: "Raw Fish",
      category: "Seafood",
      typical_shelf_life_days: 2,
      opened_shelf_life_days: 2,
      refrigerated_shelf_life_days: 2,
      frozen_shelf_life_days: 180,
      storage_type: "Refrigerator",
      storage_recommendation: "Keep on ice or coldest part of fridge; cook within 1–2 days or freeze immediately."
    },
    {
      product_name: "Cooked Meat",
      category: "Cooked Food",
      typical_shelf_life_days: 4,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: 90,
      storage_type: "Refrigerator",
      storage_recommendation: "Chill within 2 hours of cooking; store in shallow airtight container in fridge for up to 3–4 days."
    },
    {
      product_name: "General Leftovers",
      category: "Cooked Food",
      typical_shelf_life_days: 4,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: 90,
      storage_type: "Refrigerator",
      storage_recommendation: "Cool and refrigerate in airtight container within 2 hours. Consume within 3–4 days."
    },

    // Frozen Food
    {
      product_name: "Frozen Vegetables",
      category: "Frozen Food",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: 365,
      storage_type: "Freezer",
      storage_recommendation: "Keep frozen at -18°C or colder. Seal bag tightly after each use to prevent freezer burn."
    },
    {
      product_name: "Frozen Chicken",
      category: "Frozen Food",
      typical_shelf_life_days: 270,
      opened_shelf_life_days: 2,
      refrigerated_shelf_life_days: 2,
      frozen_shelf_life_days: 270,
      storage_type: "Freezer",
      storage_recommendation: "Wrap tightly to prevent air exposure; thaw only in refrigerator, never on counter."
    },
    {
      product_name: "Frozen Meat",
      category: "Frozen Food",
      typical_shelf_life_days: 365,
      opened_shelf_life_days: 4,
      refrigerated_shelf_life_days: 4,
      frozen_shelf_life_days: 365,
      storage_type: "Freezer",
      storage_recommendation: "Store in heavy-duty freezer wrap or vacuum sealed bags at -18°C."
    },
    {
      product_name: "Frozen Fish",
      category: "Frozen Food",
      typical_shelf_life_days: 180,
      opened_shelf_life_days: 2,
      refrigerated_shelf_life_days: 2,
      frozen_shelf_life_days: 180,
      storage_type: "Freezer",
      storage_recommendation: "Keep frozen until ready to cook. Best used within 3–6 months for optimal texture."
    }
  ];

  // Add metadata fields
  SHELF_LIFE_DATABASE.forEach(item => {
    item.product = item.product_name;
    item.is_estimate = true;
    item.source_type = "general_estimate";
  });

  // ==============================================================================
  // 2. CALENDAR DATE & TIMEZONE UTILITIES (ZERO TIMEZONE SHIFTS)
  // ==============================================================================
  const DEFAULT_TIMEZONE = "Asia/Kolkata";

  function getUserTimezone() {
    if (typeof window !== "undefined" && window.store) {
      const full = window.store.getFullSettings ? window.store.getFullSettings() : null;
      if (full?.general_settings?.timezone) return full.general_settings.timezone;
    }
    return DEFAULT_TIMEZONE;
  }

  // Returns "YYYY-MM-DD" for today strictly in the user's local timezone
  function getTodayLocalISO(tz = null) {
    const timezone = tz || getUserTimezone();
    try {
      const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
      return formatter.format(new Date());
    } catch (e) {
      // Fallback
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
  }

  function isLeapYear(year) {
    const y = Number(year);
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  }

  function isDateComponentsValid(y, m, d) {
    if (isNaN(y) || isNaN(m) || isNaN(d)) return false;
    if (m < 1 || m > 12 || d < 1) return false;
    const daysInMonth = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return d <= daysInMonth[m - 1];
  }

  function isValidCalendarDate(yearOrDateStr, month, day) {
    if (month === undefined && day === undefined) {
      if (!yearOrDateStr) return false;
      const comp = parseDateComponents(String(yearOrDateStr));
      return Boolean(comp);
    }
    return isDateComponentsValid(Number(yearOrDateStr), Number(month), Number(day));
  }

  // Safely parse date into { year, month, day }
  function parseDateComponents(dateStr) {
    if (!dateStr) return null;
    const s = String(dateStr).trim();
    if (!s) return null;

    // 1. YYYY-MM-DD, YYYY/MM/DD
    const isoMatch = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (isoMatch) {
      const y = parseInt(isoMatch[1], 10);
      const m = parseInt(isoMatch[2], 10);
      const d = parseInt(isoMatch[3], 10);
      if (isValidCalendarDate(y, m, d)) {
        return { year: y, month: m, day: d };
      }
    }

    // 2. DD/MM/YYYY, DD-MM-YYYY
    const dmyMatch = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
    if (dmyMatch) {
      const d = parseInt(dmyMatch[1], 10);
      const m = parseInt(dmyMatch[2], 10);
      const y = parseInt(dmyMatch[3], 10);
      if (isValidCalendarDate(y, m, d)) {
        return { year: y, month: m, day: d };
      }
    }

    return null;
  }

  // Normalizes any valid date string to standard SQL DATE 'YYYY-MM-DD'
  function normalizeDateISO(dateStr) {
    const comp = parseDateComponents(dateStr);
    if (!comp) return null;
    const y = comp.year;
    const m = String(comp.month).padStart(2, "0");
    const d = String(comp.day).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // Pure calendar arithmetic: adds N calendar days without millisecond addition
  // e.g. 2026-09-30 + 1 day = 2026-10-01; 2026-09-30 + 30 days = 2026-10-30; 2028-02-29 + 1 day = 2028-03-01
  function addCalendarDays(dateStr, daysToAdd) {
    const comp = parseDateComponents(dateStr);
    if (!comp) return null;
    const days = parseInt(daysToAdd, 10);
    if (isNaN(days)) return normalizeDateISO(dateStr);

    // Using Date.UTC to guarantee pure calendar day math without timezone jumps
    const utcDate = new Date(Date.UTC(comp.year, comp.month - 1, comp.day + days));
    const resYear = utcDate.getUTCFullYear();
    const resMonth = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
    const resDay = String(utcDate.getUTCDate()).padStart(2, "0");
    return `${resYear}-${resMonth}-${resDay}`;
  }

  // Pure calendar days difference: dateStr1 - dateStr2
  function diffCalendarDays(dateStr1, dateStr2) {
    const c1 = parseDateComponents(dateStr1);
    const c2 = parseDateComponents(dateStr2);
    if (!c1 || !c2) return null;

    const t1 = Date.UTC(c1.year, c1.month - 1, c1.day);
    const t2 = Date.UTC(c2.year, c2.month - 1, c2.day);
    return Math.round((t1 - t2) / 86400000);
  }

  // Human display formatting: "30 Sep 2026"
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function formatDisplayDate(dateStr) {
    const comp = parseDateComponents(dateStr);
    if (!comp) return "—";
    const mName = MONTH_NAMES[comp.month - 1] || "";
    const dayStr = String(comp.day).padStart(2, "0");
    return `${dayStr} ${mName} ${comp.year}`;
  }

  // ==============================================================================
  // 3. PRODUCT & SHELF-LIFE LOOKUP
  // ==============================================================================
  function cleanSearchString(str) {
    if (!str || typeof str !== "string") return "";
    return str.toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function lookupShelfLife(productName, category = null) {
    if (!productName && !category) return null;
    const cleanName = cleanSearchString(productName);
    const cleanCat = cleanSearchString(category);

    // 1. Direct exact match by product name
    const exact = SHELF_LIFE_DATABASE.find(item => cleanSearchString(item.product_name) === cleanName);
    if (exact) {
      return { ...exact, product: exact.product || exact.product_name, matchType: "exact", confidence: 1.0 };
    }

    // 2. Keyword/substring match against reference product names
    let bestMatch = null;
    let highestScore = 0;

    for (const item of SHELF_LIFE_DATABASE) {
      const refName = cleanSearchString(item.product_name);
      const refCat = cleanSearchString(item.category);

      let score = 0;

      // Check if reference name is entirely contained in search name (e.g. "milk" in "amul fresh milk")
      if (cleanName.includes(refName) || refName.includes(cleanName)) {
        score = Math.max(score, refName.length / Math.max(cleanName.length, 1) + 0.5);
      }

      // Individual keyword overlap
      const refKeywords = refName.split(" ").filter(w => w.length > 2);
      const searchKeywords = cleanName.split(" ").filter(w => w.length > 2);
      let overlap = 0;
      for (const kw of refKeywords) {
        if (searchKeywords.includes(kw)) overlap++;
      }
      if (refKeywords.length > 0) {
        const kwScore = overlap / refKeywords.length;
        if (kwScore > score) score = kwScore;
      }

      // Bonus if category matches
      if (cleanCat && refCat && cleanCat.includes(refCat)) {
        score += 0.2;
      }

      if (score > highestScore && score >= 0.4) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch) {
      return { ...bestMatch, product: bestMatch.product || bestMatch.product_name, matchType: "keyword", confidence: Math.min(1.0, highestScore) };
    }

    // 3. Fallback to category standard reference
    const CATEGORY_FALLBACKS = {
      fruits: { product_name: "Fresh Fruit", category: "Fruits", typical_shelf_life_days: 7, opened_shelf_life_days: 3, storage_type: "Refrigerator", storage_recommendation: "Store in crisper drawer." },
      vegetables: { product_name: "Fresh Vegetable", category: "Vegetables", typical_shelf_life_days: 7, opened_shelf_life_days: 3, storage_type: "Refrigerator", storage_recommendation: "Keep refrigerated in vegetable drawer." },
      dairy: { product_name: "Dairy Product", category: "Dairy", typical_shelf_life_days: 7, opened_shelf_life_days: 4, storage_type: "Refrigerator", storage_recommendation: "Keep refrigerated." },
      meat: { product_name: "Fresh Meat", category: "Meat", typical_shelf_life_days: 2, opened_shelf_life_days: 2, storage_type: "Refrigerator", storage_recommendation: "Refrigerate and cook soon or freeze." },
      seafood: { product_name: "Fresh Seafood", category: "Seafood", typical_shelf_life_days: 2, opened_shelf_life_days: 2, storage_type: "Refrigerator", storage_recommendation: "Refrigerate and consume within 1–2 days." },
      grains: { product_name: "Grains", category: "Grains", typical_shelf_life_days: 365, opened_shelf_life_days: 180, storage_type: "Cool & Dry Place", storage_recommendation: "Keep in airtight containers." },
      pulses: { product_name: "Pulses", category: "Pulses", typical_shelf_life_days: 730, opened_shelf_life_days: 365, storage_type: "Cool & Dry Place", storage_recommendation: "Store in a cool, dry cupboard." },
      bakery: { product_name: "Bakery Item", category: "Bakery", typical_shelf_life_days: 7, opened_shelf_life_days: 4, storage_type: "Room Temperature", storage_recommendation: "Store in a bread box or cool pantry." }
    };

    if (category) {
      if (CATEGORY_FALLBACKS[cleanCat]) {
        const fb = CATEGORY_FALLBACKS[cleanCat];
        return {
          ...fb,
          product: fb.product_name,
          matchType: "category_fallback",
          confidence: 0.5,
          is_estimate: true,
          source_type: "general_estimate"
        };
      }
      const catMatch = SHELF_LIFE_DATABASE.find(item => cleanSearchString(item.category) === cleanCat);
      if (catMatch) {
        return { ...catMatch, product: catMatch.product || catMatch.product_name, matchType: "category_fallback", confidence: 0.5 };
      }
    }

    // 4. Default fallback: Pantry staple
    return {
      product: productName || "Pantry Item",
      product_name: productName || "Pantry Item",
      category: category || "Pantry",
      typical_shelf_life_days: 180,
      opened_shelf_life_days: 90,
      refrigerated_shelf_life_days: null,
      frozen_shelf_life_days: null,
      storage_type: "Cool & Dry Place",
      storage_recommendation: "Store in a cool and dry pantry.",
      is_estimate: true,
      source_type: "general_estimate",
      matchType: "general_default",
      confidence: 0.3
    };
  }

  // ==============================================================================
  // 4. PREDICTION & EXPIRY STATUS ENGINE
  // ==============================================================================

  /**
   * Predict shelf life and estimated expiry date for a product
   */
  function predictExpiry(productName, category = null, purchaseDateStr = null) {
    const today = getTodayLocalISO();
    const purchaseDate = normalizeDateISO(purchaseDateStr) || today;
    const ref = lookupShelfLife(productName, category);

    const shelfLifeDays = ref ? ref.typical_shelf_life_days : 180;
    const estimatedExpiry = addCalendarDays(purchaseDate, shelfLifeDays);

    return {
      product: productName || ref?.product_name || "Pantry Item",
      product_name: productName || ref?.product_name || "Pantry Item",
      category: ref?.category || category || "Pantry",
      purchase_date: purchaseDate,
      typical_shelf_life_days: shelfLifeDays,
      estimated_expiry_date: estimatedExpiry,
      opened_shelf_life_days: ref?.opened_shelf_life_days || null,
      storage_type: ref?.storage_type || "Pantry",
      storage_recommendation: ref?.storage_recommendation || "Store in a cool, dry place.",
      is_estimate: true,
      source_type: "general_estimate",
      match_type: ref?.matchType || "default",
      disclaimer: "Estimated shelf life is a general reference. Always follow the manufacturer's printed expiry/use-by/best-before date and storage instructions."
    };
  }

  /**
   * Calculate opened use-by date
   */
  function calculateOpenedUseByDate(productName, category = null, openedDateStr = null) {
    const today = getTodayLocalISO();
    const openedDate = normalizeDateISO(openedDateStr) || today;
    const ref = lookupShelfLife(productName, category);

    const openedDays = ref?.opened_shelf_life_days || (ref?.typical_shelf_life_days ? Math.min(ref.typical_shelf_life_days, 14) : 7);
    const recommendedUseBy = addCalendarDays(openedDate, openedDays);

    return {
      opened_date: openedDate,
      opened_shelf_life_days: openedDays,
      recommended_use_by_date: recommendedUseBy,
      storage_type: ref?.storage_type || "Refrigerator",
      storage_recommendation: ref?.storage_recommendation || "Keep refrigerated after opening."
    };
  }

  /**
   * Determine effective expiry date following priority:
   * 1. Manufacturer actual expiry date
   * 2. Manufacturer printed best-before date
   * 3. Opened-product recommended use by date (if earlier)
   * 4. Universal reference estimated expiry
   */
  function calculateEffectiveExpiry(item, todayParam = null) {
    if (!item) {
      return {
        effectiveDate: null,
        effective_expiry_date: null,
        priorityRule: "None",
        priority_rule: "None",
        isEstimated: false,
        is_estimate: false,
        expiryType: "none",
        expiry_type: "none",
        activeReminderDate: null,
        active_reminder_date: null
      };
    }

    const today = todayParam || getTodayLocalISO();
    const actualDate = normalizeDateISO(item.actual_expiry_date || item.expiry_date || item.actualExpiryDate || item.expiryDate);
    const bestBefore = normalizeDateISO(item.best_before_date || item.bestBeforeDate);
    const isOpened = item.product_status === "Opened" || item.productStatus === "Opened" || item.is_opened === true || item.isOpened === true || Boolean(item.opened_date || item.openedDate);

    let openedUseBy = isOpened ? normalizeDateISO(item.recommended_use_by_date || item.recommendedUseByDate) : null;
    if (isOpened && !openedUseBy) {
      const opDate = normalizeDateISO(item.opened_date || item.openedDate) || today;
      const calc = calculateOpenedUseByDate(item.name || item.product_name || item.product, item.category, opDate);
      openedUseBy = calc.recommended_use_by_date;
    }

    let effectiveDate = null;
    let priorityRule = "Priority 4: Reference Estimated Expiry";
    let expiryType = "estimated";
    let isEstimate = true;
    let activeReminderDate = null;

    if (actualDate) {
      // Priority 1: Manufacturer printed expiry date
      effectiveDate = actualDate;
      priorityRule = "Priority 1: Manufacturer Expiry Date";
      expiryType = "actual";
      isEstimate = false;
      activeReminderDate = actualDate;

      if (openedUseBy) {
        const diff = diffCalendarDays(openedUseBy, actualDate);
        if (diff !== null && diff < 0) {
          effectiveDate = openedUseBy;
          activeReminderDate = openedUseBy;
          priorityRule = "Priority 3: Opened Product Use-By (Earlier than Manufacturer Expiry)";
          expiryType = "opened_recommended";
          isEstimate = true;
        }
      }
    } else if (bestBefore) {
      // Priority 2: Manufacturer Best Before date
      effectiveDate = bestBefore;
      priorityRule = "Priority 2: Manufacturer Best Before Date";
      expiryType = "best_before";
      isEstimate = false;
      activeReminderDate = bestBefore;

      if (openedUseBy) {
        const diff = diffCalendarDays(openedUseBy, bestBefore);
        if (diff !== null && diff < 0) {
          effectiveDate = openedUseBy;
          activeReminderDate = openedUseBy;
          priorityRule = "Priority 3: Opened Product Use-By (Earlier than Best Before Date)";
          expiryType = "opened_recommended";
          isEstimate = true;
        }
      }
    } else if (isOpened && openedUseBy) {
      // Priority 3: Opened Product Use-By
      effectiveDate = openedUseBy;
      priorityRule = "Priority 3: Opened Product Use-By";
      expiryType = "opened_recommended";
      isEstimate = true;
      activeReminderDate = openedUseBy;
    } else if (item.estimated_expiry_date || item.estimatedExpiryDate) {
      // Priority 4: Reference Estimated Expiry
      effectiveDate = normalizeDateISO(item.estimated_expiry_date || item.estimatedExpiryDate);
      priorityRule = "Priority 4: Reference Estimated Expiry";
      expiryType = "estimated";
      isEstimate = true;
      activeReminderDate = effectiveDate;

      if (openedUseBy) {
        const diff = diffCalendarDays(openedUseBy, effectiveDate);
        if (diff !== null && diff < 0) {
          effectiveDate = openedUseBy;
          activeReminderDate = openedUseBy;
          priorityRule = "Priority 3: Opened Product Use-By (Earlier than Estimate)";
          expiryType = "opened_recommended";
        }
      }
    } else {
      // Priority 4: Universal Reference Estimated Expiry
      const pred = predictExpiry(item.name || item.product_name || item.product, item.category, item.purchase_date || item.purchaseDate);
      effectiveDate = pred.estimated_expiry_date;
      priorityRule = "Priority 4: Reference Estimated Expiry";
      expiryType = "estimated";
      isEstimate = true;
      activeReminderDate = effectiveDate;

      if (openedUseBy) {
        const diff = diffCalendarDays(openedUseBy, effectiveDate);
        if (diff !== null && diff < 0) {
          effectiveDate = openedUseBy;
          activeReminderDate = openedUseBy;
          priorityRule = "Priority 3: Opened Product Use-By (Earlier than Estimate)";
          expiryType = "opened_recommended";
        }
      }
    }

    return {
      effectiveDate: effectiveDate,
      effective_expiry_date: effectiveDate,
      priorityRule: priorityRule,
      priority_rule: priorityRule,
      isEstimated: isEstimate,
      is_estimate: isEstimate,
      expiryType: expiryType,
      expiry_type: expiryType,
      activeReminderDate: activeReminderDate,
      active_reminder_date: activeReminderDate
    };
  }

  /**
   * Calculate Expiry Status based on 5-tier classification rules:
   * days < 0    -> Expired (🔴)
   * days === 0  -> Expires Today (⚠️)
   * 1 <= days <= 7 -> Very Soon (🟠)
   * 8 <= days <= 30 -> Expiring Soon (🟡)
   * days > 30   -> Fresh (🟢)
   */
  function getExpiryStatus(effectiveExpiryDate, todayLocal = null, customThresholds = null) {
    const today = todayLocal || getTodayLocalISO();
    const expiry = normalizeDateISO(effectiveExpiryDate);

    if (!expiry) {
      return {
        status: "Fresh",
        label: "No Expiry",
        tier: "fresh",
        days: null,
        remainingDays: null,
        badgeClass: "badge-status status-fresh",
        dotColor: "#10b981",
        emoji: "🟢",
        text: "No Expiry Date"
      };
    }

    const days = diffCalendarDays(expiry, today);
    if (days === null) {
      return {
        status: "Fresh",
        label: "—",
        tier: "fresh",
        days: null,
        remainingDays: null,
        badgeClass: "badge-status status-fresh",
        dotColor: "#10b981",
        emoji: "🟢",
        text: "—"
      };
    }

    // Configurable thresholds
    const th = customThresholds || {
      freshMin: 31,
      expiringSoonMax: 30,
      expiringSoonMin: 8,
      verySoonMax: 7,
      verySoonMin: 1
    };

    if (days < 0) {
      const absDays = Math.abs(days);
      const text = absDays === 1 ? "Expired yesterday" : `Expired ${absDays} days ago`;
      return {
        status: "Expired",
        label: "Expired",
        tier: "expired",
        days: days,
        remainingDays: days,
        badgeClass: "badge-status status-expired",
        dotColor: "#ef4444",
        emoji: "🔴",
        text: text,
        urgent: true
      };
    }

    if (days === 0) {
      return {
        status: "Expires Today",
        label: "Expires Today",
        tier: "expires_today",
        days: 0,
        remainingDays: 0,
        badgeClass: "badge-status status-today",
        dotColor: "#dc2626",
        emoji: "⚠️",
        text: "Expires today!",
        urgent: true
      };
    }

    if (days >= th.verySoonMin && days <= th.verySoonMax) {
      const text = days === 1 ? "1 day remaining (Tomorrow)" : `${days} days remaining`;
      return {
        status: "Very Soon",
        label: "Very Soon",
        tier: "very_soon",
        days: days,
        remainingDays: days,
        badgeClass: "badge-status status-very-soon",
        dotColor: "#ea580c",
        emoji: "🟠",
        text: text,
        urgent: true
      };
    }

    if (days >= th.expiringSoonMin && days <= th.expiringSoonMax) {
      return {
        status: "Expiring Soon",
        label: "Expiring Soon",
        tier: "expiring_soon",
        days: days,
        remainingDays: days,
        badgeClass: "badge-status status-expiring",
        dotColor: "#d97706",
        emoji: "🟡",
        text: `${days} days remaining`,
        urgent: false
      };
    }

    return {
      status: "Fresh",
      label: "Fresh",
      tier: "fresh",
      days: days,
      remainingDays: days,
      badgeClass: "badge-status status-fresh",
      dotColor: "#10b981",
      emoji: "🟢",
      text: `${days} days remaining`,
      urgent: false
    };
  }

  // ==============================================================================
  // 5. EXPOSURE TO GLOBAL & EXPORTS
  // ==============================================================================
  const ShelfLife = {
    DATABASE: SHELF_LIFE_DATABASE,
    SHELF_LIFE_DATABASE: SHELF_LIFE_DATABASE,
    DEFAULT_TIMEZONE,
    getUserTimezone,
    getTodayLocalISO,
    isLeapYear,
    isValidCalendarDate,
    parseDateComponents,
    normalizeDateISO,
    addCalendarDays,
    diffCalendarDays,
    formatDisplayDate,
    lookupShelfLife,
    predictExpiry,
    calculateOpenedUseByDate,
    calculateEffectiveExpiry,
    getExpiryStatus
  };

  if (typeof window !== "undefined") {
    window.ShelfLife = ShelfLife;
    // Compatibility helpers
    window.getTodayLocalISO = getTodayLocalISO;
    window.addCalendarDays = addCalendarDays;
    window.diffCalendarDays = diffCalendarDays;
    window.formatDisplayDate = formatDisplayDate;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = ShelfLife;
  }
})(typeof window !== "undefined" ? window : global);

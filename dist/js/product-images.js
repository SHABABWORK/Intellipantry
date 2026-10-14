/**
 * IntelliPantry - Universal Product & Category Image Engine
 * Provides realistic photos for all 22 categories and individual food products.
 * Handles automatic image resolution, barcode fallback, OCR matching, and safe offline fallbacks.
 */

(function () {
  'use strict';

  // 1. The 22 Canonical Categories with local high-resolution extracted assets
  const CATEGORIES = [
    { id: "dairy", slug: "milk-dairy", name: "Milk & Dairy", emoji: "🥛", image: "assets/categories/milk-dairy.png", cardImage: "assets/categories/milk-dairy-card.png" },
    { id: "fruits", slug: "fruits", name: "Fruits", emoji: "🍎", image: "assets/categories/fruits.png", cardImage: "assets/categories/fruits-card.png" },
    { id: "vegetables", slug: "vegetables", name: "Vegetables", emoji: "🥦", image: "assets/categories/vegetables.png", cardImage: "assets/categories/vegetables-card.png" },
    { id: "eggs", slug: "eggs", name: "Eggs", emoji: "🥚", image: "assets/categories/eggs.png", cardImage: "assets/categories/eggs-card.png" },
    { id: "grains", slug: "rice-grains", name: "Rice & Grains", emoji: "🍚", image: "assets/categories/rice-grains.png", cardImage: "assets/categories/rice-grains-card.png" },
    { id: "flour", slug: "wheat-flour", name: "Wheat & Flour", emoji: "🌾", image: "assets/categories/wheat-flour.png", cardImage: "assets/categories/wheat-flour-card.png" },
    { id: "bakery", slug: "bread-bakery", name: "Bread & Bakery", emoji: "🍞", image: "assets/categories/bread-bakery.png", cardImage: "assets/categories/bread-bakery-card.png" },
    { id: "pulses", slug: "pulses-dal-lentils", name: "Pulses, Dal & Lentils", emoji: "🫘", image: "assets/categories/pulses-dal-lentils.png", cardImage: "assets/categories/pulses-dal-lentils-card.png" },
    { id: "pasta", slug: "pasta-noodles", name: "Pasta & Noodles", emoji: "🍝", image: "assets/categories/pasta-noodles.png", cardImage: "assets/categories/pasta-noodles-card.png" },
    { id: "meat", slug: "meat-seafood", name: "Meat & Seafood", emoji: "🥩", image: "assets/categories/meat-seafood.png", cardImage: "assets/categories/meat-seafood-card.png" },
    { id: "snacks", slug: "snacks-biscuits", name: "Snacks & Biscuits", emoji: "🍪", image: "assets/categories/snacks-biscuits.png", cardImage: "assets/categories/snacks-biscuits-card.png" },
    { id: "cereals", slug: "cereals-oats", name: "Cereals & Oats", emoji: "🥣", image: "assets/categories/cereals-oats.png", cardImage: "assets/categories/cereals-oats-card.png" },
    { id: "spices", slug: "spices-seasonings", name: "Spices & Seasonings", emoji: "🧂", image: "assets/categories/spices-seasonings.png", cardImage: "assets/categories/spices-seasonings-card.png" },
    { id: "oils", slug: "cooking-oil", name: "Cooking Oil", emoji: "🫒", image: "assets/categories/cooking-oil.png", cardImage: "assets/categories/cooking-oil-card.png" },
    { id: "condiments", slug: "sauces-condiments", name: "Sauces & Condiments", emoji: "🥫", image: "assets/categories/sauces-condiments.png", cardImage: "assets/categories/sauces-condiments-card.png" },
    { id: "canned", slug: "canned-food", name: "Canned Food", emoji: "🥫", image: "assets/categories/canned-food.png", cardImage: "assets/categories/canned-food-card.png" },
    { id: "beverages", slug: "beverages", name: "Beverages", emoji: "🧃", image: "assets/categories/beverages.png", cardImage: "assets/categories/beverages-card.png" },
    { id: "coffee", slug: "tea-coffee", name: "Tea & Coffee", emoji: "☕", image: "assets/categories/tea-coffee.png", cardImage: "assets/categories/tea-coffee-card.png" },
    { id: "nuts", slug: "nuts-dry-fruits", name: "Nuts & Dry Fruits", emoji: "🥜", image: "assets/categories/nuts-dry-fruits.png", cardImage: "assets/categories/nuts-dry-fruits-card.png" },
    { id: "frozen", slug: "frozen-food", name: "Frozen Food", emoji: "🧊", image: "assets/categories/frozen-food.png", cardImage: "assets/categories/frozen-food-card.png" },
    { id: "sweets", slug: "sweets-chocolate", name: "Sweets & Chocolate", emoji: "🍫", image: "assets/categories/sweets-chocolate.png", cardImage: "assets/categories/sweets-chocolate-card.png" },
    { id: "pantry", slug: "other-pantry", name: "Other Pantry Items", emoji: "📦", image: "assets/categories/other-pantry.png", cardImage: "assets/categories/other-pantry-card.png" }
  ];

  // Map category aliases to canonical category definitions
  const CATEGORY_ALIASES = {
    "dairy": "dairy",
    "milk & dairy": "dairy",
    "milk and dairy": "dairy",
    "milk": "dairy",
    "cheese": "dairy",
    "yogurt": "dairy",
    
    "fruits": "fruits",
    "fruit": "fruits",
    "fresh fruits": "fruits",

    "vegetables": "vegetables",
    "vegetable": "vegetables",
    "veggies": "vegetables",
    "greens": "vegetables",

    "eggs": "eggs",
    "egg": "eggs",

    "rice & grains": "grains",
    "rice and grains": "grains",
    "grains": "grains",
    "grain": "grains",
    "rice": "grains",

    "wheat & flour": "flour",
    "wheat and flour": "flour",
    "flour": "flour",
    "atta": "flour",
    "wheat": "flour",

    "bread & bakery": "bakery",
    "bread and bakery": "bakery",
    "bakery": "bakery",
    "bread": "bakery",

    "pulses, dal & lentils": "pulses",
    "pulses, dal and lentils": "pulses",
    "pulses": "pulses",
    "dal": "pulses",
    "lentils": "pulses",
    "legumes": "pulses",

    "pasta & noodles": "pasta",
    "pasta and noodles": "pasta",
    "pasta": "pasta",
    "noodles": "pasta",

    "meat & seafood": "meat",
    "meat and seafood": "meat",
    "meat": "meat",
    "seafood": "meat",
    "poultry": "meat",
    "fish": "meat",

    "snacks & biscuits": "snacks",
    "snacks and biscuits": "snacks",
    "snacks": "snacks",
    "biscuits": "snacks",
    "cookies": "snacks",
    "chips": "snacks",

    "cereals & oats": "cereals",
    "cereals and oats": "cereals",
    "cereals": "cereals",
    "cereal": "cereals",
    "oats": "cereals",

    "spices & seasonings": "spices",
    "spices and seasonings": "spices",
    "spices": "spices",
    "seasonings": "spices",
    "masala": "spices",

    "cooking oil": "oils",
    "oil": "oils",
    "oils": "oils",
    "ghee": "oils",

    "sauces & condiments": "condiments",
    "sauces and condiments": "condiments",
    "sauces": "condiments",
    "condiments": "condiments",

    "canned food": "canned",
    "canned": "canned",
    "tinned food": "canned",

    "beverages": "beverages",
    "beverage": "beverages",
    "drinks": "beverages",
    "juice": "beverages",

    "tea & coffee": "coffee",
    "tea and coffee": "coffee",
    "coffee": "coffee",
    "tea": "coffee",
    "chai": "coffee",

    "nuts & dry fruits": "nuts",
    "nuts and dry fruits": "nuts",
    "nuts": "nuts",
    "dry fruits": "nuts",

    "frozen food": "frozen",
    "frozen": "frozen",

    "sweets & chocolate": "sweets",
    "sweets and chocolate": "sweets",
    "sweets": "sweets",
    "chocolate": "sweets",
    "dessert": "sweets",

    "other pantry items": "pantry",
    "pantry": "pantry",
    "other": "pantry",
    "staples": "pantry",
    "general": "pantry"
  };

  // 2. Curated Individual Product Images Map
  // High-performance, reliable food photography hosted on public CDNs (Unsplash Optimized CDN)
  const PRODUCT_IMAGE_MAP = {
    // --- Dairy & Alternatives ---
    "milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
    "cow milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
    "almond milk": "https://images.unsplash.com/photo-1568651316348-184518c0df98?auto=format&fit=crop&w=400&q=80",
    "oat milk": "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd1?auto=format&fit=crop&w=400&q=80",
    "soy milk": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80",
    "cheese": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80",
    "cheddar": "https://images.unsplash.com/photo-1618060932014-4deda4932554?auto=format&fit=crop&w=400&q=80",
    "mozzarella": "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=400&q=80",
    "paneer": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80",
    "butter": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80",
    "yogurt": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80",
    "curd": "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=400&q=80",
    "dahi": "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=400&q=80",
    "cream": "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80",
    "sour cream": "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80",

    // --- Eggs ---
    "egg": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=400&q=80",
    "eggs": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=400&q=80",
    "brown eggs": "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=400&q=80",
    "white eggs": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=400&q=80",

    // --- Fruits ---
    "apple": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80",
    "apples": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80",
    "green apple": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80",
    "banana": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80",
    "bananas": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80",
    "orange": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80",
    "oranges": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80",
    "strawberry": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80",
    "strawberries": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80",
    "grapes": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80",
    "grape": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80",
    "mango": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
    "mangoes": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
    "pineapple": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80",
    "watermelon": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80",
    "lemon": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80",
    "lime": "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=400&q=80",
    "avocado": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80",
    "blueberry": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=400&q=80",
    "blueberries": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=400&q=80",
    "papaya": "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=400&q=80",
    "peach": "https://images.unsplash.com/photo-1629828874514-c1e5103f2150?auto=format&fit=crop&w=400&q=80",
    "pomegranate": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
    "kiwi": "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=400&q=80",

    // --- Vegetables ---
    "tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80",
    "tomatoes": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80",
    "potato": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
    "potatoes": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
    "onion": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80",
    "onions": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80",
    "carrot": "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=400&q=80",
    "carrots": "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=400&q=80",
    "broccoli": "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=400&q=80",
    "spinach": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80",
    "palak": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80",
    "garlic": "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=400&q=80",
    "ginger": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
    "cucumber": "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=400&q=80",
    "capsicum": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80",
    "bell pepper": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80",
    "peppers": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80",
    "mushroom": "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=400&q=80",
    "mushrooms": "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=400&q=80",
    "cauliflower": "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=400&q=80",
    "cabbage": "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80",
    "lettuce": "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400&q=80",
    "green chili": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80",
    "peas": "https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&w=400&q=80",
    "sweet corn": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80",

    // --- Rice & Grains ---
    "rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
    "basmati rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
    "brown rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=400&q=80",
    "jasmine rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
    "quinoa": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
    "millet": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",

    // --- Wheat & Flour ---
    "flour": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    "wheat flour": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    "atta": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    "maida": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    "wheat": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    "semolina": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    "sooji": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    "besan": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",

    // --- Bread & Bakery ---
    "bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    "white bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    "brown bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    "whole wheat bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    "croissant": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80",
    "bun": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
    "bagel": "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=400&q=80",
    "toast": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    "pita": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",

    // --- Pulses, Dal & Lentils ---
    "dal": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "toor dal": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "moong dal": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "masoor dal": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "chana dal": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "urad dal": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "lentils": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "chickpeas": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80",
    "chana": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80",
    "chole": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80",
    "rajma": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    "kidney beans": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",

    // --- Pasta & Noodles ---
    "pasta": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=400&q=80",
    "spaghetti": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=400&q=80",
    "penne": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=400&q=80",
    "macaroni": "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=400&q=80",
    "noodles": "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80",
    "ramen": "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80",
    "maggi": "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80",

    // --- Meat & Seafood ---
    "chicken": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80",
    "chicken breast": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80",
    "meat": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80",
    "beef": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80",
    "steak": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80",
    "mutton": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80",
    "fish": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80",
    "salmon": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80",
    "prawns": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80",
    "shrimp": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80",

    // --- Snacks & Biscuits ---
    "biscuits": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
    "biscuit": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
    "cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
    "cookie": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
    "chips": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80",
    "potato chips": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80",
    "crisps": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80",
    "popcorn": "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80",
    "nachos": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80",
    "crackers": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80",

    // --- Cereals & Oats ---
    "oats": "https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=400&q=80",
    "oatmeal": "https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=400&q=80",
    "cornflakes": "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=400&q=80",
    "cereal": "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=400&q=80",
    "granola": "https://images.unsplash.com/photo-1517093708173-98319e7bb523?auto=format&fit=crop&w=400&q=80",
    "muesli": "https://images.unsplash.com/photo-1517093708173-98319e7bb523?auto=format&fit=crop&w=400&q=80",

    // --- Spices & Seasonings ---
    "spices": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    "turmeric": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
    "haldi": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
    "chili powder": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    "cumin": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    "jeera": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    "black pepper": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80",
    "pepper": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80",
    "cinnamon": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80",
    "cardamom": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    "cloves": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    "garam masala": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    "coriander powder": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",

    // --- Cooking Oil ---
    "cooking oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    "oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    "olive oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    "sunflower oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    "vegetable oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    "mustard oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    "coconut oil": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80",
    "ghee": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80",

    // --- Sauces & Condiments ---
    "ketchup": "https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=400&q=80",
    "tomato sauce": "https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=400&q=80",
    "sauce": "https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=400&q=80",
    "mayonnaise": "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=80",
    "mustard": "https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=400&q=80",
    "soy sauce": "https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=400&q=80",
    "hot sauce": "https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=400&q=80",
    "peanut butter": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
    "jam": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80",
    "marmalade": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80",
    "vinegar": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",

    // --- Canned Food ---
    "canned tomatoes": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    "canned beans": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    "canned tuna": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    "canned corn": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    "can": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    "canned": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",

    // --- Beverages ---
    "juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80",
    "orange juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80",
    "apple juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80",
    "soda": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    "cola": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    "water": "https://images.unsplash.com/photo-1559839914-ba2ae6e51087?auto=format&fit=crop&w=400&q=80",
    "coconut water": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80",

    // --- Tea & Coffee ---
    "coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
    "coffee powder": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
    "coffee beans": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
    "tea": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
    "tea powder": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
    "chai": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
    "green tea": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",

    // --- Nuts & Dry Fruits ---
    "nuts": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",
    "almonds": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",
    "badam": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",
    "cashews": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",
    "kaju": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",
    "walnuts": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",
    "raisins": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",
    "pistachios": "https://images.unsplash.com/photo-1508061252445-8450f656b4d3?auto=format&fit=crop&w=400&q=80",

    // --- Frozen Food ---
    "frozen peas": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=400&q=80",
    "frozen berries": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=400&q=80",
    "ice cream": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=400&q=80",

    // --- Sweets & Chocolate ---
    "chocolate": "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&q=80",
    "dark chocolate": "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&q=80",
    "cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
    "muffin": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=400&q=80",
    "candy": "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80",

    // --- Other Pantry Items / Essentials ---
    "salt": "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=400&q=80",
    "sugar": "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80",
    "honey": "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=400&q=80"
  };

  /**
   * Normalize an arbitrary category string to one of the 22 canonical categories
   */
  function normalizeCategory(categoryName) {
    if (!categoryName || typeof categoryName !== 'string') return CATEGORIES[21]; // Other Pantry Items
    const clean = categoryName.trim().toLowerCase();
    const aliasId = CATEGORY_ALIASES[clean];
    if (aliasId) {
      const found = CATEGORIES.find(c => c.id === aliasId);
      if (found) return found;
    }
    // Substring match
    for (const [alias, id] of Object.entries(CATEGORY_ALIASES)) {
      if (clean.includes(alias) || alias.includes(clean)) {
        const found = CATEGORIES.find(c => c.id === id);
        if (found) return found;
      }
    }
    return CATEGORIES[21]; // fallback
  }

  /**
   * Get Category Local Image URL
   */
  function getCategoryImageUrl(categoryName) {
    const cat = normalizeCategory(categoryName);
    return cat ? cat.image : 'assets/categories/other-pantry.png';
  }

  /**
   * Get Category Card Image URL (with border/card container)
   */
  function getCategoryCardImageUrl(categoryName) {
    const cat = normalizeCategory(categoryName);
    return cat ? cat.cardImage : 'assets/categories/other-pantry-card.png';
  }

  /**
   * Intelligent Automatic Product Image Resolver
   * Priority 1: User-uploaded or existing specific imageUrl
   * Priority 2: Exact/multi-word keyword match in PRODUCT_IMAGE_MAP
   * Priority 3: Individual token word match in PRODUCT_IMAGE_MAP
   * Priority 4: Category local realistic photo fallback
   */
  function lookupProductImage(productName, categoryName = null, existingImageUrl = null) {
    // 1. If an existing image URL is present and not a generic placeholder, use it
    if (existingImageUrl && typeof existingImageUrl === 'string' && existingImageUrl.trim().length > 5) {
      const cleanExisting = existingImageUrl.trim();
      // Ensure it's not a broken or empty placeholder
      if (!cleanExisting.includes('undefined') && !cleanExisting.includes('null')) {
        return cleanExisting;
      }
    }

    if (!productName || typeof productName !== 'string') {
      return getCategoryImageUrl(categoryName);
    }

    // 2. Direct exact or prefix lookup in window.GroceryCatalog
    if (window.GroceryCatalog && typeof window.GroceryCatalog.autocomplete === 'function') {
      const matches = window.GroceryCatalog.autocomplete(productName, 1);
      if (matches && matches.length > 0 && matches[0].image_url) {
        return matches[0].image_url;
      }
    }

    // Clean product name
    const rawClean = productName.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // 3. Direct exact or multi-word match (e.g. "peanut butter", "olive oil", "toor dal", "green apple")
    const sortedKeys = Object.keys(PRODUCT_IMAGE_MAP).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      // Regex word boundary match
      const regex = new RegExp(`\\b${key}\\b`, 'i');
      if (regex.test(rawClean)) {
        return PRODUCT_IMAGE_MAP[key];
      }
    }

    // 4. Fallback to individual tokens
    const tokens = rawClean.split(' ').filter(t => t.length > 2);
    for (const token of tokens) {
      if (PRODUCT_IMAGE_MAP[token]) {
        return PRODUCT_IMAGE_MAP[token];
      }
    }

    // 5. Fallback to realistic category image
    return getCategoryImageUrl(categoryName);
  }

  // Expose global API
  window.ProductImageEngine = {
    CATEGORIES,
    normalizeCategory,
    getCategoryImageUrl,
    getCategoryCardImageUrl,
    lookupProductImage,
    getAllCategories: () => [...CATEGORIES]
  };

  console.log('[ProductImageEngine] Initialized with 22 canonical categories and dynamic product resolver.');
})();

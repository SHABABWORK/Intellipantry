/**
 * Smart Pantry - Comprehensive Global Recipe Database
 * 100% Free • Verified Food Photos • Smart Pantry Sync
 */

const MASTER_RECIPES = [
  {
    "id": "rec_masala_dosa",
    "name": "Masala Dosa",
    "localName": "മസാല ദോശ",
    "cuisine": "Indian",
    "country": "India",
    "category": "Indian",
    "categories": [
      "Indian",
      "South Indian",
      "Breakfast",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/masala-dosa.png",
    "fallbackImage": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    "description": "Crispy fermented rice and lentil crepe stuffed with spiced potato masala, served with fresh coconut chutney and sambar.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Cast Iron Tawa"
    ],
    "storage": "Potato masala keeps 3 days refrigerated. Cook dosas fresh.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 340,
      "protein": "7g",
      "carbs": "58g",
      "fat": "8g",
      "fiber": "5g",
      "sodium": "420mg"
    },
    "ingredients": [
      {
        "name": "Rice",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Urad Dal",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Potato",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Spices (Mustard, Turmeric, Curry Leaves)",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Potato",
        "substitute": "Sweet potato or paneer"
      }
    ],
    "instructions": [
      "Prepare potato masala: boil and mash potatoes, sauté with onions, green chilies, mustard seeds, turmeric, and curry leaves.",
      "Heat tawa, pour fermented batter, spread outward in a spiral, drizzle oil.",
      "Cook until golden and crisp, spread potato filling in center, fold and serve immediately."
    ]
  },
  {
    "id": "rec_chicken_biryani",
    "name": "Chicken Biryani",
    "localName": "ചിക്കൻ ബിരിയാണി",
    "cuisine": "Indian",
    "country": "India",
    "category": "Indian",
    "categories": [
      "Indian",
      "Lunch",
      "Dinner",
      "Non-Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/chicken-biryani.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "description": "Layered fragrant Basmati rice and spiced marinated chicken slow-cooked with saffron, ghee, and golden fried onions.",
    "prepTime": "25 mins",
    "cookTime": "35 mins",
    "totalMinutes": 60,
    "difficulty": "Hard",
    "servings": 6,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Dum Pot"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹120 / $1.50",
    "nutrition": {
      "calories": 580,
      "protein": "38g",
      "carbs": "68g",
      "fat": "18g",
      "fiber": "3g",
      "sodium": "640mg"
    },
    "ingredients": [
      {
        "name": "Rice (Basmati)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Chicken",
        "amount": 800,
        "unit": "g"
      },
      {
        "name": "Spices (Biryani Masala, Saffron)",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Ghee",
        "amount": 4,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Mutton or paneer"
      }
    ],
    "instructions": [
      "Marinate chicken in yogurt and spices for 1 hour; cook until tender.",
      "Parboil Basmati rice with whole aromatics until 70% done.",
      "Layer chicken, rice, fried onions, mint, and saffron milk in pot.",
      "Cook covered on low heat (dum) for 25 minutes. Fluff gently before serving."
    ]
  },
  {
    "id": "rec_chole_bhature",
    "name": "Chole Bhature",
    "localName": "ചോലെ ബട്ടൂര",
    "cuisine": "Indian",
    "country": "India",
    "category": "Indian",
    "categories": [
      "Indian",
      "North Indian",
      "Lunch",
      "Breakfast",
      "Vegetarian"
    ],
    "image": "assets/recipes/chole-bhature.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Spiced dark chickpea curry simmered in tea-tinted aromatic gravy, served with balloon-puffed fried bhatura bread.",
    "prepTime": "20 mins",
    "cookTime": "20 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Kadai",
      "Pressure Cooker"
    ],
    "storage": "Chole keeps 4 days refrigerated.",
    "costPerServing": "₹50 / $0.65",
    "nutrition": {
      "calories": 540,
      "protein": "15g",
      "carbs": "76g",
      "fat": "20g",
      "fiber": "8g",
      "sodium": "620mg"
    },
    "ingredients": [
      {
        "name": "Chickpeas (Chana)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Flour (Maida)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Spices (Chole Masala, Amchur)",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Cooking Oil",
        "amount": 2,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Maida",
        "substitute": "Wheat flour"
      }
    ],
    "instructions": [
      "Pressure cook soaked chickpeas with tea bag and spices.",
      "Sauté onions, tomatoes, ginger-garlic paste, and chole masala; add cooked chickpeas.",
      "Knead flour and curd into dough; roll and deep-fry bhature until puffed."
    ]
  },
  {
    "id": "rec_palak_paneer",
    "name": "Palak Paneer",
    "localName": "പാലക് പനീർ",
    "cuisine": "Indian",
    "country": "India",
    "category": "Indian",
    "categories": [
      "Indian",
      "North Indian",
      "Dinner",
      "Vegetarian",
      "Healthy",
      "Gluten-Free",
      "High Protein"
    ],
    "image": "assets/recipes/palak-paneer.png",
    "fallbackImage": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    "description": "Cottage cheese cubes simmered in a velvety, vibrant spinach gravy infused with garlic, cumin, and garam masala.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Blender",
      "Pan"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹75 / $0.95",
    "nutrition": {
      "calories": 310,
      "protein": "18g",
      "carbs": "12g",
      "fat": "22g",
      "fiber": "4g",
      "sodium": "480mg"
    },
    "ingredients": [
      {
        "name": "Spinach (Palak)",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Paneer (Cottage Cheese)",
        "amount": 250,
        "unit": "g"
      },
      {
        "name": "Garlic & Ginger",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Cream / Butter",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Paneer",
        "substitute": "Tofu for vegan"
      }
    ],
    "instructions": [
      "Blanch spinach leaves in boiling water for 2 mins; plunge in ice water and blend to a smooth purée.",
      "Sauté cumin, garlic, onions, and green chilies; stir in the spinach purée and spices.",
      "Gently add paneer cubes and finish with a swirl of cream or butter."
    ]
  },
  {
    "id": "rec_idli_sambar",
    "name": "Soft Steamed Idli",
    "localName": "ഇഡ്ഡലി",
    "cuisine": "Indian",
    "country": "India",
    "category": "Indian",
    "categories": [
      "Indian",
      "South Indian",
      "Breakfast",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy"
    ],
    "image": "assets/recipes/idli.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Pillowy-soft, fermented steamed rice and black gram lentil cakes served with steaming lentil sambar.",
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Idli Steamer"
    ],
    "storage": "Steamed idlis keep 2 days refrigerated. Reheat with gentle steam.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 180,
      "protein": "6g",
      "carbs": "38g",
      "fat": "1g",
      "fiber": "3g",
      "sodium": "190mg"
    },
    "ingredients": [
      {
        "name": "Rice (Idli Rice)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Urad Dal",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Idli Rice",
        "substitute": "Parboiled rice"
      }
    ],
    "instructions": [
      "Grind soaked urad dal and rice into a fluffy batter and ferment overnight.",
      "Grease idli plates, pour batter into cavities, and steam for 10-12 minutes.",
      "Unmold with a wet spoon and serve hot with sambar and coconut chutney."
    ]
  },
  {
    "id": "rec_appam_stew",
    "name": "Appam with Stew",
    "localName": "അപ്പവും പച്ചക്കറി സ്റ്റൂവും",
    "cuisine": "Kerala",
    "country": "India",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Breakfast",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/appam-stew.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Bowl-shaped fermented rice pancakes with a pillowy soft center and lacy crisp borders, served with coconut milk vegetable stew.",
    "prepTime": "20 mins",
    "cookTime": "20 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Appachatti (Wok)"
    ],
    "storage": "Refrigerate stew 2 days. Make appams fresh.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 290,
      "protein": "5g",
      "carbs": "48g",
      "fat": "10g",
      "fiber": "4g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Rice (Raw Rice)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Coconut Milk",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Potato & Carrot",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Spices (Cardamom, Cinnamon, Cloves)",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Coconut Milk",
        "substitute": "Almond milk"
      }
    ],
    "instructions": [
      "Prepare appam batter with raw rice, cooked rice, coconut, and yeast; ferment 8 hours.",
      "Cook diced vegetables with whole spices, green chilies, and thin coconut milk until tender.",
      "Finish stew with thick coconut milk, curry leaves, and coconut oil.",
      "Swirl batter in hot appachatti, cover and cook until borders are crisp and center is spongy."
    ]
  },
  {
    "id": "rec_puttu_kadala",
    "name": "Puttu & Kadala Curry",
    "localName": "പുട്ടും കടലക്കറിയും",
    "cuisine": "Kerala",
    "country": "India",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Breakfast",
      "Vegetarian",
      "Vegan",
      "Healthy"
    ],
    "image": "assets/recipes/puttu-kadala.png",
    "fallbackImage": "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?auto=format&fit=crop&w=800&q=80",
    "description": "Steamed cylinders of coarsely ground rice layered with fresh coconut, accompanied by a rich roasted-coconut black chickpea curry.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Puttu Maker (Kutti)"
    ],
    "storage": "Kadala curry keeps 3 days refrigerated.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 380,
      "protein": "12g",
      "carbs": "65g",
      "fat": "9g",
      "fiber": "7g",
      "sodium": "390mg"
    },
    "ingredients": [
      {
        "name": "Rice Flour (Puttu Podi)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Grated Coconut",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Black Chickpeas (Kadala)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Spices (Coriander, Chili, Garam Masala)",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Rice Flour",
        "substitute": "Ragi flour or wheat flour"
      }
    ],
    "instructions": [
      "Pressure cook soaked black chickpeas with turmeric and salt.",
      "Roast grated coconut with shallots, curry leaves, and spices until golden brown; grind to smooth paste.",
      "Simmer cooked chickpeas with the roasted coconut gravy until thick.",
      "Moisten rice flour with salted water; layer into puttu maker with coconut and steam for 8 minutes."
    ]
  },
  {
    "id": "rec_kerala_fish_curry",
    "name": "Kerala Fish Curry",
    "localName": "കോട്ടയം മീൻ കറി",
    "cuisine": "Kerala",
    "country": "India",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Dinner",
      "Lunch",
      "Non-Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/kerala-fish-curry.png",
    "fallbackImage": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    "description": "Spicy, tangy red fish curry simmered in an earthen pot (meen chatti) with Malabar tamarind (kudampuli) and fenugreek.",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Fish"
    ],
    "equipment": [
      "Clay Meen Chatti"
    ],
    "storage": "Tastes even better next day! Refrigerate up to 4 days.",
    "costPerServing": "₹110 / $1.40",
    "nutrition": {
      "calories": 290,
      "protein": "32g",
      "carbs": "6g",
      "fat": "15g",
      "fiber": "2g",
      "sodium": "520mg"
    },
    "ingredients": [
      {
        "name": "Fish (Kingfish or Pomfret)",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Kudampuli (Malabar Tamarind)",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Spices (Kashmiri Chili, Fenugreek)",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Coconut Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Kudampuli",
        "substitute": "Kokum or tamarind paste"
      }
    ],
    "instructions": [
      "Soak kudampuli pieces in warm water for 15 minutes.",
      "Heat coconut oil in clay pot, splutter mustard seeds and fenugreek, sauté shallots, garlic, ginger, and curry leaves.",
      "Add Kashmiri chili and turmeric paste with water and soaked kudampuli; bring to a boil.",
      "Add fish steaks, simmer gently for 15 minutes until gravy thickens. Finish with raw coconut oil."
    ]
  },
  {
    "id": "rec_kerala_avial",
    "name": "Traditional Avial",
    "localName": "അവിയൽ",
    "cuisine": "Kerala",
    "country": "India",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Vegetarian",
      "Healthy",
      "Gluten-Free"
    ],
    "image": "assets/recipes/avial.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Thick medley of mixed indigenous vegetables cooked with crushed coconut, cumin, green chilies, sour curd, and coconut oil.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 5,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Deep Cooking Pot"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 210,
      "protein": "4g",
      "carbs": "22g",
      "fat": "12g",
      "fiber": "6g",
      "sodium": "240mg"
    },
    "ingredients": [
      {
        "name": "Mixed Vegetables (Carrot, Beans, Drumstick, Yam)",
        "amount": 400,
        "unit": "g"
      },
      {
        "name": "Grated Coconut",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Yogurt / Curd",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Coconut Oil & Curry Leaves",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Curd",
        "substitute": "Raw mango for vegan avial"
      }
    ],
    "instructions": [
      "Cut all vegetables into 2-inch batons and cook with turmeric, chili powder, and salt until tender-crisp.",
      "Coarsely crush grated coconut, cumin seeds, and green chilies.",
      "Fold coconut mixture and beaten curd into cooked vegetables, heat gently on low flame.",
      "Remove from heat, drizzle raw virgin coconut oil and fresh curry leaves."
    ]
  },
  {
    "id": "rec_spaghetti_bolognese",
    "name": "Spaghetti Bolognese",
    "localName": "Spaghetti al Ragù",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Italian",
    "categories": [
      "Italian",
      "Dinner",
      "Non-Vegetarian",
      "High Protein"
    ],
    "image": "assets/recipes/spaghetti.png",
    "fallbackImage": "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80",
    "description": "Al dente spaghetti smothered in a rich, slow-simmered minced meat and tomato sauce topped with freshly grated Parmesan.",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Pasta Pot",
      "Skillet"
    ],
    "storage": "Bolognese sauce keeps 4 days refrigerated.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 490,
      "protein": "28g",
      "carbs": "62g",
      "fat": "14g",
      "fiber": "4g",
      "sodium": "580mg"
    },
    "ingredients": [
      {
        "name": "Spaghetti Pasta",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Minced Meat / Chicken",
        "amount": 300,
        "unit": "g"
      },
      {
        "name": "Tomato Puree & Herbs",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Parmesan Cheese",
        "amount": 0.25,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Minced Meat",
        "substitute": "Lentils or minced mushrooms for vegan"
      }
    ],
    "instructions": [
      "Sauté onions, celery, carrots, garlic, and minced meat until browned.",
      "Add crushed tomatoes, oregano, basil, and simmer for 25 minutes.",
      "Boil spaghetti in salted water until al dente; toss with sauce and Parmesan."
    ]
  },
  {
    "id": "rec_puttu_kadala_intl",
    "name": "Malabar Parotta with Curry",
    "localName": "മലബാർ പൊറോട്ട",
    "cuisine": "Kerala",
    "country": "India",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Dinner",
      "Vegetarian"
    ],
    "image": "assets/recipes/puttu-kadala-intl.png",
    "fallbackImage": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    "description": "Flaky, layered golden Malabar flatbreads paired with spiced vegetable or meat salna curry.",
    "prepTime": "25 mins",
    "cookTime": "20 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Cast Iron Tawa"
    ],
    "storage": "Parottas keep 2 days refrigerated. Reheat on dry tawa.",
    "costPerServing": "₹45 / $0.55",
    "nutrition": {
      "calories": 420,
      "protein": "8g",
      "carbs": "56g",
      "fat": "18g",
      "fiber": "3g",
      "sodium": "410mg"
    },
    "ingredients": [
      {
        "name": "Flour (Maida)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Ghee / Oil",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Milk / Water",
        "amount": 1,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Maida",
        "substitute": "Atta (whole wheat) for healthier roti"
      }
    ],
    "instructions": [
      "Knead flour, milk, sugar, salt, and oil into a soft dough; rest for 1 hour.",
      "Roll dough thin, pleat into layers, spiral into a coil, and flatten lightly.",
      "Cook on hot tawa with ghee until both sides are golden brown; crush between palms to release flaky layers."
    ]
  },
  {
    "id": "rec_fish_curry_intl",
    "name": "Goan Coconut Fish Curry",
    "localName": "Goan Fish Curry",
    "cuisine": "International",
    "country": "India",
    "category": "International",
    "categories": [
      "International",
      "Indian",
      "Dinner",
      "Non-Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/fish-curry-intl.png",
    "fallbackImage": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    "description": "Tender white fish simmered in a creamy, tangy coconut curry with kokum, red chilies, and coriander seeds.",
    "prepTime": "15 mins",
    "cookTime": "18 mins",
    "totalMinutes": 33,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Fish"
    ],
    "equipment": [
      "Skillet"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹120 / $1.50",
    "nutrition": {
      "calories": 340,
      "protein": "28g",
      "carbs": "8g",
      "fat": "22g",
      "fiber": "3g",
      "sodium": "480mg"
    },
    "ingredients": [
      {
        "name": "Fish Fillets",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Coconut Milk",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Spices (Kashmiri Chili, Coriander, Turmeric)",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Kokum / Tamarind",
        "amount": 4,
        "unit": "pcs"
      }
    ],
    "substitutions": [
      {
        "original": "Fish",
        "substitute": "Prawns or tofu"
      }
    ],
    "instructions": [
      "Blend grated coconut with red chilies, coriander seeds, garlic, and turmeric into a fine paste.",
      "Simmer paste with coconut milk, kokum, and green chilies.",
      "Slide in fish fillets and simmer gently for 6-8 minutes until cooked through."
    ]
  },
  {
    "id": "rec_pazham_pori",
    "name": "Crispy Pazham Pori",
    "localName": "പഴം പൊരി (ഏത്തയ്ക്കപ്പം)",
    "cuisine": "Kerala",
    "country": "India",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Desserts",
      "Breakfast",
      "Vegetarian",
      "Vegan"
    ],
    "image": "assets/recipes/pazham-pori.png",
    "fallbackImage": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    "description": "Golden fried sweet Kerala banana fritters in a light, crispy batter with hints of cardamom and cumin seeds.",
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Frying Kadai"
    ],
    "storage": "Best enjoyed fresh and hot.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 240,
      "protein": "3g",
      "carbs": "44g",
      "fat": "7g",
      "fiber": "3g",
      "sodium": "80mg"
    },
    "ingredients": [
      {
        "name": "Ripe Nendran Bananas",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "All Purpose Flour / Maida",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Sugar & Cardamom Powder",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Coconut Oil",
        "amount": 1.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Maida",
        "substitute": "Rice flour + wheat flour for gluten-free"
      }
    ],
    "instructions": [
      "Slice ripe bananas lengthwise into 2 or 3 flat pieces.",
      "Whisk flour, sugar, pinch of turmeric, cardamom powder, and water into a thick coatable batter.",
      "Dip banana slices into batter and deep fry in hot coconut oil until crisp and golden brown."
    ]
  },
  {
    "id": "rec_street_tacos",
    "name": "Street Tacos",
    "localName": "Tacos al Pastor",
    "cuisine": "Mexican",
    "country": "Mexico",
    "category": "Mexican",
    "categories": [
      "Mexican",
      "Dinner",
      "Lunch",
      "Non-Vegetarian",
      "Gluten-Free"
    ],
    "image": "assets/recipes/tacos.png",
    "fallbackImage": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    "description": "Warm corn tortillas loaded with seasoned spiced meat, diced white onions, fresh cilantro, and tangy lime juice.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Cast Iron Skillet"
    ],
    "storage": "Keep taco fillings in fridge for up to 3 days.",
    "costPerServing": "₹85 / $1.10",
    "nutrition": {
      "calories": 360,
      "protein": "24g",
      "carbs": "32g",
      "fat": "16g",
      "fiber": "4g",
      "sodium": "460mg"
    },
    "ingredients": [
      {
        "name": "Corn Tortillas",
        "amount": 8,
        "unit": "pcs"
      },
      {
        "name": "Chicken / Beef",
        "amount": 400,
        "unit": "g"
      },
      {
        "name": "Onion & Cilantro",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Lime & Taco Spices",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Meat",
        "substitute": "Black beans or roasted cauliflower"
      }
    ],
    "instructions": [
      "Sear seasoned meat in a smoking-hot skillet until browned and cooked through.",
      "Warm corn tortillas on a dry skillet until pliable.",
      "Fill tortillas with meat, top with fresh cilantro, diced onions, and a squeeze of lime."
    ]
  },
  {
    "id": "rec_sambar_kerala",
    "name": "Traditional Sambar",
    "localName": "സാമ്പാർ",
    "cuisine": "South Indian",
    "country": "India",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy"
    ],
    "image": "assets/recipes/sambar.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Lentil stew cooked with drumsticks, carrots, shallots, tamarind pulp, and freshly ground roasted sambar spices.",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 5,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pressure Cooker"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 190,
      "protein": "8g",
      "carbs": "32g",
      "fat": "4g",
      "fiber": "6g",
      "sodium": "410mg"
    },
    "ingredients": [
      {
        "name": "Toor Dal (Pigeon Peas)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Mixed Vegetables (Drumstick, Carrot, Pumpkin)",
        "amount": 300,
        "unit": "g"
      },
      {
        "name": "Sambar Powder & Tamarind",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Mustard Seeds & Curry Leaves",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Toor Dal",
        "substitute": "Moong dal or masoor dal"
      }
    ],
    "instructions": [
      "Pressure cook toor dal with turmeric until mushy.",
      "Cook diced vegetables with tamarind water, sambar powder, and salt until tender.",
      "Combine cooked dal with vegetables, simmer 5 minutes.",
      "Temper with mustard seeds, fenugreek, dried red chilies, and curry leaves in coconut oil."
    ]
  },
  {
    "id": "rec_kerala_rasam",
    "name": "Pepper Rasam",
    "localName": "കുരുമുളക് രസം",
    "cuisine": "South Indian",
    "country": "India",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Soup",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy"
    ],
    "image": "assets/recipes/rasam.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Soothing South Indian digestive broth made with ripe tomatoes, tamarind, crushed black pepper, garlic, and fresh coriander.",
    "prepTime": "5 mins",
    "cookTime": "15 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pot"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹15 / $0.20",
    "nutrition": {
      "calories": 65,
      "protein": "2g",
      "carbs": "12g",
      "fat": "1g",
      "fiber": "2g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "Tomato",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Tamarind Pulp",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Black Pepper & Cumin Seeds",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Garlic & Curry Leaves",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Tamarind",
        "substitute": "Lemon juice added at end"
      }
    ],
    "instructions": [
      "Crush black pepper, cumin seeds, and garlic coarsely.",
      "Boil mashed tomatoes in tamarind water with turmeric and salt.",
      "Add crushed spices and bring to a gentle frothy boil.",
      "Temper mustard seeds and curry leaves in ghee; garnish with fresh coriander."
    ]
  },
  {
    "id": "rec_medu_vada",
    "name": "Crispy Medu Vada",
    "localName": "ഉഴുന്ന് വട",
    "cuisine": "South Indian",
    "country": "India",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Snacks",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/medu-vada.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Golden doughnut-shaped fritters with an ultra-crisp exterior and fluffy interior, infused with crushed peppercorns and ginger.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Frying Kadai"
    ],
    "storage": "Best served fresh. Re-crisp in air fryer.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 290,
      "protein": "9g",
      "carbs": "36g",
      "fat": "13g",
      "fiber": "4g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Urad Dal",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Ginger & Green Chili",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Black Peppercorns & Curry Leaves",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Cooking Oil",
        "amount": 2,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Frying",
        "substitute": "Air-fry at 190°C for 15 mins"
      }
    ],
    "instructions": [
      "Grind soaked urad dal with minimal water into a thick, airy batter.",
      "Fold in crushed pepper, ginger, green chilies, curry leaves, and salt.",
      "Shape into doughnut rounds on wet palm, drop into hot oil and fry until golden brown."
    ]
  },
  {
    "id": "rec_ven_pongal",
    "name": "Ven Pongal",
    "localName": "വെൺ പൊങ്കൽ",
    "cuisine": "South Indian",
    "country": "India",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Vegetarian",
      "Gluten-Free"
    ],
    "image": "assets/recipes/pongal.png",
    "fallbackImage": "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?auto=format&fit=crop&w=800&q=80",
    "description": "Comforting South Indian rice and yellow moong dal porridge tempered generously with ghee, black pepper, cumin, and cashews.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy",
      "Nuts"
    ],
    "equipment": [
      "Pressure Cooker"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 330,
      "protein": "8g",
      "carbs": "52g",
      "fat": "11g",
      "fiber": "4g",
      "sodium": "310mg"
    },
    "ingredients": [
      {
        "name": "Rice (Raw Rice)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Moong Dal (Yellow)",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Ghee & Cashew Nuts",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Black Pepper & Cumin",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Ghee",
        "substitute": "Coconut oil for vegan"
      }
    ],
    "instructions": [
      "Roast moong dal lightly, pressure cook with rice, water, and salt until soft and mushy.",
      "Heat ghee, fry cashews until golden, add cumin, crushed pepper, ginger, and curry leaves.",
      "Pour hot ghee tempering over cooked rice-dal mixture and mix thoroughly."
    ]
  },
  {
    "id": "rec_rava_upma",
    "name": "Rava Upma",
    "localName": "റവ ഉപ്പുമാവ്",
    "cuisine": "South Indian",
    "country": "India",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Vegetarian",
      "Vegan"
    ],
    "image": "assets/recipes/upma.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Savory semolina porridge tempered with mustard seeds, urad dal, ginger, green chilies, and crunchy cashews.",
    "prepTime": "5 mins",
    "cookTime": "12 mins",
    "totalMinutes": 17,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 230,
      "protein": "5g",
      "carbs": "42g",
      "fat": "5g",
      "fiber": "2g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Semolina (Rava)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Onion & Green Chili",
        "amount": 1,
        "unit": "pcs each"
      },
      {
        "name": "Ginger & Mustard Seeds",
        "amount": 1,
        "unit": "tsp each"
      },
      {
        "name": "Ghee / Coconut Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Rava",
        "substitute": "Oats or broken wheat for gluten-free"
      }
    ],
    "instructions": [
      "Dry roast semolina until fragrant and set aside.",
      "Sauté mustard seeds, urad dal, ginger, onions, and curry leaves in oil.",
      "Add boiling water and salt, gradually whisk in roasted rava without lumps.",
      "Cover and simmer on low for 3 minutes until fluffy; finish with ghee."
    ]
  },
  {
    "id": "rec_butter_chicken",
    "name": "Butter Chicken",
    "localName": "മുർഗ്ഗ് മഖനി",
    "cuisine": "North Indian",
    "country": "India",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Dinner",
      "Non-Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/butter-chicken.png",
    "fallbackImage": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    "description": "Tandoori-grilled tender chicken pieces simmered in a silky, rich makhani gravy of butter, cream, and sun-ripened tomatoes.",
    "prepTime": "20 mins",
    "cookTime": "25 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Kadai",
      "Grill/Pan"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹120 / $1.50",
    "nutrition": {
      "calories": 520,
      "protein": "36g",
      "carbs": "14g",
      "fat": "36g",
      "fiber": "2g",
      "sodium": "610mg"
    },
    "ingredients": [
      {
        "name": "Chicken",
        "amount": 600,
        "unit": "g"
      },
      {
        "name": "Tomato Puree",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Butter & Heavy Cream",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Spices (Garam Masala, Kasuri Methi)",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Paneer or tofu"
      }
    ],
    "instructions": [
      "Marinate chicken in yogurt and tandoori spices; sear until char marks appear.",
      "Simmer tomato puree with ginger-garlic paste, butter, and cashews into a velvety sauce.",
      "Add grilled chicken, kasuri methi, and cream; simmer gently for 8 minutes."
    ]
  },
  {
    "id": "rec_paneer_tikka",
    "name": "Paneer Tikka",
    "localName": "പനീർ ടിക്ക",
    "cuisine": "North Indian",
    "country": "India",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Snacks",
      "Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/paneer-tikka.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    "description": "Char-grilled cubes of marinated cottage cheese, bell peppers, and red onions with aromatic tandoori masala and lemon.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Oven / Skewers / Tawa"
    ],
    "storage": "Best eaten hot fresh off the grill.",
    "costPerServing": "₹75 / $0.95",
    "nutrition": {
      "calories": 320,
      "protein": "18g",
      "carbs": "10g",
      "fat": "24g",
      "fiber": "2g",
      "sodium": "410mg"
    },
    "ingredients": [
      {
        "name": "Paneer",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Bell Peppers & Onion",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Hung Curd / Yogurt",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Tandoori Masala & Chaat Masala",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Paneer",
        "substitute": "Extra-firm tofu for vegan"
      }
    ],
    "instructions": [
      "Whisk yogurt with mustard oil, red chili powder, garam masala, and chaat masala.",
      "Toss paneer cubes and peppers into marinade; rest for 30 minutes.",
      "Thread onto skewers and bake at 220°C or pan-sear until smoky and charred."
    ]
  },
  {
    "id": "rec_aloo_paratha",
    "name": "Spiced Aloo Paratha",
    "localName": "ആലു പൊറോട്ട",
    "cuisine": "North Indian",
    "country": "India",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Breakfast",
      "Lunch",
      "Vegetarian"
    ],
    "image": "assets/recipes/aloo-paratha.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Whole wheat flatbread stuffed with spiced mashed potatoes, griddled golden crisp with butter, served with curd and pickle.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Tawa"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 310,
      "protein": "7g",
      "carbs": "52g",
      "fat": "10g",
      "fiber": "5g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Wheat Flour (Atta)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Potato",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Spices (Amchur, Cumin, Garam Masala)",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Butter / Ghee",
        "amount": 3,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Butter",
        "substitute": "Oil for vegan"
      }
    ],
    "instructions": [
      "Boil, peel, and mash potatoes; mix with green chilies, cilantro, cumin, amchur, and salt.",
      "Roll wheat dough balls, place potato stuffing inside, seal edges, and roll into flat disc.",
      "Cook on hot tawa with ghee or butter until speckled golden and crisp on both sides."
    ]
  },
  {
    "id": "rec_rajma_curry",
    "name": "Punjabi Rajma Chawal",
    "localName": "രാജ്മ",
    "cuisine": "North Indian",
    "country": "India",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "High Protein"
    ],
    "image": "assets/recipes/rajma.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Red kidney beans slow-simmered in a thick, hearty tomato and onion gravy with ginger, garlic, and fragrant Punjabi spices.",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalMinutes": 45,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pressure Cooker"
    ],
    "storage": "Tastes even better next day! Keeps 4 days refrigerated.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 340,
      "protein": "16g",
      "carbs": "58g",
      "fat": "5g",
      "fiber": "12g",
      "sodium": "420mg"
    },
    "ingredients": [
      {
        "name": "Kidney Beans (Rajma)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Tomato & Onion",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Ginger & Garlic",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Garam Masala & Cumin",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Rajma",
        "substitute": "Black beans or chickpeas"
      }
    ],
    "instructions": [
      "Pressure cook soaked red kidney beans until buttery soft.",
      "Sauté onions, ginger, garlic, and tomato puree until oil separates.",
      "Add cooked rajma along with its cooking liquor; mash a few beans to thicken gravy.",
      "Simmer for 15 minutes and serve steaming over Basmati rice."
    ]
  },
  {
    "id": "rec_dal_makhani",
    "name": "Dal Makhani",
    "localName": "ദാൽ മഖനി",
    "cuisine": "North Indian",
    "country": "India",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Dinner",
      "Vegetarian",
      "Gluten-Free"
    ],
    "image": "assets/recipes/dal-makhani.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Whole black lentils and red kidney beans slow-simmered overnight with butter, fresh cream, and rich tomato sauce.",
    "prepTime": "15 mins",
    "cookTime": "40 mins",
    "totalMinutes": 55,
    "difficulty": "Medium",
    "servings": 5,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Heavy Bottom Pot"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹45 / $0.55",
    "nutrition": {
      "calories": 390,
      "protein": "15g",
      "carbs": "48g",
      "fat": "17g",
      "fiber": "9g",
      "sodium": "440mg"
    },
    "ingredients": [
      {
        "name": "Black Urad Dal (Whole)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Rajma (Kidney Beans)",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Butter & Cream",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Tomato Puree & Spices",
        "amount": 1.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Butter",
        "substitute": "Coconut cream for vegan"
      }
    ],
    "instructions": [
      "Pressure cook soaked black lentils and rajma with ginger until completely soft.",
      "Simmer with tomato puree, Kashmiri chili powder, and lots of butter on low flame.",
      "Mash lentils against the pot side to achieve signature velvety consistency.",
      "Finish with heavy cream, kasuri methi, and an extra pat of butter."
    ]
  },
  {
    "id": "rec_spaghetti_bolognese_intl",
    "name": "Classic Spaghetti Bolognese",
    "localName": "Spaghetti Bolognese",
    "cuisine": "International",
    "country": "Italy",
    "category": "International",
    "categories": [
      "International",
      "Italian",
      "Dinner",
      "Non-Vegetarian"
    ],
    "image": "assets/recipes/spaghetti-bolognese.png",
    "fallbackImage": "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80",
    "description": "Traditional Italian ragù sauce with slow-braised minced beef, tomatoes, garlic, and fresh basil over spaghetti.",
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Pasta Pot"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹110 / $1.40",
    "nutrition": {
      "calories": 510,
      "protein": "32g",
      "carbs": "64g",
      "fat": "16g",
      "fiber": "4g",
      "sodium": "590mg"
    },
    "ingredients": [
      {
        "name": "Spaghetti",
        "amount": 400,
        "unit": "g"
      },
      {
        "name": "Ground Meat",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Tomato Sauce & Herbs",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Parmesan Cheese",
        "amount": 0.25,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Ground Meat",
        "substitute": "Mushrooms and walnuts"
      }
    ],
    "instructions": [
      "Brown minced meat with onions, carrots, celery, and garlic.",
      "Add Italian crushed tomatoes and herbs; simmer on low for 30 minutes.",
      "Toss hot spaghetti with the rich ragù and serve with shaved Parmesan."
    ]
  },
  {
    "id": "rec_margherita_pizza",
    "name": "Pizza Margherita",
    "localName": "Pizza Margherita",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Italian",
    "categories": [
      "Italian",
      "Dinner",
      "Vegetarian"
    ],
    "image": "assets/recipes/margherita-pizza.png",
    "fallbackImage": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    "description": "Neapolitan artisanal pizza with san marzano tomato sauce, fresh buffalo mozzarella, fragrant basil, and extra virgin olive oil.",
    "prepTime": "15 mins",
    "cookTime": "12 mins",
    "totalMinutes": 27,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Pizza Stone / Oven"
    ],
    "storage": "Refrigerate up to 3 days. Reheat on skillet for crisp crust.",
    "costPerServing": "₹90 / $1.15",
    "nutrition": {
      "calories": 420,
      "protein": "18g",
      "carbs": "52g",
      "fat": "16g",
      "fiber": "3g",
      "sodium": "580mg"
    },
    "ingredients": [
      {
        "name": "Pizza Dough",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Mozzarella Cheese",
        "amount": 200,
        "unit": "g"
      },
      {
        "name": "Tomato Sauce & Fresh Basil",
        "amount": 0.75,
        "unit": "cups"
      },
      {
        "name": "Olive Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Mozzarella",
        "substitute": "Vegan mozzarella"
      }
    ],
    "instructions": [
      "Stretch pizza dough into a 12-inch circle on parchment or pizza peel.",
      "Spread crushed tomato sauce, arrange torn fresh mozzarella.",
      "Bake at maximum oven temperature (250°C) for 10-12 mins until crust is blistered and cheese is melted.",
      "Scatter fresh basil leaves and drizzle extra virgin olive oil."
    ]
  },
  {
    "id": "rec_sushi_rolls",
    "name": "Fresh Sushi Rolls",
    "localName": "巻き寿司 (Maki)",
    "cuisine": "Japanese",
    "country": "Japan",
    "category": "Japanese",
    "categories": [
      "Japanese",
      "Lunch",
      "Dinner",
      "Healthy",
      "Gluten-Free"
    ],
    "image": "assets/recipes/sushi-rolls.png",
    "fallbackImage": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    "description": "Seasoned sushi rice rolled in toasted nori seaweed with fresh cucumber, avocado, and salmon or crab, served with soy and wasabi.",
    "prepTime": "25 mins",
    "cookTime": "15 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Fish",
      "Soy"
    ],
    "equipment": [
      "Bamboo Rolling Mat"
    ],
    "storage": "Consume within 24 hours.",
    "costPerServing": "₹140 / $1.75",
    "nutrition": {
      "calories": 330,
      "protein": "14g",
      "carbs": "54g",
      "fat": "7g",
      "fiber": "3g",
      "sodium": "480mg"
    },
    "ingredients": [
      {
        "name": "Sushi Rice & Rice Vinegar",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Nori Seaweed Sheets",
        "amount": 4,
        "unit": "sheets"
      },
      {
        "name": "Salmon / Tuna / Tofu",
        "amount": 200,
        "unit": "g"
      },
      {
        "name": "Avocado & Cucumber",
        "amount": 1,
        "unit": "pcs each"
      }
    ],
    "substitutions": [
      {
        "original": "Salmon",
        "substitute": "Cucumber and avocado for vegetarian roll"
      }
    ],
    "instructions": [
      "Cook short-grain sushi rice and season with rice vinegar, sugar, and salt.",
      "Place nori sheet on bamboo mat, spread rice evenly leaving top border.",
      "Lay fillings across center; roll tightly using the bamboo mat.",
      "Slice into 8 rounds with a sharp wet knife and serve with pickled ginger."
    ]
  },
  {
    "id": "rec_pad_thai",
    "name": "Authentic Pad Thai",
    "localName": "ผัดไทย",
    "cuisine": "Thai",
    "country": "Thailand",
    "category": "Thai",
    "categories": [
      "Thai",
      "Dinner",
      "Lunch",
      "Gluten-Free"
    ],
    "image": "assets/recipes/pad-thai.png",
    "fallbackImage": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    "description": "Stir-fried rice noodles tossed with tamarind sauce, eggs, crushed peanuts, fresh bean sprouts, and chicken or shrimp.",
    "prepTime": "15 mins",
    "cookTime": "10 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Eggs",
      "Peanuts",
      "Fish"
    ],
    "equipment": [
      "Wok"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹100 / $1.25",
    "nutrition": {
      "calories": 460,
      "protein": "22g",
      "carbs": "64g",
      "fat": "14g",
      "fiber": "4g",
      "sodium": "640mg"
    },
    "ingredients": [
      {
        "name": "Rice Noodles (Flat)",
        "amount": 250,
        "unit": "g"
      },
      {
        "name": "Tamarind Paste & Fish Sauce",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Chicken / Shrimp / Tofu",
        "amount": 200,
        "unit": "g"
      },
      {
        "name": "Egg & Crushed Peanuts",
        "amount": 2,
        "unit": "pcs / 2 tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Fish Sauce",
        "substitute": "Soy sauce for vegetarian"
      }
    ],
    "instructions": [
      "Soak rice noodles in warm water until pliable.",
      "In smoking wok, sear protein, push aside and scramble eggs.",
      "Add noodles, tamarind sauce, palm sugar, and stir-fry briskly.",
      "Toss with bean sprouts, chives, crushed peanuts, and lime wedges."
    ]
  },
  {
    "id": "rec_burger",
    "name": "Gourmet Cheeseburger",
    "localName": "Cheeseburger",
    "cuisine": "American",
    "country": "USA",
    "category": "American",
    "categories": [
      "American",
      "International",
      "Dinner",
      "Non-Vegetarian"
    ],
    "image": "assets/recipes/burger.png",
    "fallbackImage": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "description": "Juicy seared patty topped with melted cheddar, crisp lettuce, ripe tomatoes, and house sauce in a toasted brioche bun.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Cast Iron Skillet"
    ],
    "storage": "Patties keep 3 days in fridge.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 560,
      "protein": "32g",
      "carbs": "42g",
      "fat": "28g",
      "fiber": "3g",
      "sodium": "680mg"
    },
    "ingredients": [
      {
        "name": "Burger Buns (Brioche)",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Ground Meat / Veggie Patty",
        "amount": 300,
        "unit": "g"
      },
      {
        "name": "Cheddar Cheese",
        "amount": 2,
        "unit": "slices"
      },
      {
        "name": "Lettuce, Tomato & Sauce",
        "amount": 1,
        "unit": "cup"
      }
    ],
    "substitutions": [
      {
        "original": "Meat",
        "substitute": "Black bean or portobello mushroom patty"
      }
    ],
    "instructions": [
      "Form patties, season with salt and pepper, sear in hot skillet for 4 mins per side.",
      "Melt cheddar slice on patty during last minute of cooking.",
      "Toast buns, spread sauce, layer lettuce, tomato, patty, and close bun."
    ]
  },
  {
    "id": "rec_fried_rice",
    "name": "Classic Egg Fried Rice",
    "localName": "炒饭 (Chǎofàn)",
    "cuisine": "Chinese",
    "country": "China",
    "category": "Chinese",
    "categories": [
      "Chinese",
      "Dinner",
      "Lunch",
      "Quick Meals (<30m)",
      "Gluten-Free"
    ],
    "image": "assets/recipes/fried-rice.png",
    "fallbackImage": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    "description": "Fluffy jasmine rice wok-tossed on high flame with scrambled eggs, scallions, carrots, peas, and light soy sauce.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Eggs",
      "Soy"
    ],
    "equipment": [
      "Wok"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 360,
      "protein": "12g",
      "carbs": "56g",
      "fat": "9g",
      "fiber": "3g",
      "sodium": "480mg"
    },
    "ingredients": [
      {
        "name": "Cooked Jasmine Rice (Chilled)",
        "amount": 4,
        "unit": "cups"
      },
      {
        "name": "Eggs",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Carrots, Peas & Scallions",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Soy Sauce & Sesame Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Eggs",
        "substitute": "Tofu for vegan fried rice"
      }
    ],
    "instructions": [
      "Heat wok with oil until smoking hot; scramble eggs lightly and remove.",
      "Stir-fry diced carrots, peas, and garlic for 1 minute.",
      "Add cold cooked rice, break up clumps, drizzle soy sauce and sesame oil.",
      "Toss vigorously over high heat for 3 minutes, fold in eggs and chopped scallions."
    ]
  },
  {
    "id": "rec_chilli_chicken",
    "name": "Indo-Chinese Chilli Chicken",
    "localName": "ചില്ലി ചിക്കൻ",
    "cuisine": "Chinese",
    "country": "India",
    "category": "Chinese",
    "categories": [
      "Chinese",
      "Indian",
      "Dinner",
      "Non-Vegetarian",
      "High Protein"
    ],
    "image": "assets/recipes/chilli-chicken.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "description": "Crispy battered chicken bites tossed in a glossy, fiery sauce of dark soy, green chilies, garlic, and crunchy bell peppers.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Soy",
      "Gluten"
    ],
    "equipment": [
      "Wok"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹110 / $1.40",
    "nutrition": {
      "calories": 410,
      "protein": "32g",
      "carbs": "22g",
      "fat": "22g",
      "fiber": "2g",
      "sodium": "680mg"
    },
    "ingredients": [
      {
        "name": "Chicken Breast / Thighs",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Bell Peppers & Onion",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Soy Sauce & Chili Sauce",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Cornstarch & Garlic",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Paneer or baby corn"
      }
    ],
    "instructions": [
      "Coat chicken in cornstarch, egg white, salt, and pepper; fry until crispy.",
      "In hot wok, sauté minced garlic, ginger, green chilies, onions, and bell peppers.",
      "Stir in soy sauce, vinegar, and red chili paste with cornstarch slurry.",
      "Toss fried chicken until coated in glistening spicy sauce."
    ]
  },
  {
    "id": "rec_manchurian",
    "name": "Vegetable Manchurian",
    "localName": "വെജ് മഞ്ചൂരിയൻ",
    "cuisine": "Chinese",
    "country": "India",
    "category": "Chinese",
    "categories": [
      "Chinese",
      "Vegetarian",
      "Dinner",
      "Snacks"
    ],
    "image": "assets/recipes/manchurian.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Crispy deep-fried minced vegetable balls coated in a spicy, tangy Indo-Chinese garlic, ginger, and soy sauce glaze.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Soy",
      "Gluten"
    ],
    "equipment": [
      "Wok",
      "Frying Pan"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹45 / $0.55",
    "nutrition": {
      "calories": 310,
      "protein": "6g",
      "carbs": "38g",
      "fat": "15g",
      "fiber": "4g",
      "sodium": "590mg"
    },
    "ingredients": [
      {
        "name": "Finely Chopped Cabbage & Carrot",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Flour & Cornstarch",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Ginger, Garlic & Green Chilies",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Soy Sauce & Vinegar",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Deep Frying",
        "substitute": "Air-fry vegetable balls at 190°C"
      }
    ],
    "instructions": [
      "Mix shredded cabbage, carrots, flour, cornstarch, and spices into tight balls.",
      "Deep fry until crunchy and golden brown.",
      "Prepare sauce with garlic, ginger, scallions, soy sauce, and cornstarch slurry.",
      "Drop vegetable balls into bubbling sauce and toss for 1 minute."
    ]
  },
  {
    "id": "rec_hakka_noodles",
    "name": "Vegetable Hakka Noodles",
    "localName": "ഹക്കാ നൂഡിൽസ്",
    "cuisine": "Chinese",
    "country": "China",
    "category": "Chinese",
    "categories": [
      "Chinese",
      "Dinner",
      "Lunch",
      "Vegetarian",
      "Vegan",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/hakka-noodles.png",
    "fallbackImage": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    "description": "Chinese wheat noodles tossed on high wok heat with crunchy julienned vegetables, white pepper, and toasted sesame oil.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten",
      "Soy"
    ],
    "equipment": [
      "Wok"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 340,
      "protein": "8g",
      "carbs": "58g",
      "fat": "9g",
      "fiber": "4g",
      "sodium": "480mg"
    },
    "ingredients": [
      {
        "name": "Hakka Noodles",
        "amount": 300,
        "unit": "g"
      },
      {
        "name": "Julienned Cabbage, Carrots & Bell Peppers",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Soy Sauce & Vinegar",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Sesame Oil & White Pepper",
        "amount": 1,
        "unit": "tsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Hakka Noodles",
        "substitute": "Rice noodles for gluten-free"
      }
    ],
    "instructions": [
      "Boil noodles until al dente, rinse under cold water with oil to prevent sticking.",
      "Stir-fry shredded vegetables on maximum heat for 2 minutes to keep them crunchy.",
      "Toss in cooked noodles, soy sauce, vinegar, and white pepper.",
      "Toss vigorously for 2 minutes and garnish with green spring onion greens."
    ]
  },
  {
    "id": "rec_spring_rolls",
    "name": "Crispy Vegetable Spring Rolls",
    "localName": "സ്പ്രിംഗ് റോൾസ്",
    "cuisine": "Chinese",
    "country": "China",
    "category": "Chinese",
    "categories": [
      "Chinese",
      "Snacks",
      "Vegetarian",
      "Vegan"
    ],
    "image": "assets/recipes/spring-rolls.png",
    "fallbackImage": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "description": "Golden fried thin pastry rolls packed with stir-fried cabbage, carrots, and glass noodles, served with sweet chili sauce.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Kadai / Pan"
    ],
    "storage": "Freeze uncooked rolls up to 1 month.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 280,
      "protein": "5g",
      "carbs": "36g",
      "fat": "13g",
      "fiber": "3g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Spring Roll Wrappers",
        "amount": 8,
        "unit": "sheets"
      },
      {
        "name": "Finely Shredded Cabbage & Carrots",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Garlic & Soy Sauce",
        "amount": 1,
        "unit": "tbsp each"
      },
      {
        "name": "Oil for Frying",
        "amount": 2,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Deep Frying",
        "substitute": "Bake at 200°C for 20 mins"
      }
    ],
    "instructions": [
      "Sauté vegetables with garlic, soy sauce, and black pepper until dry.",
      "Place filling on wrapper corner, roll tightly, fold sides in, and seal edge with cornstarch slurry.",
      "Deep fry in medium-hot oil until blistered, crisp, and golden brown."
    ]
  },
  {
    "id": "rec_pasta_alfredo",
    "name": "Fettuccine Alfredo",
    "localName": "Fettuccine Alfredo",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Italian",
    "categories": [
      "Italian",
      "Dinner",
      "Vegetarian"
    ],
    "image": "assets/recipes/pasta-alfredo.png",
    "fallbackImage": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    "description": "Silky fettuccine pasta enveloped in an opulent, velvety sauce of butter, heavy cream, freshly grated Parmesan, and cracked black pepper.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Pasta Pot",
      "Skillet"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹85 / $1.10",
    "nutrition": {
      "calories": 520,
      "protein": "16g",
      "carbs": "54g",
      "fat": "28g",
      "fiber": "2g",
      "sodium": "520mg"
    },
    "ingredients": [
      {
        "name": "Fettuccine Pasta",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Heavy Cream & Butter",
        "amount": 1,
        "unit": "cups / 4 tbsp"
      },
      {
        "name": "Parmesan Cheese (Freshly Grated)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Garlic & Nutmeg",
        "amount": 1,
        "unit": "tsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Cream",
        "substitute": "Cashew cream for dairy-free"
      }
    ],
    "instructions": [
      "Cook fettuccine in boiling salted water until al dente.",
      "Melt butter with garlic in skillet, pour in heavy cream and simmer 2 minutes.",
      "Stir in freshly grated Parmesan until melted and glossy.",
      "Toss hot pasta in sauce with starchy cooking water; finish with freshly cracked black pepper."
    ]
  },
  {
    "id": "rec_lasagna",
    "name": "Classic Baked Lasagna",
    "localName": "Lasagne al Forno",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Italian",
    "categories": [
      "Italian",
      "Dinner",
      "Non-Vegetarian"
    ],
    "image": "assets/recipes/lasagna.png",
    "fallbackImage": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
    "description": "Tender sheets of pasta layered with rich meat ragù, creamy béchamel sauce, mozzarella, and browned Parmesan.",
    "prepTime": "30 mins",
    "cookTime": "40 mins",
    "totalMinutes": 70,
    "difficulty": "Hard",
    "servings": 6,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Baking Dish 9x13"
    ],
    "storage": "Refrigerate up to 4 days or freeze 2 months.",
    "costPerServing": "₹120 / $1.50",
    "nutrition": {
      "calories": 580,
      "protein": "34g",
      "carbs": "48g",
      "fat": "28g",
      "fiber": "3g",
      "sodium": "680mg"
    },
    "ingredients": [
      {
        "name": "Lasagna Sheets",
        "amount": 12,
        "unit": "sheets"
      },
      {
        "name": "Minced Meat Sauce (Bolognese)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Béchamel / White Sauce",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Mozzarella & Parmesan Cheese",
        "amount": 2,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Meat Sauce",
        "substitute": "Spinach and ricotta filling"
      }
    ],
    "instructions": [
      "Spread thin layer of meat sauce in baking dish.",
      "Layer lasagna sheets, meat sauce, béchamel, and mozzarella.",
      "Repeat 3 layers, topping with generous mozzarella and Parmesan.",
      "Bake at 190°C for 35-40 mins until bubbly and golden brown on top."
    ]
  },
  {
    "id": "rec_risotto",
    "name": "Creamy Mushroom Risotto",
    "localName": "Risotto ai Funghi",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Italian",
    "categories": [
      "Italian",
      "Dinner",
      "Vegetarian",
      "Gluten-Free"
    ],
    "image": "assets/recipes/risotto.png",
    "fallbackImage": "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    "description": "Arborio rice slowly cooked in warm broth until creamy, folded with sautéed earthy wild mushrooms, garlic, and Parmesan.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Heavy Saucepan"
    ],
    "storage": "Best enjoyed immediately.",
    "costPerServing": "₹85 / $1.10",
    "nutrition": {
      "calories": 380,
      "protein": "9g",
      "carbs": "58g",
      "fat": "12g",
      "fiber": "3g",
      "sodium": "460mg"
    },
    "ingredients": [
      {
        "name": "Arborio Rice",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Mushrooms (Cremini or Button)",
        "amount": 300,
        "unit": "g"
      },
      {
        "name": "Vegetable Broth (Warm)",
        "amount": 4,
        "unit": "cups"
      },
      {
        "name": "Parmesan Cheese & Butter",
        "amount": 0.5,
        "unit": "cups / 2 tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Arborio Rice",
        "substitute": "Carnaroli rice"
      }
    ],
    "instructions": [
      "Sauté sliced mushrooms with garlic and thyme in butter until caramelized; set half aside.",
      "Toast arborio rice in pan with shallots until translucent.",
      "Add warm broth one ladle at a time, stirring continuously until absorbed before adding more.",
      "Fold in mushrooms, cold butter, and grated Parmesan cheese until creamy."
    ]
  },
  {
    "id": "rec_caprese_salad",
    "name": "Fresh Caprese Salad",
    "localName": "Insalata Caprese",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Italian",
    "categories": [
      "Italian",
      "Salad",
      "Vegetarian",
      "Gluten-Free",
      "Healthy",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/caprese-salad.png",
    "fallbackImage": "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
    "description": "Vibrant slices of ripe vine tomatoes and fresh mozzarella layered with aromatic basil leaves, extra virgin olive oil, and balsamic glaze.",
    "prepTime": "10 mins",
    "cookTime": "0 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Platter"
    ],
    "storage": "Best assembled fresh.",
    "costPerServing": "₹65 / $0.80",
    "nutrition": {
      "calories": 230,
      "protein": "12g",
      "carbs": "6g",
      "fat": "18g",
      "fiber": "2g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Ripe Heirloom Tomatoes",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Fresh Mozzarella Ball",
        "amount": 250,
        "unit": "g"
      },
      {
        "name": "Fresh Basil Leaves",
        "amount": 1,
        "unit": "cup"
      },
      {
        "name": "Extra Virgin Olive Oil & Balsamic Glaze",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Mozzarella",
        "substitute": "Vegan mozzarella"
      }
    ],
    "instructions": [
      "Slice tomatoes and fresh mozzarella into uniform 1/4-inch rounds.",
      "Alternate overlapping slices of tomato, mozzarella, and fresh basil leaves on platter.",
      "Drizzle generously with fruity olive oil, balsamic reduction, flaky sea salt, and fresh pepper."
    ]
  },
  {
    "id": "rec_minestrone_soup",
    "name": "Hearty Minestrone Soup",
    "localName": "Minestrone",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Italian",
    "categories": [
      "Italian",
      "Soup",
      "Vegetarian",
      "Vegan",
      "Healthy"
    ],
    "image": "assets/recipes/minestrone-soup.png",
    "fallbackImage": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    "description": "Rustic Italian vegetable soup with cannellini beans, zucchini, carrots, diced tomatoes, spinach, and ditalini pasta.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 5,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Soup Pot"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 190,
      "protein": "8g",
      "carbs": "34g",
      "fat": "3g",
      "fiber": "6g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "White Beans (Cannellini)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Zucchini, Carrots & Celery",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Tomato Broth & Herbs",
        "amount": 4,
        "unit": "cups"
      },
      {
        "name": "Ditalini / Small Pasta",
        "amount": 0.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Pasta",
        "substitute": "Gluten-free pasta or potatoes"
      }
    ],
    "instructions": [
      "Sauté onions, carrots, celery, and garlic in olive oil until fragrant.",
      "Add diced tomatoes, vegetable broth, zucchini, oregano, and simmer 15 minutes.",
      "Add cooked cannellini beans, pasta, and spinach; simmer until pasta is tender.",
      "Serve hot with a drizzle of extra virgin olive oil."
    ]
  },
  {
    "id": "rec_greek_salad",
    "name": "Authentic Greek Salad",
    "localName": "Χωριάτικη (Horiatiki)",
    "cuisine": "Mediterranean",
    "country": "Greece",
    "category": "Mediterranean",
    "categories": [
      "Mediterranean",
      "Salad",
      "Vegetarian",
      "Healthy",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/greek-salad.png",
    "fallbackImage": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "description": "Crisp cucumbers, vine tomatoes, kalamata olives, red onion, and a slab of Greek feta cheese sprinkled with dried oregano.",
    "prepTime": "10 mins",
    "cookTime": "0 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Salad Bowl"
    ],
    "storage": "Store un-dressed vegetables up to 2 days.",
    "costPerServing": "₹60 / $0.75",
    "nutrition": {
      "calories": 240,
      "protein": "8g",
      "carbs": "12g",
      "fat": "18g",
      "fiber": "3g",
      "sodium": "460mg"
    },
    "ingredients": [
      {
        "name": "Cucumber & Tomatoes",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Feta Cheese",
        "amount": 150,
        "unit": "g"
      },
      {
        "name": "Kalamata Olives & Red Onion",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Olive Oil & Oregano",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Feta",
        "substitute": "Tofu feta for vegan"
      }
    ],
    "instructions": [
      "Cut cucumbers and tomatoes into bite-sized chunks; thinly slice red onions.",
      "Toss vegetables with kalamata olives, olive oil, and red wine vinegar.",
      "Place block of feta cheese on top, sprinkle with dried oregano and sea salt."
    ]
  },
  {
    "id": "rec_hummus",
    "name": "Creamy Olive Oil Hummus",
    "localName": "حمّص (Hummus)",
    "cuisine": "Mediterranean",
    "country": "Lebanon",
    "category": "Mediterranean",
    "categories": [
      "Mediterranean",
      "Middle Eastern",
      "Snacks",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy"
    ],
    "image": "assets/recipes/hummus.png",
    "fallbackImage": "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80",
    "description": "Silky smooth chickpea dip blended with nutty tahini, fresh garlic, lemon juice, topped with extra virgin olive oil and paprika.",
    "prepTime": "10 mins",
    "cookTime": "0 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Sesame"
    ],
    "equipment": [
      "Food Processor"
    ],
    "storage": "Refrigerate up to 6 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 220,
      "protein": "8g",
      "carbs": "24g",
      "fat": "11g",
      "fiber": "6g",
      "sodium": "310mg"
    },
    "ingredients": [
      {
        "name": "Cooked Chickpeas (Garbanzo)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Tahini (Sesame Paste)",
        "amount": 0.25,
        "unit": "cups"
      },
      {
        "name": "Lemon Juice & Garlic",
        "amount": 3,
        "unit": "tbsp / 2 cloves"
      },
      {
        "name": "Extra Virgin Olive Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Tahini",
        "substitute": "Sunflower seed butter"
      }
    ],
    "instructions": [
      "Blend tahini and lemon juice in food processor for 1 minute until whipped and creamy.",
      "Add garlic, cumin, salt, and half the chickpeas; process until smooth.",
      "Add remaining chickpeas with cold ice water, blending 3 minutes until silk-smooth.",
      "Swirl in bowl, drizzle olive oil, and dust with sweet paprika."
    ]
  },
  {
    "id": "rec_falafel",
    "name": "Crispy Golden Falafel",
    "localName": "فلافل (Falafel)",
    "cuisine": "Mediterranean",
    "country": "Middle East",
    "category": "Mediterranean",
    "categories": [
      "Mediterranean",
      "Middle Eastern",
      "Snacks",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/falafel.png",
    "fallbackImage": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    "description": "Crispy herb-packed chickpea patties seasoned with cumin, coriander, parsley, and garlic, served with tahini sauce.",
    "prepTime": "20 mins",
    "cookTime": "10 mins",
    "totalMinutes": 30,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Sesame"
    ],
    "equipment": [
      "Food Processor",
      "Skillet"
    ],
    "storage": "Formed uncooked balls freeze up to 2 months.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 290,
      "protein": "12g",
      "carbs": "38g",
      "fat": "12g",
      "fiber": "8g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Dried Chickpeas (Soaked overnight)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Fresh Parsley & Cilantro",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Onion & Garlic",
        "amount": 1,
        "unit": "pcs / 4 cloves"
      },
      {
        "name": "Cumin & Coriander Powder",
        "amount": 1,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Deep Frying",
        "substitute": "Bake at 200°C for 25 mins"
      }
    ],
    "instructions": [
      "Pulse soaked (raw) chickpeas, herbs, onion, garlic, and spices in processor until crumbly.",
      "Chill mixture 30 minutes, then form into small discs or balls.",
      "Deep-fry in hot oil for 4 minutes until dark golden brown and crispy.",
      "Serve tucked in warm pita with tahini, tomatoes, and pickled turnip."
    ]
  },
  {
    "id": "rec_shawarma",
    "name": "Spiced Chicken Shawarma",
    "localName": "شاورما دجاج",
    "cuisine": "Mediterranean",
    "country": "Middle East",
    "category": "Mediterranean",
    "categories": [
      "Mediterranean",
      "Middle Eastern",
      "Dinner",
      "Lunch",
      "Non-Vegetarian",
      "High Protein"
    ],
    "image": "assets/recipes/shawarma.png",
    "fallbackImage": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    "description": "Marinated chicken thighs with cumin, cardamom, and garlic, seared until caramelized, wrapped in pita with garlic sauce (toum).",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Cast Iron Skillet"
    ],
    "storage": "Cooked shawarma meat keeps 4 days refrigerated.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 480,
      "protein": "36g",
      "carbs": "38g",
      "fat": "20g",
      "fiber": "3g",
      "sodium": "580mg"
    },
    "ingredients": [
      {
        "name": "Chicken Thighs",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Pita Bread",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Shawarma Spices (Cumin, Cardamom, Paprika)",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Garlic Sauce (Toum) & Pickles",
        "amount": 0.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Tofu or portobello mushrooms"
      }
    ],
    "instructions": [
      "Marinate chicken in olive oil, lemon juice, garlic, and shawarma spices for at least 1 hour.",
      "Pan-sear on high heat until deeply browned and juicy.",
      "Slice into thin strips.",
      "Spread garlic sauce on warm pita, layer with chicken, pickles, tomatoes, and roll tightly."
    ]
  },
  {
    "id": "rec_tabbouleh",
    "name": "Fresh Herb Tabbouleh",
    "localName": "تبولة (Tabbouleh)",
    "cuisine": "Mediterranean",
    "country": "Lebanon",
    "category": "Mediterranean",
    "categories": [
      "Mediterranean",
      "Middle Eastern",
      "Salad",
      "Vegetarian",
      "Vegan",
      "Healthy",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/tabbouleh.png",
    "fallbackImage": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "description": "Refreshing Levantine salad dominated by finely chopped flat-leaf parsley, mint, ripe tomatoes, bulgur wheat, and lemon dressing.",
    "prepTime": "15 mins",
    "cookTime": "0 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Sharp Knife",
      "Bowl"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 160,
      "protein": "4g",
      "carbs": "22g",
      "fat": "8g",
      "fiber": "5g",
      "sodium": "140mg"
    },
    "ingredients": [
      {
        "name": "Fresh Flat Leaf Parsley",
        "amount": 3,
        "unit": "bunches"
      },
      {
        "name": "Fine Bulgur Wheat",
        "amount": 0.25,
        "unit": "cups"
      },
      {
        "name": "Tomatoes & Fresh Mint",
        "amount": 2,
        "unit": "pcs / 0.5 cup"
      },
      {
        "name": "Lemon Juice & Olive Oil",
        "amount": 3,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Bulgur",
        "substitute": "Quinoa for gluten-free tabbouleh"
      }
    ],
    "instructions": [
      "Soak fine bulgur wheat in lemon juice and hot water until tender.",
      "Finely chop fresh parsley, fresh mint, and dice firm tomatoes.",
      "Toss herbs, tomatoes, and bulgur with extra virgin olive oil, lemon juice, and salt.",
      "Serve chilled with crisp romaine lettuce leaves for scooping."
    ]
  },
  {
    "id": "rec_ramen_dish",
    "name": "Authentic Shoyu Ramen",
    "localName": "醤油ラーメン",
    "cuisine": "Japanese",
    "country": "Japan",
    "category": "Japanese",
    "categories": [
      "Japanese",
      "Dinner",
      "Soup",
      "Non-Vegetarian"
    ],
    "image": "assets/recipes/ramen.png",
    "fallbackImage": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    "description": "Springy ramen noodles in a deeply savory soy-sauce infused dashi broth topped with soft-boiled ajitsuke egg, scallions, and nori.",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalMinutes": 35,
    "difficulty": "Medium",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten",
      "Soy",
      "Eggs"
    ],
    "equipment": [
      "Ramen Bowl",
      "Stock Pot"
    ],
    "storage": "Store broth and noodles separately in fridge up to 3 days.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 480,
      "protein": "24g",
      "carbs": "62g",
      "fat": "16g",
      "fiber": "3g",
      "sodium": "780mg"
    },
    "ingredients": [
      {
        "name": "Ramen Noodles",
        "amount": 300,
        "unit": "g"
      },
      {
        "name": "Broth (Chicken / Dashi)",
        "amount": 4,
        "unit": "cups"
      },
      {
        "name": "Soy Sauce & Mirin Tare",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Soft-Boiled Eggs & Nori",
        "amount": 2,
        "unit": "pcs each"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken Broth",
        "substitute": "Mushroom kombu broth for vegan"
      }
    ],
    "instructions": [
      "Simmer broth with garlic, ginger, soy sauce, and mirin to make the ramen soup base.",
      "Boil ramen noodles separately until just tender, drain well.",
      "Pour hot broth into deep bowls, add noodles, top with halved ramen egg, scallions, and nori sheets."
    ]
  },
  {
    "id": "rec_tempura_dish",
    "name": "Crispy Tempura",
    "localName": "天ぷら",
    "cuisine": "Japanese",
    "country": "Japan",
    "category": "Japanese",
    "categories": [
      "Japanese",
      "Snacks",
      "Dinner",
      "Vegetarian"
    ],
    "image": "assets/recipes/tempura.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    "description": "Light, lacy, ice-cold battered vegetables and shrimp deep-fried to airy crispness, served with tentsuyu dipping sauce.",
    "prepTime": "15 mins",
    "cookTime": "10 mins",
    "totalMinutes": 25,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten",
      "Eggs"
    ],
    "equipment": [
      "Deep Fryer / Wok"
    ],
    "storage": "Best served immediately for crispness.",
    "costPerServing": "₹75 / $0.95",
    "nutrition": {
      "calories": 310,
      "protein": "7g",
      "carbs": "34g",
      "fat": "16g",
      "fiber": "3g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Vegetables (Sweet Potato, Pumpkin, Eggplant)",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Tempura Flour & Ice Water",
        "amount": 1,
        "unit": "cups each"
      },
      {
        "name": "Egg Yolk",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Dipping Sauce (Dashi, Soy Sauce, Mirin)",
        "amount": 0.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Vegetables",
        "substitute": "Shrimp / Prawns"
      }
    ],
    "instructions": [
      "Mix tempura flour, egg yolk, and ice-cold water minimally with chopsticks leaving lumps.",
      "Dust vegetables lightly in flour, dip into cold batter.",
      "Fry in hot oil (180°C) for 2-3 minutes until pale gold and ultra-crisp.",
      "Drain on paper towel and serve hot with tentsuyu sauce and grated daikon radish."
    ]
  },
  {
    "id": "rec_teriyaki_dish",
    "name": "Teriyaki Chicken",
    "localName": "照り焼きチキン",
    "cuisine": "Japanese",
    "country": "Japan",
    "category": "Japanese",
    "categories": [
      "Japanese",
      "Dinner",
      "Lunch",
      "Non-Vegetarian",
      "High Protein"
    ],
    "image": "assets/recipes/teriyaki-chicken.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "description": "Pan-seared chicken thighs glazed in a glossy, sweet-savory reduction of soy sauce, mirin, sake, and ginger.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Soy",
      "Gluten"
    ],
    "equipment": [
      "Skillet"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 380,
      "protein": "34g",
      "carbs": "16g",
      "fat": "18g",
      "fiber": "1g",
      "sodium": "620mg"
    },
    "ingredients": [
      {
        "name": "Chicken Thighs (Skin-on or Boneless)",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Soy Sauce & Mirin",
        "amount": 3,
        "unit": "tbsp each"
      },
      {
        "name": "Brown Sugar & Grated Ginger",
        "amount": 1,
        "unit": "tbsp each"
      },
      {
        "name": "Toasted Sesame Seeds & Scallions",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Salmon fillets or firm tofu"
      }
    ],
    "instructions": [
      "Sear chicken in dry skillet skin-side down until golden brown and rendered.",
      "Flip chicken; pour in mixture of soy sauce, mirin, sugar, and ginger.",
      "Simmer on medium heat as sauce bubbles and reduces into a thick glaze.",
      "Slice chicken, spoon glossy sauce over top, and scatter toasted sesame seeds."
    ]
  },
  {
    "id": "rec_miso_dish",
    "name": "Traditional Miso Soup",
    "localName": "味噌汁",
    "cuisine": "Japanese",
    "country": "Japan",
    "category": "Japanese",
    "categories": [
      "Japanese",
      "Soup",
      "Breakfast",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/miso-soup.png",
    "fallbackImage": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    "description": "Comforting Japanese broth with fermented soybean paste, tender silken tofu cubes, wakame seaweed, and scallions.",
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Soy"
    ],
    "equipment": [
      "Saucepan"
    ],
    "storage": "Consume fresh.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 85,
      "protein": "6g",
      "carbs": "8g",
      "fat": "3g",
      "fiber": "2g",
      "sodium": "540mg"
    },
    "ingredients": [
      {
        "name": "Miso Paste (White or Red)",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Dashi Broth (Kombu based)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Silken Tofu",
        "amount": 150,
        "unit": "g"
      },
      {
        "name": "Wakame Seaweed & Green Onions",
        "amount": 1,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Silken Tofu",
        "substitute": "Mushrooms or spinach"
      }
    ],
    "instructions": [
      "Bring dashi broth to a simmer, add rehydrated wakame seaweed and cubed silken tofu.",
      "Dissolve miso paste in a ladle of warm broth, then stir into the soup.",
      "Remove immediately from heat (do not boil miso) and ladle into bowls with scallions."
    ]
  },
  {
    "id": "rec_onigiri_dish",
    "name": "Onigiri (Rice Triangles)",
    "localName": "おにぎり",
    "cuisine": "Japanese",
    "country": "Japan",
    "category": "Japanese",
    "categories": [
      "Japanese",
      "Snacks",
      "Lunch",
      "Vegetarian",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/onigiri.png",
    "fallbackImage": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    "description": "Handcrafted triangular rice balls seasoned with salt, filled with pickled plum or cooked tuna, wrapped in crisp nori.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Onigiri Mold / Hands"
    ],
    "storage": "Keep at cool room temperature for up to 8 hours.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 190,
      "protein": "4g",
      "carbs": "40g",
      "fat": "1g",
      "fiber": "1g",
      "sodium": "220mg"
    },
    "ingredients": [
      {
        "name": "Cooked Japanese Rice",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Nori Seaweed Strips",
        "amount": 4,
        "unit": "strips"
      },
      {
        "name": "Filling (Umeboshi, Tuna Mayo, or Sesame)",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Tuna",
        "substitute": "Avocado or pickled radish"
      }
    ],
    "instructions": [
      "Wet hands with salted water, take a palm-sized portion of warm rice.",
      "Indent center, place filling inside, and gently cover with rice.",
      "Press and rotate between cupped palms to form a clean triangle shape.",
      "Wrap bottom with a crisp sheet of nori."
    ]
  },
  {
    "id": "rec_thai_green_dish",
    "name": "Thai Green Curry",
    "localName": "แกงเขียวหวาน",
    "cuisine": "Thai",
    "country": "Thailand",
    "category": "Thai",
    "categories": [
      "Thai",
      "Dinner",
      "Gluten-Free"
    ],
    "image": "assets/recipes/thai-green-curry.png",
    "fallbackImage": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
    "description": "Aromatic coconut milk curry infused with green chilies, lemongrass, galangal, Thai eggplants, and sweet Thai basil.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Fish"
    ],
    "equipment": [
      "Wok / Pot"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 390,
      "protein": "26g",
      "carbs": "12g",
      "fat": "28g",
      "fiber": "3g",
      "sodium": "580mg"
    },
    "ingredients": [
      {
        "name": "Coconut Milk",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Thai Green Curry Paste",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Chicken Breast / Tofu",
        "amount": 400,
        "unit": "g"
      },
      {
        "name": "Thai Eggplant, Bamboo Shoots & Basil",
        "amount": 1.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Tofu and mixed vegetables for vegan curry"
      }
    ],
    "instructions": [
      "Fry green curry paste in coconut cream until fragrant and oil separates.",
      "Add chicken and cook until no longer pink.",
      "Pour in remaining coconut milk, fish sauce, palm sugar, and vegetables; simmer 8 mins.",
      "Finish with a handful of fresh Thai holy basil and torn kaffir lime leaves."
    ]
  },
  {
    "id": "rec_tom_yum_dish",
    "name": "Tom Yum Soup",
    "localName": "ต้มยำกุ้ง",
    "cuisine": "Thai",
    "country": "Thailand",
    "category": "Thai",
    "categories": [
      "Thai",
      "Soup",
      "Healthy",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/tom-yum-soup.png",
    "fallbackImage": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    "description": "Iconic sweet, sour, and spicy herbal soup bursting with lemongrass, kaffir lime leaves, galangal, mushrooms, and shrimp.",
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Crustaceans",
      "Fish"
    ],
    "equipment": [
      "Soup Pot"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹110 / $1.40",
    "nutrition": {
      "calories": 180,
      "protein": "20g",
      "carbs": "10g",
      "fat": "6g",
      "fiber": "2g",
      "sodium": "640mg"
    },
    "ingredients": [
      {
        "name": "Shrimp / Prawns",
        "amount": 300,
        "unit": "g"
      },
      {
        "name": "Lemongrass, Galangal & Kaffir Lime Leaves",
        "amount": 1,
        "unit": "handful"
      },
      {
        "name": "Straw Mushrooms & Tomatoes",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Lime Juice, Fish Sauce & Chili Paste",
        "amount": 2,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Shrimp",
        "substitute": "Tofu and mushrooms"
      }
    ],
    "instructions": [
      "Bruise lemongrass, galangal, and kaffir lime leaves; simmer in broth for 5 minutes.",
      "Add mushrooms, cherry tomatoes, and Thai chili paste.",
      "Drop in fresh shrimp and cook for 2 minutes until pink and curled.",
      "Turn off heat; stir in lime juice, fish sauce, and fresh cilantro."
    ]
  },
  {
    "id": "rec_som_tam_dish",
    "name": "Som Tam (Green Papaya Salad)",
    "localName": "ส้มตำ",
    "cuisine": "Thai",
    "country": "Thailand",
    "category": "Thai",
    "categories": [
      "Thai",
      "Salad",
      "Healthy",
      "Vegetarian",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/som-tam.png",
    "fallbackImage": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "description": "Crisp shredded green papaya pounded in a clay mortar with garlic, bird's eye chilies, green beans, peanuts, lime, and palm sugar.",
    "prepTime": "15 mins",
    "cookTime": "0 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Peanuts"
    ],
    "equipment": [
      "Clay Mortar & Pestle"
    ],
    "storage": "Best eaten immediately for maximum crunch.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 140,
      "protein": "4g",
      "carbs": "22g",
      "fat": "5g",
      "fiber": "4g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Green Raw Papaya (Shredded)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Garlic & Bird's Eye Chilies",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Cherry Tomatoes & Green Beans",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Lime Juice, Palm Sugar & Peanuts",
        "amount": 2,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Green Papaya",
        "substitute": "Shredded carrots or cucumber"
      }
    ],
    "instructions": [
      "In a clay mortar, gently pound garlic and chilies.",
      "Add green beans, cherry tomatoes, palm sugar, lime juice, and soy sauce; crush lightly.",
      "Add shredded green papaya and bruise gently with pestle while turning with a spoon.",
      "Toss with roasted crushed peanuts and serve chilled."
    ]
  },
  {
    "id": "rec_mango_sticky_dish",
    "name": "Mango Sticky Rice",
    "localName": "ข้าวเหนียวมะม่วง",
    "cuisine": "Thai",
    "country": "Thailand",
    "category": "Thai",
    "categories": [
      "Thai",
      "Desserts",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/mango-sticky-rice.png",
    "fallbackImage": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    "description": "Warm glutinous sweet rice steeped in salted coconut cream, paired with slices of golden ripe honey mango and toasted mung beans.",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Steamer"
    ],
    "storage": "Best enjoyed warm fresh on day of cooking.",
    "costPerServing": "₹50 / $0.65",
    "nutrition": {
      "calories": 340,
      "protein": "4g",
      "carbs": "64g",
      "fat": "9g",
      "fiber": "3g",
      "sodium": "160mg"
    },
    "ingredients": [
      {
        "name": "Thai Sweet Glutinous Rice",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Coconut Milk",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Ripe Sweet Mangoes",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Sugar & Salt",
        "amount": 0.25,
        "unit": "cups / 0.5 tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Glutinous Rice",
        "substitute": "Sushi rice cooked with extra water"
      }
    ],
    "instructions": [
      "Steam soaked sweet glutinous rice for 20 minutes until tender.",
      "Warm coconut milk with sugar and salt until dissolved.",
      "Pour 3/4 of the warm coconut sauce over hot steamed rice; cover and let absorb for 20 minutes.",
      "Serve warm sticky rice alongside sliced sweet mangoes with remaining coconut sauce drizzled over."
    ]
  },
  {
    "id": "rec_thai_basil_dish",
    "name": "Thai Basil Chicken (Pad Kra Pao)",
    "localName": "ผัดกะเพราไก่",
    "cuisine": "Thai",
    "country": "Thailand",
    "category": "Thai",
    "categories": [
      "Thai",
      "Dinner",
      "Lunch",
      "Non-Vegetarian",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/thai-basil-chicken.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "description": "Minced chicken flash-fried with garlic, fiery bird's eye chilies, dark soy sauce, and holy basil, crowned with a crispy fried egg.",
    "prepTime": "10 mins",
    "cookTime": "8 mins",
    "totalMinutes": 18,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Eggs",
      "Soy"
    ],
    "equipment": [
      "Wok"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹75 / $0.95",
    "nutrition": {
      "calories": 420,
      "protein": "32g",
      "carbs": "12g",
      "fat": "28g",
      "fiber": "1g",
      "sodium": "610mg"
    },
    "ingredients": [
      {
        "name": "Ground Chicken / Minced Thighs",
        "amount": 400,
        "unit": "g"
      },
      {
        "name": "Thai Holy Basil Leaves",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Garlic & Red Bird's Eye Chilies",
        "amount": 4,
        "unit": "cloves / 4 pcs"
      },
      {
        "name": "Oyster Sauce & Dark Soy Sauce",
        "amount": 2,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Minced pork, beef, or crumbled tofu"
      }
    ],
    "instructions": [
      "Pound garlic and chilies together; sizzle in hot wok with oil.",
      "Add minced chicken, breaking up clumps over high heat until cooked.",
      "Add oyster sauce, dark soy sauce, and sugar; toss vigorously.",
      "Turn off heat, toss in holy basil until wilted, and serve over rice with a crisp fried egg."
    ]
  },
  {
    "id": "rec_quesadilla_dish",
    "name": "Cheesy Quesadilla",
    "localName": "Quesadilla",
    "cuisine": "Mexican",
    "country": "Mexico",
    "category": "Mexican",
    "categories": [
      "Mexican",
      "Snacks",
      "Lunch",
      "Vegetarian",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/quesadilla.png",
    "fallbackImage": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80",
    "description": "Toasted flour tortilla stuffed with melted Monterey Jack, sautéed bell peppers, sweet corn, and jalapeños, served with salsa.",
    "prepTime": "10 mins",
    "cookTime": "8 mins",
    "totalMinutes": 18,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Skillet"
    ],
    "storage": "Best served hot immediately.",
    "costPerServing": "₹50 / $0.65",
    "nutrition": {
      "calories": 380,
      "protein": "16g",
      "carbs": "38g",
      "fat": "18g",
      "fiber": "3g",
      "sodium": "540mg"
    },
    "ingredients": [
      {
        "name": "Flour Tortillas",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Shredded Cheese (Cheddar / Monterey Jack)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Bell Peppers & Sweet Corn",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Salsa & Sour Cream",
        "amount": 2,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Cheese",
        "substitute": "Vegan shredded cheddar"
      }
    ],
    "instructions": [
      "Heat a dry skillet, place one tortilla flat.",
      "Spread half the cheese, sautéed peppers, corn, and remaining cheese.",
      "Top with second tortilla; cook 3-4 mins per side until golden and cheese is molten.",
      "Cut into wedges and serve with salsa and sour cream."
    ]
  },
  {
    "id": "rec_burrito_dish",
    "name": "Loaded Burrito",
    "localName": "Burrito",
    "cuisine": "Mexican",
    "country": "Mexico",
    "category": "Mexican",
    "categories": [
      "Mexican",
      "Lunch",
      "Dinner"
    ],
    "image": "assets/recipes/burrito.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Jumbo warm tortilla rolled tight with cilantro lime rice, seasoned black beans, cheese, salsa, guacamole, and sour cream.",
    "prepTime": "15 mins",
    "cookTime": "10 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Skillet"
    ],
    "storage": "Foil-wrapped burritos keep 3 days in fridge.",
    "costPerServing": "₹75 / $0.95",
    "nutrition": {
      "calories": 540,
      "protein": "18g",
      "carbs": "76g",
      "fat": "19g",
      "fiber": "8g",
      "sodium": "640mg"
    },
    "ingredients": [
      {
        "name": "Large Flour Tortillas",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Cilantro Lime Rice",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Black Beans & Corn",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Cheese, Guacamole & Salsa",
        "amount": 0.5,
        "unit": "cups each"
      }
    ],
    "substitutions": [
      {
        "original": "Beans",
        "substitute": "Grilled chicken or carnitas"
      }
    ],
    "instructions": [
      "Warm tortilla so it folds without tearing.",
      "Layer rice, seasoned beans, corn, cheese, guacamole, and salsa down the center.",
      "Fold sides inward, roll tightly from bottom into a compact cylinder.",
      "Toast in dry skillet for 1 minute on each side to seal seam."
    ]
  },
  {
    "id": "rec_nachos_dish",
    "name": "Supreme Loaded Nachos",
    "localName": "Nachos Supremos",
    "cuisine": "Mexican",
    "country": "Mexico",
    "category": "Mexican",
    "categories": [
      "Mexican",
      "Snacks",
      "Vegetarian"
    ],
    "image": "assets/recipes/nachos.png",
    "fallbackImage": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
    "description": "Crispy tortilla chips layered with molten cheese sauce, black beans, pico de gallo, jalapeños, guacamole, and sour cream.",
    "prepTime": "10 mins",
    "cookTime": "8 mins",
    "totalMinutes": 18,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Baking Sheet"
    ],
    "storage": "Assemble fresh to maintain chip crispness.",
    "costPerServing": "₹65 / $0.80",
    "nutrition": {
      "calories": 440,
      "protein": "12g",
      "carbs": "48g",
      "fat": "24g",
      "fiber": "6g",
      "sodium": "590mg"
    },
    "ingredients": [
      {
        "name": "Corn Tortilla Chips",
        "amount": 250,
        "unit": "g"
      },
      {
        "name": "Cheddar & Monterey Jack Cheese",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Black Beans & Jalapeños",
        "amount": 0.5,
        "unit": "cups each"
      },
      {
        "name": "Pico de Gallo & Guacamole",
        "amount": 0.5,
        "unit": "cups each"
      }
    ],
    "substitutions": [
      {
        "original": "Cheese",
        "substitute": "Vegan queso dip"
      }
    ],
    "instructions": [
      "Spread tortilla chips in an even layer on a baking sheet.",
      "Scatter black beans, diced jalapeños, and shredded cheese over chips.",
      "Bake at 200°C for 7-8 minutes until cheese is completely melted and bubbly.",
      "Dollop fresh pico de gallo, guacamole, and sour cream over top before serving."
    ]
  },
  {
    "id": "rec_guacamole_dish",
    "name": "Fresh Chunky Guacamole",
    "localName": "Guacamole",
    "cuisine": "Mexican",
    "country": "Mexico",
    "category": "Mexican",
    "categories": [
      "Mexican",
      "Snacks",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/guacamole.png",
    "fallbackImage": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "description": "Hand-mashed ripe Hass avocados with diced red onion, jalapeño, Roma tomatoes, fresh cilantro, and freshly squeezed lime.",
    "prepTime": "10 mins",
    "cookTime": "0 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Mortar & Pestle / Bowl"
    ],
    "storage": "Press plastic wrap directly against surface; keeps 1 day.",
    "costPerServing": "₹75 / $0.95",
    "nutrition": {
      "calories": 170,
      "protein": "3g",
      "carbs": "10g",
      "fat": "15g",
      "fiber": "6g",
      "sodium": "120mg"
    },
    "ingredients": [
      {
        "name": "Ripe Hass Avocados",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Lime Juice",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Red Onion, Tomato & Cilantro",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Jalapeño & Sea Salt",
        "amount": 1,
        "unit": "tsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Jalapeño",
        "substitute": "Serrano chili or omit for mild"
      }
    ],
    "instructions": [
      "Halve, pit, and scoop avocado flesh into bowl.",
      "Mash coarsely with a fork, leaving satisfying chunks.",
      "Fold in finely diced red onion, jalapeño, tomatoes, chopped cilantro, and lime juice.",
      "Season with sea salt to taste and serve with crisp tortilla chips."
    ]
  },
  {
    "id": "rec_enchiladas_dish",
    "name": "Baked Cheesy Enchiladas",
    "localName": "Enchiladas",
    "cuisine": "Mexican",
    "country": "Mexico",
    "category": "Mexican",
    "categories": [
      "Mexican",
      "Dinner",
      "Gluten-Free"
    ],
    "image": "assets/recipes/enchiladas.png",
    "fallbackImage": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    "description": "Corn tortillas rolled around spiced chicken or beans, smothered in vibrant red enchilada chili sauce, and baked under melted cheese.",
    "prepTime": "20 mins",
    "cookTime": "20 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Casserole Dish"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 480,
      "protein": "28g",
      "carbs": "42g",
      "fat": "22g",
      "fiber": "5g",
      "sodium": "610mg"
    },
    "ingredients": [
      {
        "name": "Corn Tortillas",
        "amount": 8,
        "unit": "pcs"
      },
      {
        "name": "Shredded Chicken or Beans",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Red Enchilada Sauce",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Monterey Jack Cheese",
        "amount": 1.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Black beans and sweet potato"
      }
    ],
    "instructions": [
      "Lightly warm corn tortillas in skillet so they roll smoothly without cracking.",
      "Dip each tortilla in enchilada sauce, fill with shredded chicken and cheese, and roll up.",
      "Arrange seam-side down in casserole dish, pour remaining sauce over top, and cover with cheese.",
      "Bake at 190°C for 20 minutes until cheese is bubbling and golden."
    ]
  },
  {
    "id": "rec_quinoa_salad_dish",
    "name": "Mediterranean Quinoa Salad",
    "localName": "Quinoa Salad",
    "cuisine": "Healthy",
    "country": "International",
    "category": "Healthy",
    "categories": [
      "Healthy",
      "Salad",
      "Lunch",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/quinoa-salad.png",
    "fallbackImage": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "description": "Nutritious fluffy quinoa tossed with crisp diced cucumbers, cherry tomatoes, kalamata olives, chickpeas, parsley, and lemon-herb vinaigrette.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Salad Bowl",
      "Pot"
    ],
    "storage": "Meal prep friendly! Keeps 5 days refrigerated.",
    "costPerServing": "₹50 / $0.65",
    "nutrition": {
      "calories": 280,
      "protein": "10g",
      "carbs": "42g",
      "fat": "8g",
      "fiber": "6g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Quinoa",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Chickpeas (Cooked)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Cucumber, Cherry Tomatoes & Olives",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Lemon Vinaigrette & Parsley",
        "amount": 3,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Quinoa",
        "substitute": "Couscous or brown rice"
      }
    ],
    "instructions": [
      "Simmer quinoa in water with a pinch of salt for 15 mins until water is absorbed; fluff and cool.",
      "Chop cucumbers, tomatoes, bell peppers, and fresh herbs.",
      "Toss cooled quinoa, chickpeas, vegetables, and lemon olive oil dressing together.",
      "Chill for 30 minutes before serving to let flavors meld."
    ]
  },
  {
    "id": "rec_grilled_chicken_salad_dish",
    "name": "Herb Grilled Chicken Salad",
    "localName": "Grilled Chicken Salad",
    "cuisine": "Healthy",
    "country": "International",
    "category": "Healthy",
    "categories": [
      "Healthy",
      "Salad",
      "Lunch",
      "Dinner",
      "Non-Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/grilled-chicken-salad.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "description": "Rosemary-lemon marinated juicy grilled chicken breast sliced over crisp mixed greens, avocado, cucumber, and olive oil dressing.",
    "prepTime": "15 mins",
    "cookTime": "12 mins",
    "totalMinutes": 27,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Grill Pan"
    ],
    "storage": "Store sliced chicken up to 4 days.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 340,
      "protein": "36g",
      "carbs": "8g",
      "fat": "16g",
      "fiber": "4g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Chicken Breast",
        "amount": 450,
        "unit": "g"
      },
      {
        "name": "Mixed Salad Greens",
        "amount": 4,
        "unit": "cups"
      },
      {
        "name": "Avocado & Cherry Tomatoes",
        "amount": 1,
        "unit": "pcs / 1 cup"
      },
      {
        "name": "Olive Oil & Lemon Dressing",
        "amount": 3,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Grilled salmon or paneer"
      }
    ],
    "instructions": [
      "Marinate chicken breasts in olive oil, lemon juice, garlic, rosemary, and black pepper.",
      "Grill on medium-high heat for 6 mins per side until internal temperature reaches 74°C.",
      "Rest for 5 mins, then slice into strips.",
      "Arrange over salad greens with sliced avocado and tomatoes; drizzle dressing."
    ]
  },
  {
    "id": "rec_oats_porridge_dish",
    "name": "Warm Oats Porridge",
    "localName": "ഓട്സ് പൊറിഡ്ജ്",
    "cuisine": "Healthy",
    "country": "International",
    "category": "Healthy",
    "categories": [
      "Healthy",
      "Breakfast",
      "Vegetarian",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/oats-porridge.png",
    "fallbackImage": "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80",
    "description": "Creamy whole rolled oats simmered in milk and cinnamon, topped with fresh sliced bananas, berries, chia seeds, and raw honey.",
    "prepTime": "5 mins",
    "cookTime": "8 mins",
    "totalMinutes": 13,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Saucepan"
    ],
    "storage": "Keeps 3 days in fridge. Reheat with extra splash of milk.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 260,
      "protein": "9g",
      "carbs": "46g",
      "fat": "5g",
      "fiber": "7g",
      "sodium": "90mg"
    },
    "ingredients": [
      {
        "name": "Rolled Oats",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Milk / Almond Milk",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Banana, Berries & Honey",
        "amount": 1,
        "unit": "cup"
      },
      {
        "name": "Cinnamon & Chia Seeds",
        "amount": 1,
        "unit": "tsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Milk",
        "substitute": "Oat milk or almond milk for vegan"
      }
    ],
    "instructions": [
      "Combine rolled oats, milk, cinnamon, and a pinch of salt in saucepan.",
      "Simmer over medium heat for 5-7 minutes, stirring occasionally until thick and creamy.",
      "Pour into bowls, crown with sliced bananas, berries, chia seeds, and a drizzle of raw honey."
    ]
  },
  {
    "id": "rec_smoothie_bowl_dish",
    "name": "Acai Berry Smoothie Bowl",
    "localName": "സ്മൂത്തി ബോൾ",
    "cuisine": "Healthy",
    "country": "International",
    "category": "Healthy",
    "categories": [
      "Healthy",
      "Breakfast",
      "Desserts",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/smoothie-bowl.png",
    "fallbackImage": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    "description": "Thick, frosty smoothie bowl made with blended frozen acai, mixed wild berries, and bananas, topped with crunchy granola and coconut flakes.",
    "prepTime": "10 mins",
    "cookTime": "0 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "High Speed Blender"
    ],
    "storage": "Enjoy immediately.",
    "costPerServing": "₹65 / $0.80",
    "nutrition": {
      "calories": 280,
      "protein": "5g",
      "carbs": "54g",
      "fat": "6g",
      "fiber": "8g",
      "sodium": "40mg"
    },
    "ingredients": [
      {
        "name": "Frozen Mixed Berries & Acai",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Frozen Bananas",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Almond Milk",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Toppings (Granola, Chia Seeds, Coconut Flakes)",
        "amount": 0.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Acai",
        "substitute": "Blueberries or raspberries"
      }
    ],
    "instructions": [
      "Blend frozen bananas, berries, and almond milk on low speed with tamper until thick like soft serve.",
      "Scoop into wide bowls.",
      "Arrange neat stripes of crunchy granola, fresh sliced strawberries, chia seeds, and coconut flakes."
    ]
  },
  {
    "id": "rec_veg_stir_fry_dish",
    "name": "Sesame Veg Stir Fry",
    "localName": "വെജ് സ്റ്റിർ ഫ്രൈ",
    "cuisine": "Healthy",
    "country": "International",
    "category": "Healthy",
    "categories": [
      "Healthy",
      "Dinner",
      "Lunch",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/veg-stir-fry.png",
    "fallbackImage": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "description": "Crisp broccoli florets, snap peas, bell peppers, and baby corn wok-seared in ginger, garlic, tamari, and toasted sesame oil.",
    "prepTime": "10 mins",
    "cookTime": "8 mins",
    "totalMinutes": 18,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Soy",
      "Sesame"
    ],
    "equipment": [
      "Wok"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹45 / $0.55",
    "nutrition": {
      "calories": 190,
      "protein": "6g",
      "carbs": "22g",
      "fat": "8g",
      "fiber": "6g",
      "sodium": "420mg"
    },
    "ingredients": [
      {
        "name": "Broccoli, Bell Peppers & Snap Peas",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Tamari / Soy Sauce & Sesame Oil",
        "amount": 2,
        "unit": "tbsp each"
      },
      {
        "name": "Ginger, Garlic & Scallions",
        "amount": 1,
        "unit": "tbsp each"
      },
      {
        "name": "Toasted Sesame Seeds",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Broccoli",
        "substitute": "Cauliflower, mushrooms, or green beans"
      }
    ],
    "instructions": [
      "Heat wok with sesame oil until shimmering hot.",
      "Add minced ginger, garlic, and whites of scallions; stir-fry 30 seconds.",
      "Add broccoli, peppers, and snap peas; toss over high heat for 4 minutes to keep crisp-tender.",
      "Drizzle tamari sauce and sprinkle sesame seeds before serving."
    ]
  },
  {
    "id": "rec_pancakes_dish",
    "name": "Fluffy Buttermilk Pancakes",
    "localName": "പാൻകേക്ക്",
    "cuisine": "American",
    "country": "USA",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "American",
      "Vegetarian",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/pancakes.png",
    "fallbackImage": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    "description": "Sky-high, golden buttermilk pancakes with a cloud-soft interior, stacked high with melting butter and pure maple syrup.",
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy",
      "Eggs"
    ],
    "equipment": [
      "Griddle / Pan"
    ],
    "storage": "Cooked pancakes freeze brilliantly up to 2 months. Pop in toaster to reheat.",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 340,
      "protein": "8g",
      "carbs": "52g",
      "fat": "11g",
      "fiber": "2g",
      "sodium": "420mg"
    },
    "ingredients": [
      {
        "name": "Flour (All Purpose)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Buttermilk / Milk",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Eggs & Melted Butter",
        "amount": 2,
        "unit": "pcs / 3 tbsp"
      },
      {
        "name": "Baking Powder & Sugar",
        "amount": 2,
        "unit": "tsp / 2 tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Buttermilk",
        "substitute": "Milk + 1 tbsp lemon juice"
      }
    ],
    "instructions": [
      "Whisk flour, baking powder, sugar, and pinch of salt in large bowl.",
      "Whisk buttermilk, eggs, and melted butter in separate bowl; fold into dry ingredients until just combined (leave small lumps).",
      "Pour 1/3 cup batter onto buttered griddle over medium heat.",
      "Flip when bubbles pop on surface, cook until golden underneath, and serve stacked with maple syrup."
    ]
  },
  {
    "id": "rec_french_toast_dish",
    "name": "Cinnamon French Toast",
    "localName": "ഫ്രഞ്ച് ടോസ്റ്റ്",
    "cuisine": "European",
    "country": "France",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "European",
      "Vegetarian",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/french-toast.png",
    "fallbackImage": "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
    "description": "Thick slices of brioche soaked in rich vanilla, egg, and cinnamon custard, pan-fried in butter until golden brown with caramelized edges.",
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy",
      "Eggs"
    ],
    "equipment": [
      "Skillet"
    ],
    "storage": "Best served fresh and hot.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 310,
      "protein": "10g",
      "carbs": "42g",
      "fat": "12g",
      "fiber": "2g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "Brioche or Sourdough Bread",
        "amount": 6,
        "unit": "thick slices"
      },
      {
        "name": "Eggs & Milk",
        "amount": 3,
        "unit": "pcs / 0.75 cups"
      },
      {
        "name": "Cinnamon & Vanilla Extract",
        "amount": 1,
        "unit": "tsp each"
      },
      {
        "name": "Butter & Maple Syrup",
        "amount": 2,
        "unit": "tbsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Brioche",
        "substitute": "Challah or whole wheat bread"
      }
    ],
    "instructions": [
      "Whisk eggs, milk, cinnamon, vanilla extract, and pinch of salt in shallow dish.",
      "Dip bread slices for 20 seconds per side to absorb custard.",
      "Melt butter in skillet over medium heat, cook toast for 3-4 mins per side until golden brown.",
      "Dust with powdered sugar and serve with warm maple syrup and fresh berries."
    ]
  },
  {
    "id": "rec_poha_dish",
    "name": "Spiced Vegetable Poha",
    "localName": "പോഹ",
    "cuisine": "Indian",
    "country": "India",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Indian",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/poha.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Light, fluffy flattened rice sautéed with crunchy roasted peanuts, mustard seeds, onions, potatoes, turmeric, and fresh lime.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Peanuts"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 240,
      "protein": "5g",
      "carbs": "46g",
      "fat": "6g",
      "fiber": "3g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Flattened Rice (Thick Poha)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Peanuts (Raw)",
        "amount": 0.25,
        "unit": "cups"
      },
      {
        "name": "Onion & Boiled Potato",
        "amount": 1,
        "unit": "pcs each"
      },
      {
        "name": "Mustard Seeds, Turmeric & Curry Leaves",
        "amount": 1,
        "unit": "tsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Peanuts",
        "substitute": "Cashews or green peas"
      }
    ],
    "instructions": [
      "Rinse poha in colander under water for 30 seconds; drain well and fluff with fingers.",
      "Fry peanuts in oil until crunchy; set aside.",
      "Splutter mustard seeds and curry leaves; sauté onions, green chilies, and potato cubes with turmeric.",
      "Fold in drained poha and salt, cover on low flame for 2 mins, squeeze fresh lemon and garnish with peanuts and coriander."
    ]
  },
  {
    "id": "rec_omelette_dish",
    "name": "Classic Fluffy Omelette",
    "localName": "മുട്ട ഓംലെറ്റ്",
    "cuisine": "International",
    "country": "International",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "High Protein",
      "Vegetarian",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/omelette.png",
    "fallbackImage": "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    "description": "Golden farm-fresh eggs folded with melted cheese, bell peppers, mushrooms, and herbs with a tender, moist center.",
    "prepTime": "5 mins",
    "cookTime": "5 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 1,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Eggs",
      "Dairy"
    ],
    "equipment": [
      "Non-Stick Skillet"
    ],
    "storage": "Enjoy fresh immediately.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 270,
      "protein": "18g",
      "carbs": "3g",
      "fat": "21g",
      "fiber": "1g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "Eggs",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Butter",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Shredded Cheese",
        "amount": 0.25,
        "unit": "cups"
      },
      {
        "name": "Chopped Herbs & Bell Peppers",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Butter",
        "substitute": "Olive oil"
      }
    ],
    "instructions": [
      "Vigorously whisk eggs with salt, pepper, and a splash of water until completely homogenous.",
      "Melt butter in non-stick pan over medium heat until foaming.",
      "Pour in eggs, swirl pan while stirring center gently until curds form but surface remains glossy.",
      "Scatter cheese across center, fold in half, and slide onto plate."
    ]
  },
  {
    "id": "rec_chia_pudding_dish",
    "name": "Berry Chia Seed Pudding",
    "localName": "ചിയ പുഡ്ഡിംഗ്",
    "cuisine": "Healthy",
    "country": "International",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Healthy",
      "Desserts",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/chia-pudding.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "description": "Creamy chia seeds soaked in almond milk, layered with strawberry coulis, fresh blueberries, and crushed pistachios.",
    "prepTime": "10 mins",
    "cookTime": "0 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Mason Jar"
    ],
    "storage": "Meal prep champion! Keeps 5 days in fridge.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 210,
      "protein": "7g",
      "carbs": "24g",
      "fat": "11g",
      "fiber": "10g",
      "sodium": "80mg"
    },
    "ingredients": [
      {
        "name": "Chia Seeds",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Almond Milk or Coconut Milk",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Maple Syrup / Vanilla Extract",
        "amount": 1,
        "unit": "tbsp each"
      },
      {
        "name": "Fresh Berries & Nuts",
        "amount": 0.5,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Almond Milk",
        "substitute": "Dairy milk or oat milk"
      }
    ],
    "instructions": [
      "Whisk chia seeds, almond milk, maple syrup, and vanilla in a jar.",
      "Let sit 5 minutes, whisk again to break any clumps.",
      "Refrigerate for at least 2 hours (or overnight) until thick and gelatinous.",
      "Layer in glasses with fresh berry puree and roasted nuts."
    ]
  },
  {
    "id": "rec_brownie_dish",
    "name": "Chocolate Brownie",
    "localName": "ചോക്ലേറ്റ് ബ്രൗണി",
    "cuisine": "Desserts",
    "country": "International",
    "category": "Desserts",
    "categories": [
      "Desserts",
      "Snacks",
      "Vegetarian"
    ],
    "image": "assets/recipes/chocolate-brownie.png",
    "fallbackImage": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    "description": "Decadent fudge brownie with a crackly paper-thin top crust and dense, gooey chocolate-loaded center.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 6,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy",
      "Eggs"
    ],
    "equipment": [
      "Square Baking Pan 8x8"
    ],
    "storage": "Keeps 4 days at room temperature or 1 week chilled.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 340,
      "protein": "5g",
      "carbs": "44g",
      "fat": "18g",
      "fiber": "3g",
      "sodium": "140mg"
    },
    "ingredients": [
      {
        "name": "Dark Chocolate & Butter",
        "amount": 1,
        "unit": "cups each"
      },
      {
        "name": "Sugar & Eggs",
        "amount": 1,
        "unit": "cups / 3 pcs"
      },
      {
        "name": "All Purpose Flour & Cocoa Powder",
        "amount": 0.75,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Flour",
        "substitute": "Almond flour for gluten-free"
      }
    ],
    "instructions": [
      "Melt dark chocolate and butter together until smooth.",
      "Whisk eggs and sugar until pale and frothy.",
      "Fold chocolate mixture into eggs, gently fold in flour and cocoa powder.",
      "Bake in lined pan at 175°C for 22-25 mins until edges are set but center remains fudgy."
    ]
  },
  {
    "id": "rec_tiramisu_dish",
    "name": "Classic Italian Tiramisu",
    "localName": "Tiramisù",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Desserts",
    "categories": [
      "Desserts",
      "Italian",
      "Vegetarian"
    ],
    "image": "assets/recipes/tiramisu.png",
    "fallbackImage": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    "description": "Authentic Venetian layered dessert of espresso-dipped ladyfingers enveloped in whipped mascarpone cream and dusted with dark cocoa.",
    "prepTime": "25 mins",
    "cookTime": "0 mins",
    "totalMinutes": 25,
    "difficulty": "Medium",
    "servings": 6,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy",
      "Eggs"
    ],
    "equipment": [
      "Glass Dish"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹85 / $1.10",
    "nutrition": {
      "calories": 380,
      "protein": "6g",
      "carbs": "38g",
      "fat": "24g",
      "fiber": "1g",
      "sodium": "120mg"
    },
    "ingredients": [
      {
        "name": "Ladyfinger Biscuits (Savoiardi)",
        "amount": 24,
        "unit": "pcs"
      },
      {
        "name": "Mascarpone Cheese",
        "amount": 400,
        "unit": "g"
      },
      {
        "name": "Strong Brewed Espresso Coffee",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Heavy Cream, Sugar & Cocoa Powder",
        "amount": 1,
        "unit": "cups / 0.5 cup"
      }
    ],
    "substitutions": [
      {
        "original": "Mascarpone",
        "substitute": "Cream cheese + heavy cream"
      }
    ],
    "instructions": [
      "Whip egg yolks and sugar until fluffy; fold in mascarpone cheese and whipped cream.",
      "Dip ladyfingers briefly in cold espresso, arrange tightly in base of serving dish.",
      "Spread half the mascarpone cream; repeat with second layer of dipped biscuits and cream.",
      "Chill for at least 4 hours (overnight preferred); dust generously with Dutch cocoa powder before slicing."
    ]
  },
  {
    "id": "rec_fruit_salad_dish",
    "name": "Fresh Honey Fruit Salad",
    "localName": "ഫ്രൂട്ട് സാലഡ്",
    "cuisine": "Desserts",
    "country": "International",
    "category": "Desserts",
    "categories": [
      "Desserts",
      "Healthy",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Quick Meals (<30m)"
    ],
    "image": "assets/recipes/fruit-salad.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    "description": "Rainbow assortment of diced seasonal fruits: sweet melon, crisp grapes, kiwi, mango, and pomegranate in a citrus mint dressing.",
    "prepTime": "15 mins",
    "cookTime": "0 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Glass Bowl"
    ],
    "storage": "Best served cold within 24 hours.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 120,
      "protein": "2g",
      "carbs": "30g",
      "fat": "0g",
      "fiber": "4g",
      "sodium": "10mg"
    },
    "ingredients": [
      {
        "name": "Mixed Fresh Fruits (Apple, Grapes, Mango, Kiwi, Pomegranate)",
        "amount": 4,
        "unit": "cups"
      },
      {
        "name": "Honey or Maple Syrup",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Fresh Orange Juice & Mint Leaves",
        "amount": 3,
        "unit": "tbsp / 1 tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Honey",
        "substitute": "Agave nectar for vegan"
      }
    ],
    "instructions": [
      "Chop all fresh fruits into bite-sized uniform cubes.",
      "Whisk orange juice, honey, and finely chopped mint leaves in small bowl.",
      "Pour dressing over fruit, gently toss, and chill 30 minutes before serving."
    ]
  },
  {
    "id": "rec_cheesecake_dish",
    "name": "NY Baked Cheesecake",
    "localName": "ചീസ്കേക്ക്",
    "cuisine": "Desserts",
    "country": "USA",
    "category": "Desserts",
    "categories": [
      "Desserts",
      "American",
      "Vegetarian"
    ],
    "image": "assets/recipes/cheesecake.png",
    "fallbackImage": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    "description": "Classic New York-style baked cheesecake with an ultra-velvety cream cheese filling over a buttery digestive biscuit crust.",
    "prepTime": "20 mins",
    "cookTime": "45 mins",
    "totalMinutes": 65,
    "difficulty": "Hard",
    "servings": 8,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Springform Pan"
    ],
    "storage": "Refrigerate up to 6 days.",
    "costPerServing": "₹75 / $0.95",
    "nutrition": {
      "calories": 420,
      "protein": "7g",
      "carbs": "36g",
      "fat": "28g",
      "fiber": "1g",
      "sodium": "340mg"
    },
    "ingredients": [
      {
        "name": "Cream Cheese",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Digestive Biscuits",
        "amount": 200,
        "unit": "g"
      },
      {
        "name": "Butter",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Sugar & Cream",
        "amount": 0.5,
        "unit": "cups each"
      }
    ],
    "substitutions": [
      {
        "original": "Biscuits",
        "substitute": "Graham crackers"
      }
    ],
    "instructions": [
      "Mix crushed biscuits with melted butter; press into base of springform pan and chill.",
      "Beat cream cheese, sugar, cream, and vanilla until smooth.",
      "Pour into crust; bake at 160°C for 45 minutes until edges are set. Chill 4 hours before serving."
    ]
  },
  {
    "id": "rec_ice_cream_dish",
    "name": "Vanilla Ice Cream",
    "localName": "ഐസ്ക്രീം",
    "cuisine": "Desserts",
    "country": "International",
    "category": "Desserts",
    "categories": [
      "Desserts",
      "Vegetarian",
      "Gluten-Free"
    ],
    "image": "assets/recipes/ice-cream.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    "description": "Velvety, creamy churned Madagascar vanilla ice cream made with fresh dairy cream, whole milk, and real vanilla bean.",
    "prepTime": "15 mins",
    "cookTime": "10 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 6,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Freezer Container",
      "Whisk"
    ],
    "storage": "Freeze up to 1 month.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 210,
      "protein": "4g",
      "carbs": "22g",
      "fat": "12g",
      "fiber": "0g",
      "sodium": "60mg"
    },
    "ingredients": [
      {
        "name": "Heavy Cream",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Condensed Milk / Sugar",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Vanilla Extract",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Cream",
        "substitute": "Coconut cream for vegan ice cream"
      }
    ],
    "instructions": [
      "Whip heavy cream until soft peaks form.",
      "Gently fold in sweetened condensed milk and vanilla extract.",
      "Pour into freezer container, freeze 6 hours, and scoop into bowls."
    ]
  },
  {
    "id": "rec_kerala_meen_curry",
    "name": "Fish Curry",
    "localName": "കേരള മീൻ കറി",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "Non-Vegetarian",
      "Gluten-Free",
      "Dairy-Free"
    ],
    "image": "assets/recipes/kerala-fish-curry.png",
    "fallbackImage": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    "description": "Fiery red Kerala fish curry cooked in a clay pot with kudampuli Malabar tamarind, fenugreek, and coconut oil.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Fish"
    ],
    "equipment": [
      "Clay Pot"
    ],
    "storage": "Keeps 4 days in fridge.",
    "costPerServing": "₹85 / $1.05",
    "nutrition": {
      "calories": 290,
      "protein": "28g",
      "carbs": "8g",
      "fat": "16g",
      "fiber": "2g",
      "sodium": "460mg"
    },
    "ingredients": [
      {
        "name": "Fish",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Coconut Oil",
        "amount": 2.5,
        "unit": "tbsp"
      },
      {
        "name": "Spices (Chili, Fenugreek, Kudampuli)",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Fish",
        "substitute": "Kingfish, pomfret, or sardines"
      }
    ],
    "instructions": [
      "Heat coconut oil in clay pot; sauté fenugreek, shallots, ginger, garlic, and curry leaves.",
      "Add chili paste, water, and soaked kudampuli; bring to rolling boil.",
      "Add fish pieces, simmer 15 minutes, finish with raw coconut oil."
    ]
  },
  {
    "id": "rec_kerala_avial_dish",
    "name": "Avial",
    "localName": "നാടൻ അവിയൽ",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Healthy",
      "Gluten-Free"
    ],
    "image": "assets/recipes/avial.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Traditional feast dish of mixed garden vegetables simmered with coarsely ground coconut, green chilies, cumin, and sour curd.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 5,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 190,
      "protein": "4g",
      "carbs": "22g",
      "fat": "10g",
      "fiber": "6g",
      "sodium": "240mg"
    },
    "ingredients": [
      {
        "name": "Mixed Vegetables (Carrot, Drumstick, Banana)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Coconut",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Curd",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Coconut Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Curd",
        "substitute": "Raw mango slices"
      }
    ],
    "instructions": [
      "Cook sliced vegetables with turmeric, salt, and 1/2 cup water until tender.",
      "Add coarse coconut-chili paste on top; steam 3 minutes.",
      "Stir in whisked curd, coconut oil, and fresh curry leaves."
    ]
  },
  {
    "id": "rec_sambar_dish",
    "name": "Sambar",
    "localName": "സാമ്പാർ",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy"
    ],
    "image": "assets/recipes/sambar.png",
    "fallbackImage": "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80",
    "description": "Hearty lentil and mixed vegetable stew flavored with tamarind, sambar masala, mustard tempering, and fresh curry leaves.",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 6,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pressure Cooker"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 180,
      "protein": "8g",
      "carbs": "30g",
      "fat": "3g",
      "fiber": "7g",
      "sodium": "410mg"
    },
    "ingredients": [
      {
        "name": "Dal (Toor Dal)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Vegetables (Tomato, Drumstick, Carrot)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Spices (Sambar Powder, Mustard, Tamarind)",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Toor Dal",
        "substitute": "Moong dal"
      }
    ],
    "instructions": [
      "Boil toor dal with turmeric until mashed.",
      "Cook chopped vegetables in tamarind water and sambar powder.",
      "Combine dal and vegetables; temper with mustard seeds, hing, and curry leaves."
    ]
  },
  {
    "id": "rec_rasam_dish",
    "name": "Rasam",
    "localName": "രസം",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Lunch",
      "Dinner",
      "Soup",
      "Vegetarian",
      "Vegan",
      "Healthy",
      "Quick Meals"
    ],
    "image": "assets/recipes/rasam.png",
    "fallbackImage": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    "description": "Soothing aromatic broth infused with fresh tomatoes, crushed black peppercorns, cumin, garlic, and tamarind.",
    "prepTime": "5 mins",
    "cookTime": "15 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Rasam Pot"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹15 / $0.20",
    "nutrition": {
      "calories": 70,
      "protein": "2g",
      "carbs": "12g",
      "fat": "2g",
      "fiber": "2g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "Tomato",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Tamarind",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Spices (Pepper, Cumin, Garlic)",
        "amount": 1.5,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Tamarind",
        "substitute": "Lemon juice"
      }
    ],
    "instructions": [
      "Boil crushed tomatoes with tamarind, turmeric, and water.",
      "Add coarsely pounded black pepper, cumin, and garlic.",
      "Temper with mustard seeds and curry leaves in ghee; garnish with coriander."
    ]
  },
  {
    "id": "rec_vada_dish",
    "name": "Vada (Medu Vada)",
    "localName": "മേദു വട",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Snacks",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/medu-vada.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Crispy, golden doughnut-shaped savory fritters made from aerated urad dal batter with ginger and black pepper.",
    "prepTime": "15 mins",
    "cookTime": "10 mins",
    "totalMinutes": 25,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Deep Fry Kadai"
    ],
    "storage": "Best fresh. Reheat in oven.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 260,
      "protein": "9g",
      "carbs": "32g",
      "fat": "11g",
      "fiber": "6g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Urad Dal",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Spices (Pepper, Ginger, Curry Leaves)",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Cooking Oil",
        "amount": 2,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Urad Dal",
        "substitute": "Moong dal"
      }
    ],
    "instructions": [
      "Grind soaked urad dal with minimal ice water into a fluffy batter.",
      "Fold in chopped ginger, pepper, curry leaves, and salt.",
      "Shape with hole in center using wet hands; deep fry in hot oil until golden."
    ]
  },
  {
    "id": "rec_pongal_dish",
    "name": "Pongal",
    "localName": "വെൺ പൊങ്കൽ",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Lunch",
      "Vegetarian",
      "Healthy",
      "Gluten-Free"
    ],
    "image": "assets/recipes/pongal.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Warm, comforting mash of rice and yellow moong dal tempered with ghee, whole cashews, black pepper, and cumin.",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy",
      "Nuts"
    ],
    "equipment": [
      "Pressure Cooker"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 330,
      "protein": "10g",
      "carbs": "52g",
      "fat": "9g",
      "fiber": "4g",
      "sodium": "340mg"
    },
    "ingredients": [
      {
        "name": "Rice",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Moong Dal",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Ghee & Cashews",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Pepper & Cumin",
        "amount": 1,
        "unit": "tsp each"
      }
    ],
    "substitutions": [
      {
        "original": "Ghee",
        "substitute": "Coconut oil"
      }
    ],
    "instructions": [
      "Pressure cook rice and roasted moong dal with water until soft.",
      "Fry cashews, black pepper, cumin seeds, and ginger in ghee.",
      "Pour hot tempering over rice-dal mash, mix well, and serve hot."
    ]
  },
  {
    "id": "rec_uppumavu_dish",
    "name": "Uppumavu (Upma)",
    "localName": "ഉപ്പുമാവ്",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Vegetarian",
      "Vegan",
      "Quick Meals"
    ],
    "image": "assets/recipes/upma.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Savory roasted semolina porridge cooked with mustard seeds, curry leaves, onions, and cashews.",
    "prepTime": "5 mins",
    "cookTime": "15 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten",
      "Nuts"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 240,
      "protein": "6g",
      "carbs": "42g",
      "fat": "6g",
      "fiber": "3g",
      "sodium": "310mg"
    },
    "ingredients": [
      {
        "name": "Rava (Semolina)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Onion & Green Chili",
        "amount": 1,
        "unit": "pcs each"
      },
      {
        "name": "Mustard & Cashews",
        "amount": 1,
        "unit": "tbsp each"
      },
      {
        "name": "Spices & Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Rava",
        "substitute": "Oats or coarse wheat"
      }
    ],
    "instructions": [
      "Roast rava until fragrant. Sauté mustard, chilies, ginger, cashews, and onions in oil.",
      "Add boiling water and salt; slowly stir in roasted rava.",
      "Cover and steam 3 minutes until fluffy."
    ]
  },
  {
    "id": "rec_aloo_paratha_dish",
    "name": "Aloo Paratha",
    "localName": "ആലു പൊറോട്ട",
    "cuisine": "North Indian",
    "country": "India (North India)",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Breakfast",
      "Lunch",
      "Vegetarian",
      "Bread"
    ],
    "image": "assets/recipes/aloo-paratha.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Whole wheat pan-fried flatbread generously stuffed with zesty mashed potatoes, green chilies, and roasted cumin.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Tawa"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 290,
      "protein": "6g",
      "carbs": "48g",
      "fat": "9g",
      "fiber": "5g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Potato",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Wheat Flour",
        "amount": 2.5,
        "unit": "cups"
      },
      {
        "name": "Spices (Chili, Amchur, Cumin)",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Butter",
        "amount": 3,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Potato",
        "substitute": "Cauliflower (Gobi)"
      }
    ],
    "instructions": [
      "Mash boiled potatoes with chilies, coriander, amchur, and spices.",
      "Enclose potato ball inside wheat dough, roll flat, and toast on tawa with generous butter."
    ]
  },
  {
    "id": "rec_rajma_dish",
    "name": "Rajma",
    "localName": "രാജ്മ",
    "cuisine": "North Indian",
    "country": "India (North India)",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/rajma.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Red kidney beans slow-simmered in rich spiced onion-tomato gravy with ginger, garlic, and ground spices.",
    "prepTime": "10 mins",
    "cookTime": "30 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 5,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pressure Cooker"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹35 / $0.45",
    "nutrition": {
      "calories": 310,
      "protein": "14g",
      "carbs": "52g",
      "fat": "5g",
      "fiber": "11g",
      "sodium": "440mg"
    },
    "ingredients": [
      {
        "name": "Kidney Beans",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Tomato & Onion",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Spices (Garam Masala, Coriander)",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Ginger & Garlic",
        "amount": 1,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Kidney Beans",
        "substitute": "Black beans"
      }
    ],
    "instructions": [
      "Pressure cook soaked beans until tender.",
      "Sauté onions, tomatoes, ginger-garlic, and spices until glossy.",
      "Add beans with cooking water; mash some beans to thicken and simmer 15 minutes."
    ]
  },
  {
    "id": "rec_miso_soup_dish",
    "name": "Miso Soup",
    "localName": "味噌汁",
    "cuisine": "Japanese",
    "country": "Japan",
    "category": "Japanese",
    "categories": [
      "Japanese",
      "International",
      "Soup",
      "Healthy",
      "Vegetarian",
      "Quick Meals"
    ],
    "image": "assets/recipes/miso-soup.png",
    "fallbackImage": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    "description": "Traditional Japanese warming broth made with dashi stock, fermented miso paste, silken tofu, and wakame seaweed.",
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Soy"
    ],
    "equipment": [
      "Saucepan"
    ],
    "storage": "Best enjoyed fresh.",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 80,
      "protein": "6g",
      "carbs": "8g",
      "fat": "3g",
      "fiber": "2g",
      "sodium": "580mg"
    },
    "ingredients": [
      {
        "name": "Dashi / Vegetable Broth",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Miso Paste",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Silken Tofu",
        "amount": 150,
        "unit": "g"
      },
      {
        "name": "Wakame Seaweed & Scallions",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Dashi",
        "substitute": "Shiitake mushroom broth"
      }
    ],
    "instructions": [
      "Bring broth to a gentle simmer with cubed silken tofu and wakame seaweed.",
      "Dissolve miso paste in a ladle with warm broth; stir back into pot.",
      "Turn off flame before boiling (boiling destroys probiotic flavor). Garnish with scallions."
    ]
  },
  {
    "id": "rec_avial",
    "name": "Kerala Avial",
    "localName": "അവിയൽ (Traditional Sadya Avial)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Healthy",
      "Gluten-Free"
    ],
    "image": "assets/recipes/avial.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "A medley of vegetables cooked with coarsely crushed coconut, green chilies, cumin seeds, sour curd, and virgin coconut oil.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 5,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Wide Kadai"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 190,
      "protein": "4g",
      "carbs": "22g",
      "fat": "10g",
      "fiber": "6g",
      "sodium": "240mg"
    },
    "ingredients": [
      {
        "name": "Drumstick",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Carrot",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Raw Banana",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Snake Gourd",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Grated Coconut",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Green Chili",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Cumin Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Curd",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Turmeric Powder",
        "amount": 0.5,
        "unit": "tsp"
      },
      {
        "name": "Curry Leaves",
        "amount": 3,
        "unit": "sprigs"
      },
      {
        "name": "Coconut Oil",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Curd",
        "substitute": "Raw mango or tamarind paste (makes recipe 100% Vegan)"
      }
    ],
    "instructions": [
      "Cut all vegetables into 2-inch uniform baton strips.",
      "Pulse grated coconut, green chilies, and cumin seeds coarsely without adding water.",
      "Cook vegetables with 1/2 cup water, turmeric, and salt until tender-crisp.",
      "Add coconut paste on top; cover and steam on low for 3 minutes. Stir gently.",
      "Turn off heat; fold in whisked curd, generous drizzle of raw coconut oil, and fresh curry leaves."
    ]
  },
  {
    "id": "rec_malabar_biryani",
    "name": "Malabar Chicken Biryani",
    "localName": "തലശ്ശേരി ചിക്കൻ ബിരിയാണി (Thalassery Biryani)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "Non-Vegetarian",
      "High Protein"
    ],
    "image": "assets/recipes/chicken-biryani.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "description": "Aromatic dum biryani prepared with fragrant short-grain Kaima rice, tender spiced chicken gravy, cashews, and golden fried onions.",
    "prepTime": "30 mins",
    "cookTime": "40 mins",
    "totalMinutes": 70,
    "difficulty": "Hard",
    "servings": 6,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy",
      "Nuts"
    ],
    "equipment": [
      "Biryani Dum Pot"
    ],
    "storage": "Refrigerate up to 3 days. Reheat on low steam.",
    "costPerServing": "₹120 / $1.50",
    "nutrition": {
      "calories": 590,
      "protein": "38g",
      "carbs": "68g",
      "fat": "19g",
      "fiber": "4g",
      "sodium": "680mg"
    },
    "ingredients": [
      {
        "name": "Rice",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Chicken",
        "amount": 800,
        "unit": "g"
      },
      {
        "name": "Onion",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Tomato",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Ginger Garlic Paste",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Curd",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Ghee",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Garam Masala",
        "amount": 1.5,
        "unit": "tsp"
      },
      {
        "name": "Cashews",
        "amount": 20,
        "unit": "pcs"
      },
      {
        "name": "Raisins",
        "amount": 20,
        "unit": "pcs"
      },
      {
        "name": "Mint Leaves",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Salt",
        "amount": 2,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Kaima Rice",
        "substitute": "Aged Basmati Rice"
      }
    ],
    "instructions": [
      "Slice 2 onions thinly and deep-fry in ghee until golden brown (bista). Fry cashews and raisins.",
      "Sauté remaining onions, ginger-garlic paste, green chilies, tomatoes, chicken, curd, and spices until tender.",
      "Cook washed rice with ghee, whole spices, and hot water until 90% done.",
      "Layer chicken gravy at base, top with aromatic rice, fried onions, cashews, raisins, mint, and saffron milk.",
      "Seal pot and place on a tawa on low heat for 20 minutes (dum). Rest 10 minutes and fluff gently."
    ]
  },
  {
    "id": "rec_kerala_parotta",
    "name": "Malabar Parotta",
    "localName": "മലബാർ പൊറോട്ട (Layered Parotta)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Dinner",
      "Vegetarian",
      "Bread"
    ],
    "image": "assets/recipes/kerala-parotta.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Flaky, multi-layered golden flatbread with a crisp exterior and soft interior, famously paired with beef roast or chicken curry.",
    "prepTime": "40 mins",
    "cookTime": "20 mins",
    "totalMinutes": 60,
    "difficulty": "Hard",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Cast Iron Tawa"
    ],
    "storage": "Best fresh off tawa. Cooled parottas can be refrigerated for 2 days.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 340,
      "protein": "7g",
      "carbs": "48g",
      "fat": "14g",
      "fiber": "2g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "All Purpose Flour",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Sugar",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Milk",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Oil / Ghee",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Water",
        "amount": 0.75,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "All Purpose Flour",
        "substitute": "Whole wheat flour for healthy paratha"
      }
    ],
    "instructions": [
      "Knead flour, sugar, salt, milk, and water into smooth, elastic dough for 10 minutes.",
      "Coat dough with oil, cover, and rest for 1 hour.",
      "Roll paper-thin, pleat like an accordion, and coil into spiral discs. Rest 15 minutes.",
      "Gently roll out into 6-inch rounds.",
      "Cook on medium-hot tawa with oil/ghee until golden spots appear on both sides. Stack and clap between palms to fluff layers."
    ]
  },
  {
    "id": "rec_kerala_beef_fry",
    "name": "Kerala Beef Fry (Ularthiyathu)",
    "localName": "കേരള ബീഫ് ഫ്രൈ / ഉലർത്തിയത്",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Dinner",
      "Lunch",
      "Non-Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/kerala-beef-fry.png",
    "fallbackImage": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "description": "Legendary Kerala beef slow-roasted with coconut slivers, crushed black pepper, fennel, and garlic in virgin coconut oil.",
    "prepTime": "20 mins",
    "cookTime": "45 mins",
    "totalMinutes": 65,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pressure Cooker",
      "Heavy Cast Iron Kadai"
    ],
    "storage": "Refrigerate up to 5 days. High shelf life due to slow roasting.",
    "costPerServing": "₹95 / $1.20",
    "nutrition": {
      "calories": 380,
      "protein": "36g",
      "carbs": "6g",
      "fat": "24g",
      "fiber": "2g",
      "sodium": "520mg"
    },
    "ingredients": [
      {
        "name": "Beef",
        "amount": 600,
        "unit": "g"
      },
      {
        "name": "Shallots",
        "amount": 15,
        "unit": "pcs"
      },
      {
        "name": "Coconut Slices",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Ginger Garlic Paste",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Black Pepper",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Coriander Powder",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Curry Leaves",
        "amount": 4,
        "unit": "sprigs"
      },
      {
        "name": "Coconut Oil",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1.5,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Beef",
        "substitute": "Mutton or mushrooms"
      }
    ],
    "instructions": [
      "Marinate beef cubes with spices, ginger-garlic paste, and salt for 30 minutes.",
      "Pressure cook beef for 5 whistles until tender.",
      "Fry coconut slivers in coconut oil until golden; set aside.",
      "Sauté shallots, chilies, and curry leaves; add cooked beef and roast on high until dark mahogany and dry.",
      "Toss with fried coconut slices and extra black pepper."
    ]
  },
  {
    "id": "rec_egg_roast",
    "name": "Kerala Egg Roast (Mutta Roast)",
    "localName": "നാടൻ മുട്ട റോസ്റ്റ് (Nadan Mutta Roast)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Breakfast",
      "Dinner",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/egg-roast.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Hard-boiled eggs coated in a caramelized spicy onion-tomato gravy with green chilies, ginger, and aromatic garam masala.",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Egg"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 210,
      "protein": "14g",
      "carbs": "12g",
      "fat": "12g",
      "fiber": "2g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Eggs",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Onion",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Tomato",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Ginger Garlic Paste",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Chili Powder",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Curry Leaves",
        "amount": 2,
        "unit": "sprigs"
      },
      {
        "name": "Coconut Oil",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Eggs",
        "substitute": "Boiled potatoes or paneer cubes"
      }
    ],
    "instructions": [
      "Hard boil eggs, peel, and make light vertical slits.",
      "Heat coconut oil in kadai; sauté thinly sliced onions with salt until caramelized golden brown.",
      "Add ginger-garlic paste, green chilies, curry leaves, and tomatoes; cook until mushy.",
      "Add chili powder, coriander powder, turmeric, and garam masala. Sauté 2 minutes.",
      "Add 1/4 cup water, slide in boiled eggs, coat in thick gravy, and simmer 5 minutes. Serve with appam or parotta."
    ]
  },
  {
    "id": "rec_thoran",
    "name": "Cabbage Carrot Thoran",
    "localName": "കാബേജ് തോരൻ (Kerala Vegetable Stir Fry)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Healthy",
      "Gluten-Free",
      "Quick Meals"
    ],
    "image": "assets/recipes/thoran.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Finely shredded cabbage and carrots stir-fried with mustard seeds, curry leaves, crushed shallots, and fresh grated coconut.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 120,
      "protein": "3g",
      "carbs": "12g",
      "fat": "7g",
      "fiber": "4g",
      "sodium": "220mg"
    },
    "ingredients": [
      {
        "name": "Cabbage",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Carrot",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Grated Coconut",
        "amount": 0.75,
        "unit": "cups"
      },
      {
        "name": "Shallots",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Green Chili",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Mustard Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Curry Leaves",
        "amount": 1,
        "unit": "sprigs"
      },
      {
        "name": "Coconut Oil",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Cabbage",
        "substitute": "Beans, beetroot, spinach, or ivy gourd"
      }
    ],
    "instructions": [
      "Finely shred cabbage and grate carrot. Pulse coconut, shallots, green chilies, and cumin coarsely.",
      "Heat coconut oil in a pan; splutter mustard seeds and curry leaves.",
      "Add vegetables, turmeric, and salt. Cook covered on low heat for 5 minutes without adding water.",
      "Add coconut mixture on top, cover for 2 minutes, then stir-fry on high heat for 1 minute until moisture evaporates."
    ]
  },
  {
    "id": "rec_olan",
    "name": "Kerala Olan",
    "localName": "ഓലൻ (Ash Gourd in Coconut Milk)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Healthy",
      "Gluten-Free"
    ],
    "image": "assets/recipes/olan.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Subtle and delicate Sadya dish of ash gourd and red cowpeas cooked gently in sweet coconut milk with slit green chilies.",
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Saucepan"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 170,
      "protein": "5g",
      "carbs": "18g",
      "fat": "9g",
      "fiber": "4g",
      "sodium": "190mg"
    },
    "ingredients": [
      {
        "name": "Ash Gourd (Kumbalanga)",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Red Cowpeas (Vanpayar)",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Coconut Milk",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Green Chili",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Curry Leaves",
        "amount": 2,
        "unit": "sprigs"
      },
      {
        "name": "Coconut Oil",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Ash Gourd",
        "substitute": "Bottle gourd or yellow pumpkin"
      }
    ],
    "instructions": [
      "Pressure cook soaked red cowpeas until tender (3 whistles).",
      "Cook diced ash gourd with green chilies, salt, and thin coconut milk until soft (8 minutes).",
      "Add cooked cowpeas and thick coconut milk. Bring to a gentle warmth (do not boil).",
      "Drizzle with fresh virgin coconut oil and torn curry leaves. Cover and rest before serving."
    ]
  },
  {
    "id": "rec_erissery",
    "name": "Pumpkin Erissery",
    "localName": "മത്തങ്ങ എരിശ്ശേരി (Mathanga Erissery)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/erissery.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Sweet yellow pumpkin and red beans simmered in coconut gravy, garnished with dark golden roasted coconut tempering.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Deep Kadai"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 230,
      "protein": "6g",
      "carbs": "32g",
      "fat": "9g",
      "fiber": "5g",
      "sodium": "260mg"
    },
    "ingredients": [
      {
        "name": "Yellow Pumpkin",
        "amount": 2.5,
        "unit": "cups"
      },
      {
        "name": "Red Beans (Vanpayar)",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Grated Coconut",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Cumin Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Green Chili",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Mustard Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Curry Leaves",
        "amount": 2,
        "unit": "sprigs"
      },
      {
        "name": "Coconut Oil",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Yellow Pumpkin",
        "substitute": "Raw plantain or yam"
      }
    ],
    "instructions": [
      "Cook pumpkin and soaked red beans with water, turmeric, and salt until soft; lightly mash.",
      "Grind 1 cup coconut with cumin and green chilies into a smooth paste. Stir into pumpkin mash and simmer 3 mins.",
      "In a small pan, roast 1/2 cup grated coconut in coconut oil with mustard seeds and curry leaves until dark golden brown.",
      "Pour roasted coconut topping over erissery and serve warm with rice."
    ]
  },
  {
    "id": "rec_idiyappam",
    "name": "Kerala Idiyappam (String Hoppers)",
    "localName": "ഇടിയപ്പം (നൂൽപ്പുട്ട്)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Breakfast",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/idiyappam.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Delicate steamed rice noodle nests layered with freshly grated coconut, perfect with vegetable stew, egg roast, or sweetened coconut milk.",
    "prepTime": "15 mins",
    "cookTime": "12 mins",
    "totalMinutes": 27,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Idiyappam Press (Seva Nazhi)",
      "Steamer / Idli Pot"
    ],
    "storage": "Steam fresh. Keep warm in a casserole.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 210,
      "protein": "4g",
      "carbs": "44g",
      "fat": "2g",
      "fiber": "2g",
      "sodium": "190mg"
    },
    "ingredients": [
      {
        "name": "Roasted Rice Flour",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Boiling Water",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Grated Coconut",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Coconut Oil",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Rice Flour",
        "substitute": "Ragi flour or roasted wheat flour"
      }
    ],
    "instructions": [
      "Add salt and coconut oil to boiling water. Gradually pour into roasted rice flour, stirring with a wooden spoon until dough forms.",
      "Knead into a smooth, warm dough when cool enough to handle.",
      "Grease idli/steamer plates, sprinkle a pinch of grated coconut.",
      "Fill press with dough and press into swirling noodle nests onto plates.",
      "Steam on high heat for 8-10 minutes. Serve hot with stew or curry."
    ]
  },
  {
    "id": "rec_pathiri",
    "name": "Malabar Rice Pathiri",
    "localName": "മലബാർ നൈസ് പത്തിരി (Ari Pathiri)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Bread"
    ],
    "image": "assets/recipes/pathiri.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Paper-thin, velvety soft steamed rice rotis from Malabar, traditionally dipped in spiced coconut milk and eaten with chicken curry.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pathiri Press / Rolling Pin",
      "Tawa"
    ],
    "storage": "Keep warm in a damp cloth lined container for up to 12 hours.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 190,
      "protein": "3g",
      "carbs": "42g",
      "fat": "1g",
      "fiber": "1g",
      "sodium": "160mg"
    },
    "ingredients": [
      {
        "name": "Fine Roasted Rice Flour",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Boiling Water",
        "amount": 2.25,
        "unit": "cups"
      },
      {
        "name": "Coconut Oil",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Rice Flour",
        "substitute": "Specially milled Pathiri Podi"
      }
    ],
    "instructions": [
      "Boil water with salt and oil. Add rice flour, stir vigorously, cover, and turn off heat. Rest 5 minutes.",
      "Knead dough thoroughly while still warm for 5 minutes until exceptionally soft and pliable.",
      "Pinch into small balls. Roll paper-thin with rolling pin or pathiri press, dusting with rice flour.",
      "Cook on a medium-hot dry tawa for 30 seconds per side. Press gently with a cloth so it puffs up. Do not brown."
    ]
  },
  {
    "id": "rec_ada_pradhaman",
    "name": "Kerala Ada Pradhaman (Payasam)",
    "localName": "അട പ്രഥമൻ (Traditional Sadya Payasam)",
    "cuisine": "Kerala",
    "country": "India (Kerala)",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Desserts",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/pazham-pori.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "King of Kerala desserts: steamed rice pasta flakes (ada) simmered in rich dark jaggery syrup, thick coconut milk, and cardamom.",
    "prepTime": "15 mins",
    "cookTime": "35 mins",
    "totalMinutes": 50,
    "difficulty": "Medium",
    "servings": 6,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Nuts"
    ],
    "equipment": [
      "Heavy Uruli / Deep Pot"
    ],
    "storage": "Refrigerate up to 5 days. Delicious warm or chilled.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 340,
      "protein": "4g",
      "carbs": "62g",
      "fat": "9g",
      "fiber": "2g",
      "sodium": "110mg"
    },
    "ingredients": [
      {
        "name": "Rice Ada (Flakes)",
        "amount": 150,
        "unit": "g"
      },
      {
        "name": "Jaggery (Dark)",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Coconut Milk (Thin & Thick)",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Ghee / Coconut Oil",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Cardamom & Dry Ginger Powder",
        "amount": 1,
        "unit": "tsp each"
      },
      {
        "name": "Cashews & Raisins",
        "amount": 20,
        "unit": "pcs"
      },
      {
        "name": "Coconut Slices",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Jaggery",
        "substitute": "Brown sugar or palm sugar"
      }
    ],
    "instructions": [
      "Boil rice ada in water for 10 minutes until soft; drain and rinse with cold water.",
      "Melt jaggery with 1/2 cup water, strain impurities, and simmer until thick syrup forms.",
      "Add cooked ada and 1 tbsp ghee to jaggery syrup; cook on medium for 10 minutes until ada absorbs sweetness.",
      "Pour in thin coconut milk and simmer for 10 minutes. Reduce heat, pour in thick coconut milk, and cardamom-ginger powder.",
      "Turn off flame before it boils. Garnish with cashews, raisins, and coconut slices fried in ghee."
    ]
  },
  {
    "id": "rec_plain_dosa",
    "name": "Plain Dosa",
    "localName": "മൊരിഞ്ഞ പ്ലെയിൻ ദോശ (Crispy Plain Dosa)",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Quick Meals"
    ],
    "image": "assets/recipes/plain-dosa.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Paper-thin, golden-brown naturally fermented rice and urad dal crepe, served with coconut chutney and piping hot sambar.",
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Cast Iron Tawa"
    ],
    "storage": "Batter keeps 5 days in fridge. Cook dosas fresh.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 180,
      "protein": "5g",
      "carbs": "34g",
      "fat": "3g",
      "fiber": "2g",
      "sodium": "240mg"
    },
    "ingredients": [
      {
        "name": "Rice",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Urad Dal",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Fenugreek Seeds",
        "amount": 0.5,
        "unit": "tsp"
      },
      {
        "name": "Cooking Oil",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Cooking Oil",
        "substitute": "Ghee for golden flavor"
      }
    ],
    "instructions": [
      "Prepare smooth fermented batter of rice, urad dal, and fenugreek seeds.",
      "Heat a cast-iron tawa and grease lightly with oil.",
      "Pour a ladle of batter in the center, swirl outward in continuous spirals, and drizzle oil on edges.",
      "Cook on medium-high until crisp and golden brown; fold and serve hot with sambar."
    ]
  },
  {
    "id": "rec_lemon_rice",
    "name": "Tangy Lemon Rice",
    "localName": "നാരങ്ങ ചോറ് (Chitranna)",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Lunch",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Quick Meals"
    ],
    "image": "assets/recipes/lemon-rice.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Zesty, sunshine-yellow tempered rice tossed with fresh lemon juice, crunchy peanuts, mustard seeds, green chilies, and curry leaves.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "Peanuts"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Refrigerate up to 2 days. Excellent for lunchboxes.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 280,
      "protein": "6g",
      "carbs": "48g",
      "fat": "8g",
      "fiber": "3g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "Cooked Rice",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Lemon Juice",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Peanuts",
        "amount": 0.25,
        "unit": "cups"
      },
      {
        "name": "Mustard Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Curry Leaves",
        "amount": 2,
        "unit": "sprigs"
      },
      {
        "name": "Turmeric Powder",
        "amount": 0.5,
        "unit": "tsp"
      },
      {
        "name": "Green Chili",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Cooking Oil",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Peanuts",
        "substitute": "Cashews or roasted chana dal"
      }
    ],
    "instructions": [
      "Spread cooked rice on a wide plate to cool slightly.",
      "Heat oil in a pan; fry peanuts until crunchy, add mustard seeds, curry leaves, and green chilies.",
      "Turn off flame, stir in turmeric powder and salt, then stir in fresh lemon juice.",
      "Pour the warm tempering over rice and gently fold together until evenly yellow."
    ]
  },
  {
    "id": "rec_curd_rice",
    "name": "Tempered Curd Rice",
    "localName": "തൈര് സാദം (Thayir Sadam)",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Healthy",
      "Gluten-Free",
      "Quick Meals"
    ],
    "image": "assets/recipes/curd-rice.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Cooling and creamy mashed rice blended with fresh homemade yogurt, tempered with ginger, mustard seeds, green chilies, and pomegranate.",
    "prepTime": "10 mins",
    "cookTime": "5 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Mixing Bowl",
      "Tadka Pan"
    ],
    "storage": "Refrigerate up to 2 days.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 240,
      "protein": "7g",
      "carbs": "38g",
      "fat": "7g",
      "fiber": "2g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Cooked Rice (Soft)",
        "amount": 2.5,
        "unit": "cups"
      },
      {
        "name": "Fresh Curd (Yogurt)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Milk",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Mustard Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Ginger",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Curry Leaves",
        "amount": 1,
        "unit": "sprigs"
      },
      {
        "name": "Oil",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Curd",
        "substitute": "Plant-based soy or almond yogurt"
      }
    ],
    "instructions": [
      "Mash warm cooked rice with the back of a ladle. Let cool to room temperature.",
      "Mix in fresh curd, milk (prevents souring), and salt until creamy.",
      "Heat oil in tadka pan; add mustard seeds, minced ginger, green chili, and curry leaves.",
      "Pour hot tempering over curd rice, mix well, and serve chilled."
    ]
  },
  {
    "id": "rec_bisi_bele_bath",
    "name": "Karnataka Bisi Bele Bath",
    "localName": "ബീസി ബേളെ ബാത്ത്",
    "cuisine": "South Indian",
    "country": "India (Karnataka)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Lunch",
      "Dinner",
      "Vegetarian",
      "Healthy",
      "Gluten-Free"
    ],
    "image": "assets/recipes/bisi-bele-bath.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Traditional spicy Karnataka one-pot meal of rice, toor dal, mixed vegetables, tamarind, and aromatic roasted coconut spice blend.",
    "prepTime": "20 mins",
    "cookTime": "25 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy",
      "Nuts"
    ],
    "equipment": [
      "Pressure Cooker",
      "Kadai"
    ],
    "storage": "Refrigerate up to 3 days. Reheat with 3 tbsp warm water and a dollop of ghee.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 360,
      "protein": "11g",
      "carbs": "56g",
      "fat": "10g",
      "fiber": "7g",
      "sodium": "460mg"
    },
    "ingredients": [
      {
        "name": "Rice",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Toor Dal",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Mixed Vegetables (Carrot, Beans, Peas)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Tamarind Paste",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Bisi Bele Bath Powder",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Ghee",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Cashews",
        "amount": 12,
        "unit": "pcs"
      },
      {
        "name": "Salt",
        "amount": 1.5,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Bisi Bele Bath Powder",
        "substitute": "Sambar powder with pinch of cinnamon and clove"
      }
    ],
    "instructions": [
      "Pressure cook rice, toor dal, turmeric, and 4.5 cups water until soft (4 whistles).",
      "Cook diced vegetables with tamarind water, spice powder, and salt until tender.",
      "Combine cooked rice-dal with vegetables; simmer on low heat for 5 minutes.",
      "Fry cashews, mustard seeds, and curry leaves in hot ghee; pour over bath and serve hot with boondi."
    ]
  },
  {
    "id": "rec_pesarattu",
    "name": "Andhra Moong Dal Pesarattu",
    "localName": "പെസരട്ട് (Green Gram Dosa)",
    "cuisine": "South Indian",
    "country": "India (Andhra Pradesh)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/pesarattu.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Nutritious Andhra specialty crepe made from soaked whole green moong dal, ginger, and cumin, topped with diced onions.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Blender",
      "Cast Iron Tawa"
    ],
    "storage": "Batter keeps 3 days refrigerated. Does not require overnight fermentation!",
    "costPerServing": "₹30 / $0.40",
    "nutrition": {
      "calories": 230,
      "protein": "12g",
      "carbs": "38g",
      "fat": "4g",
      "fiber": "8g",
      "sodium": "280mg"
    },
    "ingredients": [
      {
        "name": "Whole Green Moong Dal",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Ginger",
        "amount": 1.5,
        "unit": "inch"
      },
      {
        "name": "Green Chili",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Cumin Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Onion",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Oil",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Moong Dal",
        "substitute": "Yellow split moong dal"
      }
    ],
    "instructions": [
      "Soak green moong dal for 4-6 hours. Grind smoothly with ginger, green chilies, cumin seeds, salt, and water.",
      "Heat a tawa, pour a ladle of batter and spread into a thin round.",
      "Sprinkle finely diced onions on top and press gently with spatula. Drizzle oil around edges.",
      "Cook until bottom is crisp and golden brown; flip for 30 seconds and serve with ginger chutney (Allam Pachadi)."
    ]
  },
  {
    "id": "rec_uttapam",
    "name": "Onion Tomato Uttapam",
    "localName": "ഉത്തപ്പം (Thick Savory Pancake)",
    "cuisine": "South Indian",
    "country": "India (South India)",
    "category": "South Indian",
    "categories": [
      "South Indian",
      "Indian",
      "Breakfast",
      "Dinner",
      "Vegetarian",
      "Vegan",
      "Gluten-Free"
    ],
    "image": "assets/recipes/uttapam.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Thick, soft savory fermented rice pancake studded with juicy tomatoes, crunchy onions, green chilies, and fresh coriander.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Tawa"
    ],
    "storage": "Cook fresh from idli/dosa batter.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 260,
      "protein": "6g",
      "carbs": "44g",
      "fat": "6g",
      "fiber": "3g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "Idli / Dosa Batter",
        "amount": 2.5,
        "unit": "cups"
      },
      {
        "name": "Onion",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Tomato",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Green Chili",
        "amount": 2,
        "unit": "pcs"
      },
      {
        "name": "Coriander",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Oil / Ghee",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Toppings",
        "substitute": "Grated carrots, capsicum, or paneer"
      }
    ],
    "instructions": [
      "Heat greased tawa on medium. Pour a thick ladle of batter (do not spread thin like dosa).",
      "Immediately press chopped onions, tomatoes, green chilies, and coriander into the wet batter.",
      "Drizzle oil around edges. Cook covered on low-medium for 2-3 minutes until bottom is golden.",
      "Flip gently and cook topping side for 1-2 minutes until caramelized. Serve with chutney."
    ]
  },
  {
    "id": "rec_garlic_naan",
    "name": "Butter Garlic Naan",
    "localName": "ഗാർലിക് നാൻ (Tandoori Garlic Flatbread)",
    "cuisine": "North Indian",
    "country": "India (North India)",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Dinner",
      "Vegetarian",
      "Bread"
    ],
    "image": "assets/recipes/garlic-naan.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Soft, pillowy restaurant-style flatbread blistered on a hot cast iron skillet, brushed with garlic butter and fresh cilantro.",
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Cast Iron Tawa"
    ],
    "storage": "Reheat on a hot tawa with a light brush of butter.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 280,
      "protein": "7g",
      "carbs": "46g",
      "fat": "8g",
      "fiber": "2g",
      "sodium": "340mg"
    },
    "ingredients": [
      {
        "name": "All Purpose Flour (Maida)",
        "amount": 2.5,
        "unit": "cups"
      },
      {
        "name": "Yogurt / Curd",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Baking Powder",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Garlic",
        "amount": 8,
        "unit": "cloves"
      },
      {
        "name": "Butter",
        "amount": 3,
        "unit": "tbsp"
      },
      {
        "name": "Coriander",
        "amount": 0.25,
        "unit": "cups"
      },
      {
        "name": "Salt",
        "amount": 1,
        "unit": "tsp"
      }
    ],
    "substitutions": [
      {
        "original": "Maida",
        "substitute": "Whole wheat flour (Atta) for garlic roti"
      }
    ],
    "instructions": [
      "Knead flour, curd, baking powder, pinch of baking soda, salt, and warm water into soft dough. Rest 45 minutes.",
      "Divide into balls. Roll into teardrop shape, press minced garlic and cilantro on top side.",
      "Brush bottom side with water. Place water-side down on hot iron tawa (sticks to surface).",
      "Once bubbles form, invert tawa directly over open flame to char and blister the top.",
      "Scrape off tawa, brush generously with salted garlic butter, and serve hot."
    ]
  },
  {
    "id": "rec_samosa",
    "name": "Crispy Punjabi Samosa",
    "localName": "പഞ്ചാബി സമൂസ (Crispy Potato Samosa)",
    "cuisine": "North Indian",
    "country": "India (North India)",
    "category": "North Indian",
    "categories": [
      "North Indian",
      "Indian",
      "Snacks",
      "Vegetarian",
      "Vegan"
    ],
    "image": "assets/recipes/samosa.png",
    "fallbackImage": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    "description": "Flaky, crispy pyramid pastries stuffed with spiced potatoes, green peas, toasted cashews, and crushed coriander seeds.",
    "prepTime": "25 mins",
    "cookTime": "20 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Deep Fry Kadai"
    ],
    "storage": "Reheat in air fryer or oven for 6 minutes to restore crispness.",
    "costPerServing": "₹20 / $0.25",
    "nutrition": {
      "calories": 260,
      "protein": "5g",
      "carbs": "32g",
      "fat": "13g",
      "fiber": "3g",
      "sodium": "320mg"
    },
    "ingredients": [
      {
        "name": "All Purpose Flour",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Ajwain (Carom Seeds)",
        "amount": 0.75,
        "unit": "tsp"
      },
      {
        "name": "Ghee / Oil",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Potato",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Green Peas",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Garam Masala",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Cooking Oil",
        "amount": 2,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Potato",
        "substitute": "Minced chicken or spiced paneer"
      }
    ],
    "instructions": [
      "Rub flour with ghee and ajwain until it resembles breadcrumbs. Knead into a stiff, firm dough. Rest 30 minutes.",
      "Boil, peel, and crush potatoes. Sauté with ginger, green chilies, peas, and ground spices.",
      "Roll dough into ovals, cut in half, form cone, fill with potato masala, seal edges with water.",
      "Fry on low heat for 12-15 minutes until pale golden and super crispy. Drain and serve with mint and tamarind chutney."
    ]
  },
  {
    "id": "rec_gujarati_dhokla",
    "name": "Gujarati Khaman Dhokla",
    "localName": "ഖമാൻ ധോക്ല (Steamed Gram Flour Cakes)",
    "cuisine": "Indian",
    "country": "India (Gujarat)",
    "category": "Indian",
    "categories": [
      "Indian",
      "Breakfast",
      "Snacks",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy",
      "Quick Meals"
    ],
    "image": "assets/recipes/gujarati-dhokla.png",
    "fallbackImage": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "description": "Soft, spongy, juicy steamed savory cakes made from gram flour, tempered with mustard seeds, curry leaves, and green chilies.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Steamer / Cake Tin"
    ],
    "storage": "Refrigerate up to 3 days. Tastes delicious chilled or room temperature.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 180,
      "protein": "7g",
      "carbs": "28g",
      "fat": "5g",
      "fiber": "4g",
      "sodium": "380mg"
    },
    "ingredients": [
      {
        "name": "Besan (Gram Flour)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Eno Fruit Salt / Baking Soda",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Lemon Juice",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Mustard Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Green Chili",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Curry Leaves",
        "amount": 1,
        "unit": "sprigs"
      },
      {
        "name": "Sugar",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Oil",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Besan",
        "substitute": "Soaked fermented chana dal and rice"
      }
    ],
    "instructions": [
      "Whisk besan, turmeric, sugar, salt, lemon juice, and water into a smooth batter.",
      "Add Eno fruit salt; whisk quickly until batter turns airy and doubles in volume.",
      "Pour into greased tin, steam on high heat for 15 minutes. Cool slightly and cut into squares.",
      "Make tempering: heat oil, splutter mustard seeds, green chilies, curry leaves, sugar, and 1/2 cup water. Pour warm sweet-tangy syrup over spongy dhokla."
    ]
  },
  {
    "id": "rec_pav_bhaji",
    "name": "Mumbai Pav Bhaji",
    "localName": "പാവ് ഭാജി (Street Style Spiced Mash)",
    "cuisine": "Indian",
    "country": "India (Maharashtra)",
    "category": "Indian",
    "categories": [
      "Indian",
      "Dinner",
      "Lunch",
      "Vegetarian",
      "Fast Food"
    ],
    "image": "assets/recipes/pav-bhaji.png",
    "fallbackImage": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "description": "Famous Mumbai street food: buttery, spicy mashed mixed vegetable curry served piping hot with toasted butter pav buns, red onions, and lemon.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Potato Masher",
      "Wide Flat Tawa"
    ],
    "storage": "Bhaji keeps 3 days refrigerated. Warm pav buns fresh in butter.",
    "costPerServing": "₹45 / $0.55",
    "nutrition": {
      "calories": 420,
      "protein": "9g",
      "carbs": "62g",
      "fat": "16g",
      "fiber": "7g",
      "sodium": "680mg"
    },
    "ingredients": [
      {
        "name": "Potato",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Cauliflower",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Green Peas",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Capsicum",
        "amount": 1,
        "unit": "pcs"
      },
      {
        "name": "Tomato",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Pav Bhaji Masala",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Butter",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Pav Buns",
        "amount": 8,
        "unit": "pcs"
      }
    ],
    "substitutions": [
      {
        "original": "Pav Buns",
        "substitute": "Dinner rolls or burger buns"
      }
    ],
    "instructions": [
      "Boil potatoes, cauliflower, and peas until fork tender. Mash thoroughly.",
      "Melt 2 tbsp butter on tawa; sauté onions, capsicum, ginger-garlic paste, and tomatoes with pav bhaji masala.",
      "Add mashed vegetables, water, salt, and mash continuously with potato masher until smooth.",
      "Simmer for 10 minutes until thick. Slit pav buns, toast generously in butter on tawa, and serve with hot bhaji."
    ]
  },
  {
    "id": "rec_vada_pav",
    "name": "Mumbai Vada Pav",
    "localName": "വട പാവ് (Indian Burger)",
    "cuisine": "Indian",
    "country": "India (Maharashtra)",
    "category": "Indian",
    "categories": [
      "Indian",
      "Snacks",
      "Fast Food",
      "Vegetarian",
      "Vegan"
    ],
    "image": "assets/recipes/vada-pav.png",
    "fallbackImage": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    "description": "Crispy fried golden spiced potato dumpling encased in a soft pav bun slathered with spicy dry garlic chutney and green chutney.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "isDairyFree": true,
    "allergens": [
      "Gluten"
    ],
    "equipment": [
      "Kadai"
    ],
    "storage": "Assemble fresh. Potato dumplings keep 2 days refrigerated.",
    "costPerServing": "₹25 / $0.30",
    "nutrition": {
      "calories": 310,
      "protein": "7g",
      "carbs": "48g",
      "fat": "11g",
      "fiber": "4g",
      "sodium": "460mg"
    },
    "ingredients": [
      {
        "name": "Potato",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Besan (Gram Flour)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Pav Buns",
        "amount": 4,
        "unit": "pcs"
      },
      {
        "name": "Garlic Chutney",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Green Chili",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Mustard Seeds",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Cooking Oil",
        "amount": 2,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Pav Buns",
        "substitute": "Slider buns"
      }
    ],
    "instructions": [
      "Mash boiled potatoes. Sauté mustard seeds, curry leaves, crushed garlic, and chilies; mix with potatoes and form round balls.",
      "Dip potato balls in spiced besan batter.",
      "Deep-fry in hot oil until golden yellow and crisp.",
      "Slit pav, smear with green chutney and red garlic powder, insert hot batata vada, and serve with fried salted green chili."
    ]
  },
  {
    "id": "rec_hyderabadi_biryani",
    "name": "Hyderabadi Chicken Dum Biryani",
    "localName": "ഹൈദരാബാദി ബിരിയാണി (Kacchi Dum Biryani)",
    "cuisine": "Indian",
    "country": "India (Hyderabad)",
    "category": "Indian",
    "categories": [
      "Indian",
      "Lunch",
      "Dinner",
      "Non-Vegetarian",
      "High Protein",
      "Gluten-Free"
    ],
    "image": "assets/recipes/chicken-biryani.png",
    "fallbackImage": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "description": "Royal Nizami biryani of marinated chicken layered raw with parboiled aged Basmati rice, saffron milk, mint, and fried onions slow cooked on dum.",
    "prepTime": "30 mins",
    "cookTime": "45 mins",
    "totalMinutes": 75,
    "difficulty": "Hard",
    "servings": 6,
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Heavy Dum Handi",
      "Tawa"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹120 / $1.50",
    "nutrition": {
      "calories": 610,
      "protein": "40g",
      "carbs": "70g",
      "fat": "19g",
      "fiber": "3g",
      "sodium": "680mg"
    },
    "ingredients": [
      {
        "name": "Basmati Rice",
        "amount": 3,
        "unit": "cups"
      },
      {
        "name": "Chicken",
        "amount": 900,
        "unit": "g"
      },
      {
        "name": "Curd",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Fried Onions (Birista)",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Ginger Garlic Paste",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Shahi Biryani Masala",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Ghee",
        "amount": 4,
        "unit": "tbsp"
      },
      {
        "name": "Saffron Milk",
        "amount": 0.25,
        "unit": "cups"
      }
    ],
    "substitutions": [
      {
        "original": "Chicken",
        "substitute": "Mutton or mixed vegetables and paneer"
      }
    ],
    "instructions": [
      "Marinate chicken with curd, ginger-garlic paste, chili, biryani spices, mint, coriander, fried onions, and salt for 2 hours.",
      "Boil Basmati rice with whole spices until 70% cooked; drain immediately.",
      "Place marinated chicken in base of heavy pot, layer hot fragrant rice, top with saffron milk, ghee, and extra fried onions.",
      "Seal with dough and cook on high heat for 10 minutes, then low heat on a tawa for 35 minutes. Rest 15 minutes before opening."
    ]
  },
  {
    "id": "rec_dal_baati_churma",
    "name": "Rajasthani Dal Baati Churma",
    "localName": "ദാൽ ബാത്തി ചുർമ (Rajasthani Classic)",
    "cuisine": "Indian",
    "country": "India (Rajasthan)",
    "category": "Indian",
    "categories": [
      "Indian",
      "Dinner",
      "Lunch",
      "Vegetarian"
    ],
    "image": "assets/recipes/dal-baati-churma.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Hard baked whole wheat dough balls (baati) soaked in warm ghee, served with spicy panchmel five-lentil dal and sweet crushed churma.",
    "prepTime": "25 mins",
    "cookTime": "40 mins",
    "totalMinutes": 65,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "equipment": [
      "Oven / Baati Cooker",
      "Pressure Cooker"
    ],
    "storage": "Baatis keep for 5 days. Dal keeps 3 days.",
    "costPerServing": "₹65 / $0.80",
    "nutrition": {
      "calories": 540,
      "protein": "14g",
      "carbs": "74g",
      "fat": "22g",
      "fiber": "8g",
      "sodium": "520mg"
    },
    "ingredients": [
      {
        "name": "Wheat Flour",
        "amount": 2,
        "unit": "cups"
      },
      {
        "name": "Sooji (Semolina)",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Panchmel Dal (5 Lentil Mix)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Ghee",
        "amount": 0.5,
        "unit": "cups"
      },
      {
        "name": "Tomato & Onion",
        "amount": 2,
        "unit": "pcs each"
      },
      {
        "name": "Spices & Tadka",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Panchmel Dal",
        "substitute": "Toor dal and moong dal mix"
      }
    ],
    "instructions": [
      "Knead tight dough with flour, sooji, ghee, ajwain, and water. Shape into smooth balls.",
      "Bake in preheated oven at 190°C (375°F) for 35 minutes until golden and cracked. Dip in warm ghee.",
      "Cook five lentils with onions, tomatoes, garlic, and Rajasthani spices.",
      "Crush 2 baked baatis with powdered sugar and cardamom to make sweet churma. Serve together."
    ]
  },
  {
    "id": "rec_kashmiri_dum_aloo",
    "name": "Kashmiri Dum Aloo",
    "localName": "കശ്മീരി ദം ആലു (Spiced Baby Potatoes)",
    "cuisine": "Indian",
    "country": "India (Kashmir)",
    "category": "Indian",
    "categories": [
      "Indian",
      "Dinner",
      "Lunch",
      "Vegetarian",
      "Gluten-Free"
    ],
    "image": "assets/recipes/kashmiri-dum-aloo.png",
    "fallbackImage": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Deep-fried baby potatoes slow-cooked under dum in a yogurt gravy infused with dry ginger powder (saunth) and aromatic fennel (saunf).",
    "prepTime": "20 mins",
    "cookTime": "30 mins",
    "totalMinutes": 50,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "isDairyFree": false,
    "allergens": [
      "Dairy"
    ],
    "equipment": [
      "Deep Fry Kadai",
      "Dum Pot"
    ],
    "storage": "Refrigerate up to 3 days.",
    "costPerServing": "₹40 / $0.50",
    "nutrition": {
      "calories": 290,
      "protein": "6g",
      "carbs": "42g",
      "fat": "12g",
      "fiber": "4g",
      "sodium": "410mg"
    },
    "ingredients": [
      {
        "name": "Baby Potatoes",
        "amount": 500,
        "unit": "g"
      },
      {
        "name": "Curd (Whisked)",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Kashmiri Chili Powder",
        "amount": 2,
        "unit": "tbsp"
      },
      {
        "name": "Fennel Powder (Saunf)",
        "amount": 1.5,
        "unit": "tbsp"
      },
      {
        "name": "Dry Ginger Powder (Saunth)",
        "amount": 1,
        "unit": "tsp"
      },
      {
        "name": "Mustard Oil",
        "amount": 3,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Baby Potatoes",
        "substitute": "Regular potatoes cut into 1-inch cubes"
      }
    ],
    "instructions": [
      "Boil baby potatoes until 80% done, peel, and prick all over with a fork.",
      "Deep fry in mustard oil on medium heat until golden brown and crispy.",
      "Whisk curd with Kashmiri chili powder, fennel powder, ginger powder, and salt.",
      "Heat 2 tbsp oil, pour in spiced curd while whisking continuously to prevent curdling.",
      "Add fried potatoes, cover tightly, and simmer on lowest heat for 20 minutes (dum)."
    ]
  },
  {
    "id": "rec_guacamole",
    "name": "Fresh Handmade Guacamole",
    "localName": "Guacamole",
    "cuisine": "Mexican",
    "country": "Mexico",
    "category": "Mexican",
    "categories": [
      "Mexican",
      "International",
      "Snacks",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Healthy",
      "Quick Meals"
    ],
    "image": "assets/recipes/guacamole.png",
    "fallbackImage": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "description": "Creamy avocados mashed with diced red onion, jalapeño chili, ripe tomatoes, fresh lime, and cilantro.",
    "prepTime": "10 mins",
    "cookTime": "0 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "isDairyFree": true,
    "allergens": [
      "None"
    ],
    "equipment": [
      "Mixing Bowl"
    ],
    "storage": "Best eaten within 24 hours.",
    "costPerServing": "₹45 / $0.55",
    "nutrition": {
      "calories": 180,
      "protein": "3g",
      "carbs": "12g",
      "fat": "16g",
      "fiber": "7g",
      "sodium": "190mg"
    },
    "ingredients": [
      {
        "name": "Avocado",
        "amount": 3,
        "unit": "pcs"
      },
      {
        "name": "Tomato & Onion",
        "amount": 1,
        "unit": "pcs each"
      },
      {
        "name": "Lime & Cilantro",
        "amount": 1,
        "unit": "pcs"
      }
    ],
    "substitutions": [
      {
        "original": "Avocado",
        "substitute": "None"
      }
    ],
    "instructions": [
      "Mash avocados coarsely with fork.",
      "Fold in diced onions, tomatoes, cilantro, lime juice, and salt. Serve with tortilla chips."
    ]
  },
  {
    "id": "rec_tiramisu",
    "name": "Italian Tiramisu",
    "localName": "Tiramisù Tradizionale",
    "cuisine": "Italian",
    "country": "Italy",
    "category": "Desserts",
    "categories": [
      "Desserts",
      "Italian",
      "International",
      "Vegetarian"
    ],
    "image": "assets/recipes/tiramisu.png",
    "fallbackImage": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    "description": "Classic no-bake dessert of espresso-soaked ladyfingers layered with velvety mascarpone cream and cocoa.",
    "prepTime": "25 mins",
    "cookTime": "0 mins",
    "totalMinutes": 25,
    "difficulty": "Medium",
    "servings": 6,
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "isDairyFree": false,
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "equipment": [
      "Casserole Dish"
    ],
    "storage": "Refrigerate up to 4 days.",
    "costPerServing": "₹85 / $1.10",
    "nutrition": {
      "calories": 380,
      "protein": "6g",
      "carbs": "38g",
      "fat": "22g",
      "fiber": "1g",
      "sodium": "140mg"
    },
    "ingredients": [
      {
        "name": "Ladyfinger Biscuits",
        "amount": 24,
        "unit": "pcs"
      },
      {
        "name": "Mascarpone Cheese",
        "amount": 350,
        "unit": "g"
      },
      {
        "name": "Heavy Cream",
        "amount": 1,
        "unit": "cups"
      },
      {
        "name": "Coffee",
        "amount": 1.5,
        "unit": "cups"
      },
      {
        "name": "Cocoa Powder",
        "amount": 2,
        "unit": "tbsp"
      }
    ],
    "substitutions": [
      {
        "original": "Mascarpone",
        "substitute": "Cream cheese"
      }
    ],
    "instructions": [
      "Whip heavy cream and mascarpone with sugar until stiff.",
      "Dip biscuits in coffee, layer in dish with cream. Repeat twice and dust with cocoa. Chill 4 hours."
    ]
  },
  {
    "id": "rec_3",
    "name": "Idli",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "South Indian",
      "Vegetarian",
      "Healthy",
      "Budget Meals"
    ],
    "cuisine": "South Indian",
    "emoji": "⚪",
    "image": "assets/recipes/idli.png",
    "description": "Soft, fluffy steamed savory rice cakes, wholesome and easy to digest.",
    "ingredients": [
      "Rice",
      "Urad Dal",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Rice",
      "Salt"
    ],
    "optionalIngredients": [
      "Urad Dal"
    ],
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 140,
      "protein": "4g",
      "carbs": "28g",
      "fat": "1g"
    },
    "instructions": [
      "Grease idli plates with a light coating of oil.",
      "Pour fermented batter into each mold.",
      "Steam in a steamer for 10-12 minutes on medium-high heat.",
      "Rest for 2 minutes, unmold with a wet spoon, and serve warm."
    ],
    "fallbackImage": "assets/recipes/idli.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_4",
    "name": "Sambar Idli",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "South Indian",
      "Vegetarian",
      "Healthy"
    ],
    "cuisine": "South Indian",
    "emoji": "🍲",
    "image": "assets/recipes/idli.png",
    "description": "Soft steamed idlis dipped in piping hot, aromatic lentil and vegetable sambar.",
    "ingredients": [
      "Rice",
      "Toor Dal",
      "Tomato",
      "Onion",
      "Drumstick",
      "Carrot",
      "Sambar Powder",
      "Curry Leaves",
      "Coriander",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Tomato",
      "Onion"
    ],
    "optionalIngredients": [
      "Carrot",
      "Curry Leaves",
      "Coriander"
    ],
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 260,
      "protein": "9g",
      "carbs": "48g",
      "fat": "3g"
    },
    "instructions": [
      "Cook toor dal with tomatoes, onions, carrots, and turmeric until soft.",
      "Add sambar powder, tamarind extract, and simmer for 10 minutes.",
      "Temper mustard seeds, curry leaves, and pour over sambar.",
      "Immerse fresh steamed idlis in hot sambar and garnish with coriander."
    ],
    "fallbackImage": "assets/recipes/idli.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_5",
    "name": "Appam",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Kerala",
      "South Indian",
      "Vegetarian",
      "Vegan",
      "Budget Meals"
    ],
    "cuisine": "Kerala",
    "emoji": "🍳",
    "image": "assets/recipes/appam-stew.png",
    "description": "Traditional Kerala bowl-shaped fermented rice pancake with a soft spongy center and crispy lace edges.",
    "ingredients": [
      "Rice",
      "Coconut",
      "Yeast",
      "Sugar",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Rice",
      "Coconut",
      "Sugar"
    ],
    "optionalIngredients": [
      "Yeast",
      "Salt"
    ],
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 190,
      "protein": "3g",
      "carbs": "38g",
      "fat": "3g"
    },
    "instructions": [
      "Grind soaked raw rice with grated coconut, yeast, sugar, and water into a smooth batter.",
      "Ferment for 6-8 hours until risen and bubbly.",
      "Pour a ladle of batter into an appachatti, swirl around to form lacy edges.",
      "Cover and steam for 2 minutes until center is fluffy and edges are golden."
    ],
    "fallbackImage": "assets/recipes/appam-stew.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_6",
    "name": "Egg Appam",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Kerala",
      "Egg",
      "Quick Meals",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🍳",
    "image": "assets/recipes/appam-stew.png",
    "description": "Kerala lacy appam with a fresh egg dropped into the center and seasoned with black pepper.",
    "ingredients": [
      "Rice",
      "Coconut",
      "Egg",
      "Black Pepper",
      "Salt",
      "Oil"
    ],
    "requiredIngredients": [
      "Rice",
      "Egg",
      "Black Pepper"
    ],
    "optionalIngredients": [
      "Coconut",
      "Salt"
    ],
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 270,
      "protein": "10g",
      "carbs": "38g",
      "fat": "8g"
    },
    "instructions": [
      "Pour appam batter into hot appam pan and swirl.",
      "Crack a fresh egg into the center depression.",
      "Sprinkle salt and crushed black pepper on top.",
      "Cover and cook on low heat until egg white sets and yolk is soft."
    ],
    "fallbackImage": "assets/recipes/appam-stew.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_7",
    "name": "Vegetable Upma",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "South Indian",
      "Vegetarian",
      "Healthy",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "South Indian",
    "emoji": "🥣",
    "image": "assets/recipes/upma.png",
    "description": "Savory semolina porridge tossed with carrots, green peas, onions, and tempered spices.",
    "ingredients": [
      "Rava",
      "Onion",
      "Carrot",
      "Green Peas",
      "Ginger",
      "Green Chili",
      "Mustard Seeds",
      "Curry Leaves",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Rava",
      "Onion",
      "Carrot"
    ],
    "optionalIngredients": [
      "Green Peas",
      "Ginger",
      "Curry Leaves"
    ],
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 230,
      "protein": "6g",
      "carbs": "42g",
      "fat": "5g"
    },
    "instructions": [
      "Dry roast rava/semolina until aromatic and set aside.",
      "Heat oil, temper mustard seeds, curry leaves, ginger, and green chilies.",
      "Sauté chopped onions, carrots, and green peas.",
      "Add water and salt, bring to a rolling boil, then gradually whisk in roasted rava.",
      "Cover and simmer on low for 3 minutes until fluffy."
    ],
    "fallbackImage": "assets/recipes/upma.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_9",
    "name": "Poha",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Indian",
      "Vegetarian",
      "Healthy",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "North Indian",
    "emoji": "🍚",
    "image": "assets/recipes/poha.png",
    "description": "Flattened rice flakes tempered with onions, turmeric, mustard seeds, and crunchy roasted peanuts.",
    "ingredients": [
      "Poha",
      "Onion",
      "Peanuts",
      "Green Chili",
      "Turmeric",
      "Mustard Seeds",
      "Lemon Juice",
      "Coriander",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Poha",
      "Onion",
      "Turmeric"
    ],
    "optionalIngredients": [
      "Peanuts",
      "Lemon Juice",
      "Coriander"
    ],
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 240,
      "protein": "6g",
      "carbs": "44g",
      "fat": "6g"
    },
    "instructions": [
      "Rinse flattened rice (poha) in a colander and drain excess water.",
      "Heat oil in a pan, fry peanuts until crunchy, then add mustard seeds and green chilies.",
      "Add sliced onions and sauté until translucent. Stir in turmeric and salt.",
      "Add rinsed poha, toss gently to coat with spices, and cover for 2 minutes.",
      "Squeeze fresh lemon juice, garnish with coriander, and serve."
    ],
    "fallbackImage": "assets/recipes/poha.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_10",
    "name": "Vegetable Poha",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Indian",
      "Vegetarian",
      "Healthy",
      "Quick Meals"
    ],
    "cuisine": "Indian",
    "emoji": "🍚",
    "image": "assets/recipes/poha.png",
    "description": "Nutritious flattened rice loaded with diced carrots, potatoes, green peas, and fresh herbs.",
    "ingredients": [
      "Poha",
      "Potato",
      "Carrot",
      "Green Peas",
      "Onion",
      "Turmeric",
      "Mustard Seeds",
      "Lemon Juice",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Poha",
      "Potato",
      "Carrot",
      "Onion"
    ],
    "optionalIngredients": [
      "Green Peas",
      "Lemon Juice",
      "Mustard Seeds"
    ],
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 270,
      "protein": "7g",
      "carbs": "52g",
      "fat": "5g"
    },
    "instructions": [
      "Rinse poha and let rest.",
      "Sauté diced potatoes and carrots in oil until tender.",
      "Add onions, green peas, turmeric, and salt.",
      "Toss in poha, mix evenly, cover for 3 minutes on low heat, and finish with lemon."
    ],
    "fallbackImage": "assets/recipes/poha.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_12",
    "name": "Bread Omelette",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Egg",
      "Quick Meals",
      "Snacks",
      "High Protein",
      "Budget Meals"
    ],
    "cuisine": "Indian",
    "emoji": "🥪",
    "image": "assets/recipes/omelette.png",
    "description": "Fluffy street-style spiced egg omelette folded around golden toasted bread slices.",
    "ingredients": [
      "Bread",
      "Egg",
      "Onion",
      "Green Chili",
      "Tomato",
      "Black Pepper",
      "Butter",
      "Salt"
    ],
    "requiredIngredients": [
      "Bread",
      "Egg",
      "Onion"
    ],
    "optionalIngredients": [
      "Tomato",
      "Green Chili",
      "Butter"
    ],
    "prepTime": "5 mins",
    "cookTime": "8 mins",
    "totalMinutes": 13,
    "difficulty": "Easy",
    "servings": 1,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 310,
      "protein": "16g",
      "carbs": "28g",
      "fat": "14g"
    },
    "instructions": [
      "Whisk eggs with finely chopped onions, tomatoes, green chilies, pepper, and salt.",
      "Melt butter in a pan and pour the egg mixture.",
      "Place two bread slices on top, flip them over to coat with egg.",
      "Once bottom is cooked, flip the entire omelette and fold excess egg over bread slices.",
      "Toast until bread is crisp and golden."
    ],
    "fallbackImage": "assets/recipes/omelette.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_13",
    "name": "French Toast",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Desserts",
      "Quick Meals",
      "Egg",
      "Budget Meals"
    ],
    "cuisine": "International",
    "emoji": "🍞",
    "image": "assets/recipes/french-toast.png",
    "description": "Golden pan-fried bread slices soaked in a rich vanilla cinnamon egg custard.",
    "ingredients": [
      "Bread",
      "Egg",
      "Milk",
      "Sugar",
      "Cinnamon",
      "Butter",
      "Honey"
    ],
    "requiredIngredients": [
      "Bread",
      "Egg",
      "Milk",
      "Sugar"
    ],
    "optionalIngredients": [
      "Cinnamon",
      "Honey"
    ],
    "prepTime": "5 mins",
    "cookTime": "8 mins",
    "totalMinutes": 13,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 290,
      "protein": "11g",
      "carbs": "36g",
      "fat": "11g"
    },
    "instructions": [
      "Whisk eggs, milk, sugar, and cinnamon in a shallow bowl.",
      "Dip bread slices on both sides to absorb the custard.",
      "Melt butter in a skillet over medium heat.",
      "Cook bread slices for 2-3 minutes per side until golden brown.",
      "Drizzle with honey or maple syrup and serve warm."
    ],
    "fallbackImage": "assets/recipes/french-toast.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_14",
    "name": "Scrambled Eggs",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Egg",
      "Quick Meals",
      "Healthy",
      "High Protein"
    ],
    "cuisine": "International",
    "emoji": "🍳",
    "image": "assets/categories/other-pantry.png",
    "description": "Silky, soft, and buttery scrambled eggs seasoned simply with black pepper and herbs.",
    "ingredients": [
      "Egg",
      "Milk",
      "Butter",
      "Black Pepper",
      "Salt",
      "Chives"
    ],
    "requiredIngredients": [
      "Egg",
      "Butter",
      "Salt"
    ],
    "optionalIngredients": [
      "Milk",
      "Black Pepper",
      "Chives"
    ],
    "prepTime": "3 mins",
    "cookTime": "5 mins",
    "totalMinutes": 8,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 190,
      "protein": "13g",
      "carbs": "2g",
      "fat": "14g"
    },
    "instructions": [
      "Beat eggs with milk and a pinch of salt until well blended.",
      "Melt butter in a non-stick skillet on low heat.",
      "Pour in eggs and gently push soft curds with a spatula as they form.",
      "Remove from heat while still slightly glossy and finish with black pepper."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_15",
    "name": "Boiled Egg Toast",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Egg",
      "Healthy",
      "Quick Meals",
      "High Protein"
    ],
    "cuisine": "International",
    "emoji": "🥪",
    "image": "assets/categories/other-pantry.png",
    "description": "Crunchy toasted artisan bread topped with sliced boiled eggs, olive oil, and herbs.",
    "ingredients": [
      "Bread",
      "Egg",
      "Black Pepper",
      "Butter",
      "Salt",
      "Chili Flakes"
    ],
    "requiredIngredients": [
      "Bread",
      "Egg",
      "Black Pepper"
    ],
    "optionalIngredients": [
      "Butter",
      "Chili Flakes"
    ],
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 1,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 230,
      "protein": "14g",
      "carbs": "24g",
      "fat": "8g"
    },
    "instructions": [
      "Boil eggs for 8 minutes, peel, and slice evenly.",
      "Toast bread slices until golden and spread a touch of butter.",
      "Layer sliced eggs over toast, season with sea salt, crushed pepper, and chili flakes."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_16",
    "name": "Vegetable Sandwich",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Snacks",
      "Vegetarian",
      "Healthy",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "Indian",
    "emoji": "🥪",
    "image": "assets/categories/other-pantry.png",
    "description": "Crispy grilled sandwich packed with sliced cucumber, tomato, onion, and mint chutney.",
    "ingredients": [
      "Bread",
      "Cucumber",
      "Tomato",
      "Onion",
      "Butter",
      "Chaat Masala",
      "Mint Chutney",
      "Salt"
    ],
    "requiredIngredients": [
      "Bread",
      "Tomato",
      "Cucumber",
      "Onion"
    ],
    "optionalIngredients": [
      "Butter",
      "Chaat Masala",
      "Mint Chutney"
    ],
    "prepTime": "8 mins",
    "cookTime": "5 mins",
    "totalMinutes": 13,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 220,
      "protein": "6g",
      "carbs": "38g",
      "fat": "6g"
    },
    "instructions": [
      "Spread butter and green mint chutney on bread slices.",
      "Layer thin slices of cucumber, tomato, and onion.",
      "Sprinkle chaat masala and salt.",
      "Cover with second bread slice, toast on a pan until golden and crunchy."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_17",
    "name": "Egg Sandwich",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Egg",
      "Quick Meals",
      "High Protein",
      "Snacks"
    ],
    "cuisine": "International",
    "emoji": "🥪",
    "image": "assets/categories/other-pantry.png",
    "description": "Creamy egg salad with cracked black pepper and fresh greens layered in toasted bread.",
    "ingredients": [
      "Bread",
      "Egg",
      "Mayonnaise",
      "Black Pepper",
      "Mustard",
      "Salt"
    ],
    "requiredIngredients": [
      "Bread",
      "Egg",
      "Black Pepper"
    ],
    "optionalIngredients": [
      "Mayonnaise",
      "Mustard"
    ],
    "prepTime": "8 mins",
    "cookTime": "10 mins",
    "totalMinutes": 18,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 290,
      "protein": "15g",
      "carbs": "26g",
      "fat": "13g"
    },
    "instructions": [
      "Hard boil eggs, cool, peel, and chop into small cubes.",
      "Mix with mayonnaise, black pepper, a touch of mustard, and salt.",
      "Spread generously between slices of toasted bread."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_18",
    "name": "Masala Omelette",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Egg",
      "Quick Meals",
      "High Protein",
      "South Indian"
    ],
    "cuisine": "Indian",
    "emoji": "🍳",
    "image": "assets/recipes/omelette.png",
    "description": "Spicy Indian-style fluffy omelette packed with onions, tomatoes, chilies, and coriander.",
    "ingredients": [
      "Egg",
      "Onion",
      "Tomato",
      "Green Chili",
      "Coriander",
      "Turmeric",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Egg",
      "Onion",
      "Tomato"
    ],
    "optionalIngredients": [
      "Green Chili",
      "Coriander",
      "Turmeric"
    ],
    "prepTime": "5 mins",
    "cookTime": "5 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 1,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 210,
      "protein": "14g",
      "carbs": "4g",
      "fat": "15g"
    },
    "instructions": [
      "Whisk 2 eggs vigorously with chopped onions, tomatoes, chilies, turmeric, and salt.",
      "Heat oil in a pan on medium flame and pour the egg mixture.",
      "Cook for 2 minutes until bottom sets, flip carefully, cook for another minute, and serve hot."
    ],
    "fallbackImage": "assets/recipes/omelette.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_19",
    "name": "Pancakes",
    "category": "Breakfast",
    "categories": [
      "Breakfast",
      "Desserts",
      "Quick Meals",
      "Vegetarian"
    ],
    "cuisine": "International",
    "emoji": "🥞",
    "image": "assets/recipes/pancakes.png",
    "description": "Fluffy golden buttermilk pancakes served with melted butter and sweet honey.",
    "ingredients": [
      "Flour",
      "Milk",
      "Egg",
      "Sugar",
      "Baking Powder",
      "Butter",
      "Honey",
      "Salt"
    ],
    "requiredIngredients": [
      "Flour",
      "Milk",
      "Sugar"
    ],
    "optionalIngredients": [
      "Egg",
      "Baking Powder",
      "Honey"
    ],
    "prepTime": "8 mins",
    "cookTime": "10 mins",
    "totalMinutes": 18,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 310,
      "protein": "8g",
      "carbs": "48g",
      "fat": "10g"
    },
    "instructions": [
      "Whisk dry ingredients (flour, sugar, baking powder, salt) together.",
      "In another bowl, whisk milk, egg, and melted butter.",
      "Combine wet and dry ingredients gently without overmixing.",
      "Cook ladles of batter on a hot greased griddle until bubbles pop, flip and cook till golden."
    ],
    "fallbackImage": "assets/recipes/pancakes.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_21",
    "name": "Chicken Fried Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "Chicken",
      "Lunch",
      "Dinner",
      "Quick Meals",
      "High Protein"
    ],
    "cuisine": "International",
    "emoji": "🍚",
    "image": "assets/recipes/fried-rice.png",
    "description": "Wok-tossed fragrant rice with tender chicken breast pieces, vegetables, egg, and savory soy sauce.",
    "ingredients": [
      "Rice",
      "Chicken",
      "Egg",
      "Onion",
      "Carrot",
      "Garlic",
      "Soy Sauce",
      "Spring Onion",
      "Oil",
      "Black Pepper"
    ],
    "requiredIngredients": [
      "Rice",
      "Chicken",
      "Egg",
      "Onion",
      "Carrot"
    ],
    "optionalIngredients": [
      "Garlic",
      "Soy Sauce",
      "Spring Onion",
      "Black Pepper"
    ],
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 480,
      "protein": "32g",
      "carbs": "58g",
      "fat": "14g"
    },
    "instructions": [
      "Cook chicken pieces in a hot wok with garlic and oil until tender.",
      "Push chicken aside, scramble the egg in the center.",
      "Add finely diced carrots and onions; stir fry on high heat for 2 minutes.",
      "Add cold cooked rice, soy sauce, and black pepper.",
      "Toss vigorously on high heat for 3 minutes and garnish with spring onions."
    ],
    "fallbackImage": "assets/recipes/fried-rice.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_22",
    "name": "Vegetable Fried Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "Vegetarian",
      "Vegan",
      "Lunch",
      "Dinner",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "International",
    "emoji": "🍚",
    "image": "assets/recipes/fried-rice.png",
    "description": "Classic restaurant-style stir-fried rice loaded with crunchy carrots, beans, onions, and garlic.",
    "ingredients": [
      "Rice",
      "Carrot",
      "Beans",
      "Onion",
      "Garlic",
      "Soy Sauce",
      "Oil",
      "Black Pepper",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Carrot",
      "Onion",
      "Garlic"
    ],
    "optionalIngredients": [
      "Beans",
      "Soy Sauce",
      "Black Pepper"
    ],
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 340,
      "protein": "7g",
      "carbs": "62g",
      "fat": "8g"
    },
    "instructions": [
      "Heat oil in a wok on high heat and sauté minced garlic.",
      "Add finely chopped carrots, beans, and onions; toss for 3 minutes until crisp-tender.",
      "Add cooked cold rice, soy sauce, salt, and freshly cracked black pepper.",
      "Toss continuously on high heat for 3-4 minutes to develop a smoky wok aroma."
    ],
    "fallbackImage": "assets/recipes/fried-rice.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_23",
    "name": "Egg Fried Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "Egg",
      "Lunch",
      "Dinner",
      "Quick Meals",
      "High Protein",
      "Budget Meals"
    ],
    "cuisine": "International",
    "emoji": "🍚",
    "image": "assets/recipes/fried-rice.png",
    "description": "Fast 15-minute comfort meal: fluffy rice tossed with scrambled eggs, scallions, and pepper.",
    "ingredients": [
      "Rice",
      "Egg",
      "Onion",
      "Garlic",
      "Soy Sauce",
      "Oil",
      "Black Pepper",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Egg",
      "Onion"
    ],
    "optionalIngredients": [
      "Garlic",
      "Soy Sauce",
      "Black Pepper"
    ],
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 390,
      "protein": "16g",
      "carbs": "54g",
      "fat": "12g"
    },
    "instructions": [
      "Heat oil in a skillet and scramble 2 eggs with a pinch of salt.",
      "Add chopped garlic and onions, cook for 1 minute.",
      "Tip in cooked rice, soy sauce, and generous black pepper.",
      "Stir fry vigorously for 3 minutes until steaming hot."
    ],
    "fallbackImage": "assets/recipes/fried-rice.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_24",
    "name": "Schezwan Fried Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "Vegetarian",
      "Lunch",
      "Dinner",
      "Quick Meals"
    ],
    "cuisine": "International",
    "emoji": "🌶️",
    "image": "assets/recipes/fried-rice.png",
    "description": "Fiery red Indo-Chinese fried rice tossed with zesty Schezwan sauce, garlic, and fresh veggies.",
    "ingredients": [
      "Rice",
      "Carrot",
      "Onion",
      "Capsicum",
      "Garlic",
      "Schezwan Sauce",
      "Soy Sauce",
      "Oil"
    ],
    "requiredIngredients": [
      "Rice",
      "Carrot",
      "Onion",
      "Garlic"
    ],
    "optionalIngredients": [
      "Capsicum",
      "Schezwan Sauce",
      "Soy Sauce"
    ],
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 360,
      "protein": "6g",
      "carbs": "64g",
      "fat": "9g"
    },
    "instructions": [
      "Sauté chopped garlic, onions, carrots, and capsicum in oil over high heat.",
      "Add 2 tablespoons of Schezwan sauce and 1 teaspoon of soy sauce.",
      "Add cooked rice and toss gently until every grain is coated red.",
      "Cook for 2 more minutes on high flame and serve hot."
    ],
    "fallbackImage": "assets/recipes/fried-rice.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_25",
    "name": "Ghee Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "Kerala",
      "South Indian",
      "Vegetarian",
      "Lunch",
      "Dinner"
    ],
    "cuisine": "Kerala",
    "emoji": "🍚",
    "image": "assets/categories/other-pantry.png",
    "description": "Aromatic Malabar specialty made with Kaima rice, pure ghee, fried onions, cashews, and raisins.",
    "ingredients": [
      "Rice",
      "Ghee",
      "Onion",
      "Cashews",
      "Raisins",
      "Cardamom",
      "Cinnamon",
      "Cloves",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Rice",
      "Ghee",
      "Onion"
    ],
    "optionalIngredients": [
      "Cashews",
      "Raisins",
      "Cardamom",
      "Cinnamon"
    ],
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 380,
      "protein": "6g",
      "carbs": "58g",
      "fat": "14g"
    },
    "instructions": [
      "Fry thinly sliced onions in ghee until golden brown and crispy; set aside for garnish.",
      "Fry cashews and raisins in the same ghee until plump.",
      "Add whole spices (cardamom, cinnamon, cloves) and sauté soaked rice for 2 minutes.",
      "Add boiling water and salt, cover, and cook on low heat until water is absorbed.",
      "Garnish with fried onions, nuts, and raisins before serving."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_26",
    "name": "Jeera Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "North Indian",
      "Vegetarian",
      "Vegan",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "North Indian",
    "emoji": "🍚",
    "image": "assets/categories/other-pantry.png",
    "description": "Fluffy basmati rice tempered with golden roasted cumin seeds and fresh ghee.",
    "ingredients": [
      "Rice",
      "Cumin Seeds",
      "Ghee",
      "Green Chili",
      "Coriander",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Rice",
      "Cumin Seeds",
      "Ghee"
    ],
    "optionalIngredients": [
      "Green Chili",
      "Coriander",
      "Salt"
    ],
    "prepTime": "5 mins",
    "cookTime": "15 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 290,
      "protein": "5g",
      "carbs": "52g",
      "fat": "7g"
    },
    "instructions": [
      "Heat ghee or oil in a pan and add whole cumin seeds until they sizzle and release aroma.",
      "Add slit green chili and soaked basmati rice, sauté gently for 1 minute.",
      "Add water and salt, bring to a boil, cover and simmer for 12 minutes.",
      "Fluff gently with a fork and garnish with chopped fresh coriander."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_27",
    "name": "Tomato Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "South Indian",
      "Vegetarian",
      "Vegan",
      "Budget Meals",
      "Quick Meals"
    ],
    "cuisine": "South Indian",
    "emoji": "🍅",
    "image": "assets/categories/other-pantry.png",
    "description": "Tangy and spiced South Indian thakkali sadam made with juicy ripe tomatoes, onions, and curry leaves.",
    "ingredients": [
      "Rice",
      "Tomato",
      "Onion",
      "Green Chili",
      "Ginger",
      "Mustard Seeds",
      "Curry Leaves",
      "Turmeric",
      "Chili Powder",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Tomato",
      "Onion"
    ],
    "optionalIngredients": [
      "Green Chili",
      "Curry Leaves",
      "Ginger",
      "Mustard Seeds"
    ],
    "prepTime": "10 mins",
    "cookTime": "18 mins",
    "totalMinutes": 28,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 310,
      "protein": "6g",
      "carbs": "56g",
      "fat": "7g"
    },
    "instructions": [
      "Heat oil, temper mustard seeds and curry leaves.",
      "Add sliced onions, green chilies, and ginger; sauté till onions turn translucent.",
      "Add chopped tomatoes, turmeric, chili powder, and salt. Cook until tomatoes turn mushy and oil separates.",
      "Mix in cooked rice gently on low heat until thoroughly combined.",
      "Rest for 2 minutes and serve warm with raita or papad."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_28",
    "name": "Lemon Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "South Indian",
      "Vegetarian",
      "Vegan",
      "Budget Meals",
      "Quick Meals"
    ],
    "cuisine": "South Indian",
    "emoji": "🍋",
    "image": "assets/categories/other-pantry.png",
    "description": "Vibrant yellow rice infused with freshly squeezed lemon juice, crunchy peanuts, and mustard tempering.",
    "ingredients": [
      "Rice",
      "Lemon",
      "Peanuts",
      "Turmeric",
      "Mustard Seeds",
      "Curry Leaves",
      "Green Chili",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Lemon",
      "Turmeric"
    ],
    "optionalIngredients": [
      "Peanuts",
      "Mustard Seeds",
      "Curry Leaves",
      "Green Chili"
    ],
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 280,
      "protein": "5g",
      "carbs": "50g",
      "fat": "7g"
    },
    "instructions": [
      "Heat oil in a pan, fry peanuts until crisp, then add mustard seeds, curry leaves, and green chilies.",
      "Turn off the heat and stir in turmeric powder and salt.",
      "Add cooked rice and squeeze fresh lemon juice all over.",
      "Toss gently until rice is uniformly yellow and fragrant."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_29",
    "name": "Coconut Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "South Indian",
      "Vegetarian",
      "Vegan",
      "Budget Meals"
    ],
    "cuisine": "South Indian",
    "emoji": "🥥",
    "image": "assets/categories/other-pantry.png",
    "description": "Mild, fragrant rice tossed with freshly grated coconut, cashews, and curry leaves in coconut oil.",
    "ingredients": [
      "Rice",
      "Grated Coconut",
      "Cashews",
      "Mustard Seeds",
      "Curry Leaves",
      "Green Chili",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Grated Coconut",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Cashews",
      "Mustard Seeds",
      "Curry Leaves"
    ],
    "prepTime": "5 mins",
    "cookTime": "12 mins",
    "totalMinutes": 17,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 340,
      "protein": "5g",
      "carbs": "52g",
      "fat": "13g"
    },
    "instructions": [
      "Heat coconut oil in a pan; add mustard seeds, curry leaves, chilies, and cashews.",
      "Add freshly grated coconut and sauté on low flame for 2 minutes without browning.",
      "Add cooked rice and salt; mix thoroughly and serve."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_30",
    "name": "Curd Rice",
    "category": "Rice",
    "categories": [
      "Rice",
      "South Indian",
      "Vegetarian",
      "Healthy",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "South Indian",
    "emoji": "🥣",
    "image": "assets/categories/other-pantry.png",
    "description": "Cooling and creamy yogurt rice tempered with mustard seeds, curry leaves, and ginger.",
    "ingredients": [
      "Rice",
      "Curd",
      "Milk",
      "Mustard Seeds",
      "Curry Leaves",
      "Ginger",
      "Green Chili",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Curd",
      "Salt"
    ],
    "optionalIngredients": [
      "Milk",
      "Mustard Seeds",
      "Curry Leaves",
      "Ginger"
    ],
    "prepTime": "5 mins",
    "cookTime": "5 mins",
    "totalMinutes": 10,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 230,
      "protein": "7g",
      "carbs": "42g",
      "fat": "4g"
    },
    "instructions": [
      "Mash soft cooked rice lightly while warm.",
      "Mix with fresh curd, a splash of milk, and salt until creamy.",
      "Temper mustard seeds, curry leaves, ginger, and green chili in a teaspoon of oil.",
      "Pour tempering over curd rice, mix gently, and serve chilled."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_31",
    "name": "Vegetable Biryani",
    "category": "Rice",
    "categories": [
      "Rice",
      "Vegetarian",
      "Lunch",
      "Dinner",
      "Indian"
    ],
    "cuisine": "Indian",
    "emoji": "🍛",
    "image": "assets/recipes/chicken-biryani.png",
    "description": "Layered royal basmati rice cooked with spiced mixed vegetables, saffron, mint, and fried onions.",
    "ingredients": [
      "Rice",
      "Carrot",
      "Potato",
      "Beans",
      "Green Peas",
      "Onion",
      "Tomato",
      "Curd",
      "Biryani Masala",
      "Mint",
      "Ghee",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Potato",
      "Carrot",
      "Onion",
      "Tomato"
    ],
    "optionalIngredients": [
      "Green Peas",
      "Biryani Masala",
      "Mint",
      "Curd"
    ],
    "prepTime": "20 mins",
    "cookTime": "30 mins",
    "totalMinutes": 50,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 410,
      "protein": "9g",
      "carbs": "68g",
      "fat": "11g"
    },
    "instructions": [
      "Parboil basmati rice with whole spices until 70% cooked.",
      "Sauté onions, tomatoes, ginger-garlic, curd, and biryani spices with mixed vegetables.",
      "Layer vegetable gravy and parboiled rice in a heavy pot.",
      "Top with mint, coriander, fried onions, and ghee.",
      "Seal pot and cook on low dum heat for 20 minutes."
    ],
    "fallbackImage": "assets/recipes/chicken-biryani.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_33",
    "name": "Egg Biryani",
    "category": "Rice",
    "categories": [
      "Rice",
      "Egg",
      "Lunch",
      "Dinner",
      "Indian",
      "High Protein",
      "Budget Meals"
    ],
    "cuisine": "Indian",
    "emoji": "🥚",
    "image": "assets/categories/other-pantry.png",
    "description": "Spicy aromatic rice cooked with golden shallow-fried boiled eggs, onions, and biryani spices.",
    "ingredients": [
      "Rice",
      "Egg",
      "Onion",
      "Tomato",
      "Curd",
      "Ginger",
      "Garlic",
      "Biryani Masala",
      "Mint",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Egg",
      "Onion",
      "Tomato"
    ],
    "optionalIngredients": [
      "Curd",
      "Biryani Masala",
      "Mint",
      "Garlic"
    ],
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 460,
      "protein": "18g",
      "carbs": "60g",
      "fat": "16g"
    },
    "instructions": [
      "Hard boil eggs, prick them, and shallow fry with turmeric and chili powder.",
      "Sauté onions, ginger-garlic paste, and tomatoes with biryani masala and curd.",
      "Add fried eggs into the spicy masala.",
      "Layer with partially cooked basmati rice, cover and cook on low dum for 15 minutes."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_34",
    "name": "Fish Biryani",
    "category": "Rice",
    "categories": [
      "Rice",
      "Fish",
      "Kerala",
      "South Indian",
      "Lunch",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🐟",
    "image": "assets/categories/other-pantry.png",
    "description": "Malabar-style fish biryani prepared with spiced seared fish steaks, ghee rice, and rich masala gravy.",
    "ingredients": [
      "Rice",
      "Fish",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Curd",
      "Biryani Masala",
      "Ghee",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Fish",
      "Onion",
      "Tomato"
    ],
    "optionalIngredients": [
      "Curd",
      "Ginger",
      "Garlic",
      "Ghee"
    ],
    "prepTime": "20 mins",
    "cookTime": "30 mins",
    "totalMinutes": 50,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 510,
      "protein": "34g",
      "carbs": "60g",
      "fat": "15g"
    },
    "instructions": [
      "Marinate fish steaks with chili powder, turmeric, and shallow fry briefly.",
      "Sauté sliced onions, ginger-garlic, tomatoes, curd, and spices to make fish masala.",
      "Place seared fish gently into the masala gravy.",
      "Layer cooked ghee rice over fish, top with fried onions, cashews, and dum steam for 15 minutes."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_35",
    "name": "Mutton Biryani",
    "category": "Rice",
    "categories": [
      "Rice",
      "Meat",
      "Lunch",
      "Dinner",
      "Indian",
      "High Protein"
    ],
    "cuisine": "Indian",
    "emoji": "🥩",
    "image": "assets/recipes/chicken-biryani.png",
    "description": "Rich, aromatic dum biryani with melt-in-the-mouth succulent mutton pieces and spiced long-grain rice.",
    "ingredients": [
      "Rice",
      "Mutton",
      "Onion",
      "Tomato",
      "Curd",
      "Ginger",
      "Garlic",
      "Biryani Masala",
      "Ghee",
      "Mint",
      "Salt"
    ],
    "requiredIngredients": [
      "Rice",
      "Mutton",
      "Onion",
      "Tomato",
      "Curd"
    ],
    "optionalIngredients": [
      "Ginger",
      "Garlic",
      "Biryani Masala",
      "Mint",
      "Ghee"
    ],
    "prepTime": "30 mins",
    "cookTime": "50 mins",
    "totalMinutes": 80,
    "difficulty": "Hard",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 640,
      "protein": "40g",
      "carbs": "62g",
      "fat": "26g"
    },
    "instructions": [
      "Pressure cook marinated mutton with ginger-garlic, onions, and spices until tender.",
      "Reduce the gravy until thick and rich.",
      "Layer cooked basmati rice over hot mutton gravy.",
      "Top with mint, saffron, and ghee; seal and dum cook on low heat for 20 minutes."
    ],
    "fallbackImage": "assets/recipes/chicken-biryani.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_36",
    "name": "Tomato Pulao",
    "category": "Rice",
    "categories": [
      "Rice",
      "Vegetarian",
      "Quick Meals",
      "Budget Meals",
      "Lunch"
    ],
    "cuisine": "North Indian",
    "emoji": "🍅",
    "image": "assets/categories/other-pantry.png",
    "description": "One-pot fragrant spiced rice cooked with fresh ripe tomatoes, onions, and whole garam masala.",
    "ingredients": [
      "Rice",
      "Tomato",
      "Onion",
      "Garlic",
      "Ginger",
      "Garam Masala",
      "Oil",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Rice",
      "Tomato",
      "Onion"
    ],
    "optionalIngredients": [
      "Garlic",
      "Ginger",
      "Garam Masala"
    ],
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 310,
      "protein": "6g",
      "carbs": "58g",
      "fat": "6g"
    },
    "instructions": [
      "Sauté whole spices, sliced onions, and ginger-garlic paste in oil.",
      "Add pureed tomatoes, garam masala, and salt; cook till fragrant.",
      "Add soaked rice and water, cover and pressure cook for 2 whistles."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_37",
    "name": "Vegetable Pulao",
    "category": "Rice",
    "categories": [
      "Rice",
      "Vegetarian",
      "Healthy",
      "Lunch",
      "Dinner",
      "Quick Meals"
    ],
    "cuisine": "Indian",
    "emoji": "🍚",
    "image": "assets/categories/other-pantry.png",
    "description": "Mild, fragrant one-pot basmati rice pilaf studded with colorful vegetables and whole spices.",
    "ingredients": [
      "Rice",
      "Carrot",
      "Potato",
      "Beans",
      "Green Peas",
      "Onion",
      "Ghee",
      "Cumin Seeds",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Rice",
      "Carrot",
      "Potato",
      "Onion"
    ],
    "optionalIngredients": [
      "Green Peas",
      "Beans",
      "Ghee",
      "Cumin Seeds"
    ],
    "prepTime": "10 mins",
    "cookTime": "18 mins",
    "totalMinutes": 28,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 330,
      "protein": "7g",
      "carbs": "62g",
      "fat": "7g"
    },
    "instructions": [
      "Heat ghee, sizzle cumin seeds, cardamom, and cinnamon.",
      "Sauté onions and diced vegetables for 3 minutes.",
      "Add soaked basmati rice, water, and salt.",
      "Cover and simmer until rice is tender and water is absorbed."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_38",
    "name": "Chicken Pulao",
    "category": "Rice",
    "categories": [
      "Rice",
      "Chicken",
      "Lunch",
      "Dinner",
      "High Protein",
      "Quick Meals"
    ],
    "cuisine": "Indian",
    "emoji": "🍗",
    "image": "assets/categories/other-pantry.png",
    "description": "Easy one-pot chicken pilaf made by simmering chicken pieces with whole spices and basmati rice.",
    "ingredients": [
      "Rice",
      "Chicken",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Garam Masala",
      "Oil",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Rice",
      "Chicken",
      "Onion",
      "Tomato"
    ],
    "optionalIngredients": [
      "Ginger",
      "Garlic",
      "Garam Masala"
    ],
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 490,
      "protein": "32g",
      "carbs": "56g",
      "fat": "14g"
    },
    "instructions": [
      "Sauté onions, ginger, and garlic in oil until golden.",
      "Add chicken pieces and tomatoes; sear on high heat until chicken changes color.",
      "Add garam masala, soaked rice, water, and salt.",
      "Cover tightly and cook on medium-low heat for 18 minutes until rice is fluffy."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_39",
    "name": "Kerala Parotta",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Vegetarian",
      "Bread",
      "Dinner"
    ],
    "cuisine": "Kerala",
    "emoji": "🫓",
    "image": "assets/recipes/kerala-parotta.png",
    "description": "Flaky, layered, crispy on the outside and soft on the inside Kerala street food flatbread.",
    "ingredients": [
      "Flour",
      "Oil",
      "Sugar",
      "Water",
      "Salt"
    ],
    "requiredIngredients": [
      "Flour",
      "Oil",
      "Water"
    ],
    "optionalIngredients": [
      "Sugar",
      "Salt"
    ],
    "prepTime": "30 mins",
    "cookTime": "15 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 310,
      "protein": "6g",
      "carbs": "48g",
      "fat": "11g"
    },
    "instructions": [
      "Knead flour, salt, sugar, water, and oil into a pliable smooth dough.",
      "Rest dough for 30 minutes, divide into balls, roll thinly, and fold into spiral layers.",
      "Flatten gently and cook on a hot tawa with oil until golden brown on both sides.",
      "Clap parottas between hands while hot to release flaky layers."
    ],
    "fallbackImage": "assets/recipes/kerala-parotta.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_40",
    "name": "Chicken Curry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Chicken",
      "South Indian",
      "Lunch",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🍛",
    "image": "assets/categories/other-pantry.png",
    "description": "Traditional Kerala style chicken curry cooked in coconut oil with onions, curry leaves, and roasted spices.",
    "ingredients": [
      "Chicken",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Coconut Oil",
      "Curry Leaves",
      "Chili Powder",
      "Coriander Powder",
      "Turmeric",
      "Garam Masala",
      "Salt"
    ],
    "requiredIngredients": [
      "Chicken",
      "Onion",
      "Tomato",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Curry Leaves",
      "Ginger",
      "Garlic",
      "Garam Masala"
    ],
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalMinutes": 45,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 420,
      "protein": "36g",
      "carbs": "12g",
      "fat": "26g"
    },
    "instructions": [
      "Heat coconut oil in a pan, sauté sliced onions, ginger, garlic, and fresh curry leaves until golden.",
      "Add turmeric, coriander, chili, and garam masala powders; roast on low flame for 1 minute.",
      "Add chopped tomatoes and cook until soft.",
      "Add chicken pieces and salt; mix well to coat with masala.",
      "Add 1 cup of water, cover, and simmer for 25 minutes until chicken is tender."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_41",
    "name": "Kerala Beef Curry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Meat",
      "South Indian",
      "Lunch",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🥩",
    "image": "assets/categories/other-pantry.png",
    "description": "Spicy Kerala beef curry slow-cooked with roasted coconut pieces, black pepper, and garlic.",
    "ingredients": [
      "Beef",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Coconut Pieces",
      "Black Pepper",
      "Chili Powder",
      "Curry Leaves",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Beef",
      "Onion",
      "Tomato",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Coconut Pieces",
      "Black Pepper",
      "Curry Leaves",
      "Ginger"
    ],
    "prepTime": "20 mins",
    "cookTime": "40 mins",
    "totalMinutes": 60,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 460,
      "protein": "38g",
      "carbs": "10g",
      "fat": "30g"
    },
    "instructions": [
      "Pressure cook beef cubes with turmeric, chili powder, crushed pepper, and salt.",
      "Heat coconut oil, brown small coconut slices (thengakothu) and set aside.",
      "Sauté onions, ginger, garlic, and curry leaves in the same pan.",
      "Add cooked beef with broth, simmer until gravy thickens.",
      "Garnish with browned coconut slices and crushed black pepper."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_43",
    "name": "Meen Pollichathu",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Fish",
      "South Indian",
      "High Protein",
      "Dinner"
    ],
    "cuisine": "Kerala",
    "emoji": "🐟",
    "image": "assets/categories/other-pantry.png",
    "description": "Whole pearl spot fish coated in spicy shallot tomato masala, wrapped in banana leaf, and pan-roasted.",
    "ingredients": [
      "Fish",
      "Banana Leaf",
      "Shallots",
      "Tomato",
      "Ginger",
      "Garlic",
      "Curry Leaves",
      "Chili Powder",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Fish",
      "Tomato",
      "Shallots",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Banana Leaf",
      "Ginger",
      "Garlic",
      "Curry Leaves"
    ],
    "prepTime": "20 mins",
    "cookTime": "25 mins",
    "totalMinutes": 45,
    "difficulty": "Medium",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 380,
      "protein": "32g",
      "carbs": "9g",
      "fat": "24g"
    },
    "instructions": [
      "Marinate fish and shallow fry lightly on both sides.",
      "Make thick masala by sautéing shallots, tomatoes, ginger, garlic, and spices in coconut oil.",
      "Coat fish generously with masala on a softened banana leaf.",
      "Wrap leaf into a parcel, tie with twine, and roast on a pan for 6-8 minutes per side."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_44",
    "name": "Vegetable Stew",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Vegetarian",
      "Healthy",
      "Breakfast",
      "Dinner",
      "Vegan"
    ],
    "cuisine": "Kerala",
    "emoji": "🥔",
    "image": "assets/recipes/appam-stew.png",
    "description": "Mild, aromatic Kerala stew with potatoes, carrots, green beans, and peas simmered in rich coconut milk.",
    "ingredients": [
      "Potato",
      "Carrot",
      "Beans",
      "Green Peas",
      "Onion",
      "Ginger",
      "Green Chili",
      "Coconut Milk",
      "Cardamom",
      "Cinnamon",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Potato",
      "Carrot",
      "Onion",
      "Coconut Milk"
    ],
    "optionalIngredients": [
      "Beans",
      "Green Peas",
      "Ginger",
      "Cardamom"
    ],
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 280,
      "protein": "5g",
      "carbs": "32g",
      "fat": "16g"
    },
    "instructions": [
      "Heat coconut oil, sauté whole spices, sliced onions, ginger, and slit green chilies.",
      "Add diced potatoes, carrots, and beans with thin coconut milk and salt.",
      "Cook until vegetables are tender.",
      "Stir in thick coconut milk, turn off heat before boiling, and drizzle raw coconut oil on top."
    ],
    "fallbackImage": "assets/recipes/appam-stew.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_45",
    "name": "Chicken Stew",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Chicken",
      "Breakfast",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🍗",
    "image": "assets/categories/other-pantry.png",
    "description": "Kerala Christian delicacy of tender chicken and potatoes cooked in delicately spiced coconut milk.",
    "ingredients": [
      "Chicken",
      "Potato",
      "Onion",
      "Ginger",
      "Garlic",
      "Green Chili",
      "Coconut Milk",
      "Cashews",
      "Cardamom",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Chicken",
      "Potato",
      "Onion",
      "Coconut Milk"
    ],
    "optionalIngredients": [
      "Cashews",
      "Ginger",
      "Garlic",
      "Cardamom"
    ],
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 390,
      "protein": "30g",
      "carbs": "20g",
      "fat": "22g"
    },
    "instructions": [
      "Sauté whole spices, onions, ginger, garlic, and green chilies in coconut oil.",
      "Add chicken and cubed potatoes with thin coconut milk.",
      "Simmer until chicken is cooked through.",
      "Pour thick coconut milk, warm through gently, and garnish with curry leaves."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_46",
    "name": "Kadala Curry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Vegetarian",
      "High Protein",
      "Vegan",
      "Budget Meals"
    ],
    "cuisine": "Kerala",
    "emoji": "🍛",
    "image": "assets/recipes/puttu-kadala.png",
    "description": "Classic black chickpea curry simmered in roasted coconut gravy and tempered with curry leaves.",
    "ingredients": [
      "Black Chickpeas",
      "Grated Coconut",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Curry Leaves",
      "Coriander Powder",
      "Chili Powder",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Black Chickpeas",
      "Onion",
      "Tomato",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Grated Coconut",
      "Ginger",
      "Curry Leaves"
    ],
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "totalMinutes": 45,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 320,
      "protein": "12g",
      "carbs": "48g",
      "fat": "10g"
    },
    "instructions": [
      "Pressure cook soaked black chickpeas with salt and water.",
      "Roast grated coconut with shallots and coriander powder until dark brown; grind to a smooth paste.",
      "Sauté onions, tomatoes, and ginger; add cooked chickpeas and ground coconut paste.",
      "Simmer for 10 minutes and temper with mustard seeds and curry leaves."
    ],
    "fallbackImage": "assets/recipes/puttu-kadala.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_48",
    "name": "Thoran",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Vegetarian",
      "Vegan",
      "Healthy",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "Kerala",
    "emoji": "🥦",
    "image": "assets/categories/other-pantry.png",
    "description": "Quick Kerala dry vegetable stir fry tossed with fresh coconut, shallots, garlic, and curry leaves.",
    "ingredients": [
      "Cabbage",
      "Carrot",
      "Grated Coconut",
      "Shallots",
      "Green Chili",
      "Garlic",
      "Mustard Seeds",
      "Curry Leaves",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Cabbage",
      "Carrot",
      "Grated Coconut",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Shallots",
      "Green Chili",
      "Mustard Seeds",
      "Curry Leaves"
    ],
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 160,
      "protein": "4g",
      "carbs": "18g",
      "fat": "8g"
    },
    "instructions": [
      "Finely shred cabbage and carrots.",
      "Crush coconut with shallots, garlic, green chili, and cumin.",
      "Sputter mustard seeds and curry leaves in coconut oil.",
      "Add shredded vegetables and coconut mixture, cover and steam on low for 6-8 minutes without water."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_49",
    "name": "Theeyal",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Vegetarian",
      "Vegan",
      "Lunch",
      "Dinner"
    ],
    "cuisine": "Kerala",
    "emoji": "🍲",
    "image": "assets/categories/other-pantry.png",
    "description": "Deep roasted spiced coconut curry with shallots and tamarind, creating a rich dark brown sauce.",
    "ingredients": [
      "Shallots",
      "Grated Coconut",
      "Tamarind",
      "Coriander Powder",
      "Chili Powder",
      "Fenugreek",
      "Curry Leaves",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Shallots",
      "Grated Coconut",
      "Tamarind",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Curry Leaves",
      "Fenugreek",
      "Chili Powder"
    ],
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Medium",
    "servings": 3,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 250,
      "protein": "4g",
      "carbs": "22g",
      "fat": "17g"
    },
    "instructions": [
      "Slow roast grated coconut with curry leaves until dark mahogany brown.",
      "Add spices and grind to a smooth paste without water.",
      "Sauté shallots in coconut oil, add tamarind juice, ground coconut paste, and simmer for 15 minutes."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_50",
    "name": "Egg Roast",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Egg",
      "South Indian",
      "Breakfast",
      "Dinner",
      "High Protein",
      "Quick Meals"
    ],
    "cuisine": "Kerala",
    "emoji": "🥚",
    "image": "assets/categories/other-pantry.png",
    "description": "Hard-boiled eggs tossed in a thick, spicy caramelized onion, ginger, tomato, and black pepper masala.",
    "ingredients": [
      "Egg",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Curry Leaves",
      "Black Pepper",
      "Chili Powder",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Egg",
      "Onion",
      "Tomato",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Ginger",
      "Garlic",
      "Curry Leaves",
      "Black Pepper"
    ],
    "prepTime": "10 mins",
    "cookTime": "18 mins",
    "totalMinutes": 28,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 280,
      "protein": "14g",
      "carbs": "12g",
      "fat": "19g"
    },
    "instructions": [
      "Hard boil eggs, peel, and make light vertical slits.",
      "Heat coconut oil, sauté sliced onions slowly until deep golden brown.",
      "Add ginger-garlic paste, curry leaves, chopped tomatoes, pepper, and spices.",
      "Add boiled eggs, toss to coat in thick masala, and cook on low for 5 minutes."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_51",
    "name": "Beef Fry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Meat",
      "South Indian",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🥩",
    "image": "assets/categories/other-pantry.png",
    "description": "Famous Kerala beef ularthiyathu: tender beef slow-roasted in coconut oil with crispy coconut chips and crushed pepper.",
    "ingredients": [
      "Beef",
      "Onion",
      "Shallots",
      "Ginger",
      "Garlic",
      "Coconut Pieces",
      "Black Pepper",
      "Curry Leaves",
      "Garam Masala",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Beef",
      "Onion",
      "Coconut Oil",
      "Black Pepper"
    ],
    "optionalIngredients": [
      "Coconut Pieces",
      "Shallots",
      "Curry Leaves",
      "Ginger"
    ],
    "prepTime": "20 mins",
    "cookTime": "45 mins",
    "totalMinutes": 65,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 490,
      "protein": "42g",
      "carbs": "8g",
      "fat": "32g"
    },
    "instructions": [
      "Pressure cook beef cubes with turmeric, chili, coriander, crushed pepper, and ginger-garlic.",
      "In an iron pan, heat coconut oil and fry coconut chips until golden.",
      "Add shallots and curry leaves; then add cooked beef.",
      "Roast on medium flame stirring continuously until dark brown and aromatic."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_52",
    "name": "Chicken Fry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Chicken",
      "Snacks",
      "South Indian",
      "High Protein",
      "Quick Meals"
    ],
    "cuisine": "Kerala",
    "emoji": "🍗",
    "image": "assets/categories/other-pantry.png",
    "description": "Crispy Kerala style chicken fry marinated with crushed shallots, ginger, chili, and curry leaves.",
    "ingredients": [
      "Chicken",
      "Shallots",
      "Ginger",
      "Garlic",
      "Chili Powder",
      "Turmeric",
      "Black Pepper",
      "Curry Leaves",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Chicken",
      "Chili Powder",
      "Coconut Oil",
      "Salt"
    ],
    "optionalIngredients": [
      "Shallots",
      "Ginger",
      "Curry Leaves",
      "Black Pepper"
    ],
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 380,
      "protein": "34g",
      "carbs": "6g",
      "fat": "24g"
    },
    "instructions": [
      "Marinate chicken with crushed shallots, ginger, garlic, chili powder, turmeric, and salt for 20 mins.",
      "Heat coconut oil in a pan, add fresh curry leaves.",
      "Shallow fry chicken pieces on medium heat until crisp, golden, and cooked through."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_53",
    "name": "Fish Fry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Fish",
      "South Indian",
      "High Protein",
      "Quick Meals"
    ],
    "cuisine": "Kerala",
    "emoji": "🐟",
    "image": "assets/categories/other-pantry.png",
    "description": "Crispy pan-seared fish slices coated in red chili, pepper, turmeric, and lemon marinade.",
    "ingredients": [
      "Fish",
      "Chili Powder",
      "Turmeric",
      "Black Pepper",
      "Lemon Juice",
      "Coconut Oil",
      "Curry Leaves",
      "Salt"
    ],
    "requiredIngredients": [
      "Fish",
      "Chili Powder",
      "Turmeric",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Lemon Juice",
      "Black Pepper",
      "Curry Leaves"
    ],
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 290,
      "protein": "28g",
      "carbs": "3g",
      "fat": "18g"
    },
    "instructions": [
      "Make a paste of chili powder, turmeric, pepper, lemon juice, salt, and water.",
      "Apply evenly on fish slices and rest for 10 minutes.",
      "Shallow fry in coconut oil with curry leaves until crispy on both sides."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_54",
    "name": "Kerala Sambar",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "South Indian",
      "Vegetarian",
      "Healthy",
      "Lunch"
    ],
    "cuisine": "Kerala",
    "emoji": "🍲",
    "image": "assets/recipes/sambar.png",
    "description": "Hearty mixed vegetable and lentil stew flavored with roasted spices and roasted coconut.",
    "ingredients": [
      "Toor Dal",
      "Drumstick",
      "Carrot",
      "Potato",
      "Tomato",
      "Shallots",
      "Grated Coconut",
      "Sambar Powder",
      "Curry Leaves",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Toor Dal",
      "Potato",
      "Tomato",
      "Carrot"
    ],
    "optionalIngredients": [
      "Drumstick",
      "Grated Coconut",
      "Curry Leaves",
      "Shallots"
    ],
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 240,
      "protein": "9g",
      "carbs": "38g",
      "fat": "6g"
    },
    "instructions": [
      "Cook dal and chopped vegetables until soft.",
      "Roast coconut and sambar powder and grind to a paste.",
      "Combine dal, vegetables, tamarind water, and coconut paste; boil for 5 minutes.",
      "Temper with mustard seeds, shallots, and curry leaves."
    ],
    "fallbackImage": "assets/recipes/sambar.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_56",
    "name": "Pappadam & Curry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Vegetarian",
      "Quick Meals",
      "Budget Meals",
      "Lunch"
    ],
    "cuisine": "Kerala",
    "emoji": "🫓",
    "image": "assets/categories/other-pantry.png",
    "description": "Crispy fried lentil pappadams served alongside hot comforting dhal and rice.",
    "ingredients": [
      "Pappadam",
      "Toor Dal",
      "Turmeric",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Pappadam",
      "Toor Dal",
      "Oil"
    ],
    "optionalIngredients": [
      "Turmeric",
      "Salt"
    ],
    "prepTime": "5 mins",
    "cookTime": "10 mins",
    "totalMinutes": 15,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 210,
      "protein": "7g",
      "carbs": "26g",
      "fat": "9g"
    },
    "instructions": [
      "Deep fry pappadams in hot oil until they puff up crisp and golden.",
      "Serve hot with steamed rice and warm dhal."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_57",
    "name": "Kappa & Fish Curry",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Fish",
      "South Indian",
      "Lunch",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🥔",
    "image": "assets/recipes/kerala-fish-curry.png",
    "description": "Signature Kerala combination: Boiled mashed tapioca tempered with coconut served with fiery spicy fish curry.",
    "ingredients": [
      "Tapioca",
      "Grated Coconut",
      "Fish",
      "Shallots",
      "Chili Powder",
      "Curry Leaves",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Tapioca",
      "Fish",
      "Chili Powder",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Grated Coconut",
      "Shallots",
      "Curry Leaves"
    ],
    "prepTime": "20 mins",
    "cookTime": "30 mins",
    "totalMinutes": 50,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 480,
      "protein": "28g",
      "carbs": "68g",
      "fat": "12g"
    },
    "instructions": [
      "Boil tapioca cubes with salt and turmeric until tender; drain water.",
      "Coarsely grind coconut with green chilies, garlic, and cumin; mix with mashed tapioca.",
      "Pair with spicy hot Kerala fish curry."
    ],
    "fallbackImage": "assets/recipes/kerala-fish-curry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_58",
    "name": "Kerala Beef Roast",
    "category": "Kerala",
    "categories": [
      "Kerala",
      "Meat",
      "South Indian",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "Kerala",
    "emoji": "🥩",
    "image": "assets/categories/other-pantry.png",
    "description": "Tender beef chunks slow-roasted with caramelized onions, tomatoes, and freshly ground garam masala.",
    "ingredients": [
      "Beef",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Curry Leaves",
      "Garam Masala",
      "Coconut Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Beef",
      "Onion",
      "Tomato",
      "Coconut Oil"
    ],
    "optionalIngredients": [
      "Ginger",
      "Garlic",
      "Curry Leaves",
      "Garam Masala"
    ],
    "prepTime": "15 mins",
    "cookTime": "40 mins",
    "totalMinutes": 55,
    "difficulty": "Medium",
    "servings": 4,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 440,
      "protein": "38g",
      "carbs": "8g",
      "fat": "28g"
    },
    "instructions": [
      "Pressure cook beef with spice powders until tender.",
      "Sauté onions and tomatoes in coconut oil until thick paste forms.",
      "Add beef, roast on medium heat until coated and dry."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_71",
    "name": "Chicken 65",
    "category": "Chicken",
    "categories": [
      "Chicken",
      "Snacks",
      "South Indian",
      "High Protein",
      "Quick Meals"
    ],
    "cuisine": "South Indian",
    "emoji": "🍗",
    "image": "assets/categories/other-pantry.png",
    "description": "Spicy, crispy, deep-fried chicken bites tossed with tempered curry leaves, green chilies, and garlic.",
    "ingredients": [
      "Chicken",
      "Curd",
      "Ginger",
      "Garlic",
      "Chili Powder",
      "Corn Flour",
      "Curry Leaves",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Chicken",
      "Curd",
      "Chili Powder",
      "Oil"
    ],
    "optionalIngredients": [
      "Corn Flour",
      "Ginger",
      "Garlic",
      "Curry Leaves"
    ],
    "prepTime": "15 mins",
    "cookTime": "12 mins",
    "totalMinutes": 27,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 360,
      "protein": "30g",
      "carbs": "8g",
      "fat": "22g"
    },
    "instructions": [
      "Marinate boneless chicken cubes with curd, chili powder, ginger-garlic, corn flour, and salt.",
      "Deep fry chicken until crunchy and cooked through.",
      "In another pan, sauté garlic, green chilies, and curry leaves; toss fried chicken into the seasoning."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_74",
    "name": "Chicken Tikka",
    "category": "Chicken",
    "categories": [
      "Chicken",
      "North Indian",
      "High Protein",
      "Healthy",
      "Dinner"
    ],
    "cuisine": "North Indian",
    "emoji": "🍗",
    "image": "assets/recipes/paneer-tikka.png",
    "description": "Succulent boneless chicken marinated in yogurt, aromatic tandoori spices, and grilled to smoky perfection.",
    "ingredients": [
      "Chicken",
      "Curd",
      "Lemon Juice",
      "Ginger",
      "Garlic",
      "Chili Powder",
      "Garam Masala",
      "Butter",
      "Salt"
    ],
    "requiredIngredients": [
      "Chicken",
      "Curd",
      "Chili Powder",
      "Lemon Juice"
    ],
    "optionalIngredients": [
      "Ginger",
      "Garlic",
      "Garam Masala",
      "Butter"
    ],
    "prepTime": "20 mins",
    "cookTime": "15 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 310,
      "protein": "38g",
      "carbs": "4g",
      "fat": "14g"
    },
    "instructions": [
      "Marinate chicken cubes with yogurt, lemon juice, chili powder, garam masala, and ginger-garlic paste for at least 30 minutes.",
      "Thread onto skewers and grill in an oven or pan on high heat, basting with melted butter until charred and juicy."
    ],
    "fallbackImage": "assets/recipes/paneer-tikka.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_80",
    "name": "Chicken Noodles",
    "category": "Chicken",
    "categories": [
      "Chicken",
      "Quick Meals",
      "Pasta",
      "Dinner",
      "High Protein"
    ],
    "cuisine": "International",
    "emoji": "🍜",
    "image": "assets/recipes/hakka-noodles.png",
    "description": "Wok-tossed noodles with shredded chicken, crunchy carrots, cabbage, garlic, and soy sauce.",
    "ingredients": [
      "Noodles",
      "Chicken",
      "Carrot",
      "Cabbage",
      "Onion",
      "Garlic",
      "Soy Sauce",
      "Oil",
      "Black Pepper",
      "Salt"
    ],
    "requiredIngredients": [
      "Noodles",
      "Chicken",
      "Carrot",
      "Onion"
    ],
    "optionalIngredients": [
      "Cabbage",
      "Garlic",
      "Soy Sauce",
      "Black Pepper"
    ],
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "totalMinutes": 22,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 420,
      "protein": "28g",
      "carbs": "52g",
      "fat": "12g"
    },
    "instructions": [
      "Boil noodles al dente, drain, rinse with cold water, and toss with a drop of oil.",
      "Stir fry chicken strips with minced garlic in a wok on high heat until cooked.",
      "Add shredded carrots and cabbage; toss for 2 minutes.",
      "Add noodles, soy sauce, black pepper, and salt; toss vigorously on high flame."
    ],
    "fallbackImage": "assets/recipes/hakka-noodles.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_81",
    "name": "Chicken Pasta",
    "category": "Chicken",
    "categories": [
      "Chicken",
      "Pasta",
      "Dinner",
      "International",
      "High Protein"
    ],
    "cuisine": "International",
    "emoji": "🍝",
    "image": "assets/recipes/pasta-alfredo.png",
    "description": "Penne pasta tossed with tender sautéed chicken breast, ripe tomato sauce, garlic, and herbs.",
    "ingredients": [
      "Pasta",
      "Chicken",
      "Tomato",
      "Garlic",
      "Onion",
      "Olive Oil",
      "Black Pepper",
      "Oregano",
      "Salt"
    ],
    "requiredIngredients": [
      "Pasta",
      "Chicken",
      "Tomato",
      "Garlic"
    ],
    "optionalIngredients": [
      "Onion",
      "Olive Oil",
      "Oregano",
      "Black Pepper"
    ],
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "totalMinutes": 25,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 460,
      "protein": "32g",
      "carbs": "58g",
      "fat": "11g"
    },
    "instructions": [
      "Boil penne pasta in salted water until al dente.",
      "Sauté chicken strips in olive oil with garlic until golden.",
      "Add crushed tomatoes, oregano, black pepper, and simmer until sauce thickens.",
      "Toss in cooked pasta, coat with sauce, and serve."
    ],
    "fallbackImage": "assets/recipes/pasta-alfredo.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_82",
    "name": "Chicken Wrap",
    "category": "Chicken",
    "categories": [
      "Chicken",
      "Quick Meals",
      "Snacks",
      "High Protein",
      "Fast Food"
    ],
    "cuisine": "International",
    "emoji": "🌯",
    "image": "assets/categories/other-pantry.png",
    "description": "Warm tortilla or flatbread rolled with spiced chicken strips, crunchy lettuce, onions, and garlic sauce.",
    "ingredients": [
      "Bread",
      "Chicken",
      "Onion",
      "Tomato",
      "Mayonnaise",
      "Garlic",
      "Chili Powder",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Bread",
      "Chicken",
      "Onion",
      "Tomato"
    ],
    "optionalIngredients": [
      "Mayonnaise",
      "Garlic",
      "Chili Powder"
    ],
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 390,
      "protein": "26g",
      "carbs": "36g",
      "fat": "14g"
    },
    "instructions": [
      "Sear spiced chicken strips on a skillet until juicy and browned.",
      "Warm flatbread or tortilla.",
      "Spread garlic mayo, add sliced onions, tomatoes, and cooked chicken.",
      "Roll tightly into a wrap and serve."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_84",
    "name": "Chicken Soup",
    "category": "Chicken",
    "categories": [
      "Chicken",
      "Healthy",
      "Dinner",
      "High Protein",
      "Quick Meals"
    ],
    "cuisine": "International",
    "emoji": "🍲",
    "image": "assets/categories/other-pantry.png",
    "description": "Soothing clear chicken broth simmered with tender shredded chicken, carrots, ginger, and black pepper.",
    "ingredients": [
      "Chicken",
      "Carrot",
      "Onion",
      "Ginger",
      "Garlic",
      "Black Pepper",
      "Butter",
      "Salt",
      "Water"
    ],
    "requiredIngredients": [
      "Chicken",
      "Carrot",
      "Onion"
    ],
    "optionalIngredients": [
      "Ginger",
      "Garlic",
      "Black Pepper",
      "Butter"
    ],
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 3,
    "isVegetarian": false,
    "isVegan": false,
    "nutrition": {
      "calories": 210,
      "protein": "24g",
      "carbs": "8g",
      "fat": "8g"
    },
    "instructions": [
      "Simmer chicken pieces with ginger, garlic, onions, and salt in water for 15 minutes.",
      "Remove chicken, shred meat, and return to simmering broth.",
      "Add diced carrots, simmer 5 minutes, finish with black pepper and fresh herbs."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_111",
    "name": "Paneer Butter Masala",
    "category": "Vegetarian",
    "categories": [
      "Vegetarian",
      "North Indian",
      "Dinner",
      "Lunch",
      "High Protein"
    ],
    "cuisine": "North Indian",
    "emoji": "🍛",
    "image": "assets/recipes/butter-chicken.png",
    "description": "Soft fresh paneer cubes simmered in a luscious, mildly sweet, buttery tomato cashew sauce.",
    "ingredients": [
      "Paneer",
      "Tomato",
      "Butter",
      "Cream",
      "Onion",
      "Cashews",
      "Ginger",
      "Garlic",
      "Garam Masala",
      "Kasuri Methi",
      "Salt"
    ],
    "requiredIngredients": [
      "Paneer",
      "Tomato",
      "Butter",
      "Onion"
    ],
    "optionalIngredients": [
      "Cream",
      "Cashews",
      "Kasuri Methi",
      "Garlic"
    ],
    "prepTime": "15 mins",
    "cookTime": "20 mins",
    "totalMinutes": 35,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 460,
      "protein": "18g",
      "carbs": "16g",
      "fat": "36g"
    },
    "instructions": [
      "Cook tomatoes, onions, ginger, garlic, and cashews; puree into a fine silk gravy.",
      "Melt butter in a pan, add chili powder, and pour the pureed gravy.",
      "Simmer for 8 minutes, add soft paneer cubes and cream.",
      "Finish with crushed kasuri methi and extra butter."
    ],
    "fallbackImage": "assets/recipes/butter-chicken.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_114",
    "name": "Chana Masala",
    "category": "Vegetarian",
    "categories": [
      "Vegetarian",
      "Vegan",
      "North Indian",
      "High Protein",
      "Budget Meals",
      "Lunch"
    ],
    "cuisine": "North Indian",
    "emoji": "🍲",
    "image": "assets/recipes/chole-bhature.png",
    "description": "Tender chickpeas simmered in a robust, tangy, and deeply spiced onion tomato gravy.",
    "ingredients": [
      "Chickpeas",
      "Onion",
      "Tomato",
      "Ginger",
      "Garlic",
      "Chana Masala",
      "Cumin Seeds",
      "Coriander",
      "Oil",
      "Salt"
    ],
    "requiredIngredients": [
      "Chickpeas",
      "Onion",
      "Tomato"
    ],
    "optionalIngredients": [
      "Ginger",
      "Garlic",
      "Chana Masala",
      "Coriander"
    ],
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "totalMinutes": 40,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 330,
      "protein": "14g",
      "carbs": "52g",
      "fat": "8g"
    },
    "instructions": [
      "Pressure cook soaked chickpeas until tender.",
      "Sauté cumin, finely chopped onions, ginger, and garlic in oil until browned.",
      "Add chopped tomatoes, chana masala spices, and cook till oil separates.",
      "Add cooked chickpeas with broth, mash a few spoonfuls to thicken the gravy, and simmer 10 minutes."
    ],
    "fallbackImage": "assets/recipes/chole-bhature.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_116",
    "name": "Dal Fry",
    "category": "Vegetarian",
    "categories": [
      "Vegetarian",
      "Vegan",
      "Healthy",
      "Budget Meals",
      "Quick Meals",
      "Lunch",
      "Dinner"
    ],
    "cuisine": "Indian",
    "emoji": "🍲",
    "image": "assets/recipes/dal-makhani.png",
    "description": "Golden yellow lentils cooked and tempered with cumin seeds, garlic, onions, tomatoes, and ghee.",
    "ingredients": [
      "Toor Dal",
      "Onion",
      "Tomato",
      "Garlic",
      "Ginger",
      "Cumin Seeds",
      "Ghee",
      "Turmeric",
      "Coriander",
      "Salt"
    ],
    "requiredIngredients": [
      "Toor Dal",
      "Onion",
      "Tomato",
      "Garlic"
    ],
    "optionalIngredients": [
      "Ginger",
      "Cumin Seeds",
      "Ghee",
      "Coriander"
    ],
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "totalMinutes": 30,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 220,
      "protein": "11g",
      "carbs": "34g",
      "fat": "5g"
    },
    "instructions": [
      "Cook toor dal with turmeric, salt, and water until soft and creamy.",
      "Heat ghee, sauté cumin seeds, minced garlic, onions, and tomatoes until soft.",
      "Pour tempering into cooked dal, simmer for 3 minutes, and finish with fresh coriander."
    ],
    "fallbackImage": "assets/recipes/dal-makhani.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_125",
    "name": "Pasta Arrabbiata",
    "category": "Pasta",
    "categories": [
      "Pasta",
      "Vegetarian",
      "Vegan",
      "Quick Meals",
      "Budget Meals",
      "Dinner"
    ],
    "cuisine": "Italian",
    "emoji": "🍝",
    "image": "assets/recipes/spaghetti.png",
    "description": "Classic spicy Roman pasta tossed in garlic, olive oil, sweet tomatoes, and fiery red chili flakes.",
    "ingredients": [
      "Pasta",
      "Tomato",
      "Garlic",
      "Chili Flakes",
      "Olive Oil",
      "Oregano",
      "Basil",
      "Salt"
    ],
    "requiredIngredients": [
      "Pasta",
      "Tomato",
      "Garlic",
      "Olive Oil"
    ],
    "optionalIngredients": [
      "Chili Flakes",
      "Oregano",
      "Basil"
    ],
    "prepTime": "5 mins",
    "cookTime": "15 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 340,
      "protein": "9g",
      "carbs": "58g",
      "fat": "8g"
    },
    "instructions": [
      "Boil pasta in salted water until al dente.",
      "Gently heat olive oil with sliced garlic and red chili flakes.",
      "Add crushed tomatoes and salt, simmer for 10 minutes until sauce thickens.",
      "Toss pasta directly into the sauce with pasta cooking water and fresh basil."
    ],
    "fallbackImage": "assets/recipes/spaghetti.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_126",
    "name": "Creamy Garlic Pasta",
    "category": "Pasta",
    "categories": [
      "Pasta",
      "Vegetarian",
      "Quick Meals",
      "Dinner"
    ],
    "cuisine": "Italian",
    "emoji": "🍝",
    "image": "assets/recipes/pasta-alfredo.png",
    "description": "Silky, rich pasta tossed in a luxurious garlic butter and cream sauce with cracked black pepper.",
    "ingredients": [
      "Pasta",
      "Milk",
      "Butter",
      "Garlic",
      "Cheese",
      "Black Pepper",
      "Salt"
    ],
    "requiredIngredients": [
      "Pasta",
      "Milk",
      "Butter",
      "Garlic"
    ],
    "optionalIngredients": [
      "Cheese",
      "Black Pepper"
    ],
    "prepTime": "5 mins",
    "cookTime": "12 mins",
    "totalMinutes": 17,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 410,
      "protein": "12g",
      "carbs": "52g",
      "fat": "18g"
    },
    "instructions": [
      "Boil pasta until al dente.",
      "Melt butter, sauté minced garlic for 1 minute.",
      "Add milk/cream, simmer gently, then stir in cheese and black pepper until silky.",
      "Toss cooked pasta in sauce and serve immediately."
    ],
    "fallbackImage": "assets/recipes/pasta-alfredo.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_127",
    "name": "Tomato Pasta",
    "category": "Pasta",
    "categories": [
      "Pasta",
      "Vegetarian",
      "Vegan",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "Italian",
    "emoji": "🍝",
    "image": "assets/categories/other-pantry.png",
    "description": "Fresh and light homemade tomato basil sauce tossed with tender spaghetti.",
    "ingredients": [
      "Pasta",
      "Tomato",
      "Onion",
      "Garlic",
      "Olive Oil",
      "Black Pepper",
      "Salt"
    ],
    "requiredIngredients": [
      "Pasta",
      "Tomato",
      "Garlic",
      "Olive Oil"
    ],
    "optionalIngredients": [
      "Onion",
      "Black Pepper"
    ],
    "prepTime": "5 mins",
    "cookTime": "15 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 320,
      "protein": "8g",
      "carbs": "56g",
      "fat": "7g"
    },
    "instructions": [
      "Cook pasta in boiling salted water.",
      "Sauté chopped onions and garlic in olive oil, add chopped ripe tomatoes.",
      "Simmer sauce until glossy, season with pepper and salt.",
      "Toss pasta in sauce and enjoy hot."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_151",
    "name": "Payasam",
    "category": "Desserts",
    "categories": [
      "Desserts",
      "Kerala",
      "South Indian",
      "Vegetarian"
    ],
    "cuisine": "Kerala",
    "emoji": "🥣",
    "image": "assets/recipes/pazham-pori.png",
    "description": "Rich, festive South Indian dessert pudding cooked with roasted vermicelli, milk, sugar, cardamom, and ghee-roasted nuts.",
    "ingredients": [
      "Semiya",
      "Milk",
      "Sugar",
      "Ghee",
      "Cashews",
      "Raisins",
      "Cardamom"
    ],
    "requiredIngredients": [
      "Milk",
      "Sugar",
      "Ghee"
    ],
    "optionalIngredients": [
      "Semiya",
      "Cashews",
      "Raisins",
      "Cardamom"
    ],
    "prepTime": "5 mins",
    "cookTime": "15 mins",
    "totalMinutes": 20,
    "difficulty": "Easy",
    "servings": 4,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 290,
      "protein": "6g",
      "carbs": "44g",
      "fat": "10g"
    },
    "instructions": [
      "Roast cashews, raisins, and vermicelli in ghee until golden.",
      "Bring milk to a boil and simmer roasted vermicelli until soft.",
      "Add sugar and crushed cardamom powder; simmer for 3 minutes.",
      "Garnish with golden cashews and raisins; serve warm or chilled."
    ],
    "fallbackImage": "assets/recipes/pazham-pori.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_176",
    "name": "Fresh Lime Juice",
    "category": "Drinks",
    "categories": [
      "Drinks",
      "Healthy",
      "Quick Meals",
      "Budget Meals",
      "Vegan"
    ],
    "cuisine": "International",
    "emoji": "🍋",
    "image": "assets/categories/other-pantry.png",
    "description": "Refreshing sweet and salty fresh lime cooler served over ice cubes with a hint of mint.",
    "ingredients": [
      "Lemon",
      "Sugar",
      "Salt",
      "Water",
      "Mint",
      "Ice"
    ],
    "requiredIngredients": [
      "Lemon",
      "Sugar",
      "Water"
    ],
    "optionalIngredients": [
      "Salt",
      "Mint",
      "Ice"
    ],
    "prepTime": "3 mins",
    "cookTime": "0 mins",
    "totalMinutes": 3,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": true,
    "nutrition": {
      "calories": 60,
      "protein": "0g",
      "carbs": "16g",
      "fat": "0g"
    },
    "instructions": [
      "Squeeze fresh lemon juice into chilled water.",
      "Add sugar and a tiny pinch of salt; stir vigorously until dissolved.",
      "Pour over ice cubes and garnish with fresh mint leaves."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_177",
    "name": "Mango Shake",
    "category": "Drinks",
    "categories": [
      "Drinks",
      "Desserts",
      "Healthy",
      "Vegetarian",
      "Quick Meals"
    ],
    "cuisine": "International",
    "emoji": "🥭",
    "image": "assets/categories/other-pantry.png",
    "description": "Thick, creamy tropical shake blended with sweet ripe mango pulp, chilled milk, and a touch of honey.",
    "ingredients": [
      "Mango",
      "Milk",
      "Sugar",
      "Ice",
      "Cardamom"
    ],
    "requiredIngredients": [
      "Mango",
      "Milk"
    ],
    "optionalIngredients": [
      "Sugar",
      "Ice",
      "Cardamom"
    ],
    "prepTime": "5 mins",
    "cookTime": "0 mins",
    "totalMinutes": 5,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 210,
      "protein": "6g",
      "carbs": "38g",
      "fat": "4g"
    },
    "instructions": [
      "Peel and chop fresh sweet ripe mangoes.",
      "Add mango chunks, chilled milk, sugar, and ice to a blender.",
      "Blend until velvety smooth and pour into tall glasses."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_178",
    "name": "Banana Shake",
    "category": "Drinks",
    "categories": [
      "Drinks",
      "Healthy",
      "Breakfast",
      "High Protein",
      "Quick Meals",
      "Budget Meals"
    ],
    "cuisine": "International",
    "emoji": "🍌",
    "image": "assets/categories/other-pantry.png",
    "description": "Creamy, naturally sweet energy shake made with ripe bananas, cold milk, and honey.",
    "ingredients": [
      "Banana",
      "Milk",
      "Honey",
      "Ice",
      "Cinnamon"
    ],
    "requiredIngredients": [
      "Banana",
      "Milk"
    ],
    "optionalIngredients": [
      "Honey",
      "Ice",
      "Cinnamon"
    ],
    "prepTime": "3 mins",
    "cookTime": "0 mins",
    "totalMinutes": 3,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 190,
      "protein": "6g",
      "carbs": "36g",
      "fat": "3g"
    },
    "instructions": [
      "Slice ripe bananas and place in a blender with cold milk and honey.",
      "Blend until frothy and smooth, sprinkle with cinnamon, and serve."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  },
  {
    "id": "rec_181",
    "name": "Sweet Lassi",
    "category": "Drinks",
    "categories": [
      "Drinks",
      "North Indian",
      "Vegetarian",
      "Healthy",
      "Quick Meals"
    ],
    "cuisine": "North Indian",
    "emoji": "🥛",
    "image": "assets/categories/other-pantry.png",
    "description": "Traditional Punjabi thick yogurt drink blended with sugar, rose water, and a pinch of cardamom.",
    "ingredients": [
      "Curd",
      "Milk",
      "Sugar",
      "Cardamom",
      "Rose Water",
      "Ice"
    ],
    "requiredIngredients": [
      "Curd",
      "Sugar"
    ],
    "optionalIngredients": [
      "Milk",
      "Cardamom",
      "Rose Water",
      "Ice"
    ],
    "prepTime": "4 mins",
    "cookTime": "0 mins",
    "totalMinutes": 4,
    "difficulty": "Easy",
    "servings": 2,
    "isVegetarian": true,
    "isVegan": false,
    "nutrition": {
      "calories": 180,
      "protein": "6g",
      "carbs": "28g",
      "fat": "5g"
    },
    "instructions": [
      "Whisk chilled thick yogurt with sugar, milk, and cardamom until frothy.",
      "Pour into glasses over crushed ice."
    ],
    "fallbackImage": "assets/categories/other-pantry.png",
    "allergens": [
      "None"
    ],
    "equipment": [
      "Pan",
      "Ladle"
    ],
    "costPerServing": "₹35 / $0.45"
  }
];

const RECIPE_CATEGORIES = [
  {
    "id": "all",
    "name": "All Recipes",
    "emoji": "🍽️"
  },
  {
    "id": "pantry",
    "name": "Cook With Pantry",
    "emoji": "🍳"
  },
  {
    "id": "expiring",
    "name": "Use Soon",
    "emoji": "🔥"
  },
  {
    "id": "favorites",
    "name": "My Favorites",
    "emoji": "❤️"
  },
  {
    "id": "kerala",
    "name": "Kerala",
    "emoji": "🌴"
  },
  {
    "id": "south-indian",
    "name": "South Indian",
    "emoji": "🍃"
  },
  {
    "id": "north-indian",
    "name": "North Indian",
    "emoji": "🏛️"
  },
  {
    "id": "indian",
    "name": "All Indian",
    "emoji": "🇮🇳"
  },
  {
    "id": "chinese",
    "name": "Chinese",
    "emoji": "🥢"
  },
  {
    "id": "italian",
    "name": "Italian",
    "emoji": "🇮🇹"
  },
  {
    "id": "mediterranean",
    "name": "Mediterranean",
    "emoji": "🫒"
  },
  {
    "id": "japanese",
    "name": "Japanese",
    "emoji": "🍱"
  },
  {
    "id": "thai",
    "name": "Thai",
    "emoji": "🐘"
  },
  {
    "id": "mexican",
    "name": "Mexican",
    "emoji": "🌵"
  },
  {
    "id": "healthy",
    "name": "Healthy & Diet",
    "emoji": "🥗"
  },
  {
    "id": "breakfast",
    "name": "Breakfast",
    "emoji": "🥞"
  },
  {
    "id": "desserts",
    "name": "Snacks & Desserts",
    "emoji": "🧁"
  },
  {
    "id": "international",
    "name": "International",
    "emoji": "🌍"
  },
  {
    "id": "quick-meals",
    "name": "Quick Meals (<30m)",
    "emoji": "⚡"
  },
  {
    "id": "vegetarian",
    "name": "Vegetarian",
    "emoji": "🥦"
  },
  {
    "id": "vegan",
    "name": "Vegan",
    "emoji": "🌱"
  }
];

const CUISINE_SECTIONS = [
  {
    "id": "indian",
    "title": "Indian Recipes",
    "icon": "🇮🇳",
    "filter": "indian",
    "recipeIds": [
      "rec_masala_dosa",
      "rec_chicken_biryani",
      "rec_chole_bhature",
      "rec_palak_paneer",
      "rec_idli_sambar"
    ]
  },
  {
    "id": "kerala",
    "title": "Kerala Recipes",
    "icon": "🌴",
    "filter": "kerala",
    "recipeIds": [
      "rec_appam_stew",
      "rec_puttu_kadala",
      "rec_kerala_fish_curry",
      "rec_kerala_avial"
    ]
  },
  {
    "id": "intl-specials",
    "title": "International Specials",
    "icon": "🍛",
    "filter": "international",
    "recipeIds": [
      "rec_spaghetti_bolognese",
      "rec_puttu_kadala_intl",
      "rec_fish_curry_intl",
      "rec_pazham_pori",
      "rec_street_tacos"
    ]
  },
  {
    "id": "south-indian",
    "title": "South Indian Recipes",
    "icon": "🍃",
    "filter": "south-indian",
    "recipeIds": [
      "rec_sambar_kerala",
      "rec_kerala_rasam",
      "rec_medu_vada",
      "rec_ven_pongal",
      "rec_rava_upma"
    ]
  },
  {
    "id": "north-indian",
    "title": "North Indian Recipes",
    "icon": "🏛️",
    "filter": "north-indian",
    "recipeIds": [
      "rec_butter_chicken",
      "rec_paneer_tikka",
      "rec_aloo_paratha",
      "rec_rajma_curry",
      "rec_dal_makhani"
    ]
  },
  {
    "id": "international-classics",
    "title": "International Classics",
    "icon": "🌍",
    "filter": "international",
    "recipeIds": [
      "rec_spaghetti_bolognese_intl",
      "rec_margherita_pizza",
      "rec_sushi_rolls",
      "rec_pad_thai",
      "rec_burger"
    ]
  },
  {
    "id": "chinese",
    "title": "Chinese Recipes",
    "icon": "🥢",
    "filter": "chinese",
    "recipeIds": [
      "rec_fried_rice",
      "rec_chilli_chicken",
      "rec_manchurian",
      "rec_hakka_noodles",
      "rec_spring_rolls"
    ]
  },
  {
    "id": "italian",
    "title": "Italian Recipes",
    "icon": "🇮🇹",
    "filter": "italian",
    "recipeIds": [
      "rec_pasta_alfredo",
      "rec_lasagna",
      "rec_risotto",
      "rec_caprese_salad",
      "rec_minestrone_soup"
    ]
  },
  {
    "id": "mediterranean",
    "title": "Mediterranean Recipes",
    "icon": "🫒",
    "filter": "mediterranean",
    "recipeIds": [
      "rec_greek_salad",
      "rec_hummus",
      "rec_falafel",
      "rec_shawarma",
      "rec_tabbouleh"
    ]
  },
  {
    "id": "japanese",
    "title": "Japanese Recipes",
    "icon": "🍱",
    "filter": "japanese",
    "recipeIds": [
      "rec_ramen_dish",
      "rec_tempura_dish",
      "rec_teriyaki_dish",
      "rec_miso_dish",
      "rec_onigiri_dish"
    ]
  },
  {
    "id": "thai",
    "title": "Thai Recipes",
    "icon": "🐘",
    "filter": "thai",
    "recipeIds": [
      "rec_thai_green_dish",
      "rec_tom_yum_dish",
      "rec_som_tam_dish",
      "rec_mango_sticky_dish",
      "rec_thai_basil_dish"
    ]
  },
  {
    "id": "mexican",
    "title": "Mexican Recipes",
    "icon": "🌵",
    "filter": "mexican",
    "recipeIds": [
      "rec_quesadilla_dish",
      "rec_burrito_dish",
      "rec_nachos_dish",
      "rec_guacamole_dish",
      "rec_enchiladas_dish"
    ]
  },
  {
    "id": "healthy",
    "title": "Healthy & Diet Recipes",
    "icon": "🥗",
    "filter": "healthy",
    "recipeIds": [
      "rec_quinoa_salad_dish",
      "rec_grilled_chicken_salad_dish",
      "rec_oats_porridge_dish",
      "rec_smoothie_bowl_dish",
      "rec_veg_stir_fry_dish"
    ]
  },
  {
    "id": "breakfast",
    "title": "Breakfast Recipes",
    "icon": "🥞",
    "filter": "breakfast",
    "recipeIds": [
      "rec_pancakes_dish",
      "rec_french_toast_dish",
      "rec_poha_dish",
      "rec_omelette_dish",
      "rec_chia_pudding_dish"
    ]
  },
  {
    "id": "desserts",
    "title": "Snacks & Desserts",
    "icon": "🧁",
    "filter": "desserts",
    "recipeIds": [
      "rec_brownie_dish",
      "rec_tiramisu_dish",
      "rec_fruit_salad_dish",
      "rec_cheesecake_dish",
      "rec_ice_cream_dish"
    ]
  }
];

if (typeof window !== 'undefined') {
  window.MASTER_RECIPES = MASTER_RECIPES;
  window.RECIPE_CATEGORIES = RECIPE_CATEGORIES;
  window.CUISINE_SECTIONS = CUISINE_SECTIONS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MASTER_RECIPES, RECIPE_CATEGORIES, CUISINE_SECTIONS };
}

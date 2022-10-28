export const defaultUsers = [
    {
        username: 'employee1',
        firstName: 'Franken',
        lastName: 'Stein',
        password: 'password',
        role: 'EMPLOYEE'
    },
    {
        username: 'manager1',
        firstName: 'Drac',
        lastName: 'Ula',
        password: 'password',
        role: 'MANAGER'
    },
    {
        username: 'admin1',
        firstName: 'Teth',
        lastName: 'Adam',
        password: 'password',
        role: 'ADMIN'
    }
]

export const menuCategories = [
    {
        name: 'Appetizer'
    },
    {
        name: 'Entreé'
    },
    {
        name: 'Sides'
    },
    {
        name: 'Dessert'
    },
    {
        name: 'Beverages'
    },
    {
        name: 'Cocktails'
    },
]

export const menuItems = [

    // APPETIZER
    {
        name: 'Bruschetta',
        price: 10.99,
        ingredients: 'Bread, extra virgin olive oil, tomatoes, basil, parmesan cheese, garlic, balsamic vinegar, salt, pepper',
        description: 'Bruschetta is an antipasto from Italy consisting of grilled bread rubbed with garlic and topped with olive oil and salt.',
        calorieCount: 150,
        imageUrl: 'https://www.allrecipes.com/thmb/ZnVnISd3rOosLt37bINn1h4_nho=/2000x2000/filters:no_upscale()/54165-Balsamic-Bruschetta-mfs_002-5a7881578a854bb187327708ee78503c.jpg',
        belongsTo: 'Appetizer'
    },
    {
        name: 'Mozzarella Cheese Sticks',
        price: 8.99,
        ingredients: 'Eggs, water, Italian seasoning, bread crumbs, garlic salt, flour, cornstarch, oil for frying, mozzarella cheese',
        description: 'They are deep-fried until golden and crispy on the outside, with melted gooey cheese on the inside.',
        calorieCount: 100,
        imageUrl: 'https://therecipecritic.com/wp-content/uploads/2019/12/Mozzarella-Sticks-15-500x500.jpg',
        belongsTo: 'Appetizer'
    },
    {
        name: 'Stuffed Cream Cheese Mushrooms',
        price: 11.99,
        ingredients: 'Mushrooms, vegetable oil, garlic, cream cheese, parmesan cheese, black pepper, onion powder, cayenne pepper',
        description: 'Delicious stuffed mushrooms with cream cheese — an appetizer with a kick',
        calorieCount: 70,
        imageUrl: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Herb-Stuffed-Mushrooms_EXPS_HCA19_145537_E04_23_2b.jpg',
        belongsTo: 'Appetizer'
    },
    {
        name: 'Brazilian Cheese Bread (Pao de Queijo)',
        price: 6.99,
        ingredients: 'Butter, water, whole milk, salt, tapioca flour, garlic, parmesan cheese, eggs',
        description: 'Pao de queijo are yummy gluten-free, wheat-free breads. Served with marinara sauce.',
        calorieCount: 85,
        imageUrl: 'https://www.allrecipes.com/thmb/495YA_t0pHpouH-WMNrjWFJ0P9M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8796530-brazilian-cheese-bread-pao-de-queijo-Faith-Ang-4x3-1-2000-a00a691330fd450683950ec993b9a791.jpg',
        belongsTo: 'Appetizer'
    },
    {
        name: 'Pork Dumplings',
        price: 12.99,
        ingredients: 'Wonton wrappers, ground pork, ginger root, garlic, green onion, soy sauce, sesame oil, eggs, chinese cabbage',
        description: 'Pork dumplings, or jiaozi, are the quintessential dish of Lunar New Year celebrations, which usually occur in late January or February. Because of their resemblance to gold ingots, dumplings represent wishes of prosperity and fortune in the coming year.',
        calorieCount: 110,
        imageUrl: 'https://www.allrecipes.com/thmb/UgFxBGSO8-t2k8v-8xVKDh4wr_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/102329015-Pork-Dumplings-resize-916b0027f8e64f94b28bef36fbff9cfe.png',
        belongsTo: 'Appetizer'
    },

    // ENTREE
    {
        name: 'White Pizza',
        price: 19.99,
        ingredients: 'Yellow cornmeal, pizza dough, extra-virgin olive oil, garlic, red pepper flakes, black pepper, mozarella cheese, ricotta cheese, parmesan cheese, basil',
        description: 'Made with 3 different cheeses (no tomato sauce here!) and drizzled with extra-virgin olive oil, garlicky goodness.',
        calorieCount: 1200,
        imageUrl: 'https://www.modernhoney.com/wp-content/uploads/2019/05/The-Best-3-Cheese-White-Pizza-3.jpg',
        belongsTo: 'Entreé'
    },
    {
        name: 'Perfect Pot Roast',
        price: 25.99,
        ingredients: 'Boneless chuck roast, black pepper, canola oil, sweet onion, tomato paste, garlic, dry red wine, beef stock, carrots, cremini mushrooms, thyme, rosemary, yukon gold potatoes, parsley leaves',
        description: 'Truly the best melt-in-your-mouth pot roast, cooked low and slow and simmered until perfection.',
        calorieCount: 780,
        imageUrl: 'https://www.thereciperebel.com/wp-content/uploads/2020/09/instant-pot-pot-roast-1200-73-of-78.jpg',
        belongsTo: 'Entreé'
    },
    {
        name: 'The best cheeseburger ever',
        price: 19.99,
        ingredients: 'Mayonnaise, ketchup, dill pickle relish, dijon mustard, ground beef (80/20), kosher salt, black pepper, canola oil, american cheese, brioche bun, romaine lettuce, tomato, red onion, dill pickle chips',
        description: 'Perfect burger patties every. single. time. Includes an epic burger sauce too!',
        calorieCount: 1000,
        imageUrl: 'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-400x400.jpg',
        belongsTo: 'Entreé'
    },
    {
        name: 'Sheet pan shrimp fajitas',
        price: 22.99,
        ingredients: 'Chili Powder, ground cumin, oregano, smoked paprika, black pepper, yellow and orange bell pepper, sweet onion, garlic, olive oil, shrimp, cilantro, lime juice, tortillas',
        description: 'Juicy jumbo shrimp to make the best shrimp fajitas!',
        calorieCount: 700,
        imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/01/Shrimp-Fajitas-10-1.jpg',
        belongsTo: 'Entreé'
    },
    {
        name: 'Coq Au Vin',
        price: 28.99,
        ingredients: 'Bacon, chicken thighs, black pepper, cremini mushrooms, shallots, garlic, flour, tomato paste, dry red wine, chicken stock, thyme, carrots, parsley leaves',
        description: 'Truly the most amazing braised chicken (so tender, literally falling off the bone!) served in a heavenly red wine sauce!',
        calorieCount: 1000,
        imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2012/01/coq-au-vin-3740fe3.jpg?resize=768,574',
        belongsTo: 'Entreé'
    },


    // SIDES
    {
        name: 'Garlic Knots',
        price: 5.99,
        ingredients: 'Pizza dough, unsalted butter, garlic, kosher salt, parsley, parmesan cheese',
        description: 'Slathered in buttery, garlicky goodness, these garlic knots are seriously addictive.',
        calorieCount: 500,
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/220106-delish-quarterly-and-seo-garlic-knots-seo-horizontal-180-eb-1642193901.jpg?crop=0.912xw:0.893xh;0,0.0433xh&resize=1200:*',
        belongsTo: 'Sides'
    },
    {
        name: 'Rice and Peas',
        price: 7.99,
        ingredients: 'Coconut oil, unsalted butter, yellow onion, scotch bonnet pepper, scallions, garlic, thyme, bay leaves, allspice, red kidney beans, full-fat coconut milk, chicken broth, kosher salt, black pepper, white rice',
        description: 'This quintessential side goes with any main dish in Jamaican cuisine. Fluffy and moist, it has a savory creaminess that comes from the use of aromatics like garlic and onion, in addition to coconut milk.',
        calorieCount: 560,
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/jamaican-rice-and-peas1-1662431424.jpg?crop=0.886xw:0.857xh;0.0765xw,0.0510xh&resize=1200:*',
        belongsTo: 'Sides'
    },
    {
        name: 'Cheesy Brussels Sprout Bake',
        price: 6.99,
        ingredients: 'Bacon, butter, shallots, brussel sprouts, cayenne pepper, heavy cream, white cheddar cheese, gruyère cheese',
        description: 'If you are not typically a fan of Brussels sprouts — you have never had them like this before. While the cheesy, creamy sauce is the star of the show here, the bacon adds an irresistible smoky flavor and texture to your roasted sprouts.',
        calorieCount: 380,
        imageUrl: 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/1520902273-shot-1-56.jpg?crop=0.885xw:0.590xh;0.0739xw,0.174xh&resize=480:*',
        belongsTo: 'Sides'
    },
    {
        name: 'Sichuan-Style "Fish-Fragrant" Eggplant',
        price: 6.99,
        ingredients: 'Chinese eggplant, kosher salt, cornstarch, canola oil, sichuan peppercorn, red chillis, pickled chili, fermented chili bean paste, garlic, ginger, white pepper, green onion, soy sauce, rice wine vinegar, sugar, chicken broth, toasted sesame oil',
        description: 'Despite the name, there is no trace of fish in this delicious eggplant dish. Originating from the Sichuan province in China, 魚香 (yu xiang) literally means "fish fragrance" and describes a flavor profile that was originally used in preparing fish dishes from the region.',
        calorieCount: 450,
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/singleimagetext-fish-fragrant-eggplant-2-1594685401.jpg?crop=1.00xw:0.631xh;0,0.0675xh&resize=480:*',
        belongsTo: 'Sides'
    },

    // DESSERTS
    {
        name: 'German Chocolatte cake',
        price: 8.99,
        ingredients: 'Sugar, flour, cocoa powder, baking powder, baking soda, salt, eggs, buttermilk, canola oil, vanilla extract, water, brown sugar, butter, evaporated milk, pecans, sweetened coconut, powdered sugar',
        description: 'The name German chocolate cake is a little deceiving as it is not actually a German dessert and traditionally the cake is a lighter colored cake with a mild chocolate taste and the entire cake is usually covered in coconut pecan frosting.',
        calorieCount: 450,
        imageUrl: 'https://www.culinaryhill.com/wp-content/uploads/2019/10/German-Chocolate-Cake-LR-04-square-Culinary-Hill.jpg',
        belongsTo: 'Dessert'
    },
    {
        name: 'Key Lime Pie',
        price: 8.99,
        ingredients: 'graham cracker crumbs, brown sugar, unsalted butter, sweetened condensed milk, plain greek yogurt, lime zest, fresh lime juice, heavy cream, sugar, ',
        description: 'Key lime pie is an American dessert pie.',
        calorieCount: 500,
        imageUrl: 'https://www.livewellbakeoften.com/wp-content/uploads/2021/05/Key-Lime-Pie-NEW-7s.jpg',
        belongsTo: 'Dessert'
    },
    {
        name: 'Panna Cotta',
        price: 9.99,
        ingredients: 'Unflavored gelatin, heavy cream, half and half, sugar, vanilla extract',
        description: 'Panna cotta is an Italian dessert of sweetened cream thickened with gelatin and molded.',
        calorieCount: 360,
        imageUrl: 'https://assets.epicurious.com/photos/62d6c513077a952f4a8c338c/1:1/w_1920,c_limit/PannaCotta_RECIPE_04142022_9822_final.jpg',
        belongsTo: 'Dessert'
    },



    // BEVERAGES
    {
        name: 'Arnold Palmer',
        price: 2.99,
        ingredients: 'Black tea, fresh lemonade, ice',
        description: 'The classic arnold palmer. Nothing more to it.',
        calorieCount: 100,
        imageUrl: 'https://i0.wp.com/www.peanutbutterandpeppers.com/wp-content/uploads/2016/05/Arnold-Palmer-a.jpg',
        belongsTo: 'Beverages'
    },
    {
        name: 'Lemonade',
        price: 2.99,
        ingredients: 'Lemon, sugar',
        description: 'Freshly squeezed lemonade.',
        calorieCount: 100,
        imageUrl: 'https://www.blossmangas.com/wp-content/uploads/2020/05/Lemonade-1-1-2560x1707.jpg',
        belongsTo: 'Beverages'
    },
    {
        name: 'Fountain Soda',
        price: 2.99,
        ingredients: '--',
        description: 'Your choice of coca-cola, sprite, or fanta.',
        calorieCount: 200,
        imageUrl: 'https://www.tastingtable.com/img/gallery/coca-colas-newest-flavor-supposedly-tastes-like-a-gen-z-dream/intro-1660327336.jpg',
        belongsTo: 'Beverages'
    },


    // COCKTAILS
    {
        name: 'Gin & Tonic',
        price: 10.99,
        ingredients: 'House gin, tonic water, lime or lemon',
        description: 'A gin and tonic is a highball cocktail made with gin and tonic water poured over a large amount of ice.',
        calorieCount: 100,
        imageUrl: 'https://cadryskitchen.com/wp-content/uploads/2016/07/gin-and-tonic-lime-mint.jpg',
        belongsTo: 'Cocktails'
    },
    {
        name: 'Moscow Mule',
        price: 10.99,
        ingredients: 'House vodka, ginger beer, lime',
        description: 'A Moscow mule is a cocktail made with vodka, ginger beer and lime juice, garnished with a slice or wedge of lime.',
        calorieCount: 100,
        imageUrl: 'https://bakeitwithlove.com/wp-content/uploads/2022/07/Moscow-Mule-sq.jpg',
        belongsTo: 'Cocktails'
    },
    {
        name: 'Whiskey Sour',
        price: 10.99,
        ingredients: 'House bourbon whiskey, egg white, lemon juice, gomme syrup',
        description: 'The whiskey sour is a mixed drink containing whiskey, lemon juice, sugar, and optionally, a dash of egg white.',
        calorieCount: 100,
        imageUrl: 'https://www.liquor.com/thmb/1ReOjLVpYXjX2RBzswtDWaur_aA=/720x720/smart/filters:no_upscale()/whiskey-sour-720x720-primary-v2-4fc831b613964da5a19cdbfda917d7df.jpg',
        belongsTo: 'Cocktails'
    },
    {
        name: 'Manhattan',
        price: 12.99,
        ingredients: 'House rye whiskey, sweet red vermouth, angostura bitters, maraschino cherry',
        description: 'A Manhattan is a cocktail made with whiskey, sweet vermouth, and bitters.',
        calorieCount: 100,
        imageUrl: 'https://www.liquor.com/thmb/zJ7_To3UNS5DNJ0aeyc4dVHUAac=/735x0/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__05__10144903__Manhattan-720x720-recipe-9497922907c14d91898f557cb51f2ea3.jpg',
        belongsTo: 'Cocktails'
    },
    {
        name: 'Negroni',
        price: 10.99,
        ingredients: 'Campari, house gin, sweed red vermouth, orange',
        description: 'A Negroni is an Italian cocktail, made of one part gin, one part vermouth rosso and one part Campari, garnished with orange peel.',
        calorieCount: 100,
        imageUrl: 'https://assets.epicurious.com/photos/5e41a6d159e5e50008b35cd7/4:3/w_4444,h_3333,c_limit/Negroni_HERO_020520_517.jpg',
        belongsTo: 'Cocktails'
    },
]

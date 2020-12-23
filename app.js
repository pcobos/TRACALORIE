// Storage Controller
// const StrCtrl = (function (){

// })();

// Item Controller
const ItemCtrl = (function(){
  // Inside, we should do the item constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  // Data structure / State
  const data = {
    items: [
      {id: 0, name:"Hamburger", calories:1200},
      {id: 1, name:"French Fries", calories:800},
      {id: 2, name:"Soda", calories:950}
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Since the previous data is private, we need to return it in order to access it for testing purposes

  // Public methods
  return {
    // Following function is for getting the items and passing them to our App controller
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories){
      // Add logic for ID
      let ID;
      if (data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Convert calories to integer
      calories = parseInt(calories);
      // Create new item with info from inputs
      newItem = new Item(ID, name, calories); 
      // Push item to data structure.
      data.items.push(newItem);
    },
    // Method to check inner workings of data structure
    logData: function(){
      return data;
    },
  }
})();

// UI Controller
const UICtrl =  (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories'
  }
  // Public methods
  return {
    // Following function is responsible for inserting the items that we fetched from the ItemCtrl inside the html's <ul>
    populateItemsList: function(items){
      let html = '';

      // Iterate over each item to use dynamic data on them
      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}:</strong> <em>${item.calories} calories</em><a href="#" class="secondary-content"><i class="fa fa-pencil"></i></a></li>`
      })
      
      // Insert list items inside HMTL
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    // Get input values
    getItemInput: function(){
      return {
        name:document.querySelector(UISelectors.itemName).value,
        calories:document.querySelector(UISelectors.itemCalories).value
      }
    },
    // Access UISelectors from outside
    accessUISelectors: function(){
      return UISelectors;
    } 
  }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
  // Load event listeners
  const loadEventListeners = function(){
    // Get UI selectors
    const UISelectors = UICtrl.accessUISelectors();
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  // Item add submit function
  const itemAddSubmit = function(e){
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    // Check if inputs are empty
    if (input.name !== '' && input.calories !== '') {
      // Add item to data structure (Item Controller's responsibility)
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    } else {
      alert("Meal name & calories can't be empty");
    }

    e.preventDefault();
  }

  // Public Methods
  // Main app controller will return one single function called init
  // Basically, init contains anything that we need to run right away when the app loads
  return {
    init: function(){
      // Fetching items from Data Structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemsList(items);
      loadEventListeners();
    }

  }


})(ItemCtrl, UICtrl);

// First thing to initialize the controllers is to use a IIFE Function (Immediately Invoked Function Expressions)
 
App.init();
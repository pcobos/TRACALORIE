import { ItemCtrl } from './item-controller';

// Storage Controller
// const StrCtrl = (function (){

// })();

// Item Controller
// const ItemCtrl = (function(){
//   // Inside, we should do the item constructor
//   const Item = function(id, name, calories){
//     this.id = id;
//     this.name = name;
//     this.calories = calories;
//   }
//   // Data structure / State
//   const data = {
//     items: [
//       // {id: 0, name:"Hamburger", calories:1200},
//       // {id: 1, name:"French Fries", calories:800},
//       // {id: 2, name:"Soda", calories:950}
//     ],
//     currentItem: null,
//     totalCalories: 0
//   }

//   // Since the previous data is private, we need to return it in order to access it for testing purposes

//   // Public methods
//   return {
//     // Following function is for getting the items and passing them to our App controller
//     getItems: function(){
//       return data.items;
//     },

//     addItem: function(name, calories){
//       // Add logic for ID
//       let ID;
//       if (data.items.length > 0){
//         ID = data.items[data.items.length - 1].id + 1;
//       } else {
//         ID = 0;
//       }
      
//       // Convert calories to integer
//       calories = parseInt(calories);
      
//       // Create new item with info from inputs
//       newMeal = new Item(ID, name, calories); 
      
//       // Push item to data structure.
//       data.items.push(newMeal);

//       // Returning the new meal for later use in variables
//       return newMeal;
//     },

//     // Get total calories function
//     getTotalCalories: () => {
//       let sum = 0;

//       // Loop through items and add cals
//       data.items.forEach(function(item){
//         sum += item.calories;
//       })

//       // Set total cal in data structure
//       data.totalCalories = sum;

//       // Return total
//       return data.totalCalories;
//     },

//     // Method to check inner workings of data structure
//     logData: function(){
//       return data;
//     },
//   }
// })();

// UI Controller
const UICtrl =  (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    totalCalories: '.total-calories'
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

    // Add item to UI list
    addListItem: function(item){
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // create a new li
      const li = document.createElement('li');
      // add className to li item
      li.className = 'collection-item';

      // add id to li item
      li.id = `item-${item.id}`;

      // add HTML (content inside the li)
      li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} calories</em>
      <a href="#" class="secondary-content">
        <i class="fa fa-pencil"></i>
      </a>`

      // insert new li element to the end of the itemsList
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },

    // Function for showing total calories in UI
    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    //Clear Input function
    clearInput: () => {
      document.querySelector(UISelectors.itemName).value = '';
      document.querySelector(UISelectors.itemCalories).value = '';
    },

    // Clear UL line
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
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

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Calling ItemCrtl Function for getting total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Calling UICtrl Function to display total calories
      UICtrl.showTotalCalories(totalCalories);

      // Calling UICtrl function for clearing inputs
      UICtrl.clearInput();
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

      if (items.length == 0 ){
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemsList(items);
      }
      
      // Calling ItemCrtl Function for getting total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Calling UICtrl Function to display total calories
      UICtrl.showTotalCalories(totalCalories);

      // Calling load even listeners function
      loadEventListeners();
    }

  }


})(ItemCtrl, UICtrl);

// First thing to initialize the controllers is to use a IIFE Function (Immediately Invoked Function Expressions)
 
App.init();
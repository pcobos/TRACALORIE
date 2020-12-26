
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
      // {id: 0, name:"Hamburger", calories:1200},
      // {id: 1, name:"French Fries", calories:800},
      // {id: 2, name:"Soda", calories:950}
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
      newMeal = new Item(ID, name, calories); 
      
      // Push item to data structure.
      data.items.push(newMeal);

      // Returning the new meal for later use in variables
      return newMeal;
    },

    getItemById: (id) => {
      let found;
      data.items.forEach(function(item){
        if (id == item.id) {
          found = item;
        }
      });
      return found;
    },

    setCurrentItem: (item) => {
      data.currentItem = item;
    },

    // Get total calories function
    getTotalCalories: () => {
      let sum = 0;

      // Loop through items and add cals
      data.items.forEach(function(item){
        sum += item.calories;
      })

      // Set total cal in data structure
      data.totalCalories = sum;

      // Return total
      return data.totalCalories;
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
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
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
        html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}:</strong> <em>${item.calories} calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`
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
        <i class="edit-item fa fa-pencil"></i>
      </a>`

      // insert new li element to the end of the itemsList
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },

    // Function for showing total calories in UI
    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    // Setting initial state
    setInitialState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
    },

    setEditState: () => {
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
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

    // Edit icon event (remember that we need to target the parent element given that the child is still unborn)
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
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

  const itemUpdateSubmit = function(e){
    // Conditional to target the edit button only
    if (e.target.classList.contains('edit-item')){
      // Get item's id (select element that has the id)
      const listId = e.target.parentNode.parentNode.id;

      // Turn value into array
      const listIdArr = listId.split('-');

      // Get just the id number
      const id = parseInt(listIdArr[1]);

      // Get item to edit from Data Structure
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      console.log(itemToEdit);
      // Hide add meal button and show edit/update/back buttons
      UICtrl.setEditState();
    };
    e.preventDefault();
  }

  // Public Methods
  // Main app controller will return one single function called init
  // Basically, init contains anything that we need to run right away when the app loads
  return {
    init: function(){
      // Setting initial state (everything is clean)
      UICtrl.setInitialState();

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
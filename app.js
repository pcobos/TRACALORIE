
// Storage Controller
const StrCtrl = (function (){
  
  // Public methods
  return {
    storeItem: (item) => {
      let items;
      // Check if items is empty
      if (localStorage.getItem("items") === null){
        // If so, create new array, push items to array
        items = [];
        items.push(item);
        // convert items array to string
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // get items (remember to parse it since it is retrieved as a string)
        items = JSON.parse(localStorage.getItem('items'));
        // push new item to array
        items.push(item);
        // store again
        localStorage.setItem("items", JSON.stringify(items));
        console.log(items);
      }
    },

    // Retreive items from the local storage
    getItemsFromStorage: () => {
      // Get from local storage (Parse into an object)
      let items;
      if (localStorage.getItem("items") ===  null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },

    // Update items in local storage
    updateItemLocalStorage: (updatedItem) => {
      // Retrieving items from local storage and parsing them into an object
      let items = JSON.parse(localStorage.getItem("items"));

      // Iterating over the items with their index
      items.forEach(function(item, index){
        if (updatedItem.id === item.id){
          // Removing the item based on it's index and updating it with the updated one
          items.splice(index, 1, updatedItem);
        }
      })

      // Storing items again in local storage
      localStorage.setItem("items", JSON.stringify(items));
      console.log(items);
    },

    // Delete items from local storage
    deleteItemLocalStorage: (id) => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach(function(item, index){
        if (id === item.id) {
          items.splice(index, 1);
        }
      })

      localStorage.setItem("items", JSON.stringify(items));
      console.log(items);
    },

    // Clear all items from local storage
    clearItemsLocalStorage: () => {
     localStorage.removeItem("items");
    }
  }
})();

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
    // items: [
    //   // {id: 0, name:"Hamburger", calories:1200},
    //   // {id: 1, name:"French Fries", calories:800},
    //   // {id: 2, name:"Soda", calories:950}
    // ],
    items: StrCtrl.getItemsFromStorage(), 
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

    // Get item by ID from data structure
    getItemById: (id) => {
      let found;
      data.items.forEach(function(item){
        if (id == item.id) {
          found = item;
        }
      });
      return found;
    },

    // Set current item in data structure
    setCurrentItem: (item) => {
      data.currentItem = item;
    },

    // Getting current item from data structure
    getCurrentItem: () => {
      return data.currentItem;
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

    // Update Item function
    updateItem: (name, calories) => {
      let found;
      // Iterate over items to find the item to be changed inside our data structure and reassign the values
      data.items.forEach(function(item){
        if(data.currentItem.id === item.id){
          item.name = name;
          item.calories = parseInt(calories);
          found = item;
        }
      })
      return found;
    },

    deleteItem: (id) => {
      // Map all ids
      const ids = data.items.map(function(item){
        return item.id;
      })

      // Get the index of the selected item through it's id
      const index = ids.indexOf(id);

      // Delete the item from the array through it's index
      data.items.splice(index, 1);
    },

    deleteAllItems: () => {
      data.items = [];
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
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
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

    updateListItem: (item) => {
      // Select ALL li elements inside #item-list (This returns a node list)
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn nodelist into array
      listItems = Array.from(listItems);

      let itemId;

      // Iterate over li elements
      listItems.forEach(function(li){
        itemId = parseInt(li.id.split('-')[1]);
        if (item.id === itemId){
          li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      })
    },

    deleteListItem: (id) => {
      // Selected all <li> elements inside <ul> #item-list
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turned the node list into an array so that we can iterate over it
      listItems = Array.from(listItems);

      // Variable for storing the element's ids
      let itemId;

      // Variable for storing the found element
      let found;

      // iterating over the <li> elements to identify the correct one and storing it in found variable
      listItems.forEach(function(li){
        itemId = parseInt(li.id.split('-')[1]);
        if (id === itemId){
          found = li;
        }
      })

      // removing the found element
      found.remove();
    },

    clearListItems: () => {
      // Select all <li> elements inside <ul>
      let listItems = document.querySelectorAll(UISelectors.listItems);
      
      // Turn node list into array
      listItems = Array.from(listItems);

      // Iterate and remove items
      listItems.forEach(function(item){
        item.remove();
      })
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

    // Setting edit state function (click on edit)
    setEditState: () => {
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.addEventListener('keypress', UICtrl.disableEnter);
    },

    // Disable Enter Key
    disableEnter: (e) => {
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    },

    //Clear Input function
    clearInput: () => {
      document.querySelector(UISelectors.itemName).value = '';
      document.querySelector(UISelectors.itemCalories).value = '';
    },

    addItemToForm: () => {
      document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCalories).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.setEditState();
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
const App = (function(ItemCtrl, StrCtrl, UICtrl){

    // Load event listeners
  const loadEventListeners = function(){
    
    // Get UI selectors
    const UISelectors = UICtrl.accessUISelectors();
    
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Edit icon event (remember that we need to target the parent element given that the child is still unborn)
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Item update submit event listener
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event listener
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back button event listener
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.setInitialState);

    // Clear button event listener
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Item add submit event listener function
  const itemAddSubmit = function(e){
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    
    // Check if inputs are empty
    if (input.name !== '' && input.calories !== '') {
      // Add item to data structure (Item Controller's responsibility)
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Store Item in local storage
      StrCtrl.storeItem(newItem);

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

  // Edit item click event listener function
  const itemEditClick = function(e){
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

      // Add Item to form
      UICtrl.addItemToForm();
    };
    e.preventDefault();
  }

  // Item update submit event listener function
  const itemUpdateSubmit = function(e){
    // To update the item, first we get the input
    const input = UICtrl.getItemInput();

    // Then we call our updateItem function from ItemCtrl (takes two parameters, name and calories)
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI with new name/calories
    UICtrl.updateListItem(updatedItem);

    // Update local storage
    StrCtrl.updateItemLocalStorage(updatedItem);

    // Update Total Calories
    // Calling ItemCrtl Function for getting total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Calling UICtrl Function to display total calories
    UICtrl.showTotalCalories(totalCalories);

    // Clear input and display add meal button again (initial state)
    UICtrl.setInitialState();

    e.preventDefault();
  }

  // Delete Item Submit event listener function
  const itemDeleteSubmit = function(e){

    // First we get the current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Then call deleteItem method with the currentItem id as an argument
    ItemCtrl.deleteItem(currentItem.id);

    // Delete Item from UIlist
    UICtrl.deleteListItem(currentItem.id);

    StrCtrl.deleteItemLocalStorage(currentItem.id)

    // Calling ItemCrtl Function for getting total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Calling UICtrl Function to display total calories
    UICtrl.showTotalCalories(totalCalories);

    // Clear input and display add meal button again (initial state)
    UICtrl.setInitialState(); 

    e.preventDefault();
  }

  // Clear all items click event listener function
  const clearAllItemsClick = function(e){
    // Delete all items from data structure
    ItemCtrl.deleteAllItems();

    // Delete all elements from the UI
    UICtrl.clearListItems();

    // Delete all items from the local storage
    StrCtrl.clearItemsLocalStorage();

    // Update Calories
    // Calling ItemCrtl Function for getting total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Calling UICtrl Function to display total calories
    UICtrl.showTotalCalories(totalCalories);

    // Clear Input
    UICtrl.setInitialState();

    // Hide list
    UICtrl.hideList();

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


})(ItemCtrl, StrCtrl, UICtrl);

// First thing to initialize the controllers is to use a IIFE Function (Immediately Invoked Function Expressions)
 
App.init();
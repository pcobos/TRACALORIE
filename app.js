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
      {id: 1, name:"Fried", calories:800},
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
    logData: function(){
      return data;
    }
  }
})();

// UI Controller
const UICtrl =  (function(){
  // Public methods
  return {}
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
  // Main app controller will return one single function called init
  // Basically, init contains anything that we need to run right away when the app loads
  return {
    init: function(){
      // Fetching items from ItemCtrl
      const items = ItemCtrl.getItems();
    }

  }


})(ItemCtrl, UICtrl);

// First thing to initialize the controllers is to use a IIFE Function (Immediately Invoked Function Expressions)
 
App.init();
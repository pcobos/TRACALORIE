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
})();

// UI Controller
const UICtrl =  (function(){

})();

// App Controller
const App = (function(ItemCtrl, UICtrl){

})(ItemCtrl, UICtrl);

// First thing to initialize the controllers is to use a IIFE Function (Immediately Invoked Function Expressions)


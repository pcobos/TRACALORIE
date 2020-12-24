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
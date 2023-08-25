const recipeForm = document.querySelector(".recipe-form");
const recipeName = document.getElementById("recipeName");
const ingredients = document.getElementById("user-ing");
const steps = document.getElementById("user-steps");
const imageURL = document.getElementById("user-img");
let displayArea = document.querySelector(".recipe-display");

// Array to store recipes
let recipes = [];

// Event listener for form submission
recipeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let enteredRecipeName = recipeName.value;
  let enteredIngredients = ingredients.value;
  let enteredSteps = steps.value;
  let enterdImg = imageURL.value;

  let newRecipe = {
    name: enteredRecipeName,
    ingredients: enteredIngredients,
    steps: enteredSteps,
    image: enterdImg,
  };

  recipes.push(newRecipe);
  displayRecipe(newRecipe, recipes.length - 1); //index of new recipe
  localStorage.setItem("recipes", JSON.stringify(recipes));
  recipeName.value = "";
  ingredients.value = "";
  steps.value = "";
  imageURL.value = "";
});

// Load recipes from local storage on page load
if (localStorage.getItem("recipes")) {
  recipes = JSON.parse(localStorage.getItem("recipes"));
  updateDisplay(); // Display the loaded recipes on the page
}

// Display a recipe on the page
function displayRecipe(recipe, index) {
  const formattedSteps = recipe.steps
    .split("\n")
    .map((step) => `<li>${step.trim()}</li>`)
    .join("");

  const recipeHtml = `
    <div class="one-recipe">
    <button class="delete-button" data-index="${index}">

          <svg class ="delete-button-img" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
    </button>
      <h2 class="recipe-name">${recipe.name}</h2>
      <p class="recipe-ingredients"><span>ingredients: </span> ${recipe.ingredients}</p>
      <ol class="recipe-steps"><span> steps: </span> ${formattedSteps}</ol>
      <img src="${recipe.image}" alt="${recipe.name}">
      <button class="edit-button" ">Edit</button>
      
    </div>
  `;

  displayArea.innerHTML += recipeHtml;
}

// Event listener for delete button clicks
displayArea.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button-img")) {
    const index = event.target.dataset.index;
    // console.log(index);
    deleteRecipe(index);
  }
});

// Delete a recipe and update the display
function deleteRecipe(index) {
  recipes.splice(index, 1); // Remove the recipe at the given index
  updateDisplay(); // Update the display
  localStorage.setItem("recipes", JSON.stringify(recipes)); //update localstorage
}

// Update the display with all recipes
function updateDisplay() {
  displayArea.innerHTML = ""; // Clear the display area
  recipes.forEach((recipe, index) => {
    displayRecipe(recipe, index); // Display each recipe from the array
  });
}

const API_KEY = "275d58779ccf4e22af03e792e8819fff";
const recipeListEl = document.getElementById("recipe-list");


function displayRecipes(recipes) {
	recipeListEl.innerHTML = "";
	recipes.forEach((recipe) =>{
		
		//recipe item
		const recipeItemEl = document.createElement('li');
		recipeItemEl.classList.add("recipe-item");
		
		//recipe image
		const recipeImageEl = document.createElement('img');
		recipeImageEl.src = recipe.image;
		recipeImageEl.alt = "recipe image";

		//recipe title
		const recipeTitleEl = document.createElement("h2");
		recipeTitleEl.innerHTML = recipe.title;

		//Recipe ingredient
		const recipeIngredientsEl = document.createElement("p");
		recipeIngredientsEl.innerHTML =  `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    	//recipe link
    	recipeLinkEl = document.createElement("a");
    	recipeLinkEl.href = recipe.sourceUrl;
    	recipeLinkEl.innerText = "view Recipe";

		//Append elements to recipe item
		recipeItemEl.appendChild(recipeImageEl);
		recipeItemEl.appendChild(recipeTitleEl);
		recipeItemEl.appendChild(recipeIngredientsEl);
   		 recipeItemEl.appendChild(recipeLinkEl);
		recipeListEl.appendChild(recipeItemEl);
	});
}

async function getRecipes(){

	try{

	const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);

	if (!response.ok) {
		throw new Error("Failed to fetch recipes.");
	}

	const data = await response.json()
	return data.recipes;
}catch(error){
	console.error("Error fetching recipes:", error);
	return [];
 }

}
async function init() {
	const recipes = await getRecipes()
	displayRecipes(recipes);
}

init();
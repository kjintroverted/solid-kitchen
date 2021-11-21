const { Dialog, DialogTitle, DialogContent } = require("@material-ui/core");

function ShoppingList({ mealplan, open, onClose }) {

  function uniqueIngredients(plan) {
    let recipes = [];
    // GET ALL RECIPES FOR THE WEEK IN ONE ARR
    for (let attr in plan) {
      if (!plan[attr].length) continue;
      recipes = [...recipes, ...plan[attr]]
    }
    // GET ALL INGREDIENTS THEN GET UNIQUE INGREDIENTS
    return recipes
      .reduce((acc, curr) => [...acc, ...curr.ingredients.map(i => i.item)], [])
      .reduce((acc, curr) => acc.findIndex(i => i === curr) < 0 ? [...acc, curr] : acc, [])
      .sort()
  }

  return (
    <Dialog
      open={ open }
      onClose={ onClose }
      scroll="paper">
      <DialogTitle>Shopping List</DialogTitle>
      <DialogContent>
        <ul>
          {
            uniqueIngredients(mealplan)
              .map(i => <li key={ i }>{ i }</li>)
          }
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default ShoppingList;
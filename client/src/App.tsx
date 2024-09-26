import { useIngredients } from "./hooks/useIngredients"

function App() {
  const {ingredients, style, recipes, loading, handleGenerateRecipe, handleIngredientsChange, handleStyleChange} = useIngredients();
  
  return (
    <main>
    <section>
      <h1>make your food </h1>
      <input type="text" placeholder='ingredients' value={ingredients} onChange={handleIngredientsChange} />
        <br /><br />
        <label htmlFor="">style food : </label>
      <select name="type" id="" value={style} onChange={handleStyleChange}>
        <option value="chinese">Chinese</option>
        <option value="thailand">thailand</option>
        <option value="filiphina">filiphina</option>
      </select>
      <br /> <br />
      <button type="submit" disabled={loading} onClick={handleGenerateRecipe}>regenerate</button>
    </section>
    <section>

      {recipes && (
        <div>
          <h3>{recipes.dishName}</h3>
          <h2>recipe : </h2>
          <ul>
            {recipes.ingredients.map((item)=> {
              return <li key={item}>{item}</li>
            })}
          </ul>
          <h2>how to cook</h2>
                    <ul>
            {recipes.howToMake.map((item)=> {
              return <li key={item}>{item}</li>
            })}
          </ul>
        </div>
      )}
    </section>
    </main>
  )
}

export default App

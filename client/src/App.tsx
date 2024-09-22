import { useState } from 'react'

interface IResult {
  dishName: string;
  ingredients: string[];
  howToMake: string[];
}

function App() {
  const [ingredients, setIngredients] = useState('')
  const [style, setStyle] = useState('')
  const [recipes, setRecipes] = useState<IResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerateRecipe() {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:8000/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, style }),
      });

      const data = await res.json();
      setRecipes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
     }
  } 
  return (
    <main>
    <section>
      <h1>make your food </h1>
      <input type="text" placeholder='ingredients' onChange={(e) => {
        setIngredients(e.target.value)
      }} />
        <br /><br />
        <label htmlFor="">style food : </label>
      <select name="type" id="" onChange={(e) => {
        setStyle(e.target.value)
      }}>
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

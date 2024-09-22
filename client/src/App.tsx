import { useState } from 'react'

interface IResult {
  recipes: string[];
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
      const res = await fetch("http://localhost:8000/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, style }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(true)
     }
  } 
  return (
    <main>
      <h1>make your food </h1>
      <input type="text" placeholder='ingredients' onChange={(e) => {
        setIngredients(e.target.value)
      }} />
        <br /><br />
        <label htmlFor="">style food : </label>
      <select name="type" id="" onChange={(e) => {
        setStyle(e.target.value)
      }}>
        <option value="chinese">chinise</option>
        <option value="chinese">thailand</option>
        <option value="chinese">filiphina</option>
      </select>
      <br /> <br />
      <button type="submit" disabled={loading} onClick={handleGenerateRecipe}>regenerate</button>
    </main>
  )
}

export default App

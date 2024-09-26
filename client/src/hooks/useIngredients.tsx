import { useState } from "react";

interface IResult {
  dishName: string;
  ingredients: string[];
  howToMake: string[];
}

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [recipes, setRecipes] = useState<IResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStyle(e.target.value);
  };

  async function handleGenerateRecipe() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, style }),
      });

      const data: IResult = await res.json();
      setRecipes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    ingredients,
    style,
    recipes,
    loading,
    handleIngredientsChange,
    handleStyleChange,
    handleGenerateRecipe,
  };
};

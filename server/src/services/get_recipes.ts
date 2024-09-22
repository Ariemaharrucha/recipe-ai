import { openai } from "../utills/openai";

interface IRecipe {
  ingredients: string;
  style: string;
}

export async function getRecipes({ ingredients, style }: IRecipe) {
  const completion = await openai.chat.completions.create({
    model: "mistralai/mistral-7b-instruct:free",
    messages: [
      {
        role: "system",
        content: `You are a cooking expert, you will be given with user ingredients, and style, Please generate a recipe only with provided ingredients

      IMPORTANT :
      - You are allowed to add additional ingredients as long as it's an aside ingredients.
      - Do not include any ingredients such as Alcohol, Arak, and Non-Halal Ingredients.

      IMPORTANT :
      ALWAYS RESPONSE WITH VALID JSON OBJECT WITH FOLLOWING KEYS : dishName, ingredients (string Array), howToMake (string Array)
      
      CRITICAL:
      Before answer, always check if provided ingredients is edible, if not, ALWAYS EXCLUDE!`,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Buat recipe dengan bahan: ${ingredients} dalam Style: ${style}`,
          },
        ],
      },
    ],
  });

 return completion;
}

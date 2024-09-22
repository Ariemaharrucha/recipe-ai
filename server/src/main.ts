import express from 'express';
import { getRecipes } from './services/get_recipes';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
app.use('/recipes',async (req, res)=>{
    const {ingredients, style} = req.body;
    console.log(ingredients);
    
    const result = await getRecipes({ingredients, style});
    const data = JSON.parse(result.choices[0].message.content as string);
    console.log(data);
    
    return res.json(data);
})

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

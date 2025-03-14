import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRecipe({ id: docSnap.id, ...docSnap.data() } as Recipe);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <h3>Ingredients</h3>
      <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing.name} - {ing.quantity}</li>)}</ul>
      <h3>Instructions</h3>
      <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
    </div>
  );
};

export default RecipeDetail;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";
import { Link } from "react-router-dom";

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

    <div 
      className="list-menu-container" 
      style={{ 
        backgroundImage: 'url(/images/foodbg.jpg)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        paddingTop: "20px"
      }}
    >
      
      <header className="header" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <nav>
          <Link to="/" className="add-recipe-btn">หน้าแรก</Link>
          <Link to="/list-menu" className="add-recipe-btn2">เมนูอาหาร</Link>
        </nav>
      </header>
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <h3>Ingredients</h3>
      <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing.name} - {ing.quantity}</li>)}</ul>
      <h3>Instructions</h3>
      <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
    </div>
    </div> 
  );
};

export default RecipeDetail;

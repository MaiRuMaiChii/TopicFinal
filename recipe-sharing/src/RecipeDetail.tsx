import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ไม่พบข้อมูลเมนู...");
      return;
    }
  
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // ดึงข้อมูลด้วย Document ID โดยตรง
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const recipeData = { id: docSnap.id, ...docSnap.data() } as Recipe;
          console.log("Recipe data:", recipeData);
          setRecipe(recipeData);
        } else {
          setError("ไม่พบเมนูอาหารนี้ในระบบ");
        }
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลเมนู");
        console.error("Error fetching recipe:", error);
      }
      setLoading(false);
    };
  
    fetchRecipe();
  }, [id]);
  

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>ไม่พบข้อมูลเมนู...</div>;

  return (
    <div 
      className="list-menu-container" 
      style={{ 
        backgroundImage: 'url(/images/foodbg4.jpg)',
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

      <div className="recipe-detail">
        <h1>{recipe.title}</h1>
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="recipe-detail-image"
          style={{ maxWidth: '80%', borderRadius: '8px', marginBottom: '20px' }}
        />
        
        <div className="recipe-info">
          <h3>ส่วนประกอบ</h3>
          <p>{recipe.description}</p>

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <>
              <h3>วัตถุดิบ</h3>
              <ul>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing.name} - {ing.quantity}</li>
                ))}
              </ul>
            </>
          )}
          
          {recipe.instructions && recipe.instructions.length > 0 && (
            <>
              <h3>วิธีทำ</h3>
              <ol>
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </div> 
  );
};

export default RecipeDetail;
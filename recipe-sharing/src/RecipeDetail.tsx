import { useEffect, useState } from "react";  
import { useParams , useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("ไม่พบข้อมูลเมนู...");
      return;
    }
  
    const fetchRecipe = async () => {
      setLoading(true);
      try {
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
      <button onClick={() => navigate("/list-menu")} style={{ alignSelf: 'flex-start', marginLeft: '20px' }}>ย้อนกลับ</button>
      <div className="recipe-container2">
        <div className="recipe-card2">
        <div className="title-container">
            <h1 className="recipe-title2"  >{recipe.title}</h1>
          </div>
          <br />
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="recipe-image2"
          />
          <div className="recipe-content2">
            <h3>ส่วนประกอบ</h3>
            <ol>
              {recipe.description.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>

            {recipe.instructions?.length > 0 && (
            <div className="recipe-instructions-block"> 
              <h3>วิธีทำ</h3>
            <ol>
              {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
              ))}
            </ol>
            </div>
            )}
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default RecipeDetail;

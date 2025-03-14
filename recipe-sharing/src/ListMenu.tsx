import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";
import "./styles.css";
import { FaCirclePlus } from "react-icons/fa6";

const ListMenu = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // โหลดเมนูอาหารเมื่อหน้า ListMenu ถูกโหลด
  const fetchRecipes = async () => {
    setLoading(true);
    setError(null); // reset the error state before fetching
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipeList as Recipe[]);
      console.log("Fetched recipes:", recipeList);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูลเมนูอาหาร");
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("ต้องการลบเมนูอาหารนี้ใช่หรือไม่?");
    if (isConfirmed) {
      try {
        const recipeDoc = doc(db, "recipes", id);
        await deleteDoc(recipeDoc);

        console.log(`Deleted recipe with id: ${id}`);

        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));

        alert("ลบเมนูสำเร็จ");
      } catch (error: any) {
        console.error("Error deleting recipe:", error.message);
        alert(`เกิดข้อผิดพลาดในการลบเมนู: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div 
      className="list-menu-container" 
      style={{ 
        backgroundImage: 'url(/images/foodbg.jpg)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white',
      }}
    >
      <header className="header" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <nav>
          <Link to="/" className="add-recipe-btn">หน้าแรก</Link>
          <Link to="/list-menu" className="add-recipe-btn">เมนูอาหาร</Link>
        </nav>
        <h1>เมนูอาหาร</h1>
      </header>
        
       
        {recipes.length === 0 ? (
          <p></p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h2>{recipe.title}</h2>
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              <p>{recipe.description}</p>
              <div className="recipe-actions">
                <Link to={`/recipe/${recipe.id}`} className="view-btn">ดูรายละเอียด</Link>
                <button onClick={() => handleDelete(recipe.id)} className="delete-btn">ลบเมนู</button>
              </div>
            </div>
          ))
        )}

        <div>
          <Link to="/add-recipe" className="add-recipe-menu"> <FaCirclePlus /></Link>
        </div>
      </div> 
      
  );
};

export default ListMenu;

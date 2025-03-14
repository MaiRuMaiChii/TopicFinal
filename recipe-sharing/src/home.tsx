import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";
import "./styles.css";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // ฟังก์ชันสำหรับดึงข้อมูลเมนูจาก Firebase
  const fetchRecipes = async () => {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Recipe));
    setRecipes(recipesData);
  };

  useEffect(() => {
    fetchRecipes();
  }, []); // ทำงานเมื่อ component ถูก render ครั้งแรก

  // ฟังก์ชันสำหรับการลบเมนู
  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("ต้องการลบเมนูอาหารนี้ใช่หรือไม่?");
    if (isConfirmed) {
      try {
        // สร้างการอ้างอิงไปยังเอกสารที่ต้องการลบใน Firebase
        const recipeDoc = doc(db, "recipes", id);

        // ลบเอกสารจาก Firebase
        await deleteDoc(recipeDoc);

        // ตรวจสอบว่าเอกสารถูกลบจาก Firebase
        console.log(`Deleted recipe with id: ${id}`);

        // ดึงข้อมูลใหม่หลังจากลบเมนูสำเร็จ
        fetchRecipes();

        alert("ลบเมนูสำเร็จ");
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("เกิดข้อผิดพลาดในการลบเมนู");
      }
    }
  };

  return (
    <div>
      <header className="header">
        <nav>
        <Link to="/" className="nav-btn home-btn">Home</Link>
        <Link to="/add-recipe" className="add-recipe-btn"> เพิ่มเมนูอาหาร </Link>
        </nav>
      </header>

    
    <div>
      <h1>ยินดีต้อนรับสู่โลกแห่งความอร่อยของอาหารไทยไทย่ไทย้ไทย๊ไทย๋</h1>
      <img
        src="/images/home.jpg"
        alt="Thai Food"
        style={{ width: "700px", maxHeight: "700px", display: "block", margin: "auto" }}
      />
      <br />
      <br />

      <div>
        
      </div>

      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h2>{recipe.title}</h2>
            <button onClick={() => handleDelete(recipe.id)} className="delete-btn">
              ลบเมนู
            </button>
            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
            <br />
            <Link to={`/recipe/${recipe.id}`}>ดูรายละเอียด</Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;

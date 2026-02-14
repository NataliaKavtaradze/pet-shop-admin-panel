import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AnimalsPage from "./pages/AnimalsPage";
import AddPetPage from "./pages/AddPetPage";
import CategoriesPage from "./pages/CategoriesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategoryPage from "./pages/AddCategoryPage";

function App() {
  return (
    <Router>
      {/* ToastContainer აუცილებელია შეტყობინებების გამოსაჩენად */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        {/* მთავარი ადმინ პანელი - ცხოველების სია */}
        <Route path="/admin/pets" element={<AnimalsPage />} />
        
        {/* ცხოველის დამატების გვერდი */}
        <Route path="/admin/add-pet" element={<AddPetPage />} />
        
        {/* კატეგორიების მართვის გვერდი */}
        <Route path="/admin/categories" element={<CategoriesPage />} />
        
        <Route path="/admin/add-category" element={<AddCategoryPage />} />

        {/* თუ მომხმარებელი შევა მთავარზე (/), გადამისამართდეს ცხოველებზე */}
        <Route path="/" element={<Navigate to="/admin/pets" />} />
      </Routes>
    </Router>
  );
}

export default App;


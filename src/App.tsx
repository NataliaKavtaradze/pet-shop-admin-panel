import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AnimalsPage from "./pages/AnimalsPage";
import AddPetPage from "./pages/AddPetPage";
import CategoriesPage from "./pages/CategoriesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategoryPage from "./pages/AddCategoryPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import EditPetPage from "./pages/EditPetPage";

function App() {
  return (
    <Router>

      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
       
        <Route path="/admin/pets" element={<AnimalsPage />} />
        
  
        <Route path="/admin/add-pet" element={<AddPetPage />} />
   
        <Route path="/admin/categories" element={<CategoriesPage />} />
        
        <Route path="/admin/add-category" element={<AddCategoryPage />} />

        <Route path="/admin/pets/:id" element={<PetDetailsPage />} />
        
        <Route path="/admin/edit-pet/:id" element={<EditPetPage />} />

        <Route path="/" element={<Navigate to="/admin/pets" />} />
      </Routes>
    </Router>
  );
}

export default App;


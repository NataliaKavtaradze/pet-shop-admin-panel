import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchAnimals } from '../features/animals/animalsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import PetCard from '../components/PetCard';
import './AnimalsPage.css';


const AnimalsPage = () => {
  const dispatch = useAppDispatch();
  const { items: animals, loading } = useAppSelector((state) => state.animals);


  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAnimals());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
  return <div className="loading-spinner">Loading pets...</div>;
}

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1 className="header">🐾 Pet Shop Admin Panel</h1>
        <p>Manage your pets and categories with elegance</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <a href="#" className="nav-tab active" onClick={() => navigate('/admin/pets')}>Pets</a>
        <a href="#" className="nav-tab" onClick={() => navigate('/admin/categories')}>Categories</a>
        <a href="#" className="nav-tab" onClick={() => navigate('/admin/add-pet')}>Add Pet</a>
        <a href="#" className="nav-tab" onClick={() => toast.info("Add Category form coming soon")}>Add Category</a>
      </nav>

      {/* pets page */}
      <main className="admin-main">
        <div className="list-header">
          <h2>All Pets</h2>
          <a href="#" className="btn btn-primary" onClick={() => navigate('/admin/add-pet')}>
                    ➕ Add New Pet
                </a>
        </div>

        <div className="pets-grid">
  {animals.map((animal) => (
    <PetCard key={animal.id} animal={animal} />
  ))}
</div>
      </main>
    </div>
  );
};

export default AnimalsPage;

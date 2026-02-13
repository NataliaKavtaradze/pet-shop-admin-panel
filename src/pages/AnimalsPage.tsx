import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchAnimals } from '../features/animals/animalsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import { useNavigate } from "react-router-dom";
import './AnimalsPage.css';


const AnimalsPage = () => {
  const dispatch = useAppDispatch();
  const { items: animals, loading } = useAppSelector((state) => state.animals);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAnimals());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1 className="header">🐾 Pet Shop Admin Panel</h1>
        <p>Manage your pets and categories with elegance</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <a href="#" className="nav-tab active" onclick="showPage('pets')">Pets</a>
        <a href="#" className="nav-tab" onclick="showPage('categories')">Categories</a>
        <a href="#" className="nav-tab" onclick="showPage('add-pet')">Add Pet</a>
        <a href="#" className="nav-tab" onclick="showPage('add-category')">Add Category</a>
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
          {animals?.map((animal) => (
            <div key={animal.id} className="pet-card">
             <div className="pet-image">🐱</div>
             <div className="pet-name">{animal.name}</div>
              <div className="pet-category">{animal.category}</div> {/* აქ category_id-თი უნდა წამოიღო სახელი */}
              
              <div className="pet-price">
                <span className="usd">${animal.priceUSD}</span>
                <span className="gel">₾{animal.priceGEL}</span>
              </div>

              <p className="description">{animal.description.substring(0, 60)}...</p>

              <div className="card-footer">
                {animal.isPopular && <span className="popular-label">Popular</span>}
                <span className="stock">Stock: {animal.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AnimalsPage;

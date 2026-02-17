import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchAnimals, updateAnimal } from '../features/animals/animalsSlice';
import './AddPetPage.css'; 
import { toast } from 'react-toastify';

const EditPetPage = () => {

     const { id } = useParams();
const dispatch = useAppDispatch();
const navigate = useNavigate();


const { items: animals, loading } = useAppSelector((state) => state.animals);

const { items: categories } = useAppSelector((state) => state.categories);

const animal = animals.find((item) => String(item.id) === String(id));
    
     const [form, setForm] = useState({
    name: '',
    categoryId: '',
    priceUSD: 0,
    priceGEL: 0,
    stock: 0,
    description: '',
    isPopular: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  
 
  const val = type === 'checkbox' 
    ? (e.target as HTMLInputElement).checked 
    : value;

  setForm((prev) => ({
    ...prev,
    [name]: val,
  }));
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!id) return;

  try {
    // ვამზადებთ განახლებულ ობიექტს
    const updatedPet = {
      id: id,
      ...form,
      priceUSD: Number(form.priceUSD),
      priceGEL: Number(form.priceGEL),
      stock: Number(form.stock),
    };

    
    await dispatch(updateAnimal(updatedPet)).unwrap();
    
    toast.success("მონაცემები წარმატებით განახლდა!");
    navigate(`/admin/pets/${id}`);
  } catch (error) {
    toast.error("განახლება ვერ მოხერხდა");
  }
};
  
  useEffect(() => {
    if (animals.length === 0) {
      dispatch(fetchAnimals());
    }
  }, [dispatch, animals.length]);

  useEffect(() => {
    if (animal) {
      setForm({
        name: animal.name,
        categoryId: animal.categoryId,
        priceUSD: animal.priceUSD,
        priceGEL: animal.priceGEL,
        stock: animal.stock,
        description: animal.description,
        isPopular: animal.isPopular,
      });
    }
  }, [animal]);

  if (loading && animals.length === 0) return <div>იტვირთება...</div>;
  if (!animal && !loading) return <div>ცხოველი ვერ მოიძებნა!</div>;
  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Edit Pet</h2>
        <form onSubmit={handleSubmit} className="pet-form">
          <div className="form-group">
            <label>Pet Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.title}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (USD)</label>
              <input type="number" name="priceUSD" value={form.priceUSD} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Price (GEL)</label>
              <input type="number" name="priceGEL" value={form.priceGEL} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" value={form.stock} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} id="popular" />
            <label htmlFor="popular">Popular Pet</label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-submit">Update Pet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPetPage;
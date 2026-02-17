import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { removeAnimalFromServer } from '../features/animals/animalsSlice';
import { toast } from 'react-toastify';
import './PetDetailsPage.css';

const PetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const animal = useAppSelector(state => 
    state.animals.items.find(item => item.id === id)
  );

  if (!animal) {
    return <div className="details-container">ცხოველი ვერ მოიძებნა...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("ნამდვილად გსურთ წაშლა?")) {
      try {
        await dispatch(removeAnimalFromServer(animal.id)).unwrap();
        toast.success("წარმატებით წაიშალა");
        navigate('/admin/pets');
      } catch (error) {
        toast.error("წაშლა ვერ მოხერხდა");
      }
    }
  };

  return (
    <div className="details-container">
      <div className="details-main">
        <div className="details-image-box">🐱</div>
        <div className="details-info">
          <h1>{animal.name}</h1>
          <span className="category-badge">{animal.categoryId}</span>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">USD Price</span>
              <span className="stat-value price">${animal.priceUSD}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">GEL Price</span>
              <span className="stat-value price">₾{animal.priceGEL}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Stock</span>
              <span className="stat-value">{animal.stock}</span>
            </div>
          </div>
          
          {animal.isPopular && <span className="popular-tag">Popular Pet</span>}
        </div>
      </div>

      <div className="description-section">
        <h3>Description</h3>
        <p className="description-text">{animal.description}</p>
      </div>

      <div className="details-actions">
        <button 
          className="btn-edit" 
          onClick={() => navigate(`/admin/edit-pet/${animal.id}`)}
        >
          Edit Pet
        </button>
        <button 
          className="btn-delete" 
          onClick={handleDelete}
        >
          Delete Pet
        </button>
      </div>
    </div>
  );
};

export default PetDetailsPage;
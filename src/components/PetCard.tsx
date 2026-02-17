import  { useState } from 'react';
import type { Animal } from '../features/animals/types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface PetCardProps {
  animal: Animal;
  onDelete?: (id: string) => void;
}

const PetCard: React.FC<PetCardProps> = ({ animal, onDelete }) => {
  
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    if (quantity < animal.stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast.warning(`მარაგში მხოლოდ ${animal.stock} ერთეულია!`);
    }
  };

  const handleDecrement = () => {
    setQuantity(q => Math.max(1, q - 1));
  };

  return (
    <Link to={`/admin/pets/${animal.id}`} className="pet-card-link">
    <div className="pet-card">
      <div className="pet-image">🐱</div>
      <div className="pet-name">{animal.name}</div>
      <div className="pet-price">
        <span className="usd">${animal.priceUSD}</span>
      </div>

      {animal.description ? (
    <p className="description">
      {animal.description.length > 80 
        ? `${animal.description.substring(0, 80)}...` 
        : animal.description}
    </p>
  ) : (
    <p className="description">აღწერა არ არის ხელმისაწვდომი</p>
  )}
      
      {/* რაოდენობის კონტროლი */}
      <div className="quantity-control">
        <button onClick={handleDecrement}>-</button>
        <span className="qty-number">{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      
      <div className="card-footer">
        <span className="stock">Stock: {animal.stock}</span>
      </div>

           {onDelete && (
        <button 
          className="delete-btn" 
          onClick={() => onDelete(animal.id)}
          style={{marginTop: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer'}}
        >
          Delete
        </button>
      )}
     
    </div>
     </Link>
    );
};

export default PetCard;
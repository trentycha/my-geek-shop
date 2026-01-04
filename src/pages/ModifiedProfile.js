import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const ModifiedProfile = () => {
    const [name, setName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    const isOwner = currentUser && currentUser.id === parseInt(id);
    
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!isOwner) {
            alert("Vous ne pouvez modifier que votre propre profil !");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/user/update/${id}`, {
                method: 'PUT',
                headers: authService.getAuthHeaders(),
                body: JSON.stringify({ name })
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }

            const data = await response.json();
            alert("Modification réussie !");
            setName("");
            navigate(0);
        } catch (error) {
            alert("Erreur: " + error.message);
        }
    }

    return (
        <div className="mt-40">
            <form onSubmit={handleUpdate}>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Modifier</button>
            </form>
        </div>
    )
}

export default ModifiedProfile;
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';
import Loading from './Loading';

const Profile = () => {
    const [users, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const response = await fetch(`http://localhost:3001/api/user/${id}`);
            const data = await response.json();
            setUser(data);
            setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchUser();

    }, [id]);

    const isOwner = currentUser && currentUser.id === parseInt(id);

    const handleDelete = async () => {
        if (!isOwner) {
            alert("Vous ne pouvez supprimer que votre propre profil !");
            return;
        }

        try {
            await fetch(`http://localhost:3001/api/user/${id}`, {
                method: "DELETE",
                headers: authService.getAuthHeaders()
            });
            navigate('/user');
            } catch (error) {
                alert(error.message);
            }
        }

    if(loading) {
        return <Loading />
    }

    return (

        <div className="mt-40">
            <h1 className="text-black">Nom : {users.name}</h1>
            <h2 className="text-black">Prénom : {users.firstname}</h2>
            <button onClick={() => navigate(`/user/update/${id}`)}>Modifier</button>
            <button onClick={handleDelete}>Supprimer</button>
        </div>

    )

}

export default Profile;
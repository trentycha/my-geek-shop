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
    const { user: currentUser, logout } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${id}`);
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (error) {
                alert(error.message);
                setLoading(false);
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

        if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
            return;
        }

        try {
            await fetch(`http://localhost:3001/api/user/${id}`, {
                method: "DELETE",
                headers: authService.getAuthHeaders()
            });
            logout();
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50 py-32 px-4 sm:px-6 lg:px-60">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mon Profil</h1>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                                <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{users.name}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                                <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{users.firstname}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{users.mail}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                            <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{users.phone || 'Non renseigné'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
                            <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{users.address || 'Non renseignée'}</p>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="mt-8 flex gap-4">
                            <button 
                                onClick={() => navigate(`/user/update/${id}`)}
                                className="flex-1 bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                            >
                                Modifier
                            </button>
                            
                            <button 
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                Supprimer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const ModifiedProfile = () => {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    const isOwner = currentUser && currentUser.id === parseInt(id);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${id}`, {
                    headers: authService.getAuthHeaders()
                });
                const data = await response.json();
                setName(data.name || "");
                setFirstname(data.firstname || "");
                setMail(data.mail || "");
                setPhone(data.phone || "");
                setAddress(data.address || "");
            } catch (error) {
                alert(error.message);
            }
        };

        fetchUser();
    }, [id]);

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
            authService.setUser(data);
            alert("Modification réussie !");
            navigate(0);
        } catch (error) {
            alert("Erreur: " + error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-32 px-4 sm:px-6 lg:px-60">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Modifier mon profil</h1>
                    
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                                <input 
                                    type="text"
                                    placeholder="Nom"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                                <input 
                                    type="text"
                                    placeholder="Prénom"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input 
                                type="email"
                                placeholder="Email"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                            <input 
                                type="text"
                                placeholder="Téléphone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
                            <input 
                                type="text"
                                placeholder="Adresse"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                            />
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button 
                                type="submit"
                                className="flex-1 bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                            >
                                Enregistrer
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => navigate(`/user/${id}`)}
                                className="flex-1 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModifiedProfile;
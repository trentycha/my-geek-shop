import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const Profile = () => {
    const [users, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const response = await fetch(`http://localhost:3001/users/${id}`);
            const data = await response.json();
            setUser(data);
            setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchUser();

    }, [id]);
    
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
            });

            const newUser = await response.json();
            navigate(0);
            setName("");
            }catch (error) {
            alert(error.message);
        }
    }

    const handleDelete = async () => {

        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "DELETE"
            });
            navigate('/login');
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
            <form>
                <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" onClick={handleUpdate}>Modifier</button>
            </form>
            <button onClick={handleDelete}>Supprimer</button>
        </div>

    )

}

export default Profile;
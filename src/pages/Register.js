import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:3001/api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, firstname, mail, password, phone, address})
            });

            const newUser = await response.json();

            if (newUser.token) {
                login(newUser.user, newUser.token);
            }
            navigate(`/user/${newUser.id}`);
    
        } catch (error) {
            alert(error.message);
        }

        setName("");
        setFirstname("");
        setMail("");
        setPassword("");
        setPhone("");
        setAddress("");
    };

    return (
        <div className="py-32 px-60">
            <div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md space-y-4">

                    <h4 className="text-left text-2xl font-semibold text-black-300">Rejoignez la Geek Community !</h4>
                    <p className="text-left text-sm text-black-300">Passez vos commandes en un clic et recevez des offres exclusives rien que pour vous.</p>

                    <input placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg" />

                    <input placeholder="Prénom"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <input placeholder="Mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <input placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <input placeholder="Téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <input placeholder="Adresse"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <button type="submit" className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200">Je m'inscris !</button>
                
                </form>
            </div>
        </div>
    )

}

export default Register;
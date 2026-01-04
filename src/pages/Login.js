import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:3001/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({mail, password})
            });

            const data = await response.json();

            if (data.token) {
                const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
                const userId = tokenPayload.id;
                
                const userResponse = await fetch(`http://localhost:3001/api/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                
                const userData = await userResponse.json();
                
                login(userData, data.token);
                navigate(`/user/${userId}`);
            }
    
        } catch (error) {
            alert(error.message);
        }

        setMail("");
        setPassword("");
    };

    return (
        <div className="py-32 px-60">
            <div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md space-y-4">

                    <h4 className="text-left text-2xl font-semibold text-black-300">Connectez-vous !</h4>

                    <input placeholder="Mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <input placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <button type="submit" className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200">Je me connecte !</button>

                    <p className="flex justify-start text-gray-600 text-left text-sm mt-2 mb-2">Pas encore de compte ?</p>
                    <button onClick={() => navigate(`/user`)} className="w-full bg-orange-400 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200">Je crée mon compte !</button>
                
                </form>
            </div>
        </div>
    )

}

export default Login;
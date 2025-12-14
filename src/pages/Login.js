import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [mail, setMail] = useState("");
    const [num, setNum] = useState("");
    const [adresse, setAdresse] = useState("");
    const redirection = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:3001/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, firstname, mail, num, adresse})
            });

            const newUser = await response.json();
            redirection("/");
    
        } catch (error) {
            alert(error.message);
        }

        setName("");
        setFirstname("");
        setMail("");
        setNum("");
        setAdresse("");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 py-32 px-60">
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

                    <input placeholder="Téléphone"
                    value={num}
                    onChange={(e) => setNum(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <input placeholder="Adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <button type="submit" className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200">Je m'inscris !</button>
                
                </form>
            </div>
            <div>
                <form className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md space-y-4">

                    <h4 className="text-left text-2xl font-semibold text-black-300">Déjà un compte ?</h4>

                    <input placeholder="Mail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <input placeholder="Mot de passe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>

                    <button type="submit" className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200">Je me connecte !</button>
                
                </form>
            </div>
        </div>
    )

}

export default Login;
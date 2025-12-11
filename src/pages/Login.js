import { useState } from 'react';

const Login = () => {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [mail, setMail] = useState("");
    const [num, setNum] = useState("");
    const [adresse, setAdresse] = useState("");

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
        <form onSubmit={handleSubmit}>

            <input placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)} />

            <input placeholder="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)} />

            <input placeholder="Mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)} />

            <input placeholder="Téléphone"
            value={num}
            onChange={(e) => setNum(e.target.value)} />

            <input placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)} />

            <button type="submit">Je m'inscris !</button>
        
        </form>
    )

}

export default Login;
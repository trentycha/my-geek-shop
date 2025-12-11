import { useState, useEffect } from 'react';
import { products } from '../datas/products.js';

const Home = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        const recupUser = async () => {
            try {
            const response = await fetch ("http://localhost:3001/users");
            const data = await response.json();
            setUser(data);
            } catch (error) {
                alert(error.message);
            }
        };

        recupUser();

    }, []);

    return (

        <div>
            <p>Bonjour !</p>
            <ul>
                {products.map((product) => (
                    <li key={product.id}> {product.name} </li>
                ))}
            </ul>
            <ul>
                {users.map((user) => (
                    <li key={user.id}> {user.name} </li>
                ))}
            </ul>
        </div>
            
    )

}

export default Home;
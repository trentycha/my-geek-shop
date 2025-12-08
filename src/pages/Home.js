import { products } from '../datas/products.js';

const Home = () => {

    return (

        <div>
            <p>Bonjour !</p>
            <ul>
                {products.map((product) => (
                    <li key={product.id}> {product.name} </li>
                ))}
            </ul>
        </div>
    )

}

export default Home;
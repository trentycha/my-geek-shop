import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [products, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch (`http://localhost:3001/products/${id}`);
            const data = await response.json();
            setProduct(data);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchProducts();
        
    }, [id]);

return (

    <div>
        <div>
            <div className="mt-40">
                <h1 className="text-black">Nom : {products.name}</h1>
                <p>{products.description}</p>
            </div>
        </div>
    </div>

)

}

export default ProductDetails
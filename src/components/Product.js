import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Product = ({product}) => {
    const navigate = useNavigate();

    const handleAddProduct = async (productId) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
        alert("Vous devez être connecté pour ajouter des produits au panier");
        navigate('/user/login');
        return;
        }
        
        try {
            const response = await fetch('http://localhost:3001/api/cart', {

                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    productId: productId,
                    quantity: 1
                })
            });

            if(response.ok) {
                alert("Produit ajouté au panier");
            }
        } catch(error) {
            alert("Le produit n'a pas été ajouté");
        }
    }

    return(
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative bg-gray-900 h-64 flex items-start justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full" />
            </div>
            <div className="p-6">
                <h6 className="flex justify-start text-orange-300 uppercase text-sm font-semibold mb-2">{product.category}</h6>
                <h3 className="flex justify-start text-2xl text-gray-700 font-bold text-gray-900 mb-3">{product.name}</h3>
                <h3 className="flex justify-start text-3xl text-orange-600 font-bold text-gray-900">{product.price}€</h3>
                <p className="flex justify-start text-gray-600 text-left text-sm mt-2 mb-2">{product.description}</p>
            </div>
            <div className="p-6 flex items-center justify-end gap-4">
                <button className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`product/${product.id}`)}>Je découvre !</button>
                <button className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"><FontAwesomeIcon icon={faHeart} /></button>
                <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                onClick={() => handleAddProduct(product.id)}>Panier</button>
            </div>
        </div>
    )

}

export default Product;
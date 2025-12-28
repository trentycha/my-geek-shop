import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch ('http://localhost:3001/api/product');
            const data = await response.json();
            setProduct(data);
            setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchProducts();
        
    }, []);

    if(loading) {
        return <Loading />
    }

    const handleAddProduct = async (productId) => {
        const userId = localStorage.getItem('userId');
        
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

    return (

        <div>

            <div className="relative h-96 flex items-center mb-12 py-24">
                <img src="/images/home-background.jpg" alt="home-background" className="absolute inset-0 w-full h-full object-cover" />
                <h1 className="relative text-3xl font-bold text-white px-8 text-left ml-24">
                    Fan de pop culture ? Trouve ton bonheur sur My Geek Shop !
                </h1>
            </div>

            <div className="ml-24 mr-24 mt-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mt-8">
                    {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                    ))}
                </div>

            <div className="bg-white rounded-2xl shadow-lg p-12 my-12">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Pourquoi My Geek Shop ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <img src='/images/icons/cible.png' alt='icon' className="mx-auto mb-4 h-16"/>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Authenticité garantie</h3>
                        <p className="text-gray-600">Tous nos produits sont officiels et certifiés par les éditeurs</p>
                    </div>
                    <div className="text-center">
                        <img src='/images/icons/eclair.png' alt='icon' className="mx-auto mb-4 h-14"/>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Livraison rapide</h3>
                        <p className="text-gray-600">Expédition sous 24h et livraison gratuite dès 50€</p>
                    </div>
                    <div className="text-center">
                        <img src='/images/icons/diamant.png' alt='icon' className="mx-auto mb-4 h-14"/>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Éditions limitées</h3>
                        <p className="text-gray-600">Accédez en exclusivité à des produits collector rares</p>
                    </div>
                    <div className="text-center">
                        <img src='/images/icons/cadeau.png' alt='icon' className="mx-auto mb-4 h-14"/>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Programme fidélité</h3>
                        <p className="text-gray-600">Gagnez des points à chaque achat et profitez de réductions</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-12 my-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Licences officielles</h2>
                <p className="text-center text-gray-600 mb-10">Partenaire officiel des plus grandes franchises</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center h-24">
                        <img src="/images/licences/marvel.png" alt="Marvel" className="max-h-16 object-contain" />
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center h-24">
                        <img src="/images/licences/dc.png" alt="DC Comics" className="max-h-16 object-contain" />
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center h-24">
                        <img src="/images/licences/star-wars.png" alt="Star Wars" className="max-h-16 object-contain" />
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center h-24">
                        <img src="/images/licences/pokemon.png" alt="Pokémon" className="max-h-16 object-contain" />
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center h-24">
                        <img src="/images/licences/nintendo.png" alt="Nintendo" className="max-h-16 object-contain" />
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center h-24">
                        <img src="/images/licences/ghibli.png" alt="Bandai" className="max-h-16 object-contain" />
                    </div>
                </div>
            </div>
        </div>

        </div>

        
            
    )

}

export default Home;
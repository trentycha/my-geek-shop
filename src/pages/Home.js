import { useState, useEffect } from 'react';
import Loading from './Loading.js';
import Product from '../components/Product.js';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProduct] = useState([]);

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

    return (

        <div>

            <div className="relative h-96 flex items-center mb-12 overflow-hidden">
                <img src="/images/home-background.jpg" alt="home-background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                <div className="relative ml-32 px-8 justify-start">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-left mb-4">
                        Fan de pop culture ?
                    </h1>
                    <p className="text-xl md:text-2xl text-orange-400 font-semibold text-left">
                        Trouve ton bonheur sur My Geek Shop !
                    </p>
                </div>
            </div>

            <div className="ml-24 mr-24 mt-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mt-8">
                    {products.map((product) => (
                    <Product key={product.id} product={product}/>
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
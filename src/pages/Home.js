import { useState, useEffect } from 'react';
import { products } from '../datas/products.js';
import Loading from './Loading.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if(loading) {
        return <Loading />
    }

    return (

        <div className="ml-24 mr-24">

            <div className="relative h-96 flex items-center mt-4">
                <img src="/images/home-background.jpg" alt="home-background" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                <h1 className="relative text-3xl font-bold text-white px-8 text-left">
                    Fan de pop culture ? Trouve ton bonheur sur My Geek Shop !
                </h1>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mt-8">
                {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative bg-gray-900 h-64 flex items-start justify-center">{product.image}</div>
                    <div className="p-6">
                        <h6 className="flex justify-start text-orange-300 uppercase text-sm font-semibold mb-2">{product.category}</h6>
                        <h3 className="flex justify-start text-2xl text-gray-700 font-bold text-gray-900 mb-3">{product.name}</h3>
                        <h3 className="flex justify-start text-3xl text-orange-600 font-bold text-gray-900">{product.price}€</h3>
                        <p className="flex justify-start text-gray-600 text-left text-sm mt-2 mb-2">{product.description}</p>
                    </div>
                    <div className="p-6 flex items-center justify-end gap-4">
                        <button className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"><FontAwesomeIcon icon={faHeart} /></button>
                        <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">Panier</button>
                    </div>
                </div>
                ))}
            </div>

        </div>
            
    )

}

export default Home;
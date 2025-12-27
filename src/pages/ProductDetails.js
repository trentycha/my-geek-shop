import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTruck, faBackward, faLock, faMapPin, faCheck } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
    const [products, setProduct] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch (`http://localhost:3001/api/product/${id}`);
            const data = await response.json();
            setProduct(data);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchProducts();
        
    }, [id]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch ('http://localhost:3001/api/product');
                const data = await response.json();
                setAllProducts(data);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchAllProducts();
    }, []);

    return (
    <div className="min-h-screen bg-gray-50 py-24">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                
                <div className="rounded-3xl p-12 flex items-center justify-center">
                    <img src={products.image} alt={products.name} className="w-full h-auto object-contain max-h-[600px] drop-shadow-2xl rounded-xl"/>
                </div>

                <div className="flex flex-col justify-start text-left">
                    <p className="text-orange-600 font-semibold uppercase text-sm tracking-wider mb-3">{products.category}</p>
                    <h1 className="text-5xl font-bold text-gray-800 mb-6">{products.name}</h1>
                
                    <div className="flex items-center gap-4 mb-8">
                        <p className="text-5xl font-bold text-orange-600">{products.price}€</p>
                        <span className="text-orange-300 font-medium">{products.stock > 0 ? `${products.stock} disponibles` : "Ils reviennent bientôt !"}</span>
                    </div>
                
                    <p className="text-gray-600 text-lg leading-relaxed mb-10">{products.description}</p>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-orange-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-orange-700 transition shadow-lg shadow-gray-200">
                            Ajouter au panier
                        </button>
                        <button className="bg-orange-100 text-orange-600 py-4 px-6 rounded-xl font-semibold hover:bg-orange-200 transition">
                            <span className="text-2xl"><FontAwesomeIcon icon={faHeart} /></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-orange-600 text-3xl mb-2"><FontAwesomeIcon icon={faTruck} /></div>
                        <h4 className="font-semibold text-gray-800 mb-1">Livraison gratuite</h4>
                        <p className="text-sm text-gray-600">Sous 6-10 jours ouvrés</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-orange-600 text-3xl mb-2"><FontAwesomeIcon icon={faBackward} /></div>
                        <h4 className="font-semibold text-gray-800 mb-1">Retour gratuit</h4>
                        <p className="text-sm text-gray-600">Sous 30 jours</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-orange-600 text-3xl mb-2"><FontAwesomeIcon icon={faLock} /></div>
                        <h4 className="font-semibold text-gray-800 mb-1">Paiement sécurisé</h4>
                        <p className="text-sm text-gray-600">SSL & 3D Secure</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-orange-600 text-3xl mb-2"><FontAwesomeIcon icon={faMapPin} /></div>
                        <h4 className="font-semibold text-gray-800 mb-1">Made in France</h4>
                        <p className="text-sm text-gray-600">Fabrication française</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8">
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="flex gap-8">
                            <button className="pb-4 border-b-2 border-orange-600 text-orange-600 font-semibold">
                                Informations générales
                            </button>
                        </nav>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3 text-left">Caractéristiques générales</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex justify-between"><span>Poids : {products.caracteristics?.height || "Inconnu"}</span></li>
                                <li className="flex justify-between"><span>Taille : {products.caracteristics?.weight || "Inconnu"}</span></li>
                                <li className="flex justify-between"><span>Matière : {products.caracteristics?.material || "Inconnu"}</span></li>
                                <li className="flex justify-between"><span>Marque : {products.caracteristics?.brand || "Inconnu"}</span></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4 text-left">Garantie & Service après-vente</h4>
                            <ul className="space-y-2 text-gray-600">
                                <p className="mb-2 text-left"><FontAwesomeIcon icon={faCheck} className="text-orange-600"/> <span className="font-medium">Garantie constructeur 2 ans</span></p>
                                <p className="text-gray-600 text-left"><FontAwesomeIcon icon={faCheck} className="text-orange-600"/> <span className="font-medium">SAV en France sous 48h</span></p>
                                <p className="text-gray-600 mb-2 text-left"><FontAwesomeIcon icon={faCheck} className="text-orange-600"/> <span className="font-medium">Assistance téléphonique 7j/7</span></p>
                                <p className="text-gray-600 mb-2 text-left"><FontAwesomeIcon icon={faCheck} className="text-orange-600"/> <span className="font-medium">Réparation ou échange</span></p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mb-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left px-28">Produits qui pourraient vous plaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-8">
                {allProducts.filter(product => product.id !== products.id).map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        onClick={() => navigate(`/product/${product.id}`)}>
                            <div className="relative bg-gray-900 h-64 flex items-start justify-center">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 text-left ml-6">{product.name}</h3>
                                <p className="text-orange-600 font-bold text-left ml-6">{product.price}€</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
)

}

export default ProductDetails
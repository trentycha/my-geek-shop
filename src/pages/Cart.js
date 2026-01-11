import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadCry, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const fetchProducts = async () => {
            
        try {
            const response = await fetch ('http://localhost:3001/api/cart');
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
                alert(error.message);
            }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const updateQuantity = async (userId, productId, newQuantity) => {
        try {
            const response = await fetch(`http://localhost:3001/api/cart/${userId}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (response.ok) {
                fetchProducts();
            }
        } catch (error) {
            alert("Erreur lors de la mise à jour de la quantité");
        }
    };

    const handleIncrease = (item) => {
        updateQuantity(item.userId, item.productId, item.quantity + 1);
    };

    const handleDecrease = (item) => {
        updateQuantity(item.userId, item.productId, item.quantity - 1);
    };

    const handleRemove = (item) => {
        updateQuantity(item.userId, item.productId, 0);
    };

    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        total += (cartItems[i].product.price * cartItems[i].quantity);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-32 px-6">
            <div className="max-w-6xl mx-auto justify-start">
                
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-left">Mon Panier</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-16">
                        <div className="text-6xl mb-6 text-orange-600"><FontAwesomeIcon icon={faFaceSadCry} /></div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Votre panier est vide</h2>
                        <p className="text-gray-600 mb-8">Ajoutez des produits pour commencer !</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700"
                        >
                            Voir nos produits
                        </button>
                    </div>

                ) : (
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                                    <div className="flex gap-6">
                                        <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg"/>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 text-left">{item.product.name}</h3>
                                            <p className="text-2xl font-bold text-orange-600 mt-2 text-left">{item.product.price}€</p>
                                            <p className="text-gray-600 mt-2 text-left">Quantité : {item.quantity}</p>
                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                                                    <button onClick={() => handleDecrease(item)} className="text-orange-600 hover:text-orange-700 font-bold text-xl w-8 h-8 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <span className="font-semibold text-lg min-w-[30px] text-center">{item.quantity}</span>
                                                    <button onClick={() => handleIncrease(item)} className="text-orange-600 hover:text-orange-700 font-bold text-xl w-8 h-8 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                                
                                                <button onClick={() => handleRemove(item)} className="text-red-500 hover:text-red-700 ml-auto">
                                                    <FontAwesomeIcon icon={faTrash} /> Retirer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Résumé</h2>
                            
                            <div className="mb-6">
                                <div className="flex justify-between mb-3">
                                    <span className="text-gray-600">Sous-total</span>
                                    <span className="font-semibold">{total.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between mb-3">
                                    <span className="text-gray-600">Livraison</span>
                                    <span className="text-gray-600 font-semibold">Gratuite</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between">
                                    <span className="text-xl font-bold">Total</span>
                                    <span className="text-xl font-bold text-orange-600">{total.toFixed(2)}€</span>
                                </div>
                            </div>

                            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 mb-3">
                                Commander
                            </button>
                            
                            <button onClick={() => navigate('/')} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300">
                                Continuer mes achats
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Cart;
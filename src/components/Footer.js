import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="container mx-auto px-24 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-orange-600 mb-4 text-left">My Geek Shop</h3>
                        <p className="text-gray-400 text-sm mb-4 text-left">
                            Votre boutique spécialisée en produits geek et pop culture. 
                            Authenticité garantie et passion du détail.
                        </p>
                        <div className="flex gap-4">
                            <button className="text-gray-400 hover:text-orange-600 transition"
                            onClick='/'>
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </button>
                            <button className="text-gray-400 hover:text-orange-600 transition"
                            onClick='/'>
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </button>
                            <button className="text-gray-400 hover:text-orange-600 transition"
                            onClick='/'>
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <ul className="space-y-2 text-gray-400 text-sm text-left ml-12">
                            <li className="text-left"><button onClick="/products" className="hover:text-orange-600 transitio">Produits</button></li>
                            <li className="text-left"><button onClick="/nouveautes" className="hover:text-orange-600 transition">A propos</button></li>
                            <li className="text-left"><button onClick="/contact" className="hover:text-orange-600 transition">Contact</button></li>
                            <li className="text-left"><button onClick="/cgv" className="hover:text-orange-600 transition">CGV</button></li>
                            <li className="text-left"><button onClick="/mentions-legales" className="hover:text-orange-600 transition">Mentions légales</button></li>
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-2 text-gray-400 text-sm text-left">
                            <li>My Geek Shop</li>
                            <li><p>11 rue de l'empereur Anakin,</p>33700 L'Étoile Morte</li>
                            <li>my-geek-shop@gmail.com</li>
                            <li>06 88 52 65 19</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-left">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4 text-left"> Recevez nos offres exclusives !</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Votre email" 
                                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-600 text-left"
                            />
                            <button className="px-6 py-2 bg-orange-600 rounded-r-lg hover:bg-orange-700 transition font-semibold">
                                OK
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; 2026 My Geek Shop. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
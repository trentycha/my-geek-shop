import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    return (

        <div className="bg-red-200 flex justify-between gap-4 px-24">
            <div className="w-1/6 p-6">
                <span>My Geek Shop Logo</span>
            </div>
            <div className="w-1/2 flex p-6 gap-16 justify-end">
                <span>Produits</span>
                <span>Goodies</span>
                <span>A propos</span>
                <span><FontAwesomeIcon icon={faBasketShopping} /></span>
            </div>
        </div>

    )

}

export default Header;
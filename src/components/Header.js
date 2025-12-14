import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    return (

        <div className="fixed top-0 left-0 right-0 z-10 bg-red-400 bg-opacity-50 backdrop-blur-md flex justify-between gap-4 ml-24 mr-24 mt-2 rounded-lg">
            <div className="w-1/6 p-6">
                <span className="text-white">My Geek Shop Logo</span>
            </div>
            <div className="w-1/2 flex p-6 gap-16 justify-end">
                <span className="text-white">Goodies</span>
                <span className="text-white">A propos</span>
                <span className="text-white"><FontAwesomeIcon icon={faBasketShopping} /></span>
            </div>
        </div>

    )

}

export default Header;
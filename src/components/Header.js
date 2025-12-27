import { useNavigate } from "react-router";
import Login from "../pages/Login"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const navigate = useNavigate();

    return (

        <div className="fixed top-0 left-0 right-0 z-10 bg-red-400 bg-opacity-50 backdrop-blur-md flex justify-between gap-4 ml-24 mr-24 mt-2 rounded-lg">
            <div className="w-1/6 p-6">
                <span className="text-white">My Geek Shop Logo</span>
            </div>
            <div className="w-1/2 flex p-6 gap-16 justify-end">
                <button className="text-white">Goodies</button>
                <button className="text-white">A propos</button>
                <button onClick={() => navigate('/user')} className="text-white"><FontAwesomeIcon icon={faUser} /></button>
                <button className="text-white"><FontAwesomeIcon icon={faBasketShopping} /></button>
            </div>
        </div>

    )

}

export default Header;
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate(`/user/${user.id}`);
        } else {
            navigate('/user/login');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (

        <div className="fixed top-0 left-0 right-0 z-10 bg-red-400 bg-opacity-50 backdrop-blur-md flex justify-between gap-4 ml-24 mr-24 mt-2 rounded-lg">
            <div className="w-1/6 p-6">
                <button onClick={() => navigate('/')} className="text-white">My Geek Shop Logo</button>
            </div>
            <div className="w-1/2 flex p-6 gap-16 justify-end">
                <button className="text-white">Goodies</button>
                <button className="text-white">A propos</button>
                <button onClick={handleProfileClick} className="text-white"><FontAwesomeIcon icon={faUser} /></button>
                {isAuthenticated && (<button onClick={handleLogout} className="text-white"> <FontAwesomeIcon icon={faArrowRightFromBracket} /></button> )}
                <button onClick={() => navigate('/cart')} className="text-white"><FontAwesomeIcon icon={faBasketShopping} /></button>
            </div>
        </div>

    )

}

export default Header;
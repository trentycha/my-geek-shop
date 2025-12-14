import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';


const Loading = () => {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <FontAwesomeIcon icon={faJedi} className="animate-spin text-orange-600 text-4xl" />
        </div>
    )

}

export default Loading
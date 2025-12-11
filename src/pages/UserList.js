import { useState, useEffect } from "react";

const UserList = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
    
        const handleAll = async () => {

            try{
                    const response = await fetch("http://localhost:3001/users");
                    const data = await response.json();
                    setUserData(data);
            } catch (error) {
                alert(error.message);
            }
        };

            handleAll();

    }, []);


    return (
        <div>
            <ul>
                {userData.map((user) => (
                    <li key={user.id}>{user.name} {user.firstname} {user.mail} {user.num} {user.adresse}</li>
                ))}
            </ul>
        </div>
    )

}

export default UserList;
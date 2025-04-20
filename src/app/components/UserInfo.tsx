import React, { useEffect, useState } from 'react';
import '../../css/userInfo.css';

interface UserProps {
    _id: string;    
}

interface User {
    name: string;
    username: string;
    passwordHashed: string;
    excludeCuisine?: string;
    diet?: string;
    intolerances?: string;
    excludeIngredients?: string;
}

function UserInfo( {_id}: UserProps ) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`api/users/${_id}`);
            const user = await response.json();
            setUser(user.user);
        };
        if (_id) {
            getUser();
        }
    }, []);

    if (!user) {
        return <div>Loading user info...</div>;
    }

    return (
        <div className='user-info-page-wrapper'>
        <div className='user-info'>
                <h2 className="user-title-info">{user.name}</h2>
                <dl className="user-info-details">
                    <div className="user-info-item">
                        <dt>Username:</dt>
                        <dd>{user.username}</dd>
                    </div>
                    
                    <div className="user-info-item">
                        <dt>Excluded Cusisines:</dt>
                        <dd>{user.excludeCuisine}</dd>
                    </div>
                                        
                    <div className="meal-info-item">
                        <dt>Diets:</dt>
                        <dd>{user.diet}</dd>
                    </div>

                    <div className="meal-info-item">
                        <dt>Intolerances:</dt>
                        <dd>{user.intolerances}</dd>
                    </div>

                    <div className="meal-info-item">
                        <dt>Avoided Ingredients:</dt>
                        <dd>{user.excludeIngredients}</dd>
                    </div>
                </dl>
        </div>
        </div>
    )
}

export default UserInfo;
import React from 'react';
import Userprofile from './Userprofile';

const Apps = () => {
    return (
        <div>
            <Userprofile
                name="Alice" 
                age={25} 
                hobbies={["Reading", "Traveling"]} 
            />
        </div>
    );
};

export default Apps;

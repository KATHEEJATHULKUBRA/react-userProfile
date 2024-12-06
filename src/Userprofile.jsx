import React, { useState } from 'react';
import defaultImage from './user.jpg'; 
import backgroundImage from './bg.png'; 

const Userprofile = (props) => {
    const [profile, setProfile] = useState({
        name: props.name || '',
        age: props.age || '',
        hobbies: Array.isArray(props.hobbies) ? props.hobbies : [],
        picture: props.picture || defaultImage, 
    });

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: name === 'hobbies' ? value : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    picture: event.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEdit = () => {
        if (isEditing) {
            if (!profile.name.trim() || !profile.age || isNaN(profile.age)) {
                setError('Please provide a valid name and age.');
                return;
            }

            setProfile((prevProfile) => ({
                ...prevProfile,
                name: profile.name.trim(),
            }));

            const processedHobbies =
                typeof profile.hobbies === 'string'
                    ? profile.hobbies
                          .split(',')
                          .map((hobby) => hobby.trim())
                          .filter((hobby) => hobby)
                    : profile.hobbies;

            setProfile((prevProfile) => ({
                ...prevProfile,
                hobbies: processedHobbies,
            }));

            setError('');
        }
        setIsEditing(!isEditing);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>User Profile</h2>
            <img
                src={profile.picture}
                alt="Profile"
                style={styles.picture}
                onError={(e) => (e.target.src = defaultImage)} 
            />

            {isEditing ? (
                <div style={styles.form}>
                    <label>
                        <strong>Name:</strong>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your name"
                        />
                    </label>
                    <label>
                        <strong>Age:</strong>
                        <br />
                        <input
                            type="number"
                            name="age"
                            value={profile.age}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your age"
                        />
                    </label>
                    <label>
                        <strong>Hobbies (comma-separated):</strong>
                        <input
                            type="text"
                            name="hobbies"
                            value={
                                typeof profile.hobbies === 'string'
                                    ? profile.hobbies
                                    : profile.hobbies.join(', ')
                            }
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="E.g., Reading, Traveling"
                        />
                    </label>
                    <label>
                        <strong>Upload Profile Picture:</strong>
                        <br />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={styles.fileInput}
                        />
                    </label>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Age:</strong> {profile.age}</p>
                    <p>
                        <strong>Hobbies:</strong>{' '}
                        {profile.hobbies.length > 0
                            ? profile.hobbies.join(', ')
                            : 'No hobbies listed'}
                    </p>
                </div>
            )}

            {error && <p style={styles.error}>{error}</p>}

            <button onClick={toggleEdit} style={styles.button}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
        </div>
    );
};

const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#d4e7ee', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    picture: {
        display: 'block',
        margin: '10px auto',
        borderRadius: '50%',
        width: '150px',
        height: '150px',
        objectFit: 'cover',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '90%',
    },
    fileInput: {
        fontSize: '16px',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#6d8598',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
   
};


document.body.style.backgroundImage = `url(${backgroundImage})`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';

export default Userprofile;

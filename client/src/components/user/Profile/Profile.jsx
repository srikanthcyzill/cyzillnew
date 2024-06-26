import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { Button, Image, Input } from '@nextui-org/react';
import { BASE_URL } from '../../../config';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(currentUser?.username);
    const [email, setEmail] = useState(currentUser?.email);
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber);
    const [photo, setPhoto] = useState(currentUser?.photo);

    useEffect(() => {
    }, [dispatch]);

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: username,
                }),
            });

            if (response.ok) {
                console.log('Profile updated successfully');
            } else {
                console.log('Error updating profile:', await response.text());
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 px-3 justify-center md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <main className="w-full min-h-screen p-4 md:w-2/3 lg:w-3/4">
                <h2 className="text-xl font-bold">Public Profile</h2>
                <div className="relative flex flex-col items-center mt-8 space-y-5">
                    <Image className="w-40 h-40 rounded-full" src={photo} alt="Avatar" />
                    <label htmlFor="photoInput" className="absolute bottom-0 left-0 py-3 px-7 text-base font-medium bg-gray-200 rounded-lg cursor-pointer">
                        <FiEdit />
                    </label>
                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} id="photoInput" className="hidden" />
                </div>
                <div className="flex flex-col items-center w-full mt-8 space-y-2">
                    {renderTextInput('Your username', username, setUsername, 'text', 'username')}
                    {renderTextInput('Your email', email, setEmail, 'email', 'email')}
                    {renderTextInput('Your phone number', phoneNumber, setPhoneNumber, 'tel', 'phoneNumber')}
                    <Button onClick={handleUpdateProfile} className="mt-4">Update Profile</Button>
                </div>
            </main>
        </div>
    );
}

const renderTextInput = (label, value, onChange, type, id) => (
    <div className="w-full">
        <label htmlFor={id} className="block mb-2 text-sm font-medium">{label}</label>
        <Input type={type} id={id} className="w-full p-2 rounded-lg" placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} required />
    </div>
);


export default Profile;

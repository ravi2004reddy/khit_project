import React from 'react';
import Customernavbar from './Customernavbar';

const Profile = () => {
    // Dummy profile data
    const userProfile = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+1234567890",
        address: "456 Elm St, Metropolis, USA",
        image: "https://via.placeholder.com/150", // Replace with actual image URL if available
    };

    // const user = JSON.parse(localStorage.getItem('customer') || '{}');

    return (
        <div className="">
            <Customernavbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
                <img
                    src='/book9.png' // Placeholder if no image
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold text-center">{userProfile.name}</h2>
                <p className="text-gray-600">{userProfile.email}</p>
                <p className="text-gray-600">{userProfile.phone}</p>
                <p className="text-gray-600">{userProfile.address}</p>
            </div>
        </div>
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold">Company Name</h3>
                        <p className="text-sm">Your tagline or slogan here.</p>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-md font-semibold">Links</h4>
                        <ul className="text-sm">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Services</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:underline">Facebook</a>
                            <a href="#" className="hover:underline">Twitter</a>
                            <a href="#" className="hover:underline">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-600 pt-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default Profile;

// LoginComponent.jsx
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Login} from '../Actions/Rental';
import RentalNavbar from './RentalNavbar';

const LoginComponent = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    
    };

    
    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(Login(data.email,data.password));
    }










    return (
      <div className="">
       <RentalNavbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 shadow-sm shadow-orange-400 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <img 
                    src="/houe3.png" 
                    alt="Login" 
                    className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-2xl font-semibold text-center mt-4">Login</h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name='email'
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name='password'
                          
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
                            placeholder="Enter your password"
                            required
                            min={8}
                            
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
                    {/* <a href="#" className="text-sm text-blue-500 hover:underline">new User?</a> */}
                </div>
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

export default LoginComponent;


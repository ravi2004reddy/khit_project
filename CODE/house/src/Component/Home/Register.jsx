import React, { useState } from 'react';
import Navbar from './Navbar';
import { register } from '../Actions/Customer';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [image, setImage] = useState(null);

  const handleimage = (e) => {
    setImage(e.target.files[0]);
  }

  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData,"formdata");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
  
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('profile', image);
     console.log(formData)
    dispatch(register(data) );
    setFormData({
      name: '',
      email: '',
      password: '',
 
      phone: '',
      address: '',
    });
    setImage(null);
  };


  return (
    <div className="">
     <Navbar />
    <div className="flex flex-col md:flex-row items-center justify-center p-6 mt-12">
        
        <div className=" hidden md:block md:w-1/2 w-full mt-6 md:mt-0 mr-2">
        <img src="/houe2.png" alt="Registration" className="w-full h-auto mr-3" />
      </div>
      <div className="md:w-1/2 w-full md:mr-4 mt-24 ">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
         
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
         
          <input
            type="file"
            name="image"
            onChange={handleimage}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
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

export default Register;

import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {ViewHouse} from '../Actions/Admin';

import {UpdateHouse} from '../Actions/Admin';


const HouseDetails = () => {
  const [houses, setHouses] = useState([
    { 
      id: 1, 
      address: '123 Main St', 
      owner: 'John Doe', 
      city: 'New York', 
      price: '$250,000', 
      status: 'Pending', 
      image: 'https://via.placeholder.com/150' 
    },
    { 
      id: 2, 
      address: '456 Oak Ave', 
      owner: 'Jane Smith', 
      city: 'Los Angeles', 
      price: '$500,000', 
      status: 'Approved', 
      image: 'https://via.placeholder.com/150' 
    },
    { 
      id: 3, 
      address: '789 Pine Rd', 
      owner: 'Alice Johnson', 
      city: 'Chicago', 
      price: '$350,000', 
      status: 'Pending', 
      image: 'https://via.placeholder.com/150' 
    },
  ]);


  const dispatch = useDispatch()

  const changeStatus = (id, newStatus) => {
    dispatch(UpdateHouse(newStatus,id));
  };

 

  useEffect(()=>{
    dispatch(ViewHouse())
  },[dispatch])


    const house = useSelector((state)=>state.Admin.adminhouses);

    console.log(house);










  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">House Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-3 px-4">#</th>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Address</th>
              <th className="text-left py-3 px-4">City</th>
              <th className="text-left py-3 px-4">Owner</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {house?.map((house, index) => (
              <tr key={house.id} className="border-t border-gray-300">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img src={`http://localhost:4000/uploads/houses/${house?.images[0]}`} alt="House" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{house.location}</td>
                <td className="py-3 px-4">{house.title}</td>
                <td className="py-3 px-4">{house.deposit}</td>
                <td className="py-3 px-4">{house.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      house.adminstatus === 'Approved'
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {house.adminstatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      changeStatus(
                        house._id,
                        house.adminstatus === 'Pending' ? 'Approved' : 'Pending'
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {house.adminstatus === 'Pending' ? 'Approve' : 'Revoke'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseDetails;

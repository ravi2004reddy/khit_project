import React , {useState} from 'react';
import { useDispatch } from 'react-redux';

import { ChangePassword } from '../Actions/Rental';



// Dummy profile data
const profileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  address: "123 Main St, Springfield, USA",
  password: "********",
  profilePic: "https://via.placeholder.com/150" // Placeholder image URL
};

const ProfileView = () => {

  const rentals = JSON.parse(sessionStorage.getItem('rentals') || '{}');

  const [showmodal, setShowmodal] = useState(false);

    const dispatch = useDispatch();

    const [data,setData] = useState({
        oldpassword:"",
        newpassword:"",
    });


    const handlechange = (e) =>{
        setData({...data,[e.target.name]:e.target.value});
    };


    const changePassword = () =>{
        dispatch(ChangePassword(rentals._id,{
            oldPassword:data.oldpassword,
            newPassword:data.newpassword
        }) );
        setShowmodal(false);
    }

    




  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="flex items-center">
        <img
          src={ `http://localhost:4000/uploads/rentals/${rentals.profilePic}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-4"
        />
        <h2 className="text-2xl font-semibold">{rentals.name}</h2>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <p className="text-gray-600">Email: {rentals.email}</p>
        <p className="text-gray-600">Phone: {rentals.phone}</p>
        <p className="text-gray-600">Address: {rentals.address}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Account Information</h3>
        <p className="text-gray-600">Password: {profileData.password}</p>
        <button onClick={()=>setShowmodal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Change Password</button>
      </div>

      {
        showmodal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
              <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
              <input
                type="password"
                name='oldpassword'
                value={data.oldpassword}
                onChange={handlechange}
                placeholder="Enter new password"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="password"
                name='newpassword'
                value={data.newpassword}
                onChange={handlechange}
                placeholder="Confirm new password"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={changePassword}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ProfileView;

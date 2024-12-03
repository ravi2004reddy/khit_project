import React , {useState} from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changepassword } from '../Actions/Customer';
import Customernavbar from './Customernavbar';





const ProfileView = () => {

  const rentals = JSON.parse(sessionStorage.getItem('customer') || '{}');

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
        dispatch(changepassword(rentals?.data._id,{
          oldpassword:data.oldpassword,
          newpassword:data.newpassword
        }));
        setShowmodal(false);
    }

    




  return (
    <div className="">
   <Customernavbar/>
    <div className="max-w-md mt-24 mx-auto p-6 bg-white rounded-lg shadow-md ">
      <div className="flex items-center">
        <img
          src={ `http://localhost:4000/uploads/customer/${rentals?.data?.profilePic}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-4"
        />
        <h2 className="text-2xl font-semibold">{rentals?.data.name}</h2>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <p className="text-gray-600">Email: {rentals?.data.email}</p>
        <p className="text-gray-600">Phone: {rentals?.data.phone}</p>
        <p className="text-gray-600">Address: {rentals?.data.address}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Account Information</h3>
        <p className="text-gray-600">Password: {rentals?.data.password}</p>
        <div className="">
        <button onClick={()=>setShowmodal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Change Password</button>
        <NavLink to="/renthistory" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 ml-2">My Orders</NavLink>
        </div>
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
                placeholder="Enter old password"
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
                  className="bg-red-700 mr-4 text-white px-4 py-2 rounded-lg"
                  onClick={()=>setShowmodal(false)}
                >
                  Cancle
                </button>
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
    </div>
  );
};

export default ProfileView;

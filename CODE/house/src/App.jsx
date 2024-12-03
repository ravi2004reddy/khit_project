// import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainHomepage from './Component/Home/MainHomepage';
import Register from './Component/Home/Register';
import LoginComponent from './Component/Home/LoginComponent';
import Adminhome from './Component/Admin/Adminhome';
import Admindashboard from './Component/Admin/Admindashboard';
import Viewuser from './Component/Admin/Viewuser';
import AddBookForm from './Component/Admin/AddBookForm';
import BookGrid from './Component/Admin/BookGrid';
import ViewBookDetails from './Component/Customer/ViewMovieDetails';
import Homepage from './Component/Customer/Homepage';
import SearchBook from './Component/Customer/SearchBook';
import ViewMyOrder from './Component/Customer/ViewMyOrder';
import AdminViewOrders from './Component/Admin/AdminViewOrders';
import HouseDetail from './Component/Customer/HouseDetail';
import Cart from './Component/Customer/Cart';
import ViewRents from './Component/Admin/ViewRents';
import Homepages from './Component/Rent/Homepage';
import RentHistory from './Component/Customer/RentHistory';
import AddRentHouse from './Component/Rent/AddRentHouse';
import RentHouseGrid from './Component/Rent/RentHouseGrid';
import BookingTable from './Component/Rent/BookingTable';
import Registers from './Component/Rent/Register';
import ProfileView from './Component/Rent/ProfileView';
import ProfileViews from './Component/Customer/ProfileView';
import LoginComponentRents from './Component/Rent/LoginComponent';
import HouseDetails from "./Component/Admin/HouseDetails";
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Component/Rent/Dashboard';

import 'animate.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/" element={<MainHomepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginComponent />}/>
        


        <Route path="/admin" element={<Adminhome />}  >
          <Route path="dashboard" element={<Admindashboard />} />
          <Route path="viewuser" element={<Viewuser />} />
          <Route path="addbook" element={<AddBookForm />} />
          <Route path="books" element={<BookGrid />} />
          <Route path='order' element={<AdminViewOrders/>} />
          <Route path='viewrent' element={<ViewRents/>} />
          <Route path='housedetails' element={<HouseDetails/>} />
        </Route>

        <Route path="/viewmovie" element={<ViewBookDetails />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/searchbook" element={<SearchBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/vieworder" element={<ViewMyOrder />} />
        <Route path="/housedetail/:id" element={<HouseDetail />} />
        <Route path="/renthistory" element={<RentHistory />} />
        <Route path="/profile" element={<ProfileViews />} />

        
        <Route path="/rents" element={<Homepages />} >
          <Route path="addhouse" element={<AddRentHouse />} />
          <Route path="addhouse/:id" element={<AddRentHouse />} />
          <Route path="viewhouse" element={<RentHouseGrid />} />
          <Route path="booking" element={<BookingTable />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>
        <Route path='/rent/register' element={<Registers />} />
        <Route path='/rent' element={<LoginComponentRents />} />




      </Routes>
      <ToastContainer />
     </Router>
      
    </div>
  )
}

export default App

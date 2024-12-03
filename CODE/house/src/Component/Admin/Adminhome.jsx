import React from 'react'
import { NavLink,Outlet } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../Actions/Admin";














const Adminhome = () => {
    const [showSidebar, setShowSidebar] = React.useState(true);

  
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout() );
  };




  return (
    <div>
      <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className={`" hidden md:block w-64 bg-gradient-to-r from-purple-50 to-blue-50 shadow-md" ${showSidebar?"":"w-16 "}`}>
        {showSidebar?<div>
        <div className=" flex ">
          <img
            src="/houe1.png"
            alt=""
            className="w-24 h-24 bg-inherit mt-3 ml-3 rounded-full"
          />
          <div className="text-slate-950 text-center font-bold text-sm p-4 mt-6 font-serif uppercase">
           House Hunt
          </div>
        </div>
        <ul className="flex flex-col p-2 gap-2 mt-6">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex space-x-4 h-12 p-3"
                  : "text-slate-950  rounded-md flex space-x-4 h-12 p-3 font-serif text-lg"
              }
              end
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
              </svg>
              <h3>Dashboard</h3> 
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/viewrent"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                  : "text-slate-950  rounded-md flex space-x-4 h-12 p-3 font-serif text-lg"
              }
              end
            >
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor "><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/></svg>
             <h3>Rents</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/viewuser"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-slate-950  rounded-md flex space-x-4 h-12 p-3 font-serif text-lg"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
              <h3>Users</h3>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/housedetails"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-slate-950  rounded-md flex space-x-4 h-12 p-3 font-serif text-lg"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
              <h3>Houses</h3>
            </NavLink>
          </li>
          
          <li>
            <button onClick={logoutHandler}  className=" hover:bg-blue-500 text-black font-serif w-full text-left h-12 rounded-md p-3 flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor"><path d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z"/></svg>
              Logout
            </button >
          </li>
        </ul></div>:
        
        <ul className="flex flex-col p-2 gap-2 mt-6 " >
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex space-x-4 h-12 p-3"
                  : "text-black  rounded-md flex space-x-4 h-12 p-3"
              }
              end
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/viewrent"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                  : "text-white  rounded-md flex space-x-4 h-12 p-3"
              }
              end
            >
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor"><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/></svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/viewuser"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-white  rounded-md flex space-x-4 h-12 p-3"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/housedetails"
              className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white  rounded-md flex gap-3 h-12 p-3"
                : "text-white  rounded-md flex space-x-4 h-12 p-3"
            }
            end
          
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
            </NavLink>
          </li>
          
 
          <li>
            <NavLink to='/'  className=" hover:bg-blue-500 text-white w-full text-left h-12 rounded-md p-3 flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"   fill="currentColor"><path d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z"/></svg>
            </NavLink >
          </li>
        </ul>}
      </div>
      {/* Main Content Area + Navbar */}
      <div className="flex-1 flex flex-col sticky z-50">
        <nav className="bg-gradient-to-r from-teal-100 via-lime-100 to-sky-100 shadow-md h-16 flex items-center justify-between px-6">
          <div className=" flex space-x-2" onClick={()=>setShowSidebar(!showSidebar)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
              className='hidden md:block'
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          
        </nav>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      <div className="md:hidden fixed inset-x-0 bottom-0 bg-gradient-to-b from-teal-200 via-lime-300 to-sky-300 text-white flex justify-around items-center h-16 shadow-md z-50">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-400' : 'text-white'
                    }
                    end
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
                    </svg>
                    <span className="text-sm">Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin/viewrent"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-400' : 'text-white'
                    }
                    end
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
                    </svg>
                    <span className="text-sm">Rental</span>
                </NavLink>
                <NavLink
                    to="/admin/viewuser"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-400' : 'text-white'
                    }
                    end
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
                    </svg>
                    <span className="text-sm">Users</span>
                </NavLink>
                <button onClick={logoutHandler} className="hover:text-blue-400 flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                          fill="currentColor"
                    >
                        <path d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z" />
                    </svg>
                    <span className="text-sm">Logout</span>
                </button>
            </div>
    </div>
    </div>
  )
}

export default Adminhome

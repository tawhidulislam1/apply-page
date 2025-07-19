

import { useState } from 'react';
import { AiOutlineFork } from 'react-icons/ai';
import { FaHome, } from 'react-icons/fa';

import { IoIosClose } from 'react-icons/io';
import { MdMenu, MdOutlineSettingsApplications } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router-dom';



const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <div className="flex flex-col sm:flex-row">
                {/* Sidebar */}
                <div className={`w-full text-lg md:text-xl sm:w-64 min-h-screen bg-[#089662] text-white transition-all ${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
                    <ul className="menu">
                        <div className="divider"></div>
                        {/* Home page redirect */}
                        <li className='text-xl md:text-xl'><NavLink to={'/'}><FaHome /> Home</NavLink></li>
                        <li className='text-xl md:text-xl'><NavLink to={'/dashboard/apply'}><MdOutlineSettingsApplications />
                            Rental Application</NavLink></li>
                        <li className='text-xl md:text-xl'><NavLink to={'/dashboard/promoters'}><AiOutlineFork />
                            Promoters </NavLink></li>
                    </ul>
                </div>

                {/* Main content */}
                <div className="flex-1 ml-14 p-8">
                    {/* Toggle Button for Small Devices */}
                    <button
                        className="sm:hidden p-3 bg-orange-400 text-white rounded-full fixed top-4 left-4 z-30"
                        aria-label="Toggle Sidebar"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <IoIosClose size={24} /> : <MdMenu size={24} />}
                    </button>
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
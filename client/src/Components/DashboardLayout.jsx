import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";

const DashboardLayout = () => {
  return  (
    <div className='min-h-screen md:flex'>
        {/* Sidebar */}
        <div className='w-56 bg-gray-800 text-white'>
            <DashSidebar />
        </div>
        {/* Main content */}
        <div className='flex-1 p-6'>
            <Outlet />
        </div>
    </div>
);
}

export default DashboardLayout
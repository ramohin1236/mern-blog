import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowRight, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { IoIosCreate } from "react-icons/io";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // signout
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-4 md:gap-96">
        
        <div>
        <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={`${currentUser.isAdmin ? "admin":"user"}`}
              labelColor="dark"
              as="div"
            >
              Settings
            </Sidebar.Item>
          </Link>
          <Link to={"/dashboard/create-post"}>
              <Sidebar.Item
                icon={IoIosCreate}
                className="cursor-pointer"
                 as="div"
              >
                Create a post
              </Sidebar.Item>
            </Link>
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item
                icon={HiDocumentText}
                active={tab === 'posts'}
                className="cursor-pointer"
                 as="div"
              >
                 Posts
              </Sidebar.Item>
            </Link>
     {/* ---------------------- for admin ---------------------------------- */}
                                {/* create a post */}
          {currentUser.isAdmin && (
            <>

              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                  active={tab === 'dash' || !tab}
                  icon={MdDashboard }
                  as='div'
                >
                  Dashboard
                </Sidebar.Item>
              </Link>

           

            

            <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
            <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={FaComments }
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
           
           
            </>
          )}
        </div>




          {/* sign out for all */}
          <div>
          <Sidebar.Item
            icon={HiArrowRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign out
          </Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>

      
    </Sidebar>
  );
};

export default DashSidebar;

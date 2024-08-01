/* eslint-disable react/no-unescaped-entities */
import { Button, Navbar, TextInput } from "flowbite-react";
import {Link, useLocation} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
const Headers = () => {
    
    const path = useLocation().pathname;
    console.log(path);

  return (
    <Navbar className="border-b-2">
        <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-black">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Mohin's</span>Blog
        </Link>
        <form >
            <TextInput
            type="text"
            placeholder="Search..."
        rightIcon={AiOutlineSearch}
        className="hidden lg:inline"
            />
        </form>
        {/* small device search button */}
        <Button className="w-12 h-10 lg:hidden" color='gray' pill>
        <AiOutlineSearch/>
        </Button>
    {/* dark mood light mood  */}
         <div className='flex gap-3 md:order-2'>
             <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
                 <FaMoon/>
             </Button>
         
    {/* SignIn   */}
         <Link to="/sign-in">
             <Button gradientDuoTone='purpleToBlue' pill outline>
                 Sign-in
             </Button>
         </Link>
            <Navbar.Toggle/>
         
         </div>
       {/* menu with responsive for all device */}
         <Navbar.Collapse>
             <Navbar.Link active={path === '/'} as={'div'} className={path === '/' ? 'text-blue-500' : ''}>
                <Link to='/home'>
                    Home 
                </Link>
             </Navbar.Link>
             <Navbar.Link active={path === '/about'} as={'div'} className={path === '/about'? 'text-blue-500' : ''}>
                <Link to='/about'>
                    About 
                </Link>
             </Navbar.Link>
             <Navbar.Link active={path === '/project'} as={'div'} className={path === '/project' ? 'text-blue-500' : ''}>
                <Link to='/project'>
                    Projects 
                </Link>
             </Navbar.Link>
         </Navbar.Collapse>
    </Navbar>
  )
}

export default Headers
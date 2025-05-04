/* eslint-disable react/no-unescaped-entities */
import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs'
const FooterComponent = () => {
  return (
    <Footer container  className="text-6xl font-bold border border-t-8 border-blue-400">
        <div className="w-full max-w-7xl mx-auto ">
             <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                 <div className="mt-5">
                 <Link to='/' className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-black">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Mohin's</span>Blog
        </Link>
                 </div>
                 <div className="grid gird-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                    <Footer.Title title="About"/>
                     <Footer.LinkGroup col>
                         <Footer.Link href="https://www.somethi.com"
                         target="_blank"
                         rel="'noopener noreferrer"
                         >
                            100 js Projects
                         </Footer.Link>
                         <Footer.Link href="https://www.somethi.com"
                         target="_blank"
                         rel="'noopener noreferrer"
                         >
                            Facebook
                         </Footer.Link>
                     </Footer.LinkGroup>
                    </div>
                   
                    <div>
                    <Footer.Title title="Follow us"/>
                     <Footer.LinkGroup col>
                         <Footer.Link href="https://www.somethi.com"
                         target="_blank"
                         rel="'noopener noreferrer"
                         >
                            Github
                         </Footer.Link>
                         <Footer.Link href="https://www.somethi.com"
                         target="_blank"
                         rel="'noopener noreferrer"
                         >
                            Linkdin
                         </Footer.Link>
                     </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Legal"/>
                     <Footer.LinkGroup col>
                         <Footer.Link href="https://www.somethi.com"
                         target="_blank"
                         rel="'noopener noreferrer"
                         >
                            Github
                         </Footer.Link>
                         <Footer.Link href="https://www.somethi.com"
                         target="_blank"
                         rel="'noopener noreferrer"
                         >
                            Linkdin
                         </Footer.Link>
                     </Footer.LinkGroup>
                    </div>
                 </div>
             </div>
             <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Mohin's Blog"
                    year={new Date().getFullYear()}
                    />
                    <div className="flex gap-5 justify-center mt-6">
                        <Footer.Icon href="#" icon={BsFacebook}/>
                        <Footer.Icon href="#" icon={BsInstagram}/>
                        <Footer.Icon href="#" icon={BsGithub}/>
                        <Footer.Icon href="#" icon={BsTwitter}/>
                        <Footer.Icon href="#" icon={BsDribbble}/>
                    </div>
                </div>
            
        </div>
    </Footer>
  )
}

export default FooterComponent
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Headers from "./Components/Headers";
import FooterComponent from "./Components/FooterComponent";
import PrivateRoute from "./Components/PrivateRoute";
import CreatePost from "./Pages/CreatePost";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import DashboardLayout from "./Components/DashboardLayout";
import UpdatePost from "./Pages/UpdatePost";
import PostDetailsPage from "./Pages/PostDetailsPage";
import TopOfPage from "./Components/TopOfPage";
import Search from "./Pages/Search";


function App() {
  return (
    <BrowserRouter>
    <TopOfPage/>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
     
        <Route path="/post/:postSlug" element={<PostDetailsPage />} />
        <Route path="/search" element={<Search />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard/create-post" element={<CreatePost />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* admin private route */}
        <Route element={<AdminPrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
        
           
            <Route path="/dashboard/update-post/:postId" element={<UpdatePost />} />
           
       
          </Route>
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

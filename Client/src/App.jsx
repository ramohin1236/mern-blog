import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import Headers from "./Components/Headers";
import FooterComponent from "./Components/FooterComponent";
import PrivateRoute from "./Components/PrivateRoute";
import CreatePost from "./Pages/CreatePost";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import DashboardLayout from "./Components/DashboardLayout";
import UpdatePost from "./Pages/UpdatePost";


function App() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/project" element={<Projects />} />

        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* admin private route */}
        <Route element={<AdminPrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
        
            <Route path="/dashboard/create-post" element={<CreatePost />} />
            <Route path="/dashboard/update-post/:postId" element={<UpdatePost />} />
           
       
          </Route>
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

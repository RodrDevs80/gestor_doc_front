import { Route,Routes } from "react-router-dom";
import Home from "../Pages/Home";
import LoginForm from "../Pages/LoginPage";
import AdminPage from "../Pages/Admin/AdminPage";


const AppRoutes = () => {
    return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        
    </Routes>
    </>
    )
}

export default AppRoutes
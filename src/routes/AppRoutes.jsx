import { Route,Routes } from "react-router-dom";
import Home from "../Pages/Home";
import LoginForm from "../Pages/LoginPage.jsx";
import AdminPage from "../Pages/Admin/AdminPage.jsx";


const AppRoutes = () => {
    return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/admin" element={<AdminPage/>}/>

    </Routes>
    </>
    )
}

export default AppRoutes
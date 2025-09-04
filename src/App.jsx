import LoginForm from "./Pages/LoginPage.jsx";
import FileUploadModal from "./Pages/Admin/FileUploadModal.jsx";

import Loader from "./components/Loader.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
function App() {
  return (
    <>
    <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
    {/* <LoginForm/> */}
    <FileUploadModal/>
    {/* <Loader/> */}
    </>
  )
}

export default App;

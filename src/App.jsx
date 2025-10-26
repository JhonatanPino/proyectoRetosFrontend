import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

//ADMIN
import PanelAdmin from "./pageadmin/PanelAdmin.jsx";
import UserAll from "./pageadmin/UserAll.jsx";

//USER
import PanelUser from "./pageuser/PanelUser.jsx";
//LAYOUTS
import LayoutPublic from "./layouts/LayoutPublic.jsx";
import LayoutAdmin from "./layouts/LayoutAdmin.jsx";
import LayoutUser from "./layouts/LayoutUser.jsx";
//PUBLIC
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHome from "./pagepublic/PageHome.jsx";
//AUTH
import ProtectedRoutes from "./pageauth/ProtectedRoutes.jsx";
import Register from "./pageauth/Register.jsx";
import Login from "./pageauth/Login.jsx";

const App = () => {
    return (
        <Router>
            <>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<LayoutPublic />}>
                        <Route index element={<PageHome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/admin" element={<LayoutAdmin />}>
                            <Route index element={<PanelAdmin />} />
                            <Route path="user" element={<UserAll />}></Route>
                        </Route>
                        <Route path="/user" element={<LayoutUser />}>
                            {/* <Route index element={<PageHome />} /> */}
                            <Route index element={<PanelUser />} />
                        </Route>
                    </Route>
                </Routes>
            </>
        </Router>
    );
};

export default App;
/*
if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}
*/

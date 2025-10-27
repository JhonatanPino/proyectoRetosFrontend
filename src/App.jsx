import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

//ADMIN
import PanelAdmin from "./pageadmin/PanelAdmin.jsx";
import UserAll from "./pageadmin/UserAll.jsx";
import CategoryAll from "./pageadmin/CategoryAll.jsx";
import CategorStore from "./pageadmin/CategoryStore.jsx";
import CategoryUpdate from "./pageadmin/CategoryUpdate.jsx";
//USER
import PanelUser from "./pageuser/PanelUser.jsx";
//LAYOUTS
import LayoutPublic from "./layouts/LayoutPublic.jsx";
import LayoutAdmin from "./layouts/LayoutAdmin.jsx";
import LayoutUser from "./layouts/LayoutUser.jsx";
//PUBLIC
import PageHome from "./pagepublic/PageHome.jsx";
import Register from "./pageauth/Register.jsx";
import Login from "./pageauth/Login.jsx";
//AUTH
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./pageauth/ProtectedRoutes.jsx";

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
                            <Route path="user" element={<UserAll />} />
                            <Route path="category" element={<CategoryAll />} />
                            <Route path="category/create" element={<CategorStore />} />
                            <Route path="category/edit/:id" element={<CategoryUpdate />} />
                        </Route>
                        <Route path="/user" element={<LayoutUser />}>
                            <Route index element={<PageHome />} />
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

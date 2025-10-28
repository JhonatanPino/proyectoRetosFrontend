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
import ChallengeAll from "./pageadmin/ChallengeAll.jsx";
import ChallengeStore from "./pageadmin/ChallengeStore.jsx";
import ChallengeUpdate from "./pageadmin/ChallengeUpdate.jsx";
import ChallengeStoreAI from "./pageadmin/ChallengeStoreAI.jsx";
//USER
import PanelUser from "./pageuser/PanelUser.jsx";
import UserMe from "./pageuser/UserMe.jsx";
import CategoryAllUser from "./pageuser/CategoryAllUser.jsx";
import ChallengeForCategory from "./pageuser/ChallengeForCategory.jsx";
import ChallengeSolve from "./pageuser/ChallengeSolve.jsx";
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
import Dashboard from "./pageauth/Dashboard.jsx";


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
                            <Route index element={<Dashboard />} />
                            <Route path="panel" element={<PanelAdmin />} />
                            <Route path="info" element={<Dashboard />} />
                            <Route path="user" element={<UserAll />} />
                            <Route path="category" element={<CategoryAll />} />
                            <Route path="category/create" element={<CategorStore />} />
                            <Route path="category/edit/:id" element={<CategoryUpdate />} />
                            <Route path="challenge" element={<ChallengeAll />} />
                            <Route path="challenge/create" element={<ChallengeStore />} />
                            <Route path="challenge/edit/:id" element={<ChallengeUpdate />} />
                            <Route path="challenge/create/ai" element={<ChallengeStoreAI />} />
                        </Route>
                        <Route path="/user" element={<LayoutUser />}>
                            <Route index element={<Dashboard />} />
                            <Route path="panel" element={<PanelUser />} />
                            <Route path="info" element={<Dashboard />} />
                            <Route path="user" element={<UserMe />} />
                            <Route path="category" element={<CategoryAllUser />} />
                            <Route path="category/:categoryId/challenges" element={<ChallengeForCategory />} />
                            <Route path="challenge/solve/:challengeId" element={<ChallengeSolve />} />
                        </Route>            
                    </Route>
                </Routes>
            </>
        </Router>
    );
};

export default App;

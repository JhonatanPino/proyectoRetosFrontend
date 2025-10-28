import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AuthUser from '../pageauth/AuthUser';

const Sidebar = () => {
  const { getRole } = AuthUser();
  const location = useLocation(); 

  if (getRole() === 'admin') {
    return (
      <div className="col-sm-2 pt-3 pb-3">
        <div className="list-group">
          <NavLink to={`/admin/user`} className={({ isActive }) => (isActive ? "list-group-item active" : "list-group-item")}>Usuarios</NavLink>
          <NavLink to={`/admin/category`} className={({ isActive }) => (isActive ? "list-group-item active" : "list-group-item")}>Categorías</NavLink>
          <NavLink to={`/admin/challenge`} className={({ isActive }) => (isActive ? "list-group-item active" : "list-group-item")}>Retos</NavLink>
        </div>
      </div>
    );
  } else if (getRole() === 'user') {
    return (
      <div className="col-sm-2 pt-3 pb-3">
        <div className="list-group">
          <NavLink to={`/user/user`} className={({ isActive }) => (isActive ? "list-group-item active" : "list-group-item")}>Mi usuario</NavLink>
          <NavLink
            to={`/user/category`}
            className={({ isActive }) =>
              isActive && location.pathname === '/user/category' ? "list-group-item active" : "list-group-item"
            }
          >
            Categorías
          </NavLink>
          <NavLink
            to={`/user/category/:categoryId/challenges`} 
            className={({ isActive }) =>
              location.pathname.startsWith('/user/category/') && location.pathname.includes('/challenges')
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            Retos
          </NavLink>
        </div>
      </div>
    );
  }
};

export default Sidebar;
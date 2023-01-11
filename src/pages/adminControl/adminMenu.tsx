import React from 'react';

function AdminMainPage() {
  return (
    <div className="admin-control">
        <div className="admin-banner">
          <h1> Admin MENU </h1>
        </div>
        <div>
          <p className="button-menu">
              <a href={`admin_page/Admin_user`} className="admin-buttton"> User </a>
          </p>
          <p className="button-menu">
              <a href={`admin_page/Admin_sign`} className="admin-buttton"> Sign </a>
          </p>
          <p className="button-menu">
              <a href={`admin_page/Admin_node`} className="admin-buttton"> Node </a>
          </p>
          <p className="button-menu">
              <a href={`admin_page/Admin_lesson`} className="admin-buttton"> Lesson </a>
          </p>
          <p className="button-menu">
              <a href={`admin_page/Admin_course`} className="admin-buttton"> Course </a>
          </p>
        </div>
    </div>
  );
}

export default AdminMainPage;
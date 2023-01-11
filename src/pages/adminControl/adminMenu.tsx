import React from 'react';

function AdminMainPage() {
  return (
    <div className="App">
        <h1> Admin MENU </h1>
        <div>
          <p className="button-menu">
              <a href={`admin_page/user`}> User </a>
          </p>
          <p className="button-menu">
              <a href={`admin/sign`}> Sign </a>
          </p>
          <p className="button-menu">
              <a href={`admin/node`}> Node </a>
          </p>
          <p className="button-menu">
              <a href={`admin/lesson`}> Lesson </a>
          </p>
          <p className="button-menu">
              <a href={`admin_page/Admin_course`}> Course </a>
          </p>
          <p className="button-menu">
              <a href={`earth`}> Earth-Handle </a>
          </p>
        </div>
    </div>
  );
}

export default AdminMainPage;
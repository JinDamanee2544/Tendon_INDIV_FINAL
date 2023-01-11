import React, { useState } from 'react';
import './admin_page.css'
import UserInputPage from './admin_user_page';

interface showComponentModel {
  showGet: boolean,
  showUpdate: boolean,
  showDelete: boolean
}

function AdminUser() {
  const [show, setShow] = useState<showComponentModel>({showGet: false, showUpdate:false, showDelete:false})

  function submitHandle (method: string) {
    if (method === "Get") {
      setShow({showGet: !show.showGet, showUpdate: show.showUpdate, showDelete: show.showDelete})
    } else if (method === "Update") {
      setShow({showGet: show.showGet, showUpdate: !show.showUpdate, showDelete: show.showDelete})
    } else {
      setShow({showGet: show.showGet, showUpdate :show.showUpdate, showDelete: !show.showDelete})
    }
  }
  
  return (
    <div className="App">
      <div>
        <button onClick={ () => submitHandle("Get")} className="button-shown"> GET </button>
        <UserInputPage method ="GET" shown = {show.showGet} />
      </div>  
      <div> 
        <button onClick={ () => submitHandle("Update")} className="button-shown"> UPDATE </button>  
        <UserInputPage method ="UPDATE" shown = {show.showUpdate} />
      </div>
      <div>  
        <button onClick={ () => submitHandle("Delete")} className="button-shown"> DELETE </button>
        <UserInputPage method ="DELETE" shown = {show.showDelete} />
      </div> 
    </div>
  );
}

export default AdminUser;

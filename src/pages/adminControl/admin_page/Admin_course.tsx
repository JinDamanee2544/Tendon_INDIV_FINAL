import React, { useState } from 'react';
import CoursePage from './admin_course_page';

interface showComponentModel {
  showCreate: boolean,
  showGet: boolean,
  showUpdate: boolean,
  showDelete: boolean
}

function AdminCourse() {
  const [show, setShow] = useState<showComponentModel>({showCreate: false, showGet: false, showUpdate:false, showDelete:false})

  function submitHandle (method: string) {
    if (method === "Create") {
      setShow({showCreate: !show.showCreate, showGet: show.showGet, showUpdate: show.showUpdate, showDelete: show.showDelete})
    }else if (method === "Get") {
      setShow({showCreate: show.showCreate, showGet: !show.showGet, showUpdate: show.showUpdate, showDelete: show.showDelete})
    } else if (method === "Update") {
      setShow({showCreate: show.showCreate, showGet: show.showGet, showUpdate: !show.showUpdate, showDelete: show.showDelete})
    } else {
      setShow({showCreate: show.showCreate, showGet: show.showGet, showUpdate :show.showUpdate, showDelete: !show.showDelete})
    }
  }

  return (
    <div className="AdminCourse">
      <div>
        <button onClick={ () => submitHandle("Create")} className="button-shown"> CREATE </button>
        <CoursePage method="CREATE" shown = {show.showCreate} />
      </div>
      <div>
        <button onClick={ () => submitHandle("Get")} className="button-shown"> GET </button>
        <CoursePage method="GET" shown = {show.showGet} />
      </div>
      <div>
        <button onClick={ () => submitHandle("Update")} className="button-shown"> UPDATE </button>
        <CoursePage method="UPDATE" shown = {show.showUpdate} />
      </div>
      <div>
        <button onClick={ () => submitHandle("DELETE")} className="button-shown"> DELETE </button>
        <CoursePage method="DELETE" shown = {show.showDelete} />
      </div>
    </div>
  );
}

export default AdminCourse;

import React, { useState } from 'react';
import LessonPage from './admin_lesson_page';

interface showComponentModel {
  showCreate: boolean,
  showGet: boolean,
  showUpdate: boolean,
  showDelete: boolean
}

function AdminLesson() {
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
    <div className="App">
      <div>
        <button onClick={ () => submitHandle("Create")} className="button-shown"> CREATE </button>
        <LessonPage method="CREATE" shown = {show.showCreate} />
      </div>
      <div>
        <button onClick={ () => submitHandle("Get")} className="button-shown"> GET </button>
        <LessonPage method="GET" shown = {show.showGet} />
      </div>
      <div>
        <button onClick={ () => submitHandle("Update")} className="button-shown"> UPDATE </button>
        <LessonPage method="UPDATE" shown = {show.showUpdate} />
      </div>
      <div>
        <button onClick={ () => submitHandle("DELETE")} className="button-shown"> DELETE </button>
        <LessonPage method="DELETE" shown = {show.showDelete} />
      </div>
    </div>
  );
}

export default AdminLesson;

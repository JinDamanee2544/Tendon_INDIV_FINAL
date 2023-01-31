import { motion } from 'framer-motion';
import React, { useState } from 'react';
// import './admin_page.css'
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
      <motion.main className='flex flex-col gap-2 p-4 bg-slate-200 text-slate-700 dark:text-white dark:bg-gray-light rounded-lg w-[800px]'>
        <motion.main onClick={ () => submitHandle("Get")} 
        className={`text-center text-white rounded-xl p-2 items-center shadow bg-gradient-to-bl from-purple-neon to-purple-light w-[100px]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        > 
          GET
        </motion.main>
        <UserInputPage method ="GET" shown = {show.showGet} />
      </motion.main>  
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

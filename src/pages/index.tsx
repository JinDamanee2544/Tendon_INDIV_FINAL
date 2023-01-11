import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "@baseComponents/LoadingSpinner";
import MainLayout from "../components/Layout/MainLayout";
const DashBoard = dynamic(() => import("../components/Dashboard"), { suspense: true });

import { useRouter } from 'next/router'

const DashBoardPage: NextPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: '/adminControl/adminMenu'
    })
  }

  return (
    <>
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          < DashBoard />
        </Suspense>
      </MainLayout>

      <div>
        
      <button onClick={handleClick} >
        Admin Click
      </button>

      </div>
    </>
  );
};



export default DashBoardPage;

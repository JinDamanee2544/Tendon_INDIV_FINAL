import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "@baseComponents/LoadingSpinner";
import MainLayout from "@layout/MainLayout";
import { AuthProvider } from "context";
const DashBoard = dynamic(() => import("@components/dashboard"), { suspense: true });


const DashBoardPage: NextPage = () => {
  return (
    <>
      <AuthProvider>
        <MainLayout>
          <Suspense fallback={<LoadingSpinner />}>
            < DashBoard />
          </Suspense>
        </MainLayout>
      </AuthProvider>
    </>
  );
};

export default DashBoardPage;

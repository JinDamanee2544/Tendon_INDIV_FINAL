import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "@baseComponents/LoadingSpinner";
import MainLayout from "@layout/MainLayout";
const DashBoard = dynamic(() => import("@components/dashboard"), { suspense: true });

import { useRouter } from 'next/router'
import { AuthProvider } from "context/authContext";

const DashBoardPage: NextPage = () => {
  const router = useRouter();

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

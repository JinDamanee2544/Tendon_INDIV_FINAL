import { createContext, ReactNode, useContext, useEffect } from "react";
import TYPES from "linkWithBackend/interfaces/TendonType"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_services"
import SignService from "linkWithBackend/services/sign_service"
import { useRouter } from "next/router";

const authContext = createContext<any>(undefined);

export function useAuthContext() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
}

type AuthProviderProps = {
  children: ReactNode;
};

const memService = container.get<MemoryService>(TYPES.MemoryService)
const signService = container.get<SignService>(TYPES.SignService)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!signService.isTokenValid(token)) {
      router.push('/login')
    }
  }, [router])

  return (
    <authContext.Provider value={{}}>
      {children}
    </authContext.Provider>
  )
}


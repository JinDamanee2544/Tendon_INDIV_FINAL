import React, { createContext, ReactNode, useContext } from "react"
import type { Container } from "inversify"
import container from "./inversify.config"

const ContainerContext = createContext<Container | undefined>(undefined)

interface InterfaceContainerProProps {
  children: ReactNode
}

export const ContainerProviderTendon = ( { children } : InterfaceContainerProProps): JSX.Element => {
  return (
    <ContainerContext.Provider value= { container } > { children } </ContainerContext.Provider>
  )       //<MyContext.Provider value={/* some value */}>
}

export const useTendonContainer = (): Container => {
  const container = useContext(ContainerContext)
  if (!container) {
    throw new Error("Can use only in <ContainerContext.Provider> Tendon!")
  }
  return container
}
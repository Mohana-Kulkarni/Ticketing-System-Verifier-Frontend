"use client"

import { createContext, useContext, Dispatch, SetStateAction,useState, ReactNode } from "react";


interface VerifierData {
    id: string,
    name: string,
    email: string,
    govId: string,
    publicDid: string,
    walletId: string,
    trustedIssuers : string[],
  }

interface ContextProps{
    connectLoading: boolean,
    setConnectLoading: Dispatch<SetStateAction<boolean>>,
    verifierData : VerifierData | null,
    setVerifierData: Dispatch<SetStateAction<VerifierData | null>>,
    walletAddress: string,
    setWalletAddress: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    connectLoading: false,
    setConnectLoading: (): boolean=>false,
    verifierData: null,
    setVerifierData: (): VerifierData | null => null,
    walletAddress: '',
    setWalletAddress: (): string=>'',
})

interface GlobalContextProviderProps{
    children: ReactNode;
}

export const GlobalContextProvider = ({children}:GlobalContextProviderProps)=>{
    
    const [connectLoading, setConnectLoading] = useState(false);
    const [verifierData, setVerifierData] = useState<VerifierData | null>(null);
    const [walletAddress, setWalletAddress] = useState('');

    return (
        <GlobalContext.Provider value = {{connectLoading,setConnectLoading,verifierData,setVerifierData,walletAddress,setWalletAddress}}>

            {children}

        </GlobalContext.Provider>
    )
 }

 export const useGlobalContext = () => useContext(GlobalContext);
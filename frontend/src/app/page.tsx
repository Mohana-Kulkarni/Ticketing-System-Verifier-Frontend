"use client"

import IssuerProfile from "@/layouts/profiles/VerifierProfile";
import { useGlobalContext } from "./context/globalContext";
import NotRegistered from "./not-registered";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { GetVerifierById } from "@/constants/endpoints/VerifierEndpoints";


interface Data {
  id: string;
  expiresAt: number;
}

interface VerifierData {
  id: string,
  name: string,
  email: string,
  govId: string,
  publicDid: string,
  walletId: string,
  trustedIssuers : string[],
}

const Home = () => {

  const { verifierData, setVerifierData } = useGlobalContext()

  const getData = (verifierId: string): string | null => {
    const dataString: string | null = localStorage.getItem(verifierId);
    if (!dataString) return null; // No data found

    const data: Data = JSON.parse(dataString);
    if (data.expiresAt < new Date().getTime()) {

        localStorage.removeItem(verifierId);
        return null;
    }

    return data.id;
}


useEffect(()=>{
  getVerifierById();
},[])

const getVerifierById = async() =>{

  toast.loading('Please wait..')

  try{
    const id: string | null = getData('VerifierId');
    console.log("yeh hain id: ",id)
    if (id === null) {
      throw new Error("ID is null");
    }
    const response = await fetch(`${GetVerifierById}${id}`)

    if (response.ok) {
      let result = await response.json();
      console.log(result)
      let newVerifierData: VerifierData = {
        id: result.id,
        name: result.name,
        email: result.email,
        govId: result.govId,
        publicDid: result.publicDid,
        walletId: result.walletId,
        trustedIssuers : result.trustedIssuer,
      }
      setVerifierData(newVerifierData);
      toast.dismiss()
      toast.success(`Verifier fetched successfully!`)


    }
    else {
      toast.dismiss()
      toast.error('Failed to fetch Verifier')
      console.log(response)
    }

  }
  catch(error){
    toast.dismiss();
  }

}

  return (
    <>
      {verifierData ?
        <div>
          <IssuerProfile />
        </div>: <NotRegistered />
        }

    </>
  );
};

export default Home;





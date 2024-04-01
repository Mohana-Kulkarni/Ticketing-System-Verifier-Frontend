"use client"

import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import toast from "react-hot-toast";
import { SelectVerificationModeDropdown } from "./SelectVerificationModeDropdown";
import { SelectIssuersDropdown } from "./SelectIssuersDropdown";
import { GetIssuersByType } from "@/constants/endpoints/VerifierEndpoints";
import { PutVerifierById } from "@/constants/endpoints/VerifierEndpoints";


interface issuerInterface {
  name: string,
  publicDid: string,
}

interface selectedIssuersI {
  name: string,
  publicDid: string,
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

const AddTrustedIssuersModal = () => {
  const {verifierData, setVerifierData} = useGlobalContext();

  const [selectedVerificationMode, setSelectedVerificationMode] = useState<string>('');
  const [issuerData, setIssuerData] = useState<issuerInterface[]>([])
  const [selectedIssuers, setSelectedIssuers] = useState<selectedIssuersI[]>([]);

  const [verificationMode, setVerificationMode] = useState<string[]>(
    [
      'AgeVerification',
      'StudentVerification',
      'Both',
      'General',
    ]
  )

  useEffect(() => {
    if (selectedVerificationMode !== '') {
      getIssuersByType();
      setSelectedIssuers([]);
    }
  }, [selectedVerificationMode])

  useEffect(() => {
    const addIssuerModal = document.getElementById("addIssuerModal");
    const addIssuerModalOverlay = document.getElementById("addIssuerModalOverlay");
    const addIssuerModalTriggers = document.querySelectorAll(
      "[data-addissuer-trigger]",
    );

    addIssuerModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const addIssuerModal = document.getElementById("addIssuerModal");
        addIssuerModal!.classList.add("show");
      });
    });

    addIssuerModalOverlay!.addEventListener("click", function () {
      addIssuerModal!.classList.remove("show");
    });

  }, []);

  const getIssuersByType = async () => {
    try {
      const res = await fetch(`${GetIssuersByType}${selectedVerificationMode}`);
      if (!res.ok) {
        throw new Error("Failed to fetch issuers");
      }

      let result = await res.json()

      setIssuerData(result)

      console.log(result);

    } catch (error) {
      console.log("Error loading issuers: ", error);
    }
  }

  const PutVerifier = async () => {
    toast.loading('Updating Verifier..')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var issuerArray: string[] = [];
    selectedIssuers?.map((issuer) => (
      issuerArray.push(issuer.publicDid)
    ))

    var raw = JSON.stringify({
        "name": verifierData?.name,
        "email": verifierData?.email,
        "govId": verifierData?.govId,
        "trustedIssuer": issuerArray,
    });

    console.log(raw);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${PutVerifierById}${verifierData?.id}`, requestOptions)

    if (response.ok) {

      let result = await response.json();
      console.log(result)
      toast.dismiss()
      toast.success("Verifier Updated!")

      const newVerifierData: VerifierData = {
            id: String(verifierData?.id),
            name: String(verifierData?.name),
            email: String(verifierData?.email),
            govId: String(verifierData?.govId),
            publicDid: String(verifierData?.publicDid),
            walletId: String(verifierData?.walletId),
            trustedIssuers : issuerArray,
        };

      setVerifierData(newVerifierData);
      const addIssuerModal = document.getElementById("addIssuerModal");
      addIssuerModal!.classList.remove("show");

    }
    else{
        toast.dismiss();
        toast.error("Failed to update issuer data")
    }
  }

  return (

    <div id="addIssuerModal" className="search-modal">
      <div id="addIssuerModalOverlay" className="search-modal-overlay" />

      <div className="search-wrapper">
        <div className="search-wrapper-header p-8 flex gap-8 flex-col">
          <div>
            <h3 className="text-center">Add Trusted Issuers</h3>
          </div>

          <div className="flex flex-col gap-8">
            <div className=''>
              <SelectVerificationModeDropdown
                verificationMode={verificationMode}
                selectedVerificationMode={selectedVerificationMode}
                setSelectedVerificationMode={setSelectedVerificationMode}
                status={true}
              />
            </div>

            <div className=''>
              <SelectIssuersDropdown
                issuerData={issuerData}
                selectedIssuers={selectedIssuers}
                setSelectedIssuers={setSelectedIssuers}
                status={true}
              />
            </div>
          </div>

          <div className="w-full">
            <button onClick={() => {
              PutVerifier()
            }} className="w-full btn btn-primary">Add Issuers</button>
          </div>

        </div>
      </div>



    </div>

  );
};

export default AddTrustedIssuersModal;

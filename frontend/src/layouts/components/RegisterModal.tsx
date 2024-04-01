"use client"

import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { useContract, useTx, useWallet } from "useink";
import { CONTRACT_ADDRESS } from '@/constants/contract_constants/ContractAddress';
import metadata from '@/constants/contract_constants/assets/TicketingSystem.json';
import { useTxNotifications } from "useink/notifications";
import { generateHash } from "@/lib/utils/hashGenerator";
import toast from "react-hot-toast";
import { ConnectWallet } from "../web3/ConnectWallet";
import { PostVerifier } from "@/constants/endpoints/VerifierEndpoints";
import NotConnected from "@/app/not-connected";




interface VerifierData {
  id: string,
  name: string,
  email: string,
  govId: string,
  publicDid: string,
  walletId: string,
  trustedIssuers : string[],
}

interface Data {
  id: string;
  expiresAt: number;
}

const RegisterModal = () => {



  const contract = useContract(CONTRACT_ADDRESS, metadata);

  const { account, disconnect } = useWallet()

  const registerVerifier = useTx(contract, 'registerVerifier');
  useTxNotifications(registerVerifier);
  const { walletAddress, connectLoading, setConnectLoading, setVerifierData, verifierData } = useGlobalContext()

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [govId, setGovId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const registerStatus = () => {
    if (registerVerifier.status === 'Finalized') {
      let txId = "";
      registerVerifier.result?.contractEvents?.map((value) => {
        txId = Object.values(value.args[1]).slice(0, 64).join("")
      });
      toast.dismiss()
      if (txId === "") {
        toast.error("Something went wrong!")
        setFullname("");
        setEmail("");
        setGovId("");
        setPassword("")
        setConfirmPassword("")
        disconnect();
      } else {

        toast.success('Transaction finalized!')
      }
      setConnectLoading(false)
    }
    else if (registerVerifier.status === 'PendingSignature') {
      toast.dismiss()
      toast.loading('Pending signature..')
    }
    else if (registerVerifier.status === 'Broadcast') {
      toast.dismiss()
      toast.loading('Broadcasting transaction..')
    }
    else if (registerVerifier.status === 'InBlock') {
      toast.dismiss()
      toast.loading('Transaction In Block..')
    }
    else {
      toast.dismiss()
    }
  }

  useEffect(() => {
    const registerModal = document.getElementById("registerModal");
    const registerModalOverlay = document.getElementById("registerModalOverlay");
    const registerModalTriggers = document.querySelectorAll(
      "[data-register-trigger]",
    );

    registerModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const registerModal = document.getElementById("registerModal");
        registerModal!.classList.add("show");
      });
    });

    registerModalOverlay!.addEventListener("click", function () {
      registerModal!.classList.remove("show");
      toast.dismiss()
      setConnectLoading(false)
      disconnect()
    });

    registerStatus()
  }, [registerVerifier.status]);

  const saveIssuer = async () => {
    try {
      toast.loading('Registering Issuer..');

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "name": fullname,
        "email": email,
        "password": password,
        "govId": govId,
        "privateDid": "",
        "publicDid": "",
        "walletId": walletAddress,
        "trustedIssuers": []
      });

      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      let response = await fetch(`${PostVerifier}`, requestOptions)

      console.log(response)

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        let newVerifierData: VerifierData = {
          id: result.statusBody.id,
          name: fullname,
          email: email,
          govId: govId,
          publicDid: result.statusBody.publicDid,
          walletId: walletAddress,
          trustedIssuers : [],
        }
        setVerifierData(newVerifierData);
        toast.success("User Registered!")
        setFullname("");
        setEmail("");
        setGovId("");
        setPassword("");
        setConfirmPassword("");
        registerVerifier.signAndSend([result.statusBody.publicDid]);
        const registerModal = document.getElementById("registerModal");
        registerModal!.classList.remove("show");
        saveData('IssuerId', result.statusBody.id, 3600);
      } else {
        toast.dismiss()
        toast.error('Failed to register issuer')
      }
    } catch (error) {
      console.error("Error:", error);
      toast.dismiss();
      toast.error('An error occurred while registering issuer');
    }
  }


  const handleRegisterClick = async () => {
    if (fullname === "") toast.error("Please enter Full Name");
    else if (email === "") toast.error("Please enter Email");
    else if (govId === "") toast.error("Please enter Aadhar Number");
    else if (password === "") toast.error("Please enter password")
    else if (confirmPassword === "") toast.error("Please enter confirm password")
    else if (password !== confirmPassword) toast.error("Password Mismatched!")
    else if (walletAddress === "") toast.error("Please connect to wallet for wallet address")
    else {

      saveIssuer()
    }
  }

  const handleLoginHere = (e: any) => {
    e.preventDefault()
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    registerModal?.classList.remove("show");
    loginModal?.classList.add("show");
  }

  const saveData = (issuerId: string, id: string, expirationTime: number): void => {
    const data: Data = {
      id: id,
      expiresAt: new Date().getTime() + expirationTime * 1000 // expirationTime is in seconds
    };
    localStorage.setItem(issuerId, JSON.stringify(data));
  }



  return (

    <div id="registerModal" className="search-modal">
      <div id="registerModalOverlay" className="search-modal-overlay" />
      {walletAddress?
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4 h-96 overflow-y-auto overflow-x-hidden no-scrollbar"}>
            <h3 className={"mb-4"}>Register Now!</h3>
            <div className="mx-auto mb-4 w-full sm:px-4 md:px-8 lg:px-12">
              <div className="flex flex-col gap-6">
                <div className={"grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2  gap-4 w-full"}>

              
                  <div className="w-full">
                    <label htmlFor="title" className="form-label block">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="form-input w-full"
                      placeholder="Enter your full name"
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="title" className="form-label block">
                      Email
                    </label>
                    <input
                      id="Email"
                      name="Email"
                      className="form-input w-full"
                      placeholder="Enter your email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="title" className="form-label block">
                      Adhar Number
                    </label>
                    <input
                      id="govId"
                      name="govId"
                      className="form-input w-full"
                      placeholder="Enter your adhar number"
                      type="text"
                      value={govId}
                      onChange={(e) => setGovId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="w-full mb-4">
                    <label htmlFor="title" className="form-label block">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      className="form-input w-full"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label htmlFor="title" className="form-label block">
                      Confirm Password
                    </label>
                    <input
                      id="cpassword"
                      name="cpassword"
                      className="form-input w-full"
                      placeholder="Re-enter your password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4 lg:col-span-2 md:col-span-2">
                    <label htmlFor="title" className="form-label block">
                      Wallet Address
                    </label>
                    <input
                      disabled
                      id="wallet-address"
                      name="wallet-address"
                      className="form-input-disable w-full"
                      value={walletAddress}
                      type="text"
                      required
                    />
                  </div>

                </div>

              </div>
            </div>
            <div className="w-full sm:px-4 md:px-8 lg:px-12">
              <button type="submit" onClick={handleRegisterClick} className={"btn btn-primary w-full"}>
                <h5 className={"text-white dark:text-dark flex justify-center"}>Register</h5>
              </button>
            </div>

            <div>
              <p>Already have an account? <button
                className="underline font-semibold"
                onClick={handleLoginHere}> Login Here</button>
              </p>
            </div>
          </div>
        </div>
      </div>:<div className="search-wrapper"><div className="search-wrapper-header"><NotConnected/></div></div>
      }

      
    </div>

  );
};

export default RegisterModal;
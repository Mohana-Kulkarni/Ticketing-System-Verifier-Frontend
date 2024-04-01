"use client"

import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { useContract, useTx, useWallet } from "useink";
import { CONTRACT_ADDRESS } from '@/constants/contract_constants/ContractAddress';
import metadata from '@/constants/contract_constants/assets/TicketingSystem.json';
import { useTxNotifications } from "useink/notifications";
import { generateHash } from "@/lib/utils/hashGenerator";
import toast from "react-hot-toast";
import Link from "next/link";
import { PostLogin } from "@/constants/endpoints/VerifierEndpoints";



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

const LoginModal = () => {



  const { walletAddress, connectLoading, setConnectLoading, setVerifierData, verifierData } = useGlobalContext()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  useEffect(() => {
    const loginModal = document.getElementById("loginModal");
    const loginModalOverlay = document.getElementById("loginModalOverlay");
    const loginModalTriggers = document.querySelectorAll(
      "[data-login-trigger]",
    );

    loginModalTriggers.forEach((button) => {
      button.addEventListener("click", function () {
        const loginModal = document.getElementById("loginModal");
        loginModal!.classList.add("show");
      });
    });

    loginModalOverlay!.addEventListener("click", function () {
      loginModal!.classList.remove("show");
      toast.dismiss()
      setConnectLoading(false)
    });


  }, [verifierData]);

  const logIn = async () => {
    toast.loading("Logging In..")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password,
    });

    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${PostLogin}`, requestOptions)
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
      toast.success(`You are Logged In as ${result.name}`)
      setEmail("");
      setPassword("");
      const loginModal = document.getElementById("loginModal");
      loginModal!.classList.remove("show");
      saveData('IssuerId',result.id,3600);
    }
    else {
      toast.dismiss()
      toast.error('Failed to LogIn')
      console.log(response)
    }
  }

  const saveData = (issuerId: string, id: string, expirationTime: number): void => {
    const data: Data = {
      id: id,
      expiresAt: new Date().getTime() + expirationTime * 1000 // expirationTime is in seconds
    };
    localStorage.setItem(issuerId, JSON.stringify(data));
  }




  const handleLoginClick = async () => {
    if (email === "") toast.error("Please enter email");
    else if (password === "") toast.error("Please enter password");
    else {
      logIn()

    }
  }

  const handleRegisterNow = (e: any) => {
    e.preventDefault()
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    loginModal?.classList.remove("show");
    registerModal?.classList.add("show");
  }


  return (
    <div id="loginModal" className="search-modal">
      <div id="loginModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <div className={"flex flex-col items-center gap-4 h-[425px] overflow-y-auto overflow-x-hidden no-scrollbar"}>
            <h3 className={"mb-4"}>Login</h3>
            <div className="mx-auto mb-4 w-full sm:px-4 md:px-8 lg:px-12">
              <div className="flex flex-col gap-6">
                <div className={"flex flex-col w-full"}>

                  <div className="w-full mb-4">
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
                </div>

              </div>
            </div>
            <div className="w-full sm:px-4 md:px-8 lg:px-12">
              <button type="submit" onClick={handleLoginClick} className={"btn btn-primary w-full"}>
                <h5 className={"text-white dark:text-dark flex justify-center"}>Login</h5>
              </button>
            </div>
            <div>
              <p>Not registered yet? <button
                className=" underline font-semibold"
                onClick={handleRegisterNow}> Register Now! </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
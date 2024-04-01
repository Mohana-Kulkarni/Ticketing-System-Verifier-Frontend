"use client"

import Accordion from "@/shortcodes/Accordion"
import { useEffect, useState } from "react";
import PastHostingsCard from "@/components/PastHostingsCard";
import { useGlobalContext } from "@/app/context/globalContext";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PendingRequestsCard from "@/components/PendingRequestsCard";
import IssuerProfileSettings from "@/components/IssuerProfileSettings";
import RejectedRequestsCard from "@/components/RejectedRequestsCard";
import VerifiableCredentialsCard from "@/components/VerifiableCredentialsCard";



const VerifierProfile = () => {

    const { verifierData, setVerifierData } = useGlobalContext();
    const router = useRouter();
    const [tab, setTab] = useState('Pending Requests')



    return (
        <div className="section-sm">
            <div className="container">
                <div className="row">
                    <div className="grid grid-cols-3">
                        <div className="lg:hidden flex col-span-3">
                            <Accordion title={tab} className="w-full">
                                <aside className="w-full px-3 relative">
                                    <div className="lg:sticky lg:top-28 h-fit w-full px-3 py-4 overflow-y-auto bg-theme-light dark:bg-darkmode-theme-light rounded-lg  lg:border lg:border-border lg:dark:border-darkmode-border">
                                        <ul className="space-y-2 font-medium">

                                            <li>

                                            <div className="flex flex-col items-center p-2 gap-2 rounded-lg">

                                                <div className="w-44 h-44 overflow-hidden rounded-full bg-yellow-900 flex items-center justify-center">
                                                    <h1 className="text-white text-8xl pt-2">{verifierData?.name[0]}</h1>
                                                </div>

                                                <span className="text-xl">{verifierData?.name}</span>

                                            </div>

                                            </li>



                                            <div className="py-4">
                                                <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                                            </div>


                                            <li>
                                                <button onClick={() => setTab('Pending Requests')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Pending Requests' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Pending Requests</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('Issued Requests')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Issued Requests' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Issued Requests</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('Rejected Requests')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Rejected Requests' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Rejected Requests</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button onClick={() => setTab('Profile Settings')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Profile Settings' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                    <span className="">Profile Settings</span>
                                                    <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>



                                        </ul>
                                    </div>
                                </aside>

                            </Accordion>
                        </div>
                        <div className="hidden lg:contents">

                            <aside className="w-full px-3 relative">
                                <div className="lg:sticky lg:top-28 h-fit w-full px-3 py-4 overflow-y-auto bg-theme-light dark:bg-darkmode-theme-light rounded-lg  lg:border lg:border-border lg:dark:border-darkmode-border">
                                    <ul className="space-y-2 font-medium">

                                        <li>

                                            <div className="flex flex-col items-center p-2 gap-2 rounded-lg">

                                                <div className="w-44 h-44 overflow-hidden rounded-full bg-yellow-900 flex items-center justify-center">
                                                    <h1 className="text-white text-8xl pt-2">{verifierData?.name[0]}</h1>
                                                </div>

                                                <span className="text-xl">{verifierData?.name}</span>

                                            </div>

                                        </li>

                                        <div className="py-4">
                                            <hr className="h-px w-full dark:bg-gray-600 border-0 bg-gray-200" />
                                        </div>


                                        <li>
                                            <button onClick={() => setTab('Scan Tickets')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Pending Requests' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                <span className="">Scan Tickets</span>
                                                <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </li>

                                        <li>
                                            <button onClick={() => setTab('Trusted Issuers')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Issued Requests' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                <span className="">Trusted Issuers</span>
                                                <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </li>

                                        <li>
                                            <button onClick={() => setTab('Profile Settings')} className={`w-full flex items-center justify-between px-6 py-2 text-gray-900 rounded-lg dark:text-white ${tab === 'Profile Settings' ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 group`}>

                                                <span className="">Profile Settings</span>
                                                <span className="inline-flex items-center justify-center text-sm font-medium text-gray-800 rounded-full dark:text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </li>



                                    </ul>
                                </div>
                            </aside>


                        </div>

                        <div className="col-span-3 lg:col-span-2 ">



                            {
                                tab === 'Scan Tickets' ? (

                                    <div className={'flex items-center h-full flex-col'}>
                                            <PendingRequestsCard />

                                    </div>

                                ) : (
                                    tab === 'Trusted Issuers' ? (
                                        <div className="flex items-center h-full flex-col">
                                            <VerifiableCredentialsCard />
                                        </div>

                                    ) : (

                                            tab === 'Profile Settings' ? (
                                                <div className="flex justify-center items-center flex-wrap">

                                                    <IssuerProfileSettings
                                                        id={issuerData?.id}
                                                        did={issuerData?.publicDid}
                                                        name={issuerData?.name}
                                                        email={issuerData?.email}
                                                        govId={issuerData?.govId}
                                                        type={issuerData?.type}
                                                        walletId={issuerData?.walletId}
                                                        setIssuerData = {setIssuerData}
                                                    />


                                                </div>

                                                ) : ''
                                            )
                                        )

                                )
                            }

                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default IssuerProfile;

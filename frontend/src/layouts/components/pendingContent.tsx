import React, { useState } from 'react'
import { MdOutlineCreditCardOff } from "react-icons/md";
import { MdOutlineCreditScore } from "react-icons/md";
import Image from "next/image";
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/app/context/globalContext';
import { PostIssueVC, PutRejectRequest } from '@/constants/endpoints/IssuerEndpoints';
import Link from 'next/link';

interface User {
    id: string;
    userDid: string;
    firstName: string;
    lastName: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    placeOfBirth: string;
    proofId: string;
    docType: string;
}

interface UserCardProps {
    user: User,
    userList: User[],
    setUserList:React.Dispatch<React.SetStateAction<User[]>>,
}

const PendingContent: React.FC<UserCardProps> = ({ user, userList, setUserList }) => {

    const [toggle, setToggle] = useState(false);

    function truncateString(str: string, maxLength: number) {
        return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    }

    const {issuerData} = useGlobalContext();

    const handleCardClick = () => {
        setToggle(!toggle);
    }

    const handleRejectRequest = async() => {
            toast.loading("Rejecting request..", {id: "UpdateUserLoading"})
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "userId": user.id,
              "issuerDid" : issuerData?.publicDid,
            });

            console.log(raw);

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
            };

            let response = await fetch(`${PutRejectRequest}`, requestOptions)

            console.log(response);

            if (response.ok) {
              toast.dismiss();
              let result = await response.json();
              console.log(result);
              toast.success("Request rejected Successfully!", {id: "UserUpdateSuccess"});
              setUserList(userList.filter(newUser => newUser.id !== user.id));
            } else {
              toast.error("Something went wrong!", {id: "UserUpdateFailure"});
            }
    }

    const handleAcceptRequest = async() => {
        toast.loading("Issuing VC..", {id: "UpdateUserLoading"})
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "userId": user.id,
          "issuerDid" : issuerData?.publicDid,
        });

        console.log(raw);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        let response = await fetch(`${PostIssueVC}`, requestOptions)

        console.log(response);

        if (response.ok) {
          toast.dismiss();
          let result = await response.json();
          console.log(result);
          toast.success("VC Issued Successfully!", {id: "UserUpdateSuccess"});
          setUserList(userList.filter(newUser => newUser.id !== user.id));
        } else {
          toast.error("Something went wrong!", {id: "UserUpdateFailure"});
        }
    }

    return (

        <div key={user.userDid} className="mb-4 flex">
            <div onClick={handleCardClick} className={`rounded-l-lg bg-white dark:bg-darkmode-theme-light py-6 pl-6 pr-4 shadow-md h-full w-auto w-full`}>

                <div className="flex rounded overflow-hidden h-auto gap-4 items-center">
                    <Link
                      href={`${user.proofId}`}
                      target='_blank'
                    >
                      <div className="lg:w-[200px] lg:h-[175px] rounded overflow-hidden object-cover hover:opacity-60">
                          <Image
                            src={user.proofId}
                            width={1000}
                            height={1000}
                            alt='Preview'
                            className={"object-cover h-full w-full"}
                          />
                      </div>
                    </Link>

                    <div className="">
                        <div className="flex gap-2 flex-col">
                            <div>First Name : {user.firstName}</div>
                            <div>Last Name : {user.lastName}</div>
                            <div>Gender : {user.gender} </div>
                            <div>User Did : {user.userDid} </div>
                            <div>Date Of Birth : {user.dateOfBirth} </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className='flex flex-col justify-end rounded-r-lg overflow-hidden'>
                <button
                  className='bg-green-500 text-white p-6 h-full cursor-pointer items-center hover:bg-green-700'
                  onClick= {() => {
                    handleAcceptRequest()
                  }}
                >
                     <div className=''>
                        <MdOutlineCreditScore size={30}/>
                    </div>
                </button>

                <button
                  className='bg-red-500 text-white p-6 h-full cursor-pointer items-center hover:bg-red-700'
                  onClick= {() => {
                    handleRejectRequest()
                  }}
                >
                     <div className=''>
                        <MdOutlineCreditCardOff size={30}/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default PendingContent;

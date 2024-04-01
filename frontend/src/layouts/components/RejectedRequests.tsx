import React, { useState } from 'react';
import Image from "next/image";
import { FaIdCard } from "react-icons/fa";

interface Details {
  userDid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}


interface DetailsCardProps {
  user: Details;
}

const RejectedRequests: React.FC<DetailsCardProps> = ({ user }) => {

  const [toggle, setToggle] = useState(false);

  function truncateString(str: string, maxLength: number) {
      return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }



  const handleCardClick = () => {
      setToggle(!toggle);
  }



  return (

      <div key={user.userDid} className="mb-4">
          <div onClick={handleCardClick} className={`rounded-lg bg-white dark:bg-darkmode-theme-light p-8 shadow-md h-full w-auto`}>

              <div className="flex gap-4 rounded overflow-hidden h-auto items-center">
                  <div className="h-auto">
                    <FaIdCard size={60}/>
                  </div>
                  <div className="">
                      <div className="flex flex-col gap-1">
                        <div className='flex justify-between mb-1'>
                          <div className='text-lg'><span>Name :</span> {user.firstName} {user.lastName}</div>
                          <div className='mr-2'><span>DOB :</span> {user.dateOfBirth} </div>
                        </div>
                        <div><span>User Did :</span> {user.userDid} </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>



  )
}

export default RejectedRequests;

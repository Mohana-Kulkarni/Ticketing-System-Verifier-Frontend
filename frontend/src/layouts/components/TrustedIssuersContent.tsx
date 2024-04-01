import React, { useState } from 'react';
import Image from "next/image";
import { RiShieldUserFill } from "react-icons/ri";

interface Issuer {
  name : string;
  type : string;
  issuerDid : string;
}


interface IsusuersCardProps {
  issuer: Issuer;
}

const TrustedIssuersContent: React.FC<IsusuersCardProps> = ({ issuer }) => {

  const [toggle, setToggle] = useState(false);

  function truncateString(str: string, maxLength: number) {
      return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }



  const handleCardClick = () => {
      setToggle(!toggle);
  }



  return (

      <div key={issuer.issuerDid} className="mb-4">
          <div onClick={handleCardClick} className={`rounded-lg bg-white dark:bg-darkmode-theme-light p-8 shadow-md h-full w-auto ${!toggle?'dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer':''}  `}>

              <div className="flex gap-4 rounded overflow-hidden h-auto items-center">
                  <div className="h-auto">
                  <RiShieldUserFill size={60}/>
                  </div>
                  <div className="w-5/6">
                      <div className="flex flex-col ms-2 ">
                      <div className='flex justify-between mb-1'>
                        <div className='text-lg font-bold'>{issuer.name}</div>
                        <div className=''>Type : {issuer.type} </div>
                      </div>
                        <div>{issuer.issuerDid} </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>



  )
}

export default TrustedIssuersContent;

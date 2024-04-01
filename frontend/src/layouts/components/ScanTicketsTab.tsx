"use client"

import { useGlobalContext } from '@/app/context/globalContext';
import { PutVerifierById } from '@/constants/endpoints/VerifierEndpoints';
import React, { useEffect, useState, useRef, SetStateAction, Dispatch } from 'react';
import toast from 'react-hot-toast';
import { Html5QrcodeScanner } from "html5-qrcode";
import { GetQrScanResult } from '@/constants/endpoints/VerifierEndpoints';
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserForbidFill } from "react-icons/ri";

const ScanTicketsTab = () => {
  const [scanResult, setScanResult] = useState<string>('');
  const [vcId, setVcId] = useState<string>('');
  const [nftId, setNftId] = useState<string>('');
  const [ticketId, setTicketId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const { verifierData } = useGlobalContext();

  useEffect (() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 5,
    }, false);

    const success = (result: any) => {
      setScanResult(result);
    }

    const error = (err: any) => {
      console.warn(err);
    }

    scanner.render(success, error);

    // cleanup function when component will unmount
    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [])

  const fetchTicketResult = async (embVcId: string, embTicketId: string, embNftId: string) => {
    var requestOptions = {
      method: 'GET',
    };
    toast.loading("Checking Ticket Entry..", {
      id: "eventDetails"
    });
    try {
      let response = await fetch(`${GetQrScanResult}id=${verifierData?.id}&vcId=${embVcId}&ticketId=${embTicketId}&nftId=${embNftId}`, requestOptions)
      if (response.status != 404) {
        toast.dismiss();
        let result = await response.json();
        console.log(result);
        setStatus(result.result);
        toast.success("Ticket Entry Result Fetched Successfully!", {
          id: "eventDeatilsSuccess"
        })
      } else {
        toast.dismiss()
        toast.error("Something went wrong!");
      }
    } catch (e) {
      toast.dismiss()
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    if (scanResult !== '') {
      console.log(scanResult);
      let embededData = scanResult.split(',');
      let embededDataTrim = embededData.map((data) => {
        return data.trim();
      })
      setVcId(embededDataTrim[0]);
      setTicketId(embededDataTrim[1]);
      setNftId(embededDataTrim[2]);
      fetchTicketResult(embededDataTrim[0], embededDataTrim[1], embededDataTrim[2]);
    }
  }, [scanResult])

  return (
    <div className={"flex flex-col gap-4 w-full items-center"}>
      <div className={`rounded-lg ${status === '' && 'bg-white dark:bg-darkmode-theme-light'}  p-4 shadow-md h-fit w-auto w-full ${status === 'pass' ? 'bg-green-500' : 'bg-red-500'}`}>
        {status !== '' ?
          <div className={"flex gap-4 items-center justify-center"}>
            <div>
              {status === 'pass' ?
                <RiUserFollowFill className={"text-white"} size={60} /> :
                <RiUserForbidFill className={"text-white"} size={60} />
              }
            </div>

            <div className={"flex flex-col text-white"}>
              <div className={"flex justify-between"}>
                <p>Ticket Id: {ticketId}</p>
                <p>NFT Id: {nftId}</p>
              </div>
              <p>VC Id: {vcId}</p>
            </div>

            <div>

            </div>
          </div>
          :
          <div>
            <h4 className="text-center">No Tickets Scanned Yet!!</h4>
          </div>
        }
      </div>


      <div id="reader" className={"rounded w-full"}></div>
    </div>
  );
};

export default ScanTicketsTab;



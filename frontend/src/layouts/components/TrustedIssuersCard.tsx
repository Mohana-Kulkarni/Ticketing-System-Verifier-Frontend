import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetVerifierById, GetIssuersByPublicDid } from "@/constants/endpoints/VerifierEndpoints";
import { useGlobalContext } from "@/app/context/globalContext";
import TrustedIssuersContent from "./TrustedIssuersContent";

interface IssuerProps {
  name : string;
  type : string;
  issuerDid : string;
}


const TrustedIssuersCard = () => {
  const router = useRouter();
  const {verifierData} = useGlobalContext();
  const [issuers, setIssuers] = useState<IssuerProps[]>([]);
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerProps | null>(null);

  // const userData: UserProps= {
  //     userDid: "userDid",
  //     firstName: "firstName",
  //     lastName: "lastName",
  //     address: "address",
  //     dateOfBirth: "dateOfBirth",
  //     gender: "gender",
  //     placeOfBirth: "placeOfBirth",
  //     proofId: "proofId",
  //     docType: "docType",
  // };
  
  useEffect(() => {
      fetchUserDetails();
  }, []);

  const addTrustedIssuer = async() => {
    
  }

  const getIssuersDetails = async () => {
    toast.loading("Fetching Issuers..", {id: "UpdateUserLoading"})
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "issuersDid" : verifierData?.trustedIssuers,
    });

    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${GetIssuersByPublicDid}`, requestOptions)

    console.log(response);

    if (response.ok) {
      toast.dismiss();
      let result = await response.json();
      console.log(result);

      const issuerData: IssuerProps[] = result.map((data: any) => ({
            name : data.name,
            type : data.type,
            issuerDid: data.publicDid,
        }));

        setIssuers(issuerData);
        toast.dismiss();
        toast.success('Trusted Issuers fetched successfully!');
        } else {
            toast.dismiss();
            toast.error('Failed fetching trusted issuers');
        }

    }
  
  const fetchUserDetails = async () => {
      toast.dismiss()
      toast.loading('Fetching pending requests')

      try {
          const res = await fetch(`${GetVerifierById}${verifierData?.id}`);
          const result = await res.json();

          getIssuersDetails();

      } catch (error) {
          console.error("Error loading venues", error);
          toast.dismiss();
          toast.error('Failed fetching trsuted issuers');
      }
  };




  return (
      <>
          {issuers.length > 0 ?
          issuers.map((issuer) => (
              <div key={issuer.issuerDid}>
                  <TrustedIssuersContent issuer={issuer} />
              </div>

          )) :
            <div className="flex flex-col text-center items-center justify-center h-full"> 
                <h3>No Rejected Requests!!!</h3>
                <p className="mt-3">There are no current rejected requests available to show.</p>
                <button className="" onClick={addTrustedIssuer}>Add New Issuer</button>
            </div>
       }
      </>
  );
}

export default TrustedIssuersCard;
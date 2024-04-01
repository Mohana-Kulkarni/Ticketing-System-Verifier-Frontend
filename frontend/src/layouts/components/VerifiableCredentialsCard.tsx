import { useRouter } from "next/navigation";
import { MdRemoveRedEye } from "react-icons/md";
import { GetIssuedRequests, GetPendingRequests } from "@/constants/endpoints/IssuerEndpoints";
import { useGlobalContext } from "@/app/context/globalContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PendingContent from "./pendingContent";
import VerifiableCredentials from "./VerifiableCredentials";


interface VCDetailsProps {
  name: string,
  vcId: string,
  type: string,
  issue_date: string,
  expiry_date: string,
}

const VerifiableCredentialsCard = () => {
    const router = useRouter();
    const {issuerData} = useGlobalContext();
    const [vcs, setVCs] = useState<VCDetailsProps[]>([]);
    const [selectedVC, setSelectedVC] = useState<VCDetailsProps | null>(null);

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

    const fetchUserDetails = async () => {
        toast.dismiss()
        toast.loading('Fetching Issued VCs')

        try {
            const res = await fetch(`${GetIssuedRequests}${issuerData?.id}`);
            const result = await res.json();
            console.log(result);
            if (res.ok) {
                const vcData: VCDetailsProps[] = result.map((data: any) => ({
                  name: `${data.details.firstName} ${data.details.lastName}`,
                  vcId: data.id,
                  type: data.proof.proofPurpose,
                  issue_date: data.issuanceDate,
                  expiry_date: data.expirationDate,
                }));

                setVCs(vcData);
                toast.dismiss();
                toast.success('Issued VCs fetched successfully!');
            } else {
                // console.error("Error loading venues");
                toast.dismiss();
                toast.error('Failed fetching issued VCs requests');
            }
        } catch (error) {
            // console.error("Error loading venues", error);
            toast.dismiss();
            toast.error('Failed fetching Issued VCs');
        }
    };




    return (
        <>

            {vcs.length > 0 ?
              <div className={"flex items-center flex-col gap-4"}>
                {vcs.map((vc) => (
                    <div key={vc.vcId}>
                        <VerifiableCredentials vc={vc} />
                    </div>

                ))}
              </div>
            :
              <div className="flex flex-col text-center items-center justify-center h-full">
                  <h3>No Issued VCs!!!</h3>
                  <p className="mt-3">There are no current issued VCs available to show.</p>
              </div>
            }
        </>
    );
};

export default VerifiableCredentialsCard;

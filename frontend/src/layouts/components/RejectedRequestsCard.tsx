import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {GetRejectedRequests } from "@/constants/endpoints/IssuerEndpoints";
import { useGlobalContext } from "@/app/context/globalContext";
import RejectedRequests from "./RejectedRequests";


interface UserProps {
  userDid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

const RejectedRequestsCard = () => {
  const router = useRouter();
  const {issuerData} = useGlobalContext();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

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
      toast.loading('Fetching pending requests')

      try {
          const res = await fetch(`${GetRejectedRequests}${issuerData?.id}`);
          const result = await res.json();

          if (res.ok) {
              const userData: UserProps[] = result.map((data: any) => ({
                  userDid: data.userDid,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  dateOfBirth: data.dateOfBirth
              }));

              setUsers(userData);
              toast.dismiss();
              toast.success('Rejected requests fetched successfully!');
          } else {
              console.error("Error loading venues");
              toast.dismiss();
              toast.error('Failed fetching rejected requests');
          }
      } catch (error) {
          console.error("Error loading venues", error);
          toast.dismiss();
          toast.error('Failed fetching rejected requests');
      }
  };




  return (
      <>
          {users.length > 0 ?
          users.map((user) => (
              <div key={user.userDid}>
                  <RejectedRequests user={user} />
              </div>

          )) :
            <div className="flex flex-col text-center items-center justify-center h-full">
                <h3>No Rejected Requests!!!</h3>
                <p className="mt-3">There are no current rejected requests available to show.</p>
            </div>
       }
      </>
  );
};

export default RejectedRequestsCard;

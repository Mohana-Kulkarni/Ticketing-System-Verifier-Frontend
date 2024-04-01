import { useRouter } from "next/navigation";
import { MdRemoveRedEye } from "react-icons/md";
import { GetPendingRequests } from "@/constants/endpoints/IssuerEndpoints";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import toast from "react-hot-toast";
import PendingContent from "./pendingContent";


interface UserProps {
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

const PendingRequestsCard = () => {
    const router = useRouter();
    const {issuerData} = useGlobalContext();
    const [users, setUsers] = useState<UserProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        toast.dismiss()
        toast.loading('Fetching pending requests')
        //
        try {
            const res = await fetch(`${GetPendingRequests}${issuerData?.id}`);
            const result = await res.json();

            console.log(result);
            if (res.ok) {
                const userData: UserProps[] = result.map((data: any) => ({
                    id: data.id,
                    userDid: data.userDid,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender,
                    placeOfBirth: data.placeOfBirth,
                    proofId: data.proofId,
                    docType: data.docType,
                }));

                setUsers(userData);
                toast.dismiss();
                toast.success('Pending requests fetched successfully!');
            } else {
                console.error("Error loading venues");
                toast.dismiss();
                toast.error('Failed fetching pending requests');
            }
        } catch (error) {
            console.error("Error loading venues", error);
            toast.dismiss();
            toast.error('Failed fetching pending requests');
        }
    };




    return (
        <>

            {
                users.length > 0 ?
                users.map((user) => (
                    <div key={user.userDid}>
                        <PendingContent
                          user={user}
                          userList={users}
                          setUserList={setUsers}
                        />
                    </div>

                ))
                : <div className="flex flex-col text-center items-center justify-center h-full">
                    <h3>No Pending Requests!!!</h3>
                    <p className="mt-3">There are no pending requests available to show.</p>
                 </div>}
        </>
    );
};

export default PendingRequestsCard;

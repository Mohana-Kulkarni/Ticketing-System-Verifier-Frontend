import { IoSchoolOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { RiGovernmentLine } from "react-icons/ri";
import { TbShieldCheckFilled } from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";

interface VCDetailsProps {
  name: string;
  vcId: string;
  type: string;
  issue_date: string;
  expiry_date: string;
}
interface VCCardProps {
  vc : VCDetailsProps;
}
const VerifiableCredentials: React.FC<VCCardProps> = ({vc}) => {
  console.log(vc);

  function formatDate(inputDate: any) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dateParts = inputDate.split(' ')[0].split('-');
    const year = parseInt(dateParts[0]);
    const monthIndex = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    const monthName = months[monthIndex];

    return `${monthName} ${day}, ${year}`;
  }

  return (
    <div className="w-fit rounded-xl bg-gradient-r shadow-xl ring-1 ring-black/10 p-8">
      <div className="w-full flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              {vc.type === 'AgeVerification' &&
                <RiGovernmentLine className="text-black dark:text-white" size={45} />
              }

              {vc.type === 'StudentVerification' &&
                <IoSchoolOutline className="text-black dark:text-white" size={45} />
              }

              {vc.type === 'Both' &&
                <BsBuilding className="text-black dark:text-white" size={45} />
              }

              {vc.type === 'General' &&
                <IoHomeOutline className="text-black dark:text-white" size={45} />
              }
            </div>

            <div>
              {vc.type === 'AgeVerification' &&
                <h5>Government ID</h5>
              }

              {vc.type === 'StudentVerification' &&
                <h5>Student ID</h5>
              }

              {vc.type === 'Both' &&
                <h5>Common ID</h5>
              }

              {vc.type === 'General' &&
                <h5>General ID</h5>
              }
              <p>{vc.name}</p>
            </div>
          </div>

          <div>
            <TbShieldCheckFilled className="text-green-400" size={30}/>
          </div>
        </div>

        <div>
          <h4>Verified Credential Id</h4>
          <p className="h5">{vc.vcId}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <h6>Issuance Date</h6>
            <p className="h6">{formatDate(vc.issue_date)}</p>
          </div>

          <div>
            <h6>Expiration Date</h6>
            <p className="h6">{formatDate(vc.expiry_date)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifiableCredentials;

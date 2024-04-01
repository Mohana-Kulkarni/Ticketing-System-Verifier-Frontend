// components/ImageModal.tsx

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ImageModalProps {
    imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl }) => {



    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const registerModal = document.getElementById("registerModal");
        const registerModalOverlay = document.getElementById("registerModalOverlay");
        const registerModalTriggers = document.querySelectorAll(
            "[data-register-trigger]",
        );

        registerModalTriggers.forEach((button) => {
            button.addEventListener("click", function () {
                const registerModal = document.getElementById("registerModal");
                registerModal!.classList.add("show");
            });
        });

        registerModalOverlay!.addEventListener("click", function () {
            registerModal!.classList.remove("show");
            toast.dismiss()
            // setConnectLoading(false)
            // disconnect()
        });

        // registerStatus()
    }, []);



    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={toggleModal} className="text-blue-600 underline hover:text-blue-800">View Document</button>
            {isOpen &&
                <div id="registerModal" className="search-modal">
                    <div id="registerModalOverlay" className="search-modal-overlay" />
                    <div className="search-wrapper">
                        <div className="search-wrapper-header">
                            <div className={"flex flex-col items-center gap-4 h-96 overflow-y-auto overflow-x-hidden no-scrollbar"}>



                                <img src={imageUrl} alt="Document" className="w-full" />
                                <button onClick={toggleModal} className="mt-4 block w-full text-center text-blue-600 underline hover:text-blue-800">Close</button>

                            </div>

                        </div>
                    </div>
                </div>


            }
        </>

    );

};

export default ImageModal;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export default function Contact() {
   return (
   <div className="flex w-full h-full ">
      <div className="flex-none flex-col justify-items-start w-1/2">
         <h1 className="text-4xl font-sans font-bold mx-10 my-10">How can we help?</h1>
         <h1 className="text-3xl font-sans font-medium mx-10">We&apos;re here to help and support you! Whether you have questions about our courses, 
            need technical assistance, or want to provide feedback, feel free to reach out to us. 
            Our team is dedicated to making your experience as smooth and enriching as possible.
         </h1>
         <div className="text-2xl font-sans font-medium my-10 mx-10">
            <div className="flex flex-row py-3 ">
               <FontAwesomeIcon icon={faLocationDot} className="h-10 w-10 text-white hover:text-red-800 transition duration-200 ease-in-out mr-5" />
               <h1 className="italic">: 123 street, Phnom Penh, Cambodia</h1>
            </div>
            <div className="flex flex-row py-3 ">
               <FontAwesomeIcon icon={faEnvelope} className="h-10 w-10 text-white hover:text-red-800 transition duration-75 ease-in-out mr-5" />
               <h1 className="italic hover:underline hover:text-blue-500">: kayvika@gmail.com</h1>
            </div>
            <div className="flex flex-row py-3 ">
               <FontAwesomeIcon icon={faPhone} className="h-10 w-10 text-white hover:text-red-800 transition duration-75 ease-in-out mr-5" />
               <h1 className="italic">: +855 12 345 678</h1>
            </div>
            <div className="flex flex-row py-3 ">
               <FontAwesomeIcon icon={faClock} className="h-10 w-10 text-white hover:text-red-800 transition duration-75 ease-in-out mr-5" />
               <h1 className="italic">: Mon - Sat: 8am - 6pm</h1>
            </div>
         </div>
      </div>
      <div className="mx-10 my-10 w-1/2 border-8 bg-blue-300 border-purple-500 flex-initial p-8 rounded-lg">
         <Image src="/pictures/contact us.jpeg" alt="contact" width={800} height={800} className="transform hover:scale-105  transition duration-75 ease-linear"/>
      </div>
   </div>
   );
}
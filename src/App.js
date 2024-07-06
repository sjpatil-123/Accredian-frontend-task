// App.js

import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
function App() {
  var uname = useRef('');
  var uemail = useRef('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };


  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(uname.current.value, uemail.current.value);
    try {
      axios.post("https://accredian-backend-task-tbmt.onrender.com/createReferal", {
        referalname: uname.current.value,
        referalemail: uemail.current.value,
      }).then((response) => {
        setIsModalOpen(false);
        toast.success("Thank you for refering");
        console.log(response.data);
      }).catch((error) => {
        toast.error(error.message);
      })
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      {
        !isModalOpen ? (

          <div className="bg-gray-900 text-white h-[100vh]">
            <div className="container mx-auto px-6 md:px-0">
              <div className=" mx-auto text-center shadow-lg shadow-white py-10 px-2">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  Refer & Earn Rewards
                </h1>
                <p className="text-lg md:text-xl mb-12">
                  Refer your friends to unlock rewards!
                </p>
                <button
                  onClick={openModal}
                  className="bg-indigo-50 hover:bg-neutral-300 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Refer Now
                </button>
              </div>
            </div>
          </div>
        ) :
          (
            <>
              <div className='bg-sky-200 h-[100vh] py-20'>
                <form class="bg-slate-800 p-20 mt-20 rounded-xl max-w-sm mx-auto" onSubmit={handlesubmit}>
                  <div class="mb-5">
                    <label for="text" class="block mb-2 text-sm font-medium text-white  dark:text-white">Referal Name</label>
                    <input type="text" ref={uname} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div class="mb-5">
                    <label for="text" class="block mb-2 text-sm font-medium text-white  dark:text-white">Referal Email</label>
                    <input type="email" ref={uemail} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className='justify-center flex'>
                    <button type="submit" className="text-white bg-blue-800 hover:bg-sky-800  p-2 rounded-lg">Click to refer</button>
                  </div>
                </form>
              </div>
            </>
          )
      }
    </>
  );
}

export default App;

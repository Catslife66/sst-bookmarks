"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteBookmarkModal({
  isLoadingModal,
  setIsLoadingModal,
  bookmarkId,
}) {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/bookmarks/${bookmarkId}`);
      setSuccessMsg("You have successfully deleted the bookmark.");
      setTimeout(() => {
        router.push("/bookmarks");
        setIsLoadingModal(!isLoadingModal);
        setSuccessMsg("");
        setErrorMsg("");
      }, 1000);
    } catch (e) {
      console.log(e);
      setErrorMsg(e.response.data);
    }
  };

  return (
    <div
      className={`${
        isLoadingModal ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 w-full h-screen`}
    >
      <div className="relative p-4 w-full h-full mx-auto flex justify-center items-center">
        <div className="relative bg-white rounded-lg w-160 h-60 flex justify-center items-center shadow-sm dark:bg-gray-700">
          {successMsg ? (
            <h3 className="text-green-800">{successMsg}</h3>
          ) : errorMsg ? (
            <h3 className="text-green-800">{successMsg}</h3>
          ) : (
            <>
              <button
                onClick={() => setIsLoadingModal(!isLoadingModal)}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3
                  className={`mb-5 text-lg font-normal text-gray-500 dark:text-gray-400`}
                >
                  Are you sure you want to delete this bookmark?
                </h3>
                <button
                  onClick={handleDelete}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setIsLoadingModal(!isLoadingModal)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

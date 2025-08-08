"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddBookmarkForm({ isForm = true }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      url,
      notes,
    };

    try {
      await axios.post("/api/bookmarks", formData);
      setSuccessMsg("Bookmark is added.");

      setTimeout(() => {
        router.push("/bookmarks");
        setIsOpen(!isOpen);
        setTitle("");
        setUrl("");
        setNotes("");
        setSuccessMsg("");
        setErrorMsg([]);
      }, 1000);
    } catch (e) {
      console.log(e.response.data.error);
      setErrorMsg(e.response.data.error);
    }
  };

  return (
    <>
      {isForm ? (
        <div className="flex flex-col justify-center items-center border border-gray-200 bg-gray-100 rounded-lg p-8">
          <div
            className="bg-red-300 p-4 rounded-full cursor-pointer mb-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>
          </div>
          <h3 className="font-bold">Add a new bookmark</h3>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Add a new bookmark
        </div>
      )}

      <div
        className={`${
          isOpen ? "bg-gray-300" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 w-full h-screen`}
      >
        <div className="relative p-4 w-full h-full mx-auto flex justify-center items-center">
          <div className="relative w-full md:w-1/2 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Bookmark
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form>
              {errorMsg.length >= 1 && (
                <ol className="p-4 mb-4 rounded-lg bg-red-50">
                  {errorMsg.map((err, idx) => (
                    <li key={idx} className="list-disc text-sm text-red-800">
                      {err.message}
                    </li>
                  ))}
                </ol>
              )}

              {successMsg && (
                <div
                  className="flex flex-row items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
                  role="alert"
                >
                  <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                  </div>
                  <div className="ms-3 text-sm font-normal">{successMsg}</div>
                </div>
              )}
              <div className="grid gap-4 mb-4 grid-cols-2 md:grid-cols-4">
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    title
                    <span className="text-xs text-red-600">* required</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrorMsg([]);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    url
                    <span className="text-xs text-red-600">* required</span>
                  </label>
                  <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setErrorMsg([]);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                  />
                </div>
                <div className="col-span-2 md:col-span-4">
                  <label
                    htmlFor="notes"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    notes
                  </label>
                  <textarea
                    type="text"
                    name="notes"
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      setErrorMsg([]);
                    }}
                    rows="4"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new bookmark
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

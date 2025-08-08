"use client";

import axios from "axios";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import DeleteBookmarkModal from "@/app/components/deleteBookmarkModal";
import { safeParse } from "valibot";
import { uuidSchema } from "@/app/lib/validators";
import { notFound } from "next/navigation";

export default function page({ params }) {
  const { id } = use(params);
  const [bookmark, setBookmark] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [resErr, serResErr] = useState({});

  useEffect(() => {
    async function getBookmark() {
      const { id } = await params;
      try {
        const res = await axios.get(`/api/bookmarks/${id}`);
        const result = res.data.bookmark;
        setBookmark(result);
        setUrl(result.url);
        setNotes(result.notes);
      } catch (e) {
        setBookmark(null);
        setUrl("");
        setNotes("");
        serResErr(e.response.data);
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    const result = safeParse(uuidSchema, id);
    if (result.success) {
      getBookmark();
    } else {
      return notFound();
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: bookmark.title,
      url,
      notes,
    };

    try {
      await axios.put(`/api/bookmarks/${bookmark.id}`, updatedData);
      setSuccessMsg("The bookmark is updated.");
      setTimeout(async () => {
        setSuccessMsg("");
        const res = await axios.get(`/api/bookmarks/${bookmark.id}`);
        const result = res.data.bookmark;
        setBookmark(result);
      }, 2000);
    } catch (e) {
      console.log(e.response.data.error);
      setErrorMsg(e.response.data.error);
    }
  };

  if (isLoading)
    return <div className="pt-56 w-full text-center">Loading...</div>;

  return bookmark ? (
    <>
      <div
        className={`${
          isLoadingModal ? "bg-gray-200 blur-lg" : "bg-white"
        } w-full h-screen flex flex-col mx-auto overflow-hidden justify-center items-center p-4 rounded-lg shadow dark:bg-gray-800 sm:p-5`}
      >
        <Link
          href={"/bookmarks"}
          className="w-full px-8 mb-8 underline cursor-pointer"
        >
          {"<< "}Back to my bookmarks
        </Link>
        <h1 className="text-4xl font-extrabold">Modify My Bookmark</h1>

        <form className="w-full px-4 mt-8 md:w-1/2">
          <h2 className="text-2xl py-4 font-bold">{bookmark.title}</h2>
          {errorMsg &&
            errorMsg.map((err, idx) => (
              <div
                key={idx}
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              >
                {err.message}
              </div>
            ))}

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
            <div className="col-span-2 md:col-span-4">
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
                  setSuccessMsg("");
                }}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                name="notes"
                defaultValue={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setErrorMsg([]);
                  setSuccessMsg("");
                }}
                rows="4"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
            <div className="col-span-2 text-sm text-gray-500">
              Created at:{" "}
              {new Date(bookmark.createdAt).toLocaleDateString().split("T")[0]}
            </div>
            <div className="col-span-2 text-sm text-gray-500 text-end">
              {bookmark.updatedAt && (
                <span>
                  Updated at:{" "}
                  {
                    new Date(bookmark.updatedAt)
                      .toLocaleDateString()
                      .split("T")[0]
                  }
                </span>
              )}
            </div>
          </div>
        </form>
        <div className="w-full px-4 flex flex-row justify-between md:w-1/2">
          <button
            type="submit"
            onClick={handleUpdate}
            className="cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update my bookmark
          </button>
          <button
            onClick={() => {
              setIsLoadingModal(!isLoadingModal);
            }}
            className="cursor-pointer text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete this bookmark
          </button>
        </div>
      </div>

      <DeleteBookmarkModal
        isLoadingModal={isLoadingModal}
        setIsLoadingModal={setIsLoadingModal}
        bookmarkId={bookmark.id}
      />
    </>
  ) : (
    <div className="pt-56">
      <h3 className="text-center text-2xl">{resErr.error}</h3>
    </div>
  );
}

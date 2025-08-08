"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./loginBtn";
import Logout from "./logoutBtn";

export default function Navbar() {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth");
        setSubject(res.data.subject);
      } catch (e) {
        setSubject(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-white z-50 px-8">
      <nav className="flex justify-between items-center p-4 gap-4">
        <Link href="/" className="font-bold">
          Bookmarks
        </Link>
        {subject ? (
          <div className="flex flex-row justify-center items-center space-x-2">
            <div className="text-sm text-gray-800 font-bold">
              Hi, {subject.properties.email}
            </div>
            <div>
              <Logout />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </nav>
    </header>
  );
}

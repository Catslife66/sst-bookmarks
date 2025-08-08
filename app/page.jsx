import Image from "next/image";
import Link from "next/link";
import { auth } from "./actions";
import Login from "./components/loginBtn";
import AddBookmarkForm from "./components/addBookmarkForm";

export default async function Home() {
  const subject = await auth();

  return (
    <section className="h-screen w-full flex justify-center items-center dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            My Bookmark Space
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Manage your bookmarks and keep it updated all the time.
          </p>
          {subject && <div>user id: {subject.properties.id}</div>}

          <div className="py-2">
            {subject ? (
              <div className="flex flex-row space-x-4">
                <Link
                  href={"/bookmarks"}
                  className="cursor-pointer px-5 py-3 text-base font-medium text-center border border-sky-200 bg-sky-200 rounded-lg hover:bg-sky-300"
                >
                  View my bookmarks
                </Link>
                <div>
                  <AddBookmarkForm isForm={false} />
                </div>
              </div>
            ) : (
              <Login />
            )}
          </div>
        </div>
        <div className="hidden relative lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src={"/heroImg.png"}
            alt="bookmarks"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}

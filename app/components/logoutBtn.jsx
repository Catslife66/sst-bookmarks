import { logout } from "@/app/actions";

export default function Logout() {
  return (
    <form action={logout}>
      <button className="cursor-pointer px-5 py-3 text-base font-medium text-center border border-blue-300 bg-blue-300 hover:bg-blue-400 hover:border-blue-400 rounded-lg">
        Logout
      </button>
    </form>
  );
}

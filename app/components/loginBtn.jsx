import { login } from "@/app/actions";

export default function Login() {
  return (
    <form action={login}>
      <button className="cursor-pointer px-5 py-3 text-base font-medium text-center border border-green-300 bg-green-300 rounded-lg">
        Login with Github
      </button>
    </form>
  );
}

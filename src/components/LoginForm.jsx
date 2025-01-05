'use client';
import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (provider) => {
    await signIn(provider, { callbackUrl: "/" });
  };

  // const handleCredentialsSignIn = async (e) => {
  //   e.preventDefault();
  //   await signIn("credentials", {
  //     redirect: false,
  //     email,
  //     password,
  //     callbackUrl: "/",
  //   }).then((response) => {
  //     if (response?.ok) {
  //       // router.refresh();
  //       router.push("/");
  //     } else {
  //       alert("Invalid email or password");
  //     }
  //   });
  // };
  const handleCredentialsSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loading state
    setError(""); // Reset error message
  
    // Simulate a delay for checking the login result
    setTimeout(async () => {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });
  
      setLoading(false); // Stop the loading state
      if (response?.ok) {
        router.push("/"); // Navigate to home page
      } else {
        setError("Invalid email or password"); // Set error message
      }
    }, 2000); // 2-second delay
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
    <div className="shadow-2xl shadow-blue-700/50 px-8 py-2 rounded-lg border-t-4  border-green-400">
    {loading && (
      <div className="text-center text-white mb-3">Checking User...</div>
    )}
      <form onSubmit={handleCredentialsSignIn} className="flex flex-col gap-3 py-3 px-4">
        <h2 className="text-2xl font-bold mb-2 text-center text-white">Login</h2>
        <button
                onClick={() => handleSignIn("google")}
                className="flex items-center px-4 py-2 bg-white border rounded-md shadow hover:bg-gray-100"
            >
                {/* Google SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-2">
                <path fill="#4285F4" d="M23.5 12.2v8.6h12.1c-.5 3.5-3.6 7-7.6 8.4l6.8 5.3c4.5-3.9 7-9.7 7-16.2 0-.9-.1-1.8-.2-2.6H23.5z" />
                <path fill="#34A853" d="M23.5 38c4.1 0 7.5-1.3 9.8-3.5l-6.8-5.3c-1.3.8-2.8 1.3-4.3 1.3-3.4 0-6.3-2.3-7.3-5.3l-7.1 5.4c2.5 4.9 7.5 7.4 13.7 7.4z" />
                <path fill="#FBBC05" d="M10.2 24.6c-.4-1.1-.6-2.2-.6-3.4s.2-2.4.6-3.4l-7.1-5.4c-1.3 2.5-2.1 5.4-2.1 8.8s.8 6.3 2.1 8.8l7.1-5.4z" />
                <path fill="#EA4335" d="M23.5 10c3.7 0 6.5 1.3 8.5 2.5l6.1-6.1c-3.5-2.9-7.8-4.7-14.6-4.7-6.2 0-11.2 3.1-14.7 7.9l7.1 5.4c1.1-3 4.1-5 7.6-5z" />
            </svg>
            Sign in with Google
            </button>
            <button
                onClick={() => handleSignIn("github")}
                className="flex items-center px-4 py-2 bg-white border rounded-md shadow hover:bg-blue-300">
                {/* GitHub SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2"
              >
              <path
                  fillRule="evenodd"
                  d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.11.793-.263.793-.583v-2.22c-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.203.085 1.837 1.237 1.837 1.237 1.07 1.833 2.809 1.304 3.495.997.107-.774.419-1.305.762-1.606-2.665-.302-5.466-1.333-5.466-5.933 0-1.31.468-2.382 1.235-3.222-.123-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.465 11.465 0 013.002-.404c1.017.005 2.042.137 3.002.404 2.29-1.553 3.295-1.23 3.295-1.23.655 1.652.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.805 5.628-5.478 5.92.43.37.814 1.1.814 2.22v3.292c0 .323.192.696.8.582A12 12 0 0024 12C24 5.373 18.627 0 12 0z"
                  clipRule="evenodd"
              />
              </svg>
              Sign in with GitHub
                </button>
                <div className="text-center text-white">OR</div>
                <div className=" flex flex-col">
                <label className="text-white">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="border-2 border-gray-200 rounded-md py-2 px-2"
                  required
                />
              </div>
        <div className="flex flex-col">
          <label className="text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border-2 border-gray-200 rounded-md py-2 px-2"
            required
          />
        </div>
        {error && (
        <div className="text-red-500 mb-2 text-left ml-2">
          {error}
        </div>
        )}
        <button type="submit" className="bg-green-600 hover:bg-green-600/70 text-white font-bold cursor-pointer px-6 py-2 rounded-lg border-2 border-white shadow-md shadow-black text-xl" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        <Link className="text-sm mt-1 text-right" href={"/register"}>
            Don&#39;t have an account? <span className="underline">Register</span>
          </Link>
      </form>
      </div>
    </div>
  );
}

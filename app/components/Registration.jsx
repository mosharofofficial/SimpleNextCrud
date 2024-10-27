"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Registration = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setErr("User already exists");
      } else {
        const res = await fetch("api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (res.ok) {
          const form = e.target;
          form.reset();
          setErr("");
          router.push("/login");
        } else {
          console.log("user registration failed");
        }
      }
    } catch (error) {
      console.log("error during registration: ", error);
    }
  };

  return (
    <div className="border-[4px] input-border rounded-xl p-10">
      <h1 className="text-5xl text-center mb-5">Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              required
              type="text"
              className="grow"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* {console.log("email: ", email)}
          {console.log("PASSWORD: ", password)} */}
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              required
              type="text"
              className="grow"
              placeholder="********"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button
            type="submit"
            className="text-xl px-1 py-3 border-[4px] input-border w-full mt-2 rounded-lg active:bg-black active:text-white"
          >
            Submit
          </button>
        </form>
        {err ? <p className="mt-2 text-red-500">{err}</p> : ""}
      </div>
      <p>
        already have an account?{" "}
        <Link href={"/login"}>
          <span className="hover:underline">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Registration;

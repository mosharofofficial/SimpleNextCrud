"use client";
import LoginForm from "@/app/components/LoginForm";
import Registration from "@/app/components/Registration";
import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { status } = useSession();
  if (status !== "authenticated") {
    return (
      <div className="max-w-[500px] flex flex-col gap-3 items-center justify-center pt-10">
        <LoginForm></LoginForm>
        {console.log(status)}
      </div>
    );
  }

  return (
    <div>
      todos
      <div className="w-full flex items-center justify-center">
        <button className="text-2xl border-[4px] border-black px-2 py-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

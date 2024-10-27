"use client";
import LoginForm from "@/app/components/LoginForm";
import Registration from "@/app/components/Registration";
// import { useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  // const session = useSession();
  return (
    <div className="max-w-[500px] flex flex-col gap-3 items-center justify-center pt-10">
      <LoginForm></LoginForm>
      {/* {console.log(session)} */}
    </div>
  );
};

export default Home;

'use client'
import Registration from "@/app/components/Registration";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const RegistrationPage = () => {
    const router = useRouter();
    const { status } = useSession();

    if (status === "authenticated") {
      router.push("/");
    }
  
  
  return (
    <div className="max-w-[500px] flex flex-col gap-3 items-center justify-center pt-10">
      <Registration></Registration>
    </div>
  );
};

export default RegistrationPage;

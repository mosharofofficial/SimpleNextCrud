import LoginForm from "@/app/components/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="max-w-[500px] flex flex-col gap-3 items-center justify-center pt-10">
      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginPage;

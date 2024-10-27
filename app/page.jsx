"use client";
import LoginForm from "@/app/components/LoginForm";
import Registration from "@/app/components/Registration";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Task from "./components/Task";

const Home = () => {
  const taskInput = useRef("");
  //taskInput.current.value
  const [isOpen, setIsOpen] = useState(false);
  const { status, data } = useSession();
  const session = useSession();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  // const {data} = useSession()

  useEffect(() => {
    if (session?.data?.user.email) {
      fetch(`/api/tasks?email=${session?.data?.user.email}`)
        .then((res) => res.json())
        .then((data) =>setTodos(data.tasks))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [session, isOpen]);

  if (status !== "authenticated") {
    return (
      <div className="max-w-[500px] flex flex-col gap-3 items-center justify-center pt-10">
        <LoginForm></LoginForm>
        {/* {console.log(status)} */}
      </div>
    );
  }

  const createTask = async (e) => {
    if (task) {
      try {
        const res = await fetch("api/postTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data?.user?.email,
            task,
          }),
        });
        // console.log(res.json());
      } catch (error) {
        console.log("error while sending task to database");
      } finally {
        setTask("");
      }
    }
    setIsOpen((prev) => !prev);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* {console.log(todos)} */}
      <div className="w-full flex items-center justify-center pt-5">
        <button
          onClick={() => signOut()}
          className="text-2xl active:bg-black active:text-white border-[4px] rounded-xl border-black px-2 py-4"
        >
          Logout
        </button>
      </div>
      <h2 className="mt-10 mb-5 text-2xl text-center pb-1 border-y-[4px] border-black">
        Tasks:{" "}
      </h2>
      <div className=" flex flex-col items-center ">
        <button
          onClick={toggle}
          className={`text-2xl active:bg-black active:text-white border-[4px] rounded-xl border-black px-2 py-1 ${
            isOpen && "hidden"
          }`}
        >
          Create Task
        </button>
        <button
          onClick={createTask}
          className={`text-2xl active:bg-black active:text-white border-[4px] rounded-xl border-black px-2 py-1 ${
            !isOpen && "hidden"
          }`}
        >
          Done
        </button>
        <ul className="mt-10 w-full px-2 max-w-[100%] min-w-[400px]">
          {isOpen && (
            <li
              className={`border-[4px]  border-black my-1  rounded-xl flex flex-col ${
                !isOpen && "hidden"
              }`}
            >
              <textarea
                ref={taskInput}
                className=" h-[200px] bg-transparent p-1 resize-none outline-none"
                onChange={(e) => {
                  setTask(e.target.value);
                  
                }}
              >
                {" "}
              </textarea>
              {/* <div className="p-1 border-t-[4px] border-black flex items-center justify-start gap-1 ">
                <button className="border-black border-[2px] py-[.0625rem] px-2 active:bg-black active:text-white rounded-lg">
                  edit
                </button>
                <button className="border-black border-[2px] py-[.0625rem] px-2 active:bg-black active:text-white rounded-lg">
                  delete
                </button>
              </div> */}
            </li>
          )}

         {todos.map(todo=><Task key={todo._id} data={todo}></Task>)}
         {/* {todos.map(todo=>console.log(todo._id))} */}
        </ul>
      </div>
    </div>
  );
};

export default Home;

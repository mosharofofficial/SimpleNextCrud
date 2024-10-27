import React from "react";

const Task = ({ data }) => {
  const handleDelete = () => {
    const res = fetch(`http://localhost:3000/api/delete?id=${data._id}`, {
      method: "DELETE",
    }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <li className="border-[4px]  border-black my-1  rounded-xl flex flex-col">
      <p className="p-1">{data.task}</p>
      <div className="p-1 border-t-[4px] border-black flex items-center justify-start gap-1 ">
        <button className="border-black border-[2px] py-[.0625rem] px-2 active:bg-black active:text-white rounded-lg">
          edit
        </button>
        <button
          onClick={handleDelete}
          className="border-black border-[2px] py-[.0625rem] px-2 active:bg-black active:text-white rounded-lg"
        >
          delete
        </button>
      </div>
    </li>
  );
};

export default Task;

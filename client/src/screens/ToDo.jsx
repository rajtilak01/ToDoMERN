import React, { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";
import Navbar from "./Navbar";

const ToDo = () => {
  const [task, settask] = useState("");
  const [desc, setdesc] = useState("");
  const [list, setList] = useState([]);
  const [id, setid] = useState("");
  async function submitHandler(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("currUser"));
    const tasklist = {
      title: task,
      description: desc,
      user: user.user._id,
    };
    try {
      const taskData = (
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/tasks`,
          tasklist
        )
      ).data;
      const backData = (await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/tasks`)).data;
      // console.log(backData);
      setList([...backData]);
      
      settask("");
      setid(taskData._id);
    } catch (err) {
      console.log(err);
    }
  }
 
  async function dataHanlder() {
    e.preventDefault();
    const data = (await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/tasks`)).data
    console.log(data);
  }
  dataHanlder
  const deleteHandler = (index)=>{
    // console.log("delete handler",list[index]);
    const taskid = list[index]._id;
    let copyTask = [...list];
    copyTask.splice(index, 1);
    setList(copyTask);
    const response = axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/delete/${taskid}`,)
    // console.log("response after deleting",response);
  }
  return (
    <div className="h-screen w-screen bg-zinc-900 text-white">
      <Navbar />
      <form className="">
        <input
          className="text-2xl text-black border-2 border-zinc-800 ml-20 px-4 py-2 rounded-xl"
          type="text"
          name="task"
          id="task"
          value={task}
          placeholder="Add Task..."
          required
          onChange={(e) => {
            settask(e.target.value);
          }}
        />
        <input
          className="text-2xl text-black w-1/3 border-2 border-zinc-800 m-5 px-4 py-2 rounded-xl"
          type="text"
          name="task"
          id="desc"
          value={desc}
          placeholder="Description"
          required
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button
          onClick={submitHandler}
          type="submit"
          className="ml-auto py-2 rounded-lg text-2xl px-4 bg-blue-300"
        >
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-zinc-700">
        <ul className="flex flex-col justify-start items-star gap-y-6">
          {list.length > 0 ? (
            list.map((task, index) => {
              return (
                <li key={index} className="w-full flex justify-between">
                  <div className="flex items-center justify-between mb-5 w-2/3">
                    <h5 className="text-2xl ml-2 font-semibold text-black">
                      {task.title}
                    </h5>
                    <h6 className="text-xl font-semibold text-black">
                      {task.description}
                    </h6>
                  </div>
                  <button
                    onClick={() => {
                      deleteHandler(index);
                    }}
                    className="py-2 px-4 mr-4 rounded bg-zinc-800 text-white font-bold"
                  >
                    Delete
                  </button>
                </li>
              );
            })
          ) : (
            <h2 className="text-black font-semibold">No Task Available</h2>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;

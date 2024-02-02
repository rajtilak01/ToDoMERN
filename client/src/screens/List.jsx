import React from "react";
import axios from "axios";
const List = ({ list, setList,tasklist}) => {
  async function dataHanlder(index) {
    let copyTask = [...list];
    copyTask.splice(index,1);
    setList(copyTask)
    try {
      const del = (await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/tasks`)).data;
      console.log(del);
    } catch (err) {
      console.log(err);
    }

  }
  dataHanlder();
  return (
    <>
      {list.length > 0 ? (
        list.map((task, index) => {
          return (
            <li key={index} className="w-full flex justify-between">
              <div className="flex items-center justify-between mb-5 w-2/3">
                <h5 className="text-2xl ml-2 font-semibold text-black">{task.task}</h5>
                <h6 className="text-xl font-semibold text-black">{task.desc}</h6>
              </div>
              <button
                onClick={() => {
                  deleteHandler(index)
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
    </>
  );
};

export default List;


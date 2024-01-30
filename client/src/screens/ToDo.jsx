import React, {useState} from "react";
import List from "./List";


const ToDo = () => {
    const [task, settask] = useState("");
    const [desc, setdesc] = useState("");
    const  [list, setList] = useState([]);
    function submitHandler(e) {
        e.preventDefault();
        setList([...list,{task, desc}])
        settask("");
        setdesc("");
        console.log(list)
        // const task = document.querySelector("#task").value;
        // const desc = document.querySelector("#desc").value;
        
    }
  return (
    <div className="h-screen w-screen bg-zinc-900 text-white">
      <h1 className="text-center font-bold text-2xl">Todo</h1>
      <form className=""  >
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
        <button onClick={submitHandler} type="submit" className="ml-auto py-2 rounded-lg text-2xl px-4 bg-blue-300">Add Task</button>
      </form>
      <hr/>
      <div className="p-8 bg-zinc-700">
        <ul className="flex flex-col justify-start items-star gap-y-6"><List list={list}  setList={setList}/></ul>
      </div>
    </div>
  );
};

export default ToDo;

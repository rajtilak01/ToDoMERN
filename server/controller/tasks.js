const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

// router.post('/newtask', async(req,res)=>{
exports.task = async (req, res) => {
  const { title, description, user } = req.body;

  try {
    const newtask = new Task({ title, description, user });
    await newtask.save();
    res.status(201).json(newtask);
  } catch (err) {
    console.log(err);
    res.status(409).send("Task creation error");
  }
};

exports.deleteTask = async (req, res) => {
  try { 
    const  taskid  = req.params.id;
    console.log(taskid);
    // if (!taskid) return res.status(400).send("Missing task id");
    let result = await Task.findByIdAndDelete(taskid);
    if (!result) return res.status(400).send("No task with that Id found.");

    res.status(200).send("Deleted the task");
  } catch (err) {
    console.log(err);
    res.status(400).json("error in deleting task");
  }
};


exports.gettask = async(req,res)=>{
  const tasks=await Task.find();
  return  res.status(200).json(tasks);
}

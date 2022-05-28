const fs = require("fs");

const readAllTask = () => {
  const buffer = fs.readFileSync("task.json"); // ? Dùng để lấy ra dữ liệu file json dưới dạng mã jex
  const taskString = buffer.toString(); // ? Chuyển dữ liệu về dạng chuỗi
  const taskJson = JSON.parse(taskString); // ? Mã hóa dữ liệu thành kiểu JSON
  return taskJson;
};
const readTask = (id) => {
  const allTask = readAllTask();
  const currentTask = allTask.find((task) => task.id === id);
  console.log(currentTask);
  return currentTask;
};
const createNewTask = (title, description) => {
  let newTask = {
    id: Math.random(),
    task: title,
    description: description,
  };
  const allTask = readAllTask();
  const newAllTask = [...allTask, newTask];
  fs.writeFileSync("task.json", JSON.stringify(newAllTask)); // ? Dùng để viết thêm vào file json => Nhớ mã hóa thành stringify để bảo mật hơn
  console.log(readAllTask());
};
const updateTask = (id, newTitle, newDescription) => {
  const allTask = readAllTask();
  const targetTask = allTask.filter((task) => task.id === id);
  const newTaskUpdated = {
    id: id,
    title: newTitle,
    description: newDescription,
  };
  allTask.forEach((task, index) => {
    if (task.id === id) {
      allTask.splice(index, 1, newTaskUpdated);
    }
  });
  fs.writeFileSync("task.json", JSON.stringify(allTask));
  return newTaskUpdated;
};
const deleteTask = (id) => {
  const allTask = readAllTask();
  const targetTask = allTask.find((task) => task.id === id);
  allTask.forEach((task, index) => {
    if (task.id === id) {
      allTask.splice(index, 1);
    }
  });
  fs.writeFileSync("task.json", JSON.stringify(allTask));
  console.log("Đã xóa: ", targetTask);
};
module.exports = {
  readAllTask,
  readTask,
  createNewTask,
  updateTask,
  deleteTask,
};

const { command } = require("yargs");
const yargs = require("yargs");
const fs = require("fs"); // ? file system - Thư viện tích hợp trong NodeJs giúp thao tác lấy dữ liệu từ file json
const {
  readAllTask,
  readTask,
  createNewTask,
  updateTask,
  deleteTask,
} = require("./modal/task");
readAllTask();
// ? Khởi tạo câu lệnh npm
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});
// * CRUD
// ? Create => Done
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    createNewTask(title, description);
  },
});
// ? Read => Done
yargs.command({
  command: "read-all",
  handler: () => {
    console.log(readAllTask());
    readAllTask();
  },
});
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "number",
    },
  },
  handler: (args) => {
    const { id } = args;
    readTask(id);
  },
});
// ? Update => Done
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "number",
    },
    newTitle: {
      type: "string",
    },
    newDescription: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, newTitle, newDescription } = args;
    updateTask(id, newTitle, newDescription);
  },
});
// ? Delete
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "number",
    },
  },
  handler: (args) => {
    const { id } = args;
    deleteTask(id);
  },
});
// ? Lưu lại các câu lệnh vừa tạo
yargs.parse();
// ? ================ Express ================
const express = require("express");
const app = express();
// ? Dùng để tạo đường dẫn lưu trữ static file
const path = require("path");
const pathPublic = path.join(__dirname, "./where you want access");
// ? Khi dùng dirname express sẽ tự động đưa đến vị trí file index.js
// ? __dirname là đường dẫn tuyệt đối chạy đến ngay file đang code ở trường hợp này là index.js
// ? Để sử dụng đường path ta dùng
app.use(express.use(pathPublic));
app.get("/", (req, res) => {
  res.send("Hello Express! Tôi là Tuấn");
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}/`);
});

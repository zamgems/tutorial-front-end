import axios from "axios";

export default axios.create({
  baseURL: "https://crudcrud.com/api/3a853c3632794dd28cbf4883132ce1b3",
  headers: {
    "Content-type": "application/json"
  }
});
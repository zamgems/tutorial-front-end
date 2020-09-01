import axios from "axios";

export default axios.create({
  baseURL: "https://crudcrud.com/api/88f509a26a9c4b6489e355bb7b2ecddc",
  headers: {
    "Content-type": "application/json"
  }
});
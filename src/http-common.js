import axios from "axios";

export default axios.create({
  baseURL: "https://crudcrud.com/api/7a4f605056b14cb9a69ab07d11d821d1",
  headers: {
    "Content-type": "application/json"
  }
});
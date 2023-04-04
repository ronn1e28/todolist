import axios from "axios";
import config from "../config/config";
import AuthService from "./auth.service";

class TodoService {

  baseUrl = config.baseUrl + "todo";


  async getHeaders() {
    const token = await AuthService.getToken();
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async add(todoTitle: string) {
    const headers = await this.getHeaders();
    const body = { content: todoTitle };
    const todo = await axios.post(this.baseUrl, body, headers);
    return todo.data;
  }

  async remove(id: number) {
    const headers = await this.getHeaders();
    const todo = await axios.delete(this.baseUrl + `/${id}`, headers);
    return todo.data;
  }

  async update(id: number, input: string) {
    const body = { content: input };
    const headers = await this.getHeaders();
    const response = await axios.patch(this.baseUrl + `/${id}`, body, headers);
    return response.data;
  }

  async changeStatus(id: number, status: boolean) {
    const body = { completed: !status };
    const headers = await this.getHeaders();
    const response = await axios.patch(this.baseUrl + `/${id}`, body, headers);
    return response.data;
  }

  async get() {
    const headers = await this.getHeaders();
    const response = await axios.get(this.baseUrl, headers);
    return response.data;
  }

}

const todoServiceObj = new TodoService();
export default todoServiceObj;

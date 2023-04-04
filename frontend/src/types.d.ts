interface LoginValues {
  password: string;
  email: string;
}

interface AddValues {
  todo: string;
}

interface ITodo {
  id: number;
  content: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  user_id: string;
}

interface Response {
  message: string;
  data: Itodo;
}

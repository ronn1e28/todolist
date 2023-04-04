import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/layouts/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ErrorMessage from './components/layouts/ErrorMessage';
import WithPrivateRoute from './utils/WithPrivateRoute';
import TodoPage from './components/Todo/TodoPage'
import AuthProvider from './contexts/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <ErrorMessage />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/todo"
            element={
              <WithPrivateRoute>
                <TodoPage />
              </WithPrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

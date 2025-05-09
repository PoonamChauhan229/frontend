import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const url = currentState === "Login" ? "/login" : "/signup";

    try {
      const response = await axios.post(`http://localhost:8000${url}`, form);
      const data = response.data;
      console.log(response)
      console.log(data);

      if (currentState === "Login") {
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          navigate("/");
          alert("Login successful");
        } else {
          alert(data.message || "Login failed");
        }
      } else {
        alert("Signup successful. Please log in.");
        setCurrentState("Login"); // Switch to Login after signup
        setForm({ name: "", email: "", password: "" }); // Reset form
      }
    } catch (error) {
      console.error("Axios Error:", error.response || error.message);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" && (
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          required
        />
      )}

      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        required
      />

      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p
          className="cursor-pointer"
          onClick={() => navigate("/forgotpassword")}
        >
          Forgot your password?
        </p>
        <p
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
          className="cursor-pointer text-blue-600"
        >
          {currentState === "Login" ? "Create a new account" : "Login here"}
        </p>
      </div>

      <button
        type="submit"
        className="px-8 py-2 mt-4 font-light text-white bg-black"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

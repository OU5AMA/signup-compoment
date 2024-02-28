// Signup.tsx
import React, { useState } from "react";
import useValidation from "../services/useValidation";
import "./signup.css";

const Signup: React.FC = () => {
  const { errors, validate } = useValidation();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate(userData);

    if (Object.values(newErrors).every((error) => !error)) {
      // Proceed with form submission...
      try {
        const response = await fetch("http://localhost:8080/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          console.log("User signed up successfully! 😎😉");
        } else {
          console.error("Failed to signup user. 😒");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username: </label>
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={handleChange}
      />
      {errors.username && <span className="error">{errors.username}</span>}

      <label>Email: </label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <label>Password: </label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <label>Confirm Password: </label>
      <input
        type="password"
        name="confirmPassword"
        value={userData.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && (
        <span className="error">{errors.confirmPassword}</span>
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;

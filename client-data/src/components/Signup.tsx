import { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '', 
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation rules
    const newErrors = {
       username: '',
       email: '',
       password: '',
       confirmPassword: '' 
    };

    // Validating username
    if (userData.username.trim().length < 3 || userData.username.trim().length > 50 ) {
      newErrors.username = "Username must be between 3 and 50 charcaters long";
    }else if(!userData.username.trim().match(/^[a-zA-Z0-9_]+$/)){
        newErrors.username = "Username must contain letters, numbers, and underscores only";
    }

    // Validating email
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!userData.email.trim().match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
      newErrors.email = "Choose a valid email";
    }


    if (userData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (userData.confirmPassword.trim() !== userData.password.trim()) {
      newErrors.confirmPassword = "Your passwords do not match!";
    }
    setErrors(newErrors);

    // If there are no errors you can proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // handle form submission here
      try {
        const response = await fetch("http://localhost:8080/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if(response.ok){
            console.log("User signed up successfully! 😎😉");
        }else{
            console.error("Failed to signup user. 😒")
        }
      } catch (error) {
        console.error("Error: ", errors);
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
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;

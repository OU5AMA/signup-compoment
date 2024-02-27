import { useState } from "react";
import "./signup.css";

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!userData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!userData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!userData.email.includes('@')) {
            newErrors.email = "Choose a valid email";
        }

        if (!userData.password.trim()) {
            newErrors.password = "Password is required";
        }

        if (userData.confirmPassword !== userData.password) {
            newErrors.confirmPassword = "Your password doesn't match!";
        }
        setErrors(newErrors);
        

        // If there are no errors you can proceed with form submission
        if (Object.keys(newErrors).length === 0) {
            // handle form submission here
            console.log('form submitted', userData);
        }else{
            console.log(errors, newErrors);
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
            <label>Email: </label>
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
            />

            <label>Password: </label>
            <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
            />

            <label>Confirm Password: </label>
            <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;

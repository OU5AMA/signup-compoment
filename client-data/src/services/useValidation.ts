import { useState } from "react";

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const useValidation = () => {
  const [errors, setErrors] = useState<Errors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validate = (userData: UserData): Errors => {
    // Validation rules
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    // Validation logic
    // Validating username
    if (
      userData.username.trim().length < 3 ||
      userData.username.trim().length > 50
    ) {
      newErrors.username = "Username must be between 3 and 50 characters long";
    } else if (!userData.username.trim().match(/^[a-zA-Z0-9_]+$/)) {
      newErrors.username =
        "Username must contain letters, numbers, and underscores only";
    }

    // Validating email
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !userData.email
        .trim()
        .match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Validating password
    if (userData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Validating confirmPassword
    if (userData.confirmPassword.trim() !== userData.password.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return newErrors;
  };
  return { errors, validate };
};

export default useValidation;

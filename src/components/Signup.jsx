import { useState } from "react";
import Modal from "react-modal";

const Signup = () => {
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  const validationForm = () => {
    const newErrors = {};

    if (!Data.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[A-Za-z]+$/.test(Data.username)) {
      newErrors.username = "Username must contain only letters";
    }

    if (!Data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Data.email)) {
      newErrors.email = "Enter a valid email address";
    } else if (!/^[a-z]/.test(Data.email[0])) {
      newErrors.email = "Email must start with a letter";
    } else if (Data.email.includes(" ")) {
      newErrors.email = "Email should not contain spaces";
    }

    if (!Data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (Data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(Data.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(Data.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[@$!%*?&#]/.test(Data.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    } else if (!/[0-9]/.test(Data.password)) {
      newErrors.password = "Password must contain at least one digit";
    } else if (Data.password.includes(" ")) {
      newErrors.password = "Password should not contain spaces";
    }

    if (!Data.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(Data.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationForm()) {
      console.log("Form submitted successfully!", Data);
      setVisible(true);
    } else {
      console.log("Form validation Failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={Data.username}
          onChange={handleData}
          required
        />
        {errors.username && (
          <div className="error-message">{errors.username}</div>
        )}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={Data.email}
          onChange={handleData}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={Data.password}
          onChange={handleData}
          required
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          id="phone"
          value={Data.phone}
          name="phone"
          onChange={handleData}
          required
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>

      <button type="submit" className="signup-btn">
        Sign Up
      </button>

      <Modal isOpen={visible}>
        <h1>Form Data</h1>
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{Data.username}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{Data.email}</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>{Data.password}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{Data.phone}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => setVisible(false)}>Close</button>
      </Modal>
    </form>
  );
};

export default Signup;

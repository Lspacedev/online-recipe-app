import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  //navigation
  const navigation = useNavigate();

  function handleNavigateRegister() {
    navigation("/register");
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });

      const data = await res.json();
      alert(data.message);

      localStorage.setItem("token", data.token);
      navigation("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Login">
      <div className="login-form-container">
        <h2>Welcome back!</h2>
        <div className="form">
          <div className="username">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => handleChange(e)}
                value={loginDetails.username}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={loginDetails.password}
              />
            </label>
          </div>

          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
        <div className="login-to-register">
          Don't have an account?{" "}
          <p onClick={handleNavigateRegister}>Register here</p>
        </div>
      </div>
      <div className="login-img">
        <img src="images/login-register.jpg" alt="login" />
      </div>
    </div>
  );
}

export default Login;

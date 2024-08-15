import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ handleLoginSubmit, loginStatus }) {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  //navigation
  const navigation = useNavigate();
  useEffect(() => {
    if (loginStatus === true) {
      //on success redirect user
      navigation("/home");
    }
  }, [navigation, loginStatus]);

  function handleNavigateRegister() {
    navigation("/registration");
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginSubmit(loginDetails);
  }

  return (
    <div className="Login">
      <div className="login-form-container">
        <h2>Welcome back!</h2>
        <form>
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
                type="text"
                id="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={loginDetails.password}
              />
            </label>
          </div>

          <input
            type="submit"
            value="Log in"
            onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
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

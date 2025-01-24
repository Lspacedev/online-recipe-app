import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
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
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });
      const data = await res.json();

      setLoading(false);
      if (res.ok === true) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        navigation("/home");
        navigation(0);
      } else {
        setErr(data.error);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }
  async function handleGuestSubmit() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: process.env.REACT_APP_GUEST_USERNAME,
          password: process.env.REACT_APP_GUEST_PASSWORD,
        }),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok === true) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        navigation("/home");
        navigation(0);
      } else {
        setErr(data.message);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }
  return (
    <div className="Login">
      <div className="login-form-container">
        <h3 className="login-logo">
          <img src="/images/hat.png" alt="logo" />
          <br />
          ChefBook
        </h3>
        <h2>Welcome back!</h2>
        {err && <span className="err">{err}</span>}
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

          <button
            onClick={() => (loading ? console.log("loading") : handleSubmit())}
          >
            {loading ? "loading..." : "Submit"}
          </button>

          <button
            onClick={() =>
              loading ? console.log("loading") : handleGuestSubmit()
            }
          >
            {loading ? "loading..." : "Guest"}
          </button>
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

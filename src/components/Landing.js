import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <nav>
        <div className="logo">todoList</div>
        <div className="login-register">
          <Link to="login">
            <button className="login-btn">Log in</button>
          </Link>
          <Link to="registration">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>
      <div className="landing-info">
        <div className="landing-title">Organize your day to day tasks.</div>
        <div className="landing-subtitle">
          A simple way to manage your daily tasks.
        </div>
        <Link to="registration">
          <button className="register-btn2">Register Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
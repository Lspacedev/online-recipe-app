import { Link, useNavigate } from "react-router-dom";

function Landing() {
  const navigation = useNavigate();
  return (
    <div className="landing">
      <nav>
        <div className="logo-land">
          <img src="/images/hat.png" alt="logo" />
          ChefBook
        </div>
        <div className="login-register">
          <button className="login-btn" onClick={() => navigation("login")}>
            Log in
          </button>
          <button
            className="register-btn"
            onClick={() => navigation("register")}
          >
            Register
          </button>
        </div>
      </nav>
      <div className="landing-content">
        <div className="landing-info">
          <div className="landing-title">Keep track of your recipes</div>
          <div className="landing-subtitle">
            A simple way to manage your favourite recipes.
          </div>
          <Link to="/register">
            <button className="register-btn2">Register Now</button>
          </Link>
        </div>
        <div className="landing-img">
          <img src="/images/landing.jpg" alt="landing" />
        </div>
      </div>
    </div>
  );
}

export default Landing;

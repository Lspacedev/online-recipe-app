import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration({ count, handleRegistrationSubmit, registrationStatus }) {
  const [userDetails, setUserDetails] = useState({
    id: count + 1,
    name: "", 
    surname: "",
    email: "",
    username: "",
    password: "",
    recipes: []
  });

  //navigation
  const navigation = useNavigate();
  useEffect(() => {
    if (registrationStatus) {
      //on success redirect user
      navigation("/login");
    }
  }, [navigation, registrationStatus]);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistrationSubmit(userDetails);
  }

  return (
    <div className="Registration">
      <div className="register-form-container">
        <h2>Create new account</h2>
        <form>
          <div className="username">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => handleChange(e)}
                value={userDetails.username}
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
                value={userDetails.password}
              />
            </label>
          </div>

          <input
            type="submit"
            value="Register"
            onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Registration;
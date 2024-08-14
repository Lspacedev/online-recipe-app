import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration({ count, handleRegistrationSubmit, registrationStatus }) {
  const [userDetails, setUserDetails] = useState({
    id: (count + 1).toString(),
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    profilePic: "",
    recipes: [],
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

  function handleImageUpload(e) {
    /*let input = document.getElementById("profile-pic");
    let url = URL.createObjectURL(input.files[0]);
    setUserDetails({
      ...userDetails,
      profilePic: url,
    });*/
    let input = document.getElementById("profile-pic");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setUserDetails({
        ...userDetails,
        profilePic: event.target.result,
      });
    };
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
          <div className="name">
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={userDetails.name}
              />
            </label>
          </div>
          <div className="surname">
            <label htmlFor="surname">
              Surname:
              <input
                type="text"
                id="surname"
                name="surname"
                onChange={(e) => handleChange(e)}
                value={userDetails.surname}
              />
            </label>
          </div>
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={userDetails.email}
              />
            </label>
          </div>
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

          <div className="profile-pic">
            <label htmlFor="profile-pic">
              Profile picture:
              <input
                type="file"
                id="profile-pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
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

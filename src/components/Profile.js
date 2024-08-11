import { useState } from "react";

function Profile({ username, password, handleUserUpdate }) {
  const [userUpdate, setUserUpdate] = useState({
    username: "",
    password: "",
  });
  const [update, setUpdate] = useState(false);

  function handleSubmit(obj) {
    handleUserUpdate(obj);
    setUpdate(false);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="Profile">
      <div className="profile-picture"></div>
      <div className="contact-details">
        <h1>Account details</h1>

        {/*<div className="fname-sname">
          <div className="fname">
            <h3>First name:</h3>
            <div>Name</div>
          </div>
          <div className="sname">
            <h3>Surname:</h3>
            <div>Name</div>
          </div>
        </div>
        <div className="phone">
          <div className="pnumber">
            <h3>Phone number:</h3>
            <div>1111 1111 11</div>
          </div>
        </div>*/}
        <div className="user-pass">
          <div className="user">
            <h4>Username:</h4>
            {update ? (
              <div>
                <div className="name">
                  <label htmlFor="username">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={(e) => handleChange(e)}
                      value={userUpdate.username}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div>{username}</div>
            )}
          </div>

          <div className="pass">
            <h4>Password:</h4>
            {update ? (
              <div>
                <div className="password">
                  <label htmlFor="password">
                    <input
                      type="text"
                      id="password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      value={userUpdate.password}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div>{password}</div>
            )}
          </div>
        </div>
        <button
          onClick={() => (update ? handleSubmit(userUpdate) : setUpdate(true))}
        >
          {update ? "Submit" : "Update"}
        </button>
      </div>
    </div>
  );
}
export default Profile;
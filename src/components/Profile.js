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

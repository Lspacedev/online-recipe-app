import { useState, useEffect } from "react";

function Profile() {
  const [userUpdate, setUserUpdate] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [update, setUpdate] = useState(false);
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchProfile();
  }, []);
  async function fetchProfile() {
    try {
      const response = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit(obj) {
    try {
      const response = await fetch(`http://localhost:3000/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      setUpdate(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic2");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setUserUpdate({
        ...userUpdate,
        profilePic: event.target.result,
      });
    };
  }
  function getProfilePic(obj) {
    if (true) {
      return "/images/avatar.png";
    } else {
      return obj.profilePic;
    }
  }

  return (
    <div className="Profile">
      <div className="contact-details">
        <div className="profile-picture">
          {/* {update ? (
            <div className="profile-pic2">
              <label htmlFor="profile-pic2">
                Profile picture:
                <input
                  type="file"
                  id="profile-pic2"
                  name="pic"
                  onChange={(e) => handleImageUpload(e)}
                />
              </label>
            </div>
          ) : ( */}
          <div className="profile-pic">
            {<img src={getProfilePic(profile)} alt="profile" />}
          </div>
          {/* )} */}
        </div>
        <div className="profile-content">
          <h2>Account details</h2>{" "}
          {update && <div onClick={() => setUpdate(false)}>X</div>}
          <div className="name-div">
            <h4>Username</h4>
            {update ? (
              <div className="name">
                <input
                  type="text"
                  id="name"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  value={userUpdate.name}
                />
              </div>
            ) : (
              <div>{profile.username}</div>
            )}
          </div>
          <div className="email-div">
            <h4>Email</h4>
            {update ? (
              <div className="email">
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={userUpdate.email}
                />
              </div>
            ) : (
              <div>{profile.email}</div>
            )}
          </div>
          <div className="user-pass">
            <div className="pass">
              <h4>Password:</h4>
              {update ? (
                <div>
                  <div className="password">
                    <input
                      type="text"
                      id="password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      value={userUpdate.password}
                    />
                  </div>
                </div>
              ) : (
                <div className="password-text">{profile.password}</div>
              )}
            </div>
          </div>
          <div className="account-delete-update">
            <button
              onClick={() =>
                update ? handleSubmit(userUpdate) : setUpdate(true)
              }
            >
              {update ? "Submit" : "Update"}
            </button>

            {/* <button id="account-delete" onClick={handleDeleteAccount}>
              Delete my account
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;

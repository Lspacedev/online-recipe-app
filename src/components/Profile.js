import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";

function Profile() {
  const [profile, setProfile] = useState({});

  const [userUpdate, setUserUpdate] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchProfile();
  }, []);
  async function fetchProfile() {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserUpdate((prev) => ({ ...prev, username: data.username }));
      setUserUpdate((prev) => ({ ...prev, email: data.email }));

      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function handleSubmit(obj) {
    if (profile.username === "Guest") {
      alert("Cannot update user account");
      return;
    }
    if (!obj.username && !obj.email && !obj.password) {
      alert("Error! No update information was entered!");
      setUpdate(false);
      return;
    }
    let updateConfirmation = window.confirm(
      "You are about to update profile information. Continue?"
    );
    if (updateConfirmation) {
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/profile`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(obj),
          }
        );
        const data = await response.json();
        if (response.ok === true) {
          //navigation(0);
        }
        setLoading(false);

        setUpdate(false);
        fetchProfile();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setUpdate(false);
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
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="Profile">
      <div className="contact-details">
        <div className="profile-picture">
          <div className="profile-pic">
            {<img src={getProfilePic(profile)} alt="profile" />}
          </div>
        </div>
        <div className="profile-content">
          <h2>Account details</h2>{" "}
          {update && (
            <div onClick={() => setUpdate(false)} className="close">
              <CgClose />
            </div>
          )}
          <div className="name-div">
            <h4>Username</h4>
            {update ? (
              <div className="name">
                <input
                  type="text"
                  id="name"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  value={userUpdate.username}
                />
              </div>
            ) : (
              <div className="val">{profile.username}</div>
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
              <div className="val">{profile.email}</div>
            )}
          </div>
          <div className="user-pass">
            <div className="pass">
              {update && <h4>New password:</h4>}
              {update && (
                <div>
                  <div className="password">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      value={userUpdate.password}
                    />
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;

import { useState } from "react";

function Profile({ username, password, profilePic, handleUserUpdate }) {
  const [userUpdate, setUserUpdate] = useState({
    username: "",
    password: "",
    profilePic: "",
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

  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic2");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);

    fReader.onloadend = function (event) {
      setUserUpdate({ ...userUpdate,   profilePic: event.target.result });
    };
    /*let url = URL.createObjectURL(e.target.files[0]);
    obj.pic = url;*/
  }

  return (
    <div className="Profile">
      <div className="profile-picture"></div>
      <div className="contact-details">
        <h1>Account details</h1>
        {update? 
        (<div className="profile-pic2">
            <label htmlFor="profile-pic2">
              Profile picture:
              <input
                  type="file"
                  id="profile-pic2"
                  name="pic"
                  onChange={(e) => handleImageUpload(e)}
                />
            </label>
          </div>)
          :(<div className="profile-pic">{profilePic && <img src={profilePic} />}</div>)}
  
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

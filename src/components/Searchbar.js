import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";

function Searchbar({ handleSearchSubmit }) {
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    if (searchInput === "") {
      handleSearchSubmit("");
    }
  }, [searchInput]);
  function handleSearchChange(e) {
    e.preventDefault();

    setSearchInput(e.target.value);
  }
  return (
    <div className="search-div">
      <div id="search-icon-div">
        <IoIosSearch
          id="search-icon"
          style={{
            fontSize: "1.6rem",
            margin: "0px",
          }}
        />
      </div>
      <input
        type="search"
        placeholder="Search recipes"
        onChange={handleSearchChange}
        value={searchInput}
      />
      <button id="search-btn" onClick={() => handleSearchSubmit(searchInput)}>
        search
      </button>
    </div>
  );
}

export default Searchbar;

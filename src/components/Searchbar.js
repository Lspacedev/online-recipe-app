import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

function Searchbar({ query }) {
  const [searchInput, setSearchInput] = useState("");
  function handleSearchChange(e) {
    const { value } = e.target;
    setSearchInput(value);
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
      <button
        id="search-btn"
        
      >
        search
      </button>
    </div>
  );
}

export default Searchbar;
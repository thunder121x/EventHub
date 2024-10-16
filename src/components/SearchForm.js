import React from "react";
import '../styles.css';

const SearchForm = () => {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <form>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Default"
                className="input-field"
              />
            </div>
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

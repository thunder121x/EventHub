import React from "react";
import '../styles.css';

const SearchForm = () => {
  return (
    <div className="container mx-auto max-w-screen-xl ">
      <div className="flex flex-col items-center justify-center">
        <div className="border border-primary rounded-[25px] px-20 w-6/12 mx-auto">
          <form>
            <div className="space-y-4 mb-5 pt-14">
              <input
                type="text"
                placeholder="Workshop Type..."
                className="input-field"
              />
            </div>
            <div className="space-y-4 my-5">
              <input
                type="text"
                placeholder="Province..."
                className="input-field"
              />
            </div>
            <div className="space-y-4 mt-5">
              <input
                type="text"
                placeholder="Date Range..."
                className="input-field"
              />
            </div>
            <button
              type="submit"
              className="search-button text-[20px] font-bold m-10"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

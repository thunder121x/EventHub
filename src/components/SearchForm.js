import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import dropdownIcon from "../assets/emoji/dropdown.png"; // Ensure correct path
import calendarIcon from "../assets/emoji/calendar.png";
import "react-date-range/dist/styles.css"; // Main CSS
import "react-date-range/dist/theme/default.css"; // Theme CSS
import { addYears } from "date-fns";


function SearchForm() {
  const navigate = useNavigate();

  const [showWorkshopDropdown, setShowWorkshopDropdown] = useState(false);
  const [selectedWorkshopType, setSelectedWorkshopType] = useState("");
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const workshopOptions = [
    "Creative",
    "Study Nature",
    "Way of life",
    "History",
    "Culture",
    "Agriculture",
    "Ecology",
    "Adventure",
    "Health",
  ];

  const provinces = [
    "Bangkok",
    "Chiang Mai",
    "Phuket",
    // Add all provinces in Thailand here
  ];

  const handleSelectDateRange = (ranges) => {
    setDateRange([ranges.selection]);
    setShowDateRangePicker(false); // Close date picker after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/filterpage`, {
      state: {
        workshopType: selectedWorkshopType,
        province: selectedProvince,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
      },
    });
  };

  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border border-gray-300 py-12 px-24 rounded-[25px] shadow-lg">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
              {/* Workshop Type Dropdown */}
              <div className="input-field grid grid-flow-col relative">
                <div
                  className={`w-80 cursor-pointer placeholder-gray paragraph2 flex items-center justify-between ${
                    selectedWorkshopType ? "text-primary" : "text-gray"
                  }`}
                  onClick={() => setShowWorkshopDropdown(!showWorkshopDropdown)}
                >
                  <span>{selectedWorkshopType || "Workshop Type..."}</span>
                  <img
                    src={dropdownIcon}
                    alt="Dropdown"
                    className="w-[24px] h-[24px]"
                  />
                </div>
                {showWorkshopDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 w-80">
                    {workshopOptions.map((type) => (
                      <div
                        key={type}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedWorkshopType(type);
                          setShowWorkshopDropdown(false);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Province Dropdown */}
              <div className="input-field grid grid-flow-col relative mt-4">
                <div
                  className={`w-80 cursor-pointer placeholder-gray paragraph2 flex items-center justify-between ${
                    selectedProvince ? "text-primary" : "text-gray"
                  }`}
                  onClick={() => setShowProvinceDropdown(!showProvinceDropdown)}
                >
                  <span>{selectedProvince || "Province..."}</span>
                  <img
                    src={dropdownIcon}
                    alt="Dropdown"
                    className="w-[24px] h-[24px]"
                  />
                </div>
                {showProvinceDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 w-80 max-h-60 overflow-y-auto">
                    {provinces.map((province) => (
                      <div
                        key={province}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedProvince(province);
                          setShowProvinceDropdown(false);
                        }}
                      >
                        {province}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Range Picker */}
              <div className="input-field grid grid-flow-col relative mt-4">
                <div
                  className={`w-80 cursor-pointer placeholder-gray paragraph2 flex items-center justify-between ${
                    dateRange[0].startDate.toLocaleDateString() ===
                    dateRange[0].endDate.toLocaleDateString()
                      ? "text-gray"
                      : "text-primary"
                  }`}
                  onClick={() => setShowDateRangePicker(!showDateRangePicker)}
                >
                  <span>
                    {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}` ||
                      "Date Range..."}
                  </span>
                  <img
                    src={calendarIcon}
                    alt="Calendar"
                    className="w-[24px] h-[24px]"
                  />
                </div>
                {showDateRangePicker && (
                  <div className="absolute top-full left-0 mt-1 z-10">
                    <DateRangePicker
                      ranges={dateRange}
                      onChange={handleSelectDateRange}
                      rangeColors={["#4C51BF"]}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="search-button search mt-5 w-full bg-primary text-white py-2 rounded"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

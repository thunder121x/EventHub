import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firebase config
import dropdownIcon from "../assets/emoji/dropdown.png";
import calendarIcon from "../assets/emoji/calendar.png";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function SearchForm() {
  const navigate = useNavigate();

  const [showWorkshopDropdown, setShowWorkshopDropdown] = useState(false);
  const [selectedWorkshopType, setSelectedWorkshopType] = useState("");
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [provinces, setProvinces] = useState([]); // Provinces from Firestore
  const [eventTypes, setEventTypes] = useState([]); // Event Types from Firestore
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!selectedWorkshopType)
      newErrors.selectedWorkshopType = "Please select a workshop type.";
    if (!selectedProvince)
      newErrors.selectedProvince = "Please select a province.";
    if (
      !dateRange[0].startDate ||
      !dateRange[0].endDate ||
      dateRange[0].startDate > dateRange[0].endDate
    )
      newErrors.dateRange = "Please select a valid date range.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(`/Filter`, {
        state: {
          workshopType: selectedWorkshopType,
          province: selectedProvince,
          startDate: dateRange[0].startDate,
          endDate: dateRange[0].endDate,
        },
      });
    }
  };

  const handleSelectDateRange = (ranges) => {
    setDateRange([ranges.selection]);
    setShowDateRangePicker(false);
  };

  const dropdownRef = useRef(null);
  const datePickerRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      (dropdownRef.current && dropdownRef.current.contains(e.target)) ||
      (datePickerRef.current && datePickerRef.current.contains(e.target))
    ) {
      return;
    }

    setShowWorkshopDropdown(false);
    setShowProvinceDropdown(false);
    setShowDateRangePicker(false);
  };

  // Fetch data from Firestore
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "event"));
        const provincesSet = new Set();
        const eventTypesSet = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.provNameEN) provincesSet.add(data.provNameEN);
          if (data.eventTypeEN) eventTypesSet.add(data.eventTypeEN);
        });

        setProvinces(Array.from(provincesSet)); // Remove duplicates
        setEventTypes(Array.from(eventTypesSet));
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="flex flex-col items-center pb-24">
        <div className="border border-primary py-12 px-24 rounded-[25px] shadow-lg">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
              {/* Workshop Type Dropdown */}
              <div className="input-field grid grid-flow-col relative">
                <div className="flex flex-col">
                  <div
                    className={`w-80 cursor-pointer placeholder-gray paragraph2 flex items-center justify-between ${
                      selectedWorkshopType ? "text-primary" : "text-gray"
                    }`}
                    onClick={() =>
                      setShowWorkshopDropdown(!showWorkshopDropdown)
                    }
                  >
                    <span>{selectedWorkshopType || "Workshop Type..."}</span>
                    <img
                      src={dropdownIcon}
                      alt="Dropdown"
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                  {errors.selectedWorkshopType && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.selectedWorkshopType}
                    </p>
                  )}
                </div>
                {showWorkshopDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 w-80"
                  >
                    {eventTypes.map((type) => (
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
                <div className="flex flex-col">
                  <div className="relative w-80">
                    <input
                      type="text"
                      placeholder="Province..."
                      value={provinceFilter}
                      onChange={(e) => setProvinceFilter(e.target.value)}
                      onFocus={() => setShowProvinceDropdown(true)}
                      className={`w-full py-2 pr-10 text-primary ${
                        errors.selectedProvince
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded placeholder:text-gray`}
                    />
                    <img
                      src={dropdownIcon}
                      alt="Dropdown"
                      className="absolute top-1/2 right-3 w-[24px] h-[24px] transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                  {errors.selectedProvince && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.selectedProvince}
                    </p>
                  )}
                </div>
                {showProvinceDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 w-80 max-h-60 overflow-y-auto"
                  >
                    {provinces
                      .filter((province) =>
                        province
                          .toLowerCase()
                          .includes(provinceFilter.toLowerCase())
                      )
                      .map((province) => (
                        <div
                          key={province}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedProvince(province);
                            setProvinceFilter(province); // Set both to the selected province
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
                    {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                  </span>
                  <img
                    src={calendarIcon}
                    alt="Calendar"
                    className="w-[24px] h-[24px]"
                  />
                </div>
                {errors.dateRange && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.dateRange}
                  </p>
                )}
                {showDateRangePicker && (
                  <div
                    ref={datePickerRef}
                    className="absolute top-full left-0 mt-1 z-10"
                  >
                    <DateRangePicker
                      ranges={dateRange}
                      onChange={handleSelectDateRange}
                      rangeColors={["#3EB489"]}
                      className="shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button with new style */}
              <button
                type="submit"
                className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition mt-4 w-full"
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

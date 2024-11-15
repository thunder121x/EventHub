import { useNavigate } from "react-router-dom";

import arrowBack from "../assets/arrow_back.svg"; // replace with actual class image
const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <button
      onClick={goBack}
    >
      <img src={arrowBack} alt="arrowBack" className="w-42 h-8" />
    </button>
  );
};

export default BackButton;

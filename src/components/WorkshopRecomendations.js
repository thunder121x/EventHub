import "../styles.css";
import React from "react";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";

function WorkshopRecommendations() {
  return (
    <div className="p-20">
      {/* <div className="border-l-2 border-primary h-10 mx-2 rounded-l-md"></div>
      <span className="text-heading-2 font-poppins">Workshop</span> */}
      <div className="flex justify-center">
        <div className="bg-primary w-2 rounded-[50px] my-4 mr-2"></div>
        <h1 className="display2 text-primary">Workshop Recommendations</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <WorkshopRecommendationBox />
        <WorkshopRecommendationBox />
        <WorkshopRecommendationBox />
        <WorkshopRecommendationBox />
        <WorkshopRecommendationBox />
        <WorkshopRecommendationBox />
      </div>
    </div>
  );
}

export default WorkshopRecommendations;
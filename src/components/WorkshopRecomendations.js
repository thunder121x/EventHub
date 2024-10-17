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
        <WorkshopRecommendationBox>
            
        </WorkshopRecommendationBox>
        {/* <div className="border rounded-md p-4">
          <h2 className="heading2">Bang Rak, Bangkok</h2>
          <p className="paragraph1">
            Authentic Thai Cooking and Culinary Techniques
          </p>
        </div>
        <div className="border rounded-md p-4">
          <h2 className="heading2">Old City, Chiang Mai</h2>
          <p className="paragraph1">
            Traditional Muay Thai Martial Arts Training
          </p>
        </div>
        <div className="border rounded-md p-4">
          <h2 className="heading2">Patong, Phuket</h2>
          <p className="paragraph1">
            Healing Thai Massage and Wellness Techniques
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default WorkshopRecommendations;
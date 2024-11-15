import React from "react";
// import "../styles/EventDetail.css";
import EventInfoCard from "./EventInfoCard";
import StarRating from "./StarRating";
// import instructorImage from "../assets/instructor.png"; // replace with actual instructor image
import classImage from "../assets/classImage.png"; // replace with actual class image
import arrowBack from "../assets/arrow_back.png"; // replace with actual class image
import like from "../assets/heart.png"; // replace with actual class image
import share from "../assets/share.png"; // replace with actual class image
import Profile from "../assets/Profile.jpg";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";
import Footer from "./Footer";

const EventDetail = () => {
  return (
    <div className="bg-background min-h-screen pt-36">
      <div className="flex gap-4">
        <img src={arrowBack} alt="arrowBack" className="w-42 h-8 mr-2 pl-24" />
        <div className="flex-grow">
          <div className="flex">
            <p className="text-primary paragraph1 mb-2">Cooking</p>
            <p className="paragraph1 mb-2">
              / Authentic Thai Cooking and Culinary Techniques
            </p>
          </div>

          {/* Event Title */}
          <h1 className="heading1 text-[#302D27] mb-2">
            Authentic Thai Cooking and Culinary Techniques
          </h1>

          {/* Star Rating */}
          <div className="flex justify-between mb-4">
            <div className="flex">
              <StarRating rating={4.5} />
              <span className="m-2 ">(37)</span>
            </div>
            <div className="flex pr-28">
              <img src={like} alt="Like" className=" w-[20px] h-[20px] m-2" />
              <img src={share} alt="Like" className=" w-[20px] h-[20px] m-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-36 pl-14 pr-8">
        {/* Main Content Area */}
        <div className="max-w-[720px] pt-10">
          {/* Breadcrumb */}

          {/* Class Image */}
          <img
            src={classImage}
            alt="Class"
            className="rounded-lg mb-4 w-[720px] h-[320px]"
          />

          {/* Class Details */}
          <div className="flex justify-between">
            <h2 className="heading2 mb-2">Class details:</h2>
            <p className="text-sm text-gray mb-2">
              updated on 10/12/2024 at 16:00 pm
            </p>
          </div>
          <p className="paragraph2 text-lightblack mb-4">
            Discover the vibrant flavors of Thailand in our immersive Authentic
            Thai Cooking and Culinary Techniques workshop, focusing on the art
            of making Som Tam (Green Papaya Salad). Perfect for food enthusiasts
            and beginners alike, this hands-on class takes you on a culinary
            journey to master one of Thailand's most beloved dishes.
          </p>

          <p className="paragraph2 text-lightblack mb-4">
            Under the guidance of an experienced Thai chef, you’ll learn the
            step-by-step process of preparing Som Tam, from selecting fresh
            ingredients to using traditional tools like the mortar and pestle.
            You'll explore the perfect balance of flavors—sweet, sour, salty,
            and spicy—that make Thai cuisine so distinctive.
          </p>
          <div className="text-lightblack paragraph2 leading-relaxed">
            <h2 className="heading2 mb-2">What to Expect:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Learn the authentic way to make Som Tam using fresh papaya,
                lime, chilies, garlic, and other traditional ingredients.
              </li>
              <li>
                Master key culinary techniques such as pounding and mixing for
                the perfect texture and flavor balance.
              </li>
              <li>
                Gain insight into Thai culinary culture and the importance of
                balancing flavors.
              </li>
              <li>
                Enjoy your freshly made Som Tam along with other Thai dishes for
                a complete experience.
              </li>
            </ul>
            <p className="paragraph2 text-lightblack mb-4">
              Whether you're looking to expand your cooking skills or simply
              enjoy a unique cultural experience, this workshop offers a taste
              of Thailand that you can recreate at home
            </p>
          </div>

          <div className="text-lightblack paragraph2 pb-10">
            <h2 className="heading2 mb-2">Instuctor</h2>
            <div className="flex items-center justify-start gap-20">
              <div className="w-[69px] h-[69px] overflow-hidden rounded-full ">
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="search text-lightblack">John Doe</p>
                <p className="text-[15px] text-base leading-none text-lightblack">
                  Monkey protector
                </p>
              </div>
              <p className="paragraph2 text-lightblac">view profile</p>
            </div>
          </div>
          <div className="text-lightblack paragraph2 leading-relaxed">
            <h2 className="heading2 mb-2">This class suitable for</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Beginner Cooks</li>
              <li>Food Enthusiasts</li>
              <li>Hands-On Learners</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <EventInfoCard />
      </div>
      <div className="text-lightblack paragraph2 leading-relaxed px-32">
        <h2 className="heading2 mb-2">Other events you may like</h2>
        <div className="grid grid-cols-3 gap-6 mt-8">
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;

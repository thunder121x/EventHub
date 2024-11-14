import React from "react";

import Header2 from "./Header2";
import Footer from "./Footer";
import SearchForm from "./SearchForm";
import WorkshopRecommendations from "./WorkshopRecomendations";
import "../styles.css";
import FeatureBox from "./FeatureBox";
import { HashLink } from "react-router-hash-link";

const AboutUs = () =>{
    return (
      <div>
        <Header2 />
        <main className="container mx-auto text-center bg-white max-w-none">
          <div>
            <div className="flex flex-col items-center justify-center py-20 px-40">
              <h1 className="display2 text-primary px-52">
                The Future Workshop Reservations, Available Now !
              </h1>
              <div className="bg-primary opacity-60 w-1/12 h-1 my-4 mr-2 rounded"></div>
            </div>
            <p className="text-[20px] text-black pb-12 mb-8 px-96">
              We provide everything you need to book, manage, and participate in
              workshops with ease. Our platform makes connecting and learning
              effortless, helping you gain new skills, meet like-minded people,
              and explore a world of opportunities tailored to your interests.
            </p>

            <HashLink
              smooth
              to="/#SearchBar"
              className="search mt-5 bg-primary text-white py-4 rounded-[30px] px-10"
            >
              Book a Workshop
            </HashLink>
            <FeatureBox />
          </div>
          {/* <p className="text-center"></p> */}
        </main>
        <Footer />
      </div>
    );
};

export default AboutUs;
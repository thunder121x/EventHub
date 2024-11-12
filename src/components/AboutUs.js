import React from "react";

import Header2 from "./Header2";
import Footer from "./Footer";
import SearchForm from "./SearchForm";
import WorkshopRecommendations from "./WorkshopRecomendations";
import "../styles.css";

const AboutUs = () =>{
    return (
      <div>
        <Header2 />
        <main className="container mx-auto my-8 text-center pt-12">
          <div>
            <h1 className="display2 text-primary">
              Ready to Explore Exciting Workshops?
            </h1>
            <p className="mt-4 text-[20px] text-gray pb-12 mb-8">
              Discover Thailand's Local Workshops and Book Your Spot Today!
            </p>
            <SearchForm />
            <WorkshopRecommendations />
          </div>
          {/* <p className="text-center"></p> */}
        </main>
        <Footer />
      </div>
    );
};

export default AboutUs;
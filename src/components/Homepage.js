import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import SearchForm from "./SearchForm";
import WorkshopRecommendations from "./WorkshopRecomendations";
import "../styles.css";

const Homepage = () =>{
    return (
      <div>
        <Header />

        <section id="SearchBar">
          <main className="container mx-auto my-8 text-center pt-12">
            <div>
              <h1 className="display2 text-primary">
                Ready to Explore Exciting Workshops?
              </h1>

              <p className="mt-4 text-[20px] text-gray pb-12 mb-8">
                Discover Thailand's Local Workshops and Book Your Spot Today!
              </p>
              <SearchForm />
              <section id="ExploreWorkshops">
                <WorkshopRecommendations />
              </section>
            </div>
            {/* <p className="text-center"></p> */}
          </main>
        </section>
        <Footer />
      </div>
    );
};

export default Homepage;
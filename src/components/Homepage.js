import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import SearchForm from "./SearchForm";

const Homepage = () =>{
    return (
      <div>
        <Header />
        <main className="container mx-auto my-8 text-center">
          <div>
            <h1 className="text-4xl font-bold">
              Ready to Explore Exciting Workshops?
            </h1>
            <p className="mt-4 text-lg">
              Discover Thailand's Local Workshops and Book Your Spot Today!
            </p>
        <SearchForm />
          </div>
          <p className="text-center"></p>
          
          
        </main>
        <Footer />
      </div>
    );
};

export default Homepage;
import Belt from "../components/Belt";
import LandingFooter from "../components/Landing-Footer";
import Register from "../components/Registry";
import Welcome from "../components/WelcomeMessage";
import React from "react";
import Navbar from "../components/Navbar/Navbar";

function Landing() {
  return (
    <section className="langing-page">
      <Navbar />
      <header className="landing__header">
        <Welcome />
        <Register />
      </header>
      <Belt />
      <LandingFooter />
    </section>
  );
}
export default Landing;

import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hemanth Chakravarthy | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Hemanth Chakravarthy - Full-stack developer specializing in React, Next.js, and modern web technologies."
        />
      </Helmet>

      <CustomCursor />

      <div className="min-h-screen relative">
        <Navbar />
        <main>
          <div id="home">
            <Hero />
          </div>

          <div id="about">
            <About />
          </div>

          <div id="experience">
            <Experience />
          </div>

          <div id="projects">
            <Projects />
          </div>

          <div id="achievements">
            <Achievements />
          </div>

          <div id="contact">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

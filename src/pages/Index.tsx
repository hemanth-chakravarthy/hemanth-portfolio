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
import ScrollSection from "../components/ScrollSection";

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
          <ScrollSection id="home">
            <Hero />
          </ScrollSection>

          <ScrollSection id="about">
            <About />
          </ScrollSection>

          <ScrollSection id="experience">
            <Experience />
          </ScrollSection>

          <ScrollSection id="projects">
            <Projects />
          </ScrollSection>

          <ScrollSection id="achievements">
            <Achievements />
          </ScrollSection>

          <ScrollSection id="contact">
            <Contact />
          </ScrollSection>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

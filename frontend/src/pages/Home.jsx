import Event from "../components/Event/Event";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import ReviewsSlider from "../components/ReviewsSlider/ReviewsSlider";
import Session from "../components/Session/index.jsx";
import SocialPosts from "../components/SocialPosts/SocialPosts";

const Home = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Hero />
        <Session />
        <Event />
        <ReviewsSlider />
        <SocialPosts />
        <Footer />
      </div>
    </>
  );
};

export default Home;

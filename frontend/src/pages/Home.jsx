import { useState } from 'react';
import Event from '../components/Event/Event';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ReviewsSlider from '../components/ReviewsSlider/ReviewsSlider';
import Session from '../components/Session/Session';
import SocialPosts from '../components/SocialPosts/SocialPosts';
import Admin from './Admin';
import SessionMobile from '../components/SessionMobile/SessionMobile';

const Home = () => {
  const [page, setPage] = useState(false);
  return (
    <>
      {/* <button value={page} onClick={() => setPage(!page)}>
        Admin
      </button> */}
      {page ? (
        <Admin />
      ) : (
        <div className="wrapper">
          <Header />
          <Hero />
          <Session />
          <SessionMobile />
          <Event />
          <ReviewsSlider />
          <SocialPosts />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;

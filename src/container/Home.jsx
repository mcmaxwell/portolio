import React from 'react';
import { About, Header, Skills, Testimonial, Work } from '.';

const Home = () => (
    <div className='home-page'>
        <Header />
        <About />
        <Work />
        <Skills />
        <Testimonial />
    </div>
);
export default Home;

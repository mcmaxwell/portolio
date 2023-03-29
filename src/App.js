import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Footer, Home } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => (
    <div className='app'>
        <Navbar />
        <Routes>
            <Route
                path='/*'
                element={<Home />}
            />
        </Routes>
        <Footer />
    </div>
);

export default App;

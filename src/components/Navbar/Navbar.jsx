/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

import { images } from '../../constants';

import './Navbar.scss';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const idList = ['home', 'about', 'work', 'skills', 'contact'];
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.app__container');
            sections.forEach((section, index) => {
                const top = section.offsetTop;
                const height = section.offsetHeight - 10;
                if (
                    window.pageYOffset >= top &&
                    window.pageYOffset < top + height
                ) {
                    setActiveIndex(index);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className='app__navbar'>
                <div className='app__navbar-logo'>
                    <img
                        src={images.logo}
                        alt='logo'
                    />
                </div>
                <ul className='app__navbar-links'>
                    {idList.map((item, index) => (
                        <li
                            className={
                                activeIndex === index
                                    ? 'app__flex p-text active'
                                    : 'app__flex p-text'
                            }
                            key={`link-${item}`}
                        >
                            <div />
                            <a href={`#${item}`}>{item}</a>
                        </li>
                    ))}
                </ul>

                <div className='app__navbar-menu'>
                    <HiMenuAlt4 onClick={() => setToggle(true)} />

                    {toggle && (
                        <motion.div
                            whileInView={{ x: [300, 0] }}
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                        >
                            <HiX onClick={() => setToggle(false)} />
                            <ul>
                                {idList.map((item) => (
                                    <li key={item}>
                                        <a
                                            href={`#${item}`}
                                            onClick={() => setToggle(false)}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </nav>
            <div className='app__navigation'>
                {idList.map((item, index) => (
                    <a
                        href={`#${item}`}
                        key={item + index}
                        className={
                            activeIndex === index
                                ? 'app__navigation-dot active'
                                : 'app__navigation-dot'
                        }
                    />
                ))}
            </div>
            <div className='app__social'>
                <div>
                    <BsTwitter />
                </div>
                <div>
                    <FaFacebookF />
                </div>
                <div>
                    <BsInstagram />
                </div>
            </div>
        </>
    );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

import { categories } from '../../utils/data';
import { WorkDetail } from '../../components';

const Work = () => {
    const [works, setWorks] = useState([]);
    const [filterWork, setFilterWork] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const scrollRef = useRef(null);

    useEffect(() => {
        const query = '*[_type == "works"]';

        client.fetch(query).then((data) => {
            setWorks(data);
            setFilterWork(data);
            console.log(data);
        });
    }, []);

    const handleWorkFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);

            if (item === 'All') {
                setFilterWork(works);
            } else {
                setFilterWork(works.filter((work) => work.tags.includes(item)));
            }
        }, 500);
    };

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    }, []);

    return (
        <>
            <h2 className='head-text'>
                Our <span>works</span> Section
            </h2>

            <div className='app__work-filter'>
                {categories.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__work-filter-item app__flex p-text ${
                            activeFilter === item ? 'item-active' : ''
                        }`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className='app__work-portfolio'
            >
                {filterWork.map((work, index) => (
                    <div
                        className='app__work-item app__flex'
                        key={index}
                    >
                        <div className='app__work-img app__flex'>
                            <img
                                src={urlFor(work.mainImage)}
                                alt={work.name}
                            />

                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{
                                    duration: 0.25,
                                    ease: 'easeInOut',
                                    staggerChildren: 0.5,
                                }}
                                className='app__work-hover app__flex'
                            >
                                <Link
                                    to={`work-detail/${work?._id}`}
                                    className='flex gap-2 mt-2 items-center'
                                >
                                    <p className='font-semibold capitalize'>
                                        {work?.title}
                                    </p>
                                </Link>
                            </motion.div>
                        </div>

                        <div className='app__work-content app__flex'>
                            <h4 className='bold-text'>{work.title}</h4>
                            <p
                                className='p-text'
                                style={{ marginTop: 10 }}
                            >
                                {work.shortDescription}
                            </p>

                            <div className='app__work-tag app__flex'>
                                <p className='p-text'>{work.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
            <div
                className='pb2 flex-1 h-screen overflow-y-scroll'
                ref={scrollRef}
            >
                <Routes>
                    <Route
                        path='/work-detail/:workId'
                        element={<WorkDetail />}
                    />
                </Routes>
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Work, 'app__works'),
    'work',
    'app__primarybg'
);

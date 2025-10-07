import React, { useState, useEffect } from 'react';
import { getNews } from '../../../api/user.api';

const mockNews = [
    {
        id: 1,
        title: "React 19 Announced: What’s New?",
        description: "React 19 brings several new features including improvements in performance, server components, and hooks.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwR2zl7QEgmkPmOend4li8hxBmt5OeTG4rJA&s",
        link: "https://reactjs.org"
    },
    {
        id: 2,
        title: "AI Revolution in 2025",
        description: "Artificial Intelligence continues to evolve, reshaping industries and creating new opportunities.",
        imageUrl: "https://i0.wp.com/miro.medium.com/v2/resize:fit:700/1*oeKY67llzuZkvHYIjGHfQw@2x.jpeg?ssl=1",
        link: "https://openai.com"
    },
    {
        id: 3,
        title: "SpaceX Launches New Rocket",
        description: "SpaceX successfully launched its new rocket, marking another milestone in private space travel.",
        imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/230115182457-03-spacex-launch-011523.jpg?c=original",
        link: "https://www.spacex.com"
    }
];

const News = () => {
    const [news, setNews] = useState([]);


    const getNewData = async () => {
        try {
            const res = await getNews();
           const data =  res?.data;
            setNews(data)
            
        } catch (err) {
            console.error("Failed to fetch News Data", err);
        }
    };

    useEffect(() => {
        getNewData();
    }, []);
   

    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-5 text-center">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(article => (
                    <div key={article.id} className="bg-white rounded-lg  overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                            <p className="text-gray-600 mb-4">{article.description}</p>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-blue-600 hover:underline"
                            >
                                Read More →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;

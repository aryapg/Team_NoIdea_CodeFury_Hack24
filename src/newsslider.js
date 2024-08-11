import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function NewsSlider() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'natural disasters',
            apiKey: '8d53fc475a174e69902a27e054388fbc',
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="slider">
      {news.length > 0 ? (
        <div className="news-wrapper">
          <div className="news-content">
            {news.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                {article.title} |
              </a>
            ))}
          </div>
          {/* Duplicate the content for seamless looping */}
          <div className="news-content">
            {news.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                {article.title} |
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
}

export default NewsSlider;

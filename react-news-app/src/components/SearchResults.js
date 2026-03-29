import { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Carousel from './Carousel';

const SearchResults = ({ query }) => {
    const API = process.env.REACT_APP_API_KEY;
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API}`;
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setArticles(data.articles || []);
                })
                .catch((error) => {
                    setError(error);
                });
        }
    }, [query, API]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const carouselItems = articles.slice(0, 3).map((news) => ({
        title: news.title,
        description: news.description,
        src: news.urlToImage,
        url: news.url,
    }));

    return (
        <div style={{ marginTop: '100px' }}>
            <Carousel items={carouselItems} />
            <h2 className="text-left ms-4">
                <span className='badge bg-dark-subtle text-dark'>Search Results for "{query}"</span>
            </h2>
            {articles && articles.length > 0 ? (
                articles.map((news, index) => (
                    <NewsItem
                        key={index}
                        title={news.title}
                        description={news.description}
                        src={news.urlToImage}
                        url={news.url}
                    />
                ))
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default SearchResults;

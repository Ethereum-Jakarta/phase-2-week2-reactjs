import {useState, useEffect} from 'react'
import NewsItem from './NewsItem';
import Carousel from './Carousel'

const NewsBoard = ({category}) => {
    const API = process.env.REACT_APP_API_KEY
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API}`
        fetch(url)
            .then((response) => {
               if(!response){
                    throw new Error('Network response was not ok');
               } 
               return response.json()
            })
            .then((data) => {
                console.log(data.articles);
                setArticles(data.articles || [])
            })
            .catch((error) => {
                console.error('Error fetching news:', error);
                setError(error);
            });
                
    }, [category, API])

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
                <span className='badge bg-dark-subtle text-dark'>Enjoy Our Latest '{category}' News</span>
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
                <p>No news articles found.</p>
            )}
        </div>
    )
}

export default NewsBoard;
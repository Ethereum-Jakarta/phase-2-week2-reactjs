const Carousel = ({ items }) => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide m-4"  data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
                {items.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {items.map((item, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="position-relative">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50 rounded"></div>
                                <img
                                    src={item.src ? item.src : "https://placehold.jp/3d4070/ffffff/500x500.png?text=NEWS"}
                                    className="d-block w-100 rounded card-img img-fluid"
                                    
                                    alt={item.title}
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                            </a>
                            <div className="carousel-caption d-none d-md-block">
                            <h5>{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</h5>
                            <p>{item.description ? (item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description) : "News about the event."}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;

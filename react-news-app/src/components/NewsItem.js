const NewsItem = ({title, description, src, url}) => {
    return (
        <div className="card bg-dark text-light mb-4 d-inline-block my-4 mx-3 px-2 py-2 card-hover" style={{ maxWidth:"345px" }}>
        <img src={src?src:"https://placehold.jp/3d4070/ffffff/500x500.png?text=NEWS"} style={{ height:"200px", width:"325px" }} className="card-img img-fluid" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title.length > 50 ? title.slice(0, 50) + '...' : title}</h5>
          <p className="card-text">{description ? (description.length > 50 ? description.slice(0, 50) + '...' : description) : "News about the event. Placeholder text for missing descriptions in the news card."}</p>
          <a href={url} target="blank"  className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
}

export default NewsItem;
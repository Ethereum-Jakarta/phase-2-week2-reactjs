const Navbar = ({ setCategory, setSearchQuery }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.search.value;
        setSearchQuery(query);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary fixed-top" data-bs-theme="light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><span className="badge bg-danger text-light fs-4">1stNews</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => setCategory("technology")}>Technology</a></li>
                                <li><a className="dropdown-item" onClick={() => setCategory("business")}>Business</a></li>
                                <li><a className="dropdown-item" onClick={() => setCategory("health")}>Health</a></li>
                                <li><a className="dropdown-item" onClick={() => setCategory("science")}>Science</a></li>
                                <li><a className="dropdown-item" onClick={() => setCategory("sports")}>Sports</a></li>
                                <li><a className="dropdown-item" onClick={() => setCategory("entertainment")}>Entertainment</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input name="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

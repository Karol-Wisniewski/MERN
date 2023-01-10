import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import "../Style/AppStyle.scss";
import Products from './Products';

const Home = () => {

    const [products, setProducts] = useState([]);

    const [resultFor, setResultFor] = useState("");

    const [search, setSearch] = useState('');

    const [sortBy, setSortBy] = useState('');

    const [searchParams, setSearchParams] = useSearchParams({});

    const navigate = useNavigate();

    const getProducts = async (searchParam, sortParam) => {
        if (searchParam && sortParam) {
            return axios.get(`http://localhost:5000/products?search=${searchParam}&sort=${sortParam}`);
        } else if (searchParam) {
            return axios.get(`http://localhost:5000/products?search=${searchParam}`);
        } else if (sortParam) {
            return axios.get(`http://localhost:5000/products?sort=${sortParam}`);
        } else {
            return axios.get('http://localhost:5000/products');
        }
    };

    const handleSort = (e) => {
        console.log("cos")
        e.preventDefault();
        setSortBy(e.target.value);
        setSearchParams(searchParams.get("search") ? { sort: e.target.value, search: searchParams.get("search") } : { sort: e.target.value });
    }

    const filterProducts = (e) => {
        e.preventDefault();
        setSearchParams(sortBy ? { search: search, sort: sortBy } : { search: search });
        setSearch('');
        setResultFor(`Results for: "${search}"`);
    }

    const clearFilters = () => {
        setSearchParams({});
        setSearch('');
        setSortBy('');
        setResultFor('');
    }

    useEffect(() => {
        const searchParam = searchParams.get('search');
        const sortParam = searchParams.get('sort');
        getProducts(searchParam, sortParam).then(res => setProducts(res.data));
    }, [searchParams]);

    return (
    <div className="Home">
        <h1>Products</h1>
        <form
            className="search-form"
            role="search"
            onSubmit={filterProducts}
        >
            <input
                required
                className="search"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="search"
                placeholder="Search..."
            />
            <button type="submit">Search</button>
            <select
                value={sortBy}
                onChange={handleSort}
            >
                <option value="">Sort by</option>
                <option value="name_a_z">Name A-Z</option>
                <option value="name_z_a">Name Z-A</option>
                <option value="price_low">Price - lowest</option>
                <option value="price_hig">Price - highest</option>
            </select>
        </form>
        <div className="buttons-div">
            <button onClick={() => navigate("add")}>Add new product</button>
            <button onClick={clearFilters}>Clear filters</button>
        </div>
        <p>{resultFor}</p>
        <Products products={products} getProducts={getProducts} setProducts={setProducts}/>
    </div>
    );
}

export default Home;

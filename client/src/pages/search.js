import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../actions/event.actions";
import { getProducts } from "../actions/product.actions";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "../components/Utils";
import { Form } from "reactstrap";

const EVENT = "EVENT";
const PRODUCT = "PRODUCT";
const POST = "POST";

const Search = () => {
    const dispatch = useDispatch();

    const events = useSelector((state) => state.eventReducer);
    const [loadEvents, setLoadEvents] = useState(true);

    const products = useSelector((state) => state.productReducer);
    const [loadProducts, setLoadProducts] = useState(true);

    const posts = useSelector((state) => state.postReducer);
    const [loadPosts, setLoadPosts] = useState(true);

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [inSearch, setInSearch] = useState(true);

    const [filter, setFilter] = useState("all");
    const [loadFilter, setLoadFilter] = useState(true);
    const createItem = (type, term, id, desc) => {
        return {
            type,
            term,
            id,
            desc,
        };
    };
    const getSearchItems = () => {
        const items = [];
        // Get Events
        if (!isEmpty(events[0]) && (filter === "events" || filter === "all")) {
            events.map((event) =>
                items.push(
                    createItem(EVENT, event.nom, event._id, event.description)
                )
            );
        }
        // Get Products
        if (
            !isEmpty(products[0]) &&
            (filter === "products" || filter === "all")
        ) {
            products.map((product) =>
                items.push(
                    createItem(
                        PRODUCT,
                        product.nom,
                        product._id,
                        product.description
                    )
                )
            );
        }
        // Get Posts
        if (!isEmpty(posts[0]) && (filter === "posts" || filter === "all")) {
            posts.map((post) =>
                items.push(createItem(POST, post.title, post._id, post.message))
            );
        }
        return items;
    };

    useEffect(() => {
        if (loadEvents) {
            dispatch(getEvents());
            setLoadEvents(false);
        }
        if (loadProducts) {
            dispatch(getProducts());
            setLoadProducts(false);
        }
        if (loadPosts) {
            dispatch(getPosts());
            setLoadPosts(false);
        }
        setData(getSearchItems());
        setLoadFilter(false);
        setInSearch(false);
    }, [loadEvents, loadProducts, loadPosts, dispatch, loadFilter, inSearch]);

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        setInSearch(true);
    };

    const handleFilter = (e) => {
        let value = e.target.value;
        setFilter(value);
        setLoadFilter(true);
    };
    return (
        <div className="content">
            <div>
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    onChange={handleSearchTerm}
                    placeholder="Rechercher"
                />
            </div>
            <div>
                <Form>
                    <div>
                        <input
                            type="radio"
                            id="all"
                            name="all"
                            value="all"
                            onChange={handleFilter}
                            checked={filter === "all"}
                        />
                        <label htmlFor="all">Tous</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="events"
                            name="events"
                            value="events"
                            onChange={handleFilter}
                            checked={filter === "events"}
                        />
                        <label htmlFor="events">Evénements</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="products"
                            name="products"
                            value="products"
                            onChange={handleFilter}
                            checked={filter === "products"}
                        />
                        <label htmlFor="products">Produits</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="posts"
                            name="posts"
                            value="posts"
                            onChange={handleFilter}
                            checked={filter === "posts"}
                        />
                        <label htmlFor="posts">Posts</label>
                    </div>
                </Form>
            </div>
            <div>
                {data
                    .filter((val) => {
                        return val.term
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase());
                    })
                    .map((val) => {
                        return <div id={val.id}>{val.term}</div>;
                    })}
            </div>
        </div>
    );
};

export default Search;

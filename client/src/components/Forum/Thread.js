import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import Card from "./Card";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const [searchTerm, setSearchTerm] = useState("");
    const [inSearch, setInSearch] = useState(true);

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        setInSearch(true);
    };

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);

    return (
        <div className="thread-container">
            <div className="searchBar-container">
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    onChange={handleSearchTerm}
                    placeholder="Rechercher"
                />
            </div>
            <ul>
                {!isEmpty(posts[0]) &&
                    posts
                        .filter((val) => {
                            return val.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase());
                        })
                        .map((post) => {
                            return <Card post={post} key={post._id} />;
                        })}
            </ul>
        </div>
    );
};

export default Thread;

import React, { useContext } from "react";
import Header from "../components/header";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Forum/NewPostForm";
import Thread from "../components/Forum/Thread";
import Log from "../components/Log";

const Forum = () => {
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <div className="main">
                <div className="home-header">
                    {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
                </div>
                <div className="container thread">
                    <Header title="Forum"/>
                    <Thread/>
                </div>
            </div>
        </div>
        );
    };

export default Forum;
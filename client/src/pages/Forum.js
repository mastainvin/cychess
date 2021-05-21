import React, { useContext } from "react";
import Header from "../components/header";
import { UidContext } from "../components/Routes/AppContext";
import NewPostForm from "../components/Forum/NewPostForm";
import Thread from "../components/Forum/Thread";
import { Alert } from "reactstrap";

const Forum = () => {
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <div className="main">
                <div className="container thread">
                    <Header title="Forum"/>
                    {uid ? <NewPostForm /> : 
                        <Alert color="warning" style={{ width: "100%" }}>
                            Attention ! Vous ne pouvez pas poster de message si vous n'êtes pas connecté.
                        </Alert>
                    }
                    <Thread/>
                </div>
            </div>
        </div>
        );
    };

export default Forum;
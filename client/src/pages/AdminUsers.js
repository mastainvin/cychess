import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { ListGroup } from "reactstrap";
import { Redirect } from "react-router";
import Header from "../components/header";
import { getUsers } from "../actions/users.actions";
import ListElement from "../components/Users-admin/ListElement";
import "./AdminUsers.scss";
const AdminUsers = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [usersLoaded, setUsersLoaded] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!usersLoaded) {
            dispatch(getUsers());
            setUsersLoaded(true);
        }
    }, [dispatch, usersLoaded]);

    const notAdmin = !isAdmin(userData);

    return (
        <div className="container">
            <Header title="Administration - Utilisateurs" />
            {notAdmin ? (
                <Redirect to="/" />
            ) : (
                <div>
                    {!usersLoaded ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <div>
                            <ListGroup>
                                {!isEmpty(usersData) &&
                                    usersData.map((user) => {
                                        return (
                                            <ListElement
                                                user={user}
                                                key={user._id}
                                            />
                                        );
                                    })}
                            </ListGroup>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminUsers;

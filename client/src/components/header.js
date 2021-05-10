import React from "react";
const Header = ({ title }) => {
    return (
        <div style={{ width: "100%" }}>
            <h1>{title}</h1>
            <hr
                style={{
                    color: "grey",
                    backgroundColor: "grey",
                    height: 0.25,
                }}
            />
        </div>
    );
};

export default Header;

import "./App.css";
import Routes from "./components/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { UidContext } from "./components/Routes/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
                .then((res) => {
                    console.log(res);
                    setUid(res.data);
                })
                .catch((err) => console.log("No token"));
        };
        fetchToken();

        if (uid) dispatch(getUser(uid));
    }, [uid]);

    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
}

export default App;

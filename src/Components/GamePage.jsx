import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    generateKey,
    setGameKeyInState,
    joinRoomValidation,
} from "../Actions/gameData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner/Spinner";

const GamePage = ({
    generateKey,
    joinRoomValidation,
    setGameKeyInState,
    userInfo: { username },
    gameData: { error },
    loading: { globalLoading },
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (username === null || username === "") navigate("/");
    }, [username, navigate]);

    const [joinBox, setJoinBox] = useState(false);
    const [roomkey, setRoomKey] = useState("");

    const createRoom = async () => {
        const generatedKey = await generateKey();
        navigate(`/game/${generatedKey}`);
    };

    const joinRoom = async () => {
        const res = await joinRoomValidation(roomkey);
        if (res.status === 200) {
            setGameKeyInState(roomkey);
            navigate(`/game/${roomkey}`);
        }
    };

    return globalLoading ? (
        <Spinner />
    ) : (
        <div>
            <div className="title">Welcome {username}</div>

            <br />
            <hr />
            <div className="GameRoom">
                <input
                    type="button"
                    value="Create Room"
                    onClick={createRoom}
                ></input>
                <input
                    type="button"
                    value="Join Room"
                    onClick={() => setJoinBox(true)}
                ></input>
            </div>
            <br />
            <br />
            {joinBox ? (
                <div className="room-key-input">
                    Enter Room Key: {""}
                    <input
                        type="text"
                        name="username"
                        value={roomkey}
                        onChange={(e) => setRoomKey(e.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="button"
                        value="JOIN"
                        onClick={joinRoom}
                    ></input>
                </div>
            ) : (
                ""
            )}
            <br />
            {error !== "" ? <div>{error}</div> : ""}
        </div>
    );
};

GamePage.propTypes = {
    username: PropTypes.string,
    generateKey: PropTypes.func.isRequired,
    setGameKeyInState: PropTypes.func.isRequired,
    joinRoomValidation: PropTypes.func.isRequired,
    globalLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    gameData: state.gameData,
    loading: state.loading,
});

export default connect(mapStateToProps, {
    generateKey,
    setGameKeyInState,
    joinRoomValidation,
})(GamePage);

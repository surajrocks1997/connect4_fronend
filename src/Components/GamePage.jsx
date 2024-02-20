import { connect } from "react-redux";
import PropTypes from "prop-types";
import { generateKey, setGameKeyInState } from "../Actions/gameData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GamePage = ({
    generateKey,
    setGameKeyInState,
    userInfo: { username },
}) => {
    const [joinBox, setJoinBox] = useState(false);
    const [roomkey, setRoomKey] = useState("");
    const navigate = useNavigate();

    const createRoom = async () => {
        const generatedKey = await generateKey();
        navigate(`/game/${generatedKey}`);
    };

    const joinRoom = () => {
        setGameKeyInState(roomkey);
        navigate(`/game/${roomkey}`);
    };

    return (
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
        </div>
    );
};

GamePage.propTypes = {
    username: PropTypes.string,
    generateKey: PropTypes.func.isRequired,
    setGameKeyInState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { generateKey, setGameKeyInState })(
    GamePage
);

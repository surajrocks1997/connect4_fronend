import { connect } from "react-redux";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import Stomp̥ from "stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { disconnect } from "../Actions/gameData";
import { useNavigate } from "react-router-dom";

const WaitingRoom = ({
    props,
    gameData: {
        loading,
        gameKey,
        gameStatus: { joinStatus },
    },
    userInfo: { username, isAdmin },
    disconnect,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (gameKey == null) return navigate("/game");

        const socket = new SockJS("http://localhost:8080/ws-connect4");
        const stompClient = Stomp̥.over(socket);

        const onConnected = (frame) => {
            console.log(frame);

            const onMessageRecieved = (payload) => {
                console.log("FROM ON MESSAGE RECIEVED");
                var message = JSON.parse(payload.body);
                dispatch({
                    type: message.type,
                    payload:
                        message.username +
                        (message.type === "JOIN" ? " joined" : " left!!"),
                });
            };

            stompClient.subscribe(
                "/topic/" + gameKey + "/key",
                onMessageRecieved
            );

            stompClient.send(
                `/app/game.addUser/${gameKey}`,
                {},
                JSON.stringify({ username, type: "JOIN" })
            );
        };
        const onError = (error) => {
            console.log(error);
            console.log(
                "Could not connect to WebSocket server. Please refresh this page to try again!"
            );
        };

        stompClient.connect({}, onConnected, onError);

        return () => {
            // stompClient.send(
            //     `/app/game.removeUser/${gameKey}`,
            //     {},
            //     JSON.stringify({ username, type: "LEAVE" })
            // );

            // TODO
            disconnect();

            stompClient.disconnect(
                {},
                {
                    gameKey,
                }
            );
        };
    }, [dispatch, navigate, disconnect, gameKey, username]);

    return (
        <div>
            <div className="title">Waiting Room</div>
            <br />
            <hr />
            {loading ? (
                ""
            ) : (
                <div>
                    Your GAME KEY is : {gameKey} <br />{" "}
                </div>
            )}
            {joinStatus.length > 0 && joinStatus.map((ele) => <p>{ele}</p>)}

            <hr />
            {isAdmin ? (
                <div className="btn join-game-button">
                    <input type="button" value="START GAME" />
                </div>
            ) : (
                <p>Waiting for Admin to Start the Game... Please be Patient</p>
            )}
        </div>
    );
};

WaitingRoom.propTypes = {
    username: PropTypes.string,
    loading: PropTypes.bool,
    gameKey: PropTypes.string,
    joinStatus: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    disconnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { disconnect })(WaitingRoom);

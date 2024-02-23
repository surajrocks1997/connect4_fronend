import { connect } from "react-redux";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { disconnect, getBoard } from "../Actions/gameData";
import { useNavigate } from "react-router-dom";

import Board from "./Board";

const WaitingRoom = ({
    props,
    gameData: {
        loading,
        gameKey,
        gameStatus: { joinStatus, players, gameStarted },
    },
    userInfo: { username, isAdmin },
    disconnect,
    getBoard,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const socket = new SockJS("http://localhost:8080/ws-connect4");
    const stompClient = Stomp.over(socket);

    useEffect(() => {
        if (gameKey == null) return navigate("/game");

        const onConnected = (frame) => {
            console.log(frame);

            const onMessageRecieved = (payload) => {
                console.log("FROM ON MESSAGE RECIEVED");
                var message = JSON.parse(payload.body);
                if (message.type === "JOIN" || message.type === "LEAVE") {
                    dispatch({
                        type: message.type,
                        payload:
                            message.username +
                            (message.type === "JOIN" ? " joined" : " left!!"),
                    });
                } else {
                    dispatch({
                        type: message.type,
                        payload: true,
                    });
                }
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
            disconnect();

            stompClient.disconnect(
                {},
                {
                    gameKey,
                }
            );
        };
    }, [dispatch, navigate, disconnect, gameKey, username]);

    const startGame = async () => {
        await getBoard();
        stompClient.send(
            `/app/game.startGame/${gameKey}`,
            {},
            JSON.stringify({ username, type: "START" })
        );
    };

    return gameStarted ? (
        <Board stompClient={stompClient} />
    ) : (
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
            {joinStatus.length > 0 &&
                joinStatus.map((ele) => <p key={ele}>{ele}</p>)}

            <hr />

            {isAdmin ? (
                players > 1 ? (
                    <div className="btn join-game-button">
                        <input
                            type="button"
                            value="START GAME"
                            onClick={startGame}
                        />
                    </div>
                ) : (
                    <p>
                        Share this Game Key with your Friend to join this Game
                        Room
                    </p>
                )
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
    joinStatus: PropTypes.array,
    isAdmin: PropTypes.bool,
    disconnect: PropTypes.func.isRequired,
    players: PropTypes.number,
    gameStarted: PropTypes.bool,
    getBoard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { disconnect, getBoard })(WaitingRoom);

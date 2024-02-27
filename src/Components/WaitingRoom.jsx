import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { disconnect, getBoard } from "../Actions/gameData";
import { useNavigate } from "react-router-dom";

import Board from "./Board";
import webSocketService from "../class/WebSocketService";
import JoinLeaveStatus from "./JoinLeaveStatus";

const WaitingRoom = ({
    props,
    gameData: {
        loading,
        gameKey,
        gameStatus: { players, gameStarted },
        gameSettings: { rows, cols },
    },
    userInfo: { username, isAdmin },
    disconnect,
    getBoard,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const stompClient = webSocketService.getStompClient();
        setStompClient(stompClient);
        if (gameKey == null) return navigate("/game");

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

        stompClient.subscribe("/topic/" + gameKey + "/key", onMessageRecieved);

        stompClient.send(
            `/app/game.addUser/${gameKey}`,
            {},
            JSON.stringify({ username, type: "JOIN" })
        );

        return () => {
            disconnect();
            stompClient.send(
                `/app/game.removeUser/${gameKey}`,
                {},
                JSON.stringify({ username, type: "LEAVE" })
            );

            stompClient.unsubscribe("/topic/" + gameKey + "/key");
        };
    }, [dispatch, navigate, disconnect, gameKey, username]);

    const startGame = () => {
        getBoard(rows, cols);
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
            <JoinLeaveStatus />
            {/* {joinStatus.length > 0 &&
                joinStatus.map((ele, index) => <p key={index}>{ele}</p>)} */}

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
    rows: PropTypes.number,
    cols: PropTypes.number,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { disconnect, getBoard })(WaitingRoom);

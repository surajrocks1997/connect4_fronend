import { connect } from "react-redux";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import Stomp̥ from "stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const WaitingRoom = ({
    props,
    gameData: { loading, gameKey, joinStatus, leaveStatus },
    userInfo: { username },
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws-connect4");
        const stompClient = Stomp̥.over(socket);

        const onConnected = (frame) => {
            console.log(frame);

            const onMessageRecieved = (payload) => {
                console.log("FROM ON MESSAGE RECIEVED");
                var message = JSON.parse(payload.body);
                dispatch({
                    type: message.type,
                    payload: message.username,
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
            stompClient.send(
                `/app/game.removeUser/${gameKey}`,
                {},
                JSON.stringify({ username, type: "LEAVE" })
            );

            stompClient.disconnect(
                {},
                {
                    gameKey,
                }
            );
        };
    }, [dispatch, gameKey, username]);

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
            {joinStatus.length > 0 &&
                joinStatus.map((ele) => <p>{ele} Joined</p>)}
            {leaveStatus.length > 0 &&
                leaveStatus.map((ele) => <p>{ele} Left!</p>)}
        </div>
    );
};

WaitingRoom.propTypes = {
    username: PropTypes.string,
    loading: PropTypes.bool,
    gameKey: PropTypes.string,
    joinStatus: PropTypes.array.isRequired,
    leaveStatus: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, {})(WaitingRoom);

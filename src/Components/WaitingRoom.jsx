import { connect } from "react-redux";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import Stomp̥ from "stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const WaitingRoom = ({
    props,
    gameData: { loading, gameKey },
    userInfo: { username },
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws-connect4");
        const stompClient = Stomp̥.over(socket);

        const onConnected = (frame) => {
            console.log(frame);

            const onMessageRecieved = (message) => {
                console.log(message);

                stompClient.send(
                    `/app/game.addUser/${props.gameKey}`,
                    {},
                    JSON.stringify({ sender: username, type: "JOIN" })
                );
            };

            stompClient.subscribe(
                "/topic/" + gameKey + "/key",
                onMessageRecieved
            );
        };
        const onError = (error) => {
            console.log(error);
            console.log(
                "Could not connect to WebSocket server. Please refresh this page to try again!"
            );
        };

        stompClient.connect({}, onConnected, onError);
    }, [dispatch, gameKey]);

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
        </div>
    );
};

WaitingRoom.propTypes = {
    username: PropTypes.string,
    loading: PropTypes.bool,
    gameKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, {})(WaitingRoom);

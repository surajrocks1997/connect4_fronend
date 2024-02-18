import { connect } from "react-redux";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import Stomp̥ from "stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const WaitingRoom = ({
    userInfo: { username },
    gameData: { loading, gameKey },
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws-connect4");
        const stompClient = Stomp̥.over(socket);

        stompClient.connect(
            {},
            (frame) => {
                console.log("Connected: " + frame);
                stompClient.subscribe(
                    "/topic/" + gameKey + "/key",
                    (message) => {
                        console.log(message);
                    }
                );
            },
            (error) => {
                console.log(error);
                console.log(
                    "Could not connect to WebSocket server. Please refresh this page to try again!"
                );
            }
        );
    }, [dispatch]);

    return (
        <div>
            <div className="title">Waiting Room</div>
            <br />
            <hr />
        </div>
    );
};

WaitingRoom.propTypes = {
    username: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    gameKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    gameData: state.gameData,
});

export default connect(mapStateToProps, {})(WaitingRoom);

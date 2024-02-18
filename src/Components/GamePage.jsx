import { connect } from "react-redux";
import PropTypes from "prop-types";
import { generateKey } from "../Actions/gameData";
import { useNavigate } from "react-router-dom";

const GamePage = ({
    generateKey,
    userInfo: { username },
    gameData: { loading, gameKey },
}) => {
    const navigate = useNavigate();

    const createRoom = () => {
        generateKey();
        navigate("/wait");
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
                <input type="button" value="Join Room"></input>
            </div>
            <br />
            {loading ? (
                ""
            ) : (
                <div>
                    Your GAME KEY is : {gameKey} <br />{" "}
                </div>
            )}
            {loading ? "" : <div></div>}
        </div>
    );
};

GamePage.propTypes = {
    username: PropTypes.string.isRequired,
    generateKey: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    gameKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    gameData: state.gameData,
});

export default connect(mapStateToProps, { generateKey })(GamePage);

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { generateKey } from "../Actions/gameData";
import { useNavigate } from "react-router-dom";

const GamePage = ({ generateKey, userInfo: { username } }) => {
    const navigate = useNavigate();

    const createRoom = async () => {
        const generatedKey = await generateKey();
        navigate(`/game/${generatedKey}`);
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
        </div>
    );
};

GamePage.propTypes = {
    username: PropTypes.string,
    generateKey: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    gameKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { generateKey })(GamePage);

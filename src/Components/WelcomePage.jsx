import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { setUserName } from "../Actions/userData";
import { generateKey } from "../Actions/gameData";

const WelcomePage = ({
    setUserName,
    generateKey,
    gameData: { loading, gameKey },
}) => {
    const [name, setName] = useState("");

    const updateName = (e) => {
        setName(e.target.value.toUpperCase());
    };

    return (
        <div>
            <div className="Title">WELCOME TO CONNECT4 GAME</div>
            <br />
            <div className="user">
                Enter Your Name: <br />
                <input
                    type="text"
                    name="username"
                    value={name}
                    onChange={(e) => updateName(e)}
                />
                <input
                    type="button"
                    value="Submit"
                    onClick={() => setUserName(name)}
                ></input>
            </div>
            <br />
            <hr />
            <div className="GameRoom">
                <input
                    type="button"
                    value="Create Room"
                    onClick={() => generateKey()}
                ></input>
                <input type="button" value="Join Room"></input>
            </div>
            <br />
            {loading ? "" : <div>Your GAME KEY is : {gameKey}</div>}
        </div>
    );
};

WelcomePage.propTypes = {
    setUserName: PropTypes.func.isRequired,
    generateKey: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    gameKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    gameData: state.gameData,
});

export default connect(mapStateToProps, { setUserName, generateKey })(
    WelcomePage
);

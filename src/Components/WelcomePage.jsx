import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { setUserName } from "../Actions/userData";

const WelcomePage = ({ setUserName }) => {
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
        </div>
    );
};

WelcomePage.propTypes = {
    setUserName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userData: state.userReducer,
});

export default connect(mapStateToProps, { setUserName })(WelcomePage);

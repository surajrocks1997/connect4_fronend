import { connect } from "react-redux";
import PropTypes from "prop-types";

const JoinLeaveStatus = ({
    gameData: {
        gameStatus: { joinStatus },
    },
}) => {
    return (
        joinStatus.length > 0 &&
        joinStatus.map((ele, index) => <p key={index}>{ele}</p>)
    );
};

JoinLeaveStatus.propTypes = {
    joinStatus: PropTypes.array,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
});

export default connect(mapStateToProps, {})(JoinLeaveStatus);

import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { MOVE } from "../Actions/types";

const Board = ({
    stompClient,
    userInfo: { moveIdentifier },
    gameData: {
        board,
        gameKey,
        gameSettings: { rows, cols },
    },
}) => {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState(
        Array(rows).fill(Array(cols).fill("/empty.png"))
    );

    const updateGrid = (updatedGrid) => {
        const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cellIndex) => {
                if (updatedGrid[rIndex][cellIndex] === 1) return "/redDot.png";
                else if (updatedGrid[rIndex][cellIndex] === 2)
                    return "/greenDot.png";
                else return "/empty.png";
            })
        );

        setGrid(newGrid);
    };

    useEffect(() => {
        const onConnected = (frame) => {
            console.log(frame);

            const onMessageRecieved = (payload) => {
                var message = JSON.parse(payload.body);
                const updatedGrid = message.board;

                dispatch({
                    type: MOVE,
                    payload: updatedGrid,
                });

                updateGrid(updatedGrid);
            };

            stompClient.subscribe(
                "/topic/" + gameKey + "/game",
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

    const handleCellClick = (rowIndex, colIndex) => {
        stompClient.send(
            `/app/game.move/${gameKey}`,
            {},
            JSON.stringify({ colIndex, moveIdentifier, board })
        );
    };

    return (
        <div className="board">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="wrapper">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className="box box2"
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {/* Display the image based on the cell value */}
                            {cell && <img src={cell} alt="a balloons" />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

Board.propTypes = {
    moveIdentifier: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number,
    stompClient: PropTypes.object.isRequired,
    gameKey: PropTypes.string,
    board: PropTypes.array,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, {})(Board);

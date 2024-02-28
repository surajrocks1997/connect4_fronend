import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { INIT_BOARD, MOVE, WON } from "../Actions/types";
import { changeTurn, getBoard, reset } from "../Actions/gameData";
import webSocketService from "../class/WebSocketService";
import Spinner from "./Spinner/Spinner";
import { setGlobalLoadingState } from "../Actions/loadingState";

const Board = ({
    changeTurn,
    getBoard,
    reset,
    userInfo: { moveIdentifier },
    gameData: {
        board,
        gameKey,
        gameSettings: { rows, cols },
        wonStatus: { won, player },
        gameStatus: { turn },
        players,
    },
    loading: { globalLoading },
    setGlobalLoadingState,
}) => {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState(
        Array(rows).fill(Array(cols).fill("/transparent.png"))
    );
    const [stompClient, setStompClient] = useState(null);

    const updateGrid = (updatedGrid) => {
        const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cellIndex) => {
                if (updatedGrid[rIndex][cellIndex] === 1) return "/redDot.png";
                else if (updatedGrid[rIndex][cellIndex] === 2)
                    return "/greenDot.png";
                else return "/transparent.png";
            })
        );

        setGrid(newGrid);
    };

    useEffect(() => {
        getBoard(gameKey);

        const stompClient = webSocketService.getStompClient();
        setStompClient(stompClient);

        const onMessageRecieved = (payload) => {
            console.log("FROM ON MESSAGE RECIEVED: IN BOARD");
            console.log(payload.body);
            var message = JSON.parse(payload.body);

            if (message.type === "RESET") {
                dispatch({
                    type: INIT_BOARD,
                    payload: message.board,
                });
                updateGrid(message.board);
                changeTurn(message.turn);
                reset(moveIdentifier);
                setGlobalLoadingState(false)
            } else {
                const updatedGrid = message.board;
                changeTurn(message.turn);

                dispatch({
                    type: MOVE,
                    payload: updatedGrid,
                });
                if (message.hasWon === true) {
                    dispatch({
                        type: WON,
                        payload: message.moveIdentifier,
                    });
                }
                updateGrid(updatedGrid);
            }
        };

        stompClient.subscribe("/topic/" + gameKey + "/game", onMessageRecieved);

        return () => {
            stompClient.unsubscribe("/topic/" + gameKey + "/game");
        };
    }, [dispatch]);

    const handleCellClick = (rowIndex, colIndex) => {
        if (won === true) return;
        if (turn === moveIdentifier) {
            stompClient.send(
                `/app/game.move/${gameKey}`,
                {},
                JSON.stringify({ colIndex, moveIdentifier, board })
            );
        }
    };

    const resetBoard = () => {
        setGlobalLoadingState(true);

        stompClient.send(
            `/app/game.move/${gameKey}`,
            {},
            JSON.stringify({ turn, type: "RESET" })
        );
    };

    return globalLoading ? (
        <Spinner />
    ) : (
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

            <br />
            {!won && (
                <p>
                    {turn === moveIdentifier
                        ? "Your "
                        : "Please Wait. It's Opponent's "}
                    turn
                </p>
            )}
            {won && (
                <div>
                    <p>YOU {player === moveIdentifier ? "WIN" : "LOSE!!"}</p>
                    <input type="button" value="REMATCH" onClick={resetBoard} />
                </div>
            )}
            <br />
        </div>
    );
};

Board.propTypes = {
    moveIdentifier: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number,
    stompClient: PropTypes.object,
    gameKey: PropTypes.string,
    board: PropTypes.array,
    won: PropTypes.bool,
    player: PropTypes.number,
    turn: PropTypes.number,
    changeTurn: PropTypes.func,
    setGlobalLoadingState: PropTypes.func,
    getBoard: PropTypes.func,
    reset: PropTypes.func,
};

const mapStateToProps = (state) => ({
    gameData: state.gameData,
    userInfo: state.userInfo,
    loading: state.loading,
});

export default connect(mapStateToProps, {
    changeTurn,
    getBoard,
    reset,
    setGlobalLoadingState,
})(Board);

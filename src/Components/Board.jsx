import { useState } from "react";

const Board = () => {
    const rows = 6;
    const cols = 7;
    
    // Initialize the grid state
    const [grid, setGrid] = useState(Array(rows).fill(Array(cols).fill("/greenDot.png")));

    // Function to handle cell click
    const handleCellClick = (rowIndex, colIndex) => {
        // Create a copy of the grid
        const newGrid = [...grid];

        // Update the cell value in the copy of the grid
        newGrid[rowIndex][colIndex] = "/redDot.png"; // Update with the new image URL

        // Update the state with the new grid
        setGrid(newGrid);
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

export default Board;

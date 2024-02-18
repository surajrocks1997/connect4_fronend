import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import GamePage from "./Components/GamePage";
import WaitingRoom from "./Components/WaitingRoom";

import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route Component={WelcomePage} path="/"></Route>
                    <Route Component={GamePage} path="/game"></Route>
                    <Route Component={WaitingRoom} path="/wait"></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;

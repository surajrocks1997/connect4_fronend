import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";

import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route Component={WelcomePage} path="/"></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;

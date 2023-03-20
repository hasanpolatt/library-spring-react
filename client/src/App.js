import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LibraryList from "./LibraryList";
import Home from "./Home";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact={true} path="/books" element={<LibraryList />} />
        </Routes>
    </Router>
  );
}

export default App;

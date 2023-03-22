import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LibraryList from "./LibraryList";
import Home from "./Home";
import LibraryEdit from "./LibraryEdit";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact={true} path="/books" element={<LibraryList />} />
            <Route path='/books/:id' element={<LibraryEdit />} />
        </Routes>
    </Router>
  );
}

export default App;

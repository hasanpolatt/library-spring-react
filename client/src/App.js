import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/books')
        .then(response => response.json())
        .then(data => {
          setBooks(data);
          setLoading(false);
        })
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Intro">
          <h2>Publishers</h2>
          {books.map(book =>
              <div key={book.id}>
                {book.name}
              </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import ContactState from './context/contacts/ContactState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import SetPassword from './components/SetPassword';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)

    }, 1500);
  }
  const [name, setName] = useState("");
  const [mode, setMode] = useState("light")

  const toggleMode = () => {

    if (mode !== "dark") {
      setMode("dark");
      showAlert("Enabled dark mode", "success");
      document.body.style.backgroundColor = 'black';
      document.body.style.color = "white"
      document.title = "TextUtils - Dark Mode"
    }
    else {
      setMode("light");
      showAlert("Enabled light mode", "success");
      document.body.style.backgroundColor = 'white';
      document.body.style.color = "black"
    }
  }

  return (
    <div className="App">
      <ContactState>
        <HashRouter>
          <div>
            <Navbar name={name} toggleMode={toggleMode} mode={mode} setName={setName} />
          </div>
          <div>
            <Alert alert={alert} />
          </div>
          <Routes>
            <Route exact path='/about' element={<About />} />
            <Route exact path='/setpassword' element={<SetPassword showAlert={showAlert} setName={setName} />} />
            <Route exact path='/' element={<Home showAlert={showAlert} setName={setName} mode={mode} />} />
            <Route exact path='/home' element={<Home showAlert={showAlert} mode={mode} setName={setName} name={name} />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} setName={setName} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} setName={setName} />} />

          </Routes>
        </HashRouter>
      </ContactState>
    </div>
  );
}

export default App;

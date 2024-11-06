import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/common/Login';
import Home from './pages/Home';
import Student from './pages/Student';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  )
}

export default App

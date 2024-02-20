import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import AddEmployee from "./pages/AddEmployee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/employees" element={<Employee />} />
          <Route exact path="/add-employee" element={<AddEmployee />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

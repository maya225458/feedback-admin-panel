import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddFeedback from "./pages/AddFeedback";
import EditFeedback from"./pages/EditFeedback";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-feedback" element={<AddFeedback />} />
        <Route path="/edit-feedback/:id" element={<EditFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";

function AddFeedback() {
  const navigate = useNavigate();

  const handleSaved = () => {
    navigate("/");
  };

  return (
    <div className="form-page">
      <h1>Add Course Feedback</h1>
      <p>Enter the course feedback details below.</p>

      <FeedbackForm onSaved={handleSaved} />
    </div>
  );
}

export default AddFeedback;
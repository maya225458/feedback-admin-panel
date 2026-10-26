import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";

function EditFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/feedback/${id}`
        );

        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.log("Error loading feedback:", error);
      }
    };

    loadFeedback();
  }, [id]);

  const handleSaved = () => {
    navigate("/");
  };

  if (!feedback) {
    return <p>Loading feedback...</p>;
  }

  return (
    <div className="form-page">
      <h1>Edit Course Feedback</h1>
      <p>Update the feedback details below.</p>

      <FeedbackForm
        selectedFeedback={feedback}
        onSaved={handleSaved}
      />
    </div>
  );
}

export default EditFeedback;
import { useState } from "react";

function FeedbackForm({ selectedFeedback, onSaved }) {
  const [formData, setFormData] = useState(
    selectedFeedback || {
      courseId: "",
      courseName: "",
      courseDuration: "",
      feedbackComments: "",
      feedbackRating: ""
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = selectedFeedback
      ? `http://localhost:5000/api/feedback/${selectedFeedback._id}`
      : "http://localhost:5000/api/feedback";

    const method = selectedFeedback ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          feedbackRating: Number(formData.feedbackRating)
        })
      });

      if (response.ok) {
        alert(selectedFeedback ? "Feedback updated!" : "Feedback added!");

        setFormData({
          courseId: "",
          courseName: "",
          courseDuration: "",
          feedbackComments: "",
          feedbackRating: ""
        });

        onSaved();
      }
    } catch (error) {
      alert("Unable to save feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <input
        name="courseId"
        placeholder="Course ID"
        value={formData.courseId}
        onChange={handleChange}
        required
      />

      <input
        name="courseName"
        placeholder="Course Name"
        value={formData.courseName}
        onChange={handleChange}
        required
      />

      <input
        name="courseDuration"
        placeholder="Course Duration"
        value={formData.courseDuration}
        onChange={handleChange}
        required
      />

      <textarea
        name="feedbackComments"
        placeholder="Feedback Comments"
        value={formData.feedbackComments}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="feedbackRating"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        value={formData.feedbackRating}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {selectedFeedback ? "Update Feedback" : "Add Feedback"}
      </button>
    </form>
  );
}

export default FeedbackForm;
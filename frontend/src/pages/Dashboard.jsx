import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feedback");
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.log("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const deleteFeedback = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/feedback/${id}`, {
        method: "DELETE"
      });

      fetchFeedback();
    } catch (error) {
      console.log("Error deleting feedback:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Feedback Dashboard</h1>
          <p>Manage course feedback records</p>
        </div>

        <Link to="/add-feedback" className="add-button">
          + Add Feedback
        </Link>
      </div>

      <div className="feedback-table">
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedback.length === 0 ? (
              <tr>
                <td colSpan="6">No feedback records found.</td>
              </tr>
            ) : (
              feedback.map((item) => (
                <tr key={item._id}>
                  <td>{item.courseId}</td>
                  <td>{item.courseName}</td>
                  <td>{item.courseDuration}</td>
                  <td>⭐ {item.feedbackRating}/5</td>
                  <td>{item.feedbackComments}</td>
                  <td>
                    <Link
                      to={`/edit-feedback/${item._id}`}
                      className="edit-button"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteFeedback(item._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
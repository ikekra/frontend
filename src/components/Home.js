import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
  });

  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedResume("");

    try {
      const response = await axios.post("http://localhost:5000/generate-resume", formData);
      setGeneratedResume(response.data.resume);
    } catch (error) {
      console.error("Error generating resume:", error);
      setGeneratedResume("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="relative max-w-3xl w-full bg-white p-8 rounded-2xl shadow-2xl z-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Smart Resume Builder
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="iris"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email-id"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Work Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your work experience..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="JavaScript, Python, React, etc."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Resume"}
          </button>
        </form>

        {/* Display the Generated Resume */}
        {generatedResume && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Generated Resume</h2>
            <pre className="text-gray-700 whitespace-pre-wrap">{generatedResume}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

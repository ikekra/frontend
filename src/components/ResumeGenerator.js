import React, { useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";

const ResumeGenerator = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [userExperience, setUserExperience] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateResume = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generateResume", {
        jobDescription,
        userExperience,
        userSkills,
      });

      setGeneratedResume(response.data.resume);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Smart Resume Builder</h2>

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter Your Experience"
        value={userExperience}
        onChange={(e) => setUserExperience(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="Enter Your Skills (comma-separated)"
        value={userSkills}
        onChange={(e) => setUserSkills(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={generateResume}
      >
        Generate Resume
      </button>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="mt-4 p-4 border rounded bg-gray-100">
        <h3 className="font-semibold">Generated Resume:</h3>
          <Dialog.Title className="text-lg font-semibold">Generated Resume</Dialog.Title>
          <p>{generatedResume}</p>
          <button
  className="bg-green-500 text-white p-2 rounded mt-4"
  onClick={() => {
    const blob = new Blob([generatedResume], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Generated_Resume.txt";
    link.click();
  }}
>
  Download Resume
</button>

          
        </div>
      </Dialog>
      

    </div>
  );
};

export default ResumeGenerator;

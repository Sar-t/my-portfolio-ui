import { useEffect, useState } from "react";
import { getEducation, createEducation, updateEducation } from "../services/api";

function Education() {
  const [education, setEducation] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const res = await getEducation();
    setEducation(res);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =====================
     ADD EDUCATION
  ====================== */

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      degree: "",
      institution: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
    });
  };

  const saveAdd = async () => {
    await createEducation({
      degree: formData.degree,
      institution: formData.institution,
      fieldOfStudy: formData.fieldOfStudy,
      startYear: Number(formData.startYear),
      endYear: formData.endYear ? Number(formData.endYear) : null,
    });

    setIsAdding(false);
    setFormData({});
    fetchEducation();
  };

  /* =====================
     EDIT EDUCATION
  ====================== */

  const startEdit = (edu) => {
    setEditingId(edu._id);
    setIsAdding(false);
    setFormData({ ...edu });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  const saveEdit = async () => {
    await updateEducation(editingId, {
      degree: formData.degree,
      institution: formData.institution,
      fieldOfStudy: formData.fieldOfStudy,
      startYear: Number(formData.startYear),
      endYear: formData.endYear ? Number(formData.endYear) : null,
    });

    setEditingId(null);
    setFormData({});
    fetchEducation();
  };

  return (
    <section className="w-full min-h-screen py-20 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-16">
        <h2 className="font-semibold text-6xl">Education</h2>
        <button
          onClick={startAdd}
          className="px-4 py-2 border"
        >
          + Add Education
        </button>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-12">

        {/* ADD MODE */}
        {isAdding && (
          <div className="border p-6 flex flex-col gap-3">
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="border px-3 py-2"
              placeholder="Degree"
            />

            <input
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="border px-3 py-2"
              placeholder="Field of Study"
            />

            <input
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="border px-3 py-2"
              placeholder="Institution"
            />

            <div className="flex gap-4">
              <input
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                className="border px-3 py-2 w-1/2"
                placeholder="Start Year"
              />

              <input
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                className="border px-3 py-2 w-1/2"
                placeholder="End Year"
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={saveAdd}
                className="px-4 py-2 bg-black text-white"
              >
                Save
              </button>

              <button
                onClick={cancelEdit}
                className="px-4 py-2 border"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* EDUCATION LIST */}
        {education.map((edu) => (
          <div key={edu._id} className="border-b pb-8">
            {editingId === edu._id ? (
              /* EDIT MODE */
              <div className="flex flex-col gap-3">
                <input
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="border px-3 py-2"
                />

                <input
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className="border px-3 py-2"
                />

                <input
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="border px-3 py-2"
                />

                <div className="flex gap-4">
                  <input
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleChange}
                    className="border px-3 py-2 w-1/2"
                  />

                  <input
                    name="endYear"
                    value={formData.endYear || ""}
                    onChange={handleChange}
                    className="border px-3 py-2 w-1/2"
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-black text-white"
                  >
                    Save
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl">{edu.degree}</h3>
                <p className="text-xl">{edu.fieldOfStudy}</p>
                <p className="text-lg text-gray-600">{edu.institution}</p>
                <p className="text-base text-gray-500">
                  {edu.startYear} – {edu.endYear ?? "Present"}
                </p>

                <button
                  onClick={() => startEdit(edu)}
                  className="mt-4 self-start text-sm underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;

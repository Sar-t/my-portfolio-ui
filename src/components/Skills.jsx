import { useEffect, useState } from "react";
import { getSkills, getTopSkills, addProfileSkill } from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(true);

  const normalize = (skill) =>
    skill.toLowerCase().replace(".", "").trim();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);

      const [allSkills, top] = await Promise.all([
        getSkills(),
        getTopSkills(),
      ]);

      setSkills(Array.isArray(allSkills) ? allSkills : []);
      setTopSkills(Array.isArray(top) ? top : []);
    } catch (error) {
      console.error("Failed to fetch skills", error);
      setSkills([]);
      setTopSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    const exists = skills.some(
      (s) => normalize(s.skill) === normalize(newSkill)
    );

    if (exists) {
      alert("Skill already exists");
      return;
    }

    try {
      await addProfileSkill(newSkill.trim());
      setNewSkill("");
      fetchSkills(); // refresh after add
    } catch (error) {
      console.error("Failed to add skill", error);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-20 flex justify-center">
        <p className="text-lg">Loading skills...</p>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-6 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-6xl font-semibold mb-10">Skills</h2>

      {/* Add Skill */}
      <div className="mb-12 flex gap-4">
        <input
          type="text"
          placeholder="Add a skill (e.g. Docker)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="border px-4 py-2"
        />
        <button
          onClick={handleAddSkill}
          className="px-4 py-2 bg-black text-white border"
        >
          Add Skill
        </button>
      </div>

      {/* Top Skills */}
      {topSkills.length > 0 && (
        <div className="w-full max-w-5xl mb-16">
          <h3 className="text-3xl font-medium mb-6 text-center">
            Top Skills
          </h3>

          <div className="flex flex-wrap gap-4 justify-center">
            {topSkills.map((item, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2"
              >
                <span className="text-lg capitalize">
                  {item.skill}
                </span>
                <span className="text-sm opacity-70">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Skills */}
      <div className="w-full max-w-5xl">
        <h3 className="text-3xl font-medium mb-6 text-center">
          All Skills
        </h3>

        {skills.length === 0 ? (
          <p className="text-center text-gray-600">
            No skills available
          </p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((item, index) => (
              <div
                key={index}
                className="px-5 py-3 border rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition"
              >
                <span className="text-lg capitalize">
                  {item.skill}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;

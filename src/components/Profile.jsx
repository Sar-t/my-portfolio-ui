// components/Profile.jsx
import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.education}</p>
      <p>Skills: {profile.skills.join(", ")}</p>

      <div>
        <a href={profile.links.github}>GitHub</a> |{" "}
        <a href={profile.links.linkedin}>LinkedIn</a>
      </div>
    </div>
  );
}

// App.jsx
import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import { getProfile } from "./services/api";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";

export function App() {
  const [profile, setProfile] = useState(null);

  seEffect(() => {
    getProfile().then(res => setProfile(res));
  }, []);


  if (!profile) return <p>Loading...</p>;

  return (
    <div className="w-full mx-auto bg-[#f4f1e8]">
      <ServerStatus />
      {/* Hero section */}
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <span className="font-semibold text-[50px]">Hello, I am</span>
        <span className="font-semibold text-[70px]">{profile.name}!</span>
        <span className="font-normal text-[30px]">{profile.profileDescription}</span>
      </div>
      <hr />
      {/* Education section */}
      <Education />
      <hr />
      <Skills />
      <hr />
      {/* Projects section */}
      <Projects />
      <hr />
      <Certificates />
    </div>
    <div></div>
  );
}

/* ================================
   BASE CONFIG
================================ */

const BASE_API = import.meta.env.PROD
    ? "https://my-portfolio-api-312u.onrender.com/me-api"
    : "/api";

/* Helper to handle responses */
const handleResponse = async (res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const json = await res.json();
  return json.data;
};

/* ================================
   HEALTH
================================ */

export const getHealth = async () => {
  const res = await fetch(`${BASE_API}/health`);
  if (!res.ok) throw new Error("Server unreachable");
  return res.json(); // health endpoint usually returns plain JSON
};


/* ================================
   PROFILE
================================ */

export const getProfile = async () => {
  const res = await fetch(`${BASE_API}/profile`);
  return handleResponse(res);
};

export const createProfile = async (payload) => {
  const res = await fetch(`${BASE_API}/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updateProfile = async (payload) => {
  const res = await fetch(`${BASE_API}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

/* ================================
   PROJECTS
================================ */

export const getProjects = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(
    `${BASE_API}/projects${query ? `?${query}` : ""}`
  );
  return handleResponse(res);
};

export const createProject = async (payload) => {
  const res = await fetch(`${BASE_API}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updateProject = async (id, payload) => {
  const res = await fetch(`${BASE_API}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

/* ================================
   WORK
================================ */

export const getWork = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_API}/work${query ? `?${query}` : ""}`);
  return handleResponse(res);
};

export const createWork = async (payload) => {
  const res = await fetch(`${BASE_API}/work`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updateWork = async (id, payload) => {
  const res = await fetch(`${BASE_API}/work/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

// ---------- Certificates ----------

export const getCertificates = async () => {
  const res = await fetch(`${BASE_API}/certificates`);
  return handleResponse(res);
};

export const createCertificate = async (payload) => {
  const res = await fetch(`${BASE_API}/certificates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updateCertificate = async (id, payload) => {
  const res = await fetch(`${BASE_API}/certificates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

// ---------- skills APIs ----------

export const getSkills = async () => {
  const res = await fetch(`${BASE_API}/skills`);
  return handleResponse(res);
};

// Top skills only (eg: top 5)
export const getTopSkills = async () => {
  const res = await fetch(`${BASE_API}/skills/top`);
  return handleResponse(res);
};
/**
 * (optional) Get all skills via project fetch
 * Useful if you want raw skills later
 */
export const getProjectsSkills = async () => {
  const res = await fetch(`${BASE_API}/projects`);
  const projects = await handleResponse(res);
  return projects.flatMap((project) => project.skills || []);
};
export const addProfileSkill = async (skill) => {
  const res = await fetch(`${BASE_API}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      $push: { skills: skill }
    }),
  });

  const json = await res.json();
  return json.data;
};
/* ================================
   EDUCATION (STANDALONE)
================================ */

export const getEducation = async () => {
  const res = await fetch(`${BASE_API}/education`);
  return handleResponse(res);
};

export const createEducation = async (payload) => {
  const res = await fetch(`${BASE_API}/education`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updateEducation = async (id, payload) => {
  const res = await fetch(`${BASE_API}/education/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

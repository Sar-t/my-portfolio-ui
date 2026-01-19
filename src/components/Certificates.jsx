import { useEffect, useState } from "react";
import {
  getCertificates,
  createCertificate,
  updateCertificate,
} from "../services/api";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await getCertificates();
      setCertificates(Array.isArray(res) ? res : []);
    } catch {
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =====================
     ADD CERTIFICATE
  ====================== */

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: "",
      issuer: "",
      issueDate: "",
      expirationDate: "",
      link: "",
    });
  };

  const saveAdd = async () => {
    await createCertificate({
      ...formData,
      expirationDate: formData.expirationDate || null,
    });
    cancelActions();
    fetchCertificates();
  };

  /* =====================
     EDIT CERTIFICATE
  ====================== */

  const startEdit = (cert) => {
    setEditingId(cert._id);
    setIsAdding(false);
    setFormData({
      ...cert,
      issueDate: cert.issueDate?.slice(0, 10),
      expirationDate: cert.expirationDate?.slice(0, 10),
    });
  };

  const saveEdit = async () => {
    await updateCertificate(editingId, {
      ...formData,
      expirationDate: formData.expirationDate || null,
    });
    cancelActions();
    fetchCertificates();
  };

  const cancelActions = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  return (
    <section className="w-full min-h-screen py-20 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-16">
        <h2 className="text-6xl font-semibold">Certificates</h2>
        <button onClick={startAdd} className="px-4 py-2 border">
          + Add Certificate
        </button>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-12">

        {/* ADD MODE */}
        {isAdding && (
          <div className="border p-6 flex flex-col gap-3">
            <input
              name="title"
              placeholder="Certificate Title"
              value={formData.title}
              onChange={handleChange}
              className="border px-3 py-2"
            />
            <input
              name="issuer"
              placeholder="Issuer"
              value={formData.issuer}
              onChange={handleChange}
              className="border px-3 py-2"
            />

            <div className="flex gap-4">
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="border px-3 py-2 w-1/2"
              />
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="border px-3 py-2 w-1/2"
              />
            </div>

            <input
              name="link"
              placeholder="Certificate Link"
              value={formData.link}
              onChange={handleChange}
              className="border px-3 py-2"
            />

            <div className="flex gap-4 mt-4">
              <button onClick={saveAdd} className="px-4 py-2 bg-black text-white">
                Save
              </button>
              <button onClick={cancelActions} className="px-4 py-2 border">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* LIST */}
        {loading ? (
          <p>Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <p className="text-gray-600">No certificates added</p>
        ) : (
          certificates.map((cert) => (
            <div key={cert._id} className="border-b pb-8">
              {editingId === cert._id ? (
                /* EDIT MODE */
                <div className="flex flex-col gap-3">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border px-3 py-2"
                  />
                  <input
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleChange}
                    className="border px-3 py-2"
                  />
                  <div className="flex gap-4">
                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                      className="border px-3 py-2 w-1/2"
                    />
                    <input
                      type="date"
                      name="expirationDate"
                      value={formData.expirationDate || ""}
                      onChange={handleChange}
                      className="border px-3 py-2 w-1/2"
                    />
                  </div>
                  <input
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="border px-3 py-2"
                  />

                  <div className="flex gap-4 mt-4">
                    <button onClick={saveEdit} className="px-4 py-2 bg-black text-white">
                      Save
                    </button>
                    <button onClick={cancelActions} className="px-4 py-2 border">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW MODE */
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl">{cert.title}</h3>
                  <p className="text-lg">{cert.issuer}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(cert.issueDate).getFullYear()} –{" "}
                    {cert.expirationDate
                      ? new Date(cert.expirationDate).getFullYear()
                      : "No Expiry"}
                  </p>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-sm"
                  >
                    View Certificate
                  </a>

                  <button
                    onClick={() => startEdit(cert)}
                    className="mt-2 self-start text-sm underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Certificates;

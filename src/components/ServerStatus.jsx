import { useEffect, useState } from "react";
import { getHealth } from "../services/api";

function ServerStatus() {
  const [status, setStatus] = useState("checking"); // checking | online | offline

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await getHealth();
        setStatus("online");
      } catch {
        setStatus("offline");
      }
    };

    checkHealth();

    // poll every 10 seconds
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full text-center text-sm py-2 ${
        status === "online"
          ? "bg-green-600 text-white"
          : status === "offline"
          ? "bg-red-600 text-white"
          : "bg-gray-400 text-black"
      }`}
    >
      {status === "checking" && "⏳ Checking server status..."}
      {status === "online" && "🟢 Server is live"}
      {status === "offline" && "🔴 Server is offline"}
    </div>
  );
}

export default ServerStatus;

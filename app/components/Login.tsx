"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getUserRole } from "../Auth/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //City  Admin Dashbord Url
  const DashbaordUrl="http://localhost:4200/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(username, password);
    if (!result.success) {
      setError(result.error || "Invalid credentials!");
      setLoading(false);
      return;
    }

    // Get user role after login
    const userRole = getUserRole();
    if (userRole === "FullAdmin") {
      window.location.href = DashbaordUrl;
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-[1.618rem] z-10">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg p-[2.618rem] rounded-[1.618rem] max-w-[61.8%] w-full border border-white/20 md:max-w-[38.2%] md:mr-[1.618rem] sm:max-w-[61.8%] sm:p-[2rem] z-10">
        <h2 className="text-[1.618em] font-bold text-white text-center mb-[0.618rem] ">City Mangement</h2>
        {error && <p className="text-red-500 text-sm text-center text-[1.0618em] font-[900] mb-[1rem]">Invalid!</p>}
        <form onSubmit={handleLogin} className="space-y-[1.618rem]">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-[0.618em] bg-white/20 text-white rounded-[0.618rem] outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-[0.618rem] bg-white/20 text-white rounded-[0.618rem] outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-[0.618rem] rounded-[0.618rem] transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}


import { jwtDecode } from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

// ✅ Fix Environment Variable Name
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7245";

// ✅ Login Function (Fixed)
export const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Login failed:", errorText);
      return { success: false, error: errorText || "Login failed!" };
    }

    //  Ensure JSON Response Parsing
    const data = await response.json();

    if (!data.token) {
      console.warn("No token received from API!");
      return { success: false, error: "No token received from API!" };
    }

    //  Store JWT in Cookies (Secure)
    setCookie("token", data.token, { maxAge: 60 * 60 * 24, path: "/" });

    console.log("Token Stored in Cookie:", data.token);
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Network error or invalid response!" };
  }
};

// Get User Role from Cookie Token
export const getUserRole = (): string | null => {
  if (typeof window === "undefined") return null; // Ensure running on client side

  const token = getCookie("token");
  if (!token) {
    console.warn("No token found in cookies.");
    return null;
  }

  try {
    const decoded: any = jwtDecode(token as string);
    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    console.log("User Role Extracted:", decoded[roleClaim]);
    return decoded[roleClaim] || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

//  Check if User is Authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false; // Prevent Next.js SSR issue

  const tokenExists = !!getCookie("token");
  console.log("User Authenticated:", tokenExists);
  return tokenExists;
};



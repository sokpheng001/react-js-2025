export const storeAccessToken = (accessToken) => {
  console.log("⚡ Storing Token: Received Object:", accessToken);

  const token = accessToken?.access_token || accessToken?.data?.access_token;
  if (!token) {
    console.error("❌ Invalid token: Missing value");
    return;
  }

  localStorage.setItem("access_token", token);
  console.log("✅ Token stored successfully:", token);
  console.log(
    "🔄 Token in localStorage NOW:",
    localStorage.getItem("access_token")
  );
};

export const getAccessToken = () => {
  const token = localStorage.getItem("access_token");
  console.log("📢 Retrieved Token:", token);
  return token;
};

export const removeAccessToken = () => {
  console.log("🗑️ Removing Token...");
  localStorage.removeItem("access_token");
  console.log("🛑 Token After Removal:", localStorage.getItem("access_token"));
};

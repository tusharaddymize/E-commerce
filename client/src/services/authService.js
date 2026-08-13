import API from "./api";

// ======================================================
// Register User
// ======================================================

export const registerUser = async (userData) => {
  const { data } = await API.post(
    "/auth/register",
    userData
  );

  // IMPORTANT:
  // Registration ke time token save nahi hoga.
  // Pehle OTP verify hoga.

  return data;
};

// ======================================================
// Verify Registration OTP
// ======================================================

export const verifyRegistrationOtp = async (
  email,
  otp
) => {
  const { data } = await API.post(
    "/auth/verify-registration-otp",
    {
      email,
      otp,
    }
  );

  // OTP verified
  // Ab token save hoga

  if (data?.token) {
    localStorage.setItem(
      "token",
      data.token
    );
  }

  if (data?.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

// ======================================================
// Login User
// ======================================================

export const loginUser = async (userData) => {
  const { data } = await API.post(
    "/auth/login",
    userData
  );

  // IMPORTANT:
  // Login ke time token save nahi hoga.
  // Pehle OTP verify hoga.

  return data;
};

// ======================================================
// Verify Login OTP
// ======================================================

export const verifyLoginOtp = async (
  email,
  otp
) => {
  const { data } = await API.post(
    "/auth/verify-login-otp",
    {
      email,
      otp,
    }
  );

  // OTP successfully verified
  // Ab token save hoga

  if (data?.token) {
    localStorage.setItem(
      "token",
      data.token
    );
  }

  if (data?.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

// ======================================================
// Forgot Password
// ======================================================

export const forgotPassword = async (email) => {
  const { data } = await API.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  // IMPORTANT:
  // Yahan token save nahi hoga.
  // Pehle OTP verify hoga.

  return data;
};

// ======================================================
// Verify Forgot Password OTP
// ======================================================

export const verifyForgotPasswordOtp = async (
  email,
  otp
) => {
  const { data } = await API.post(
    "/auth/verify-forgot-password-otp",
    {
      email,
      otp,
    }
  );

  // IMPORTANT:
  // Forgot password OTP verify hone par
  // abhi login token generate nahi hoga.

  return data;
};

// ======================================================
// Reset Password
// ======================================================

export const resetPassword = async ({
  email,
  otp,
  newPassword,
}) => {
  const { data } = await API.post(
    "/auth/reset-password",
    {
      email,
      otp,
      newPassword,
    }
  );

  return data;
};

// ======================================================
// Get Current Logged In User
// ======================================================

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const { data } = await API.get(
    "/auth/me"
  );

  // Keep localStorage user updated
  if (data?.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

// ======================================================
// Logout
// ======================================================

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ======================================================
// Get Token
// ======================================================

export const getToken = () => {
  return localStorage.getItem("token");
};

// ======================================================
// Get Stored User
// ======================================================

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;
  } catch (error) {
    console.error(
      "Stored User Parse Error:",
      error
    );

    localStorage.removeItem("user");

    return null;
  }
};

// ======================================================
// Check Authentication
// ======================================================

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default API;
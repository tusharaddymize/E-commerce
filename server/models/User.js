import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // ===============================
    // Admin
    // ===============================

    isAdmin: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // Basic User Information
    // ===============================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    // ===============================
    // Email Verification
    // ===============================

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationOtp: {
      type: String,
      default: null,
    },

    emailVerificationOtpExpires: {
      type: Date,
      default: null,
    },

    // ===============================
    // Login OTP
    // ===============================

    loginOtp: {
      type: String,
      default: null,
    },

    loginOtpExpires: {
      type: Date,
      default: null,
    },

    // ===============================
    // Forgot Password OTP
    // ===============================

    forgotPasswordOtp: {
      type: String,
      default: null,
    },

    forgotPasswordOtpExpires: {
      type: Date,
      default: null,
    },

    // ===============================
    // Password
    // ===============================

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    // ===============================
    // User Role
    // ===============================

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ===============================
    // Notifications
    // ===============================

    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },

      orderNotifications: {
        type: Boolean,
        default: true,
      },

      userNotifications: {
        type: Boolean,
        default: true,
      },

      marketingEmails: {
        type: Boolean,
        default: false,
      },

      pushNotifications: {
        type: Boolean,
        default: false,
      },
    },

    // ===============================
    // Account Status
    // ===============================

    isBlocked: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // Addresses
    // ===============================

    addresses: [
      {
        fullName: {
          type: String,
        },

        phone: {
          type: String,
        },

        address: {
          type: String,
        },

        city: {
          type: String,
        },

        state: {
          type: String,
        },

        pincode: {
          type: String,
        },

        country: {
          type: String,
          default: "India",
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ===============================
// Hash Password Before Save
// ===============================

userSchema.pre("save", async function (next) {
  try {
    // Password has not changed
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

// ===============================
// Compare Password
// ===============================

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ===============================
// User Model
// ===============================

const User = mongoose.model("User", userSchema);

export default User;
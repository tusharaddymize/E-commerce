import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {


    isAdmin: {
    type: Boolean,
    default: false,
},

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

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },


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




    isBlocked: {
  type: Boolean,
  default: false,
},

    addresses: [
      {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
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

  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});


// ===============================
// Compare Password
// ===============================

userSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(enteredPassword, this.password);

};

const User = mongoose.model("User", userSchema);

export default User;
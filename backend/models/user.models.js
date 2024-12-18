import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    studentFbLink: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    parentFbLink: {
      type: String,
      required: true,
    },
    fines: {
      githubFine: {
        type: Number,
        required: true,
      },
      miniLeaderFine: {
        type: Number,
        required: true,
      },
      miniStudentFine: {
        type: Number,
        required: true,
      },
    },
    aura: {
      points: {
        type: Number,
        required: true,
      },
      classWork: {
        type: Number,
        required: true,

      },
      attendance: {
        type: Number,
        required: true,
      },
      help: {
        type: Number,
        required: true,
      },
      camera: {
        type: Number,
        require: true,
      },
      answers: {
        type: Number,
        required: true,
      }
    },
    payedInfo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    studentsArr: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: undefined
    },
    studentsArr: [StudentSchema],

    restEmailToken: String,
    restEmailExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    clientId: String,
  },
  {
    timestamps: true,
  }
);

const GroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
    },
    students: [StudentSchema], // Embed the Student schema as an array
  },
  {
    timestamps: true,
  }
);
export const Group38Model = mongoose.model("group-38", GroupSchema);
export const Group39Model = mongoose.model("group-39", GroupSchema);
export const Group40Model = mongoose.model("group-40", GroupSchema);
export const UserModel = mongoose.model("User", UserSchema);
export const StudentModel = mongoose.model("Student", StudentSchema);
import mongoose from "mongoose";
import "../middleware/salaryMiddleware"; // Import the middleware

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: undefined
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: [String],
      required: true,
      enum: [
        "admin",
        "leader",
        "mentor",
        "mentorAssistant",
        "mentorAssistantController",
        "mentorController",
        "githubController",
        "leaderController",
        "miniLeaderController",
        "miniLeader",
        "student",
        "miniMentor",
        "miniMentorController",
        "miniStudent",
      ],
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    controllers: {
      leaderController: {
        type: String,
        default: ""
      },
      miniLeaderController: {
        type: String,
        default: ""
      },
      githubController: {
        type: String,
        default: ""
      },
      mentorController: {
        type: String,
        default: ""
      }
    },
    leaderGithubUrl: {
      type: String,
      default: ""
    },
    leaderCodewarsUrl: {
      type: String,
      default: ""
    },
    fbUrl: {
      type: String,
      default: undefined
    },
    rating: {
      cards: {
        green: {
          type: Number,
          default: 0
        },
        yellow: {
          type: Number,
          default: 0
        },
        black: {
          type: Number,
          default: 0
        }
      },
      miniLeaderGithubCheck: {
        firstCheck: {
          type: Number,
          default: 0
        },
        secondCheck: {
          type: Number,
          default: 0
        },
      },
      leaderGithubCheck: {
        type: Number,
        default: 0
      },
      githubCheck: {
        firstCheck: {
          type: Number,
          default: 0
        },
        secondCheck: {
          type: Number,
          default: 0
        },
      },
      parentRating: {
        type: Number,
        default: 0
      },
      examResults: {
        firstCheck: {
          type: Number,
          default: 0
        },
        secondCheck: {
          type: Number,
          default: 0
        },
      },
      codewarsResult: {
        type: Number,
        default: 0
      },
      projectResults: {
        type: [Number],
        default: []
      },
      mentorRating: {
        type: Number,
        default: 0
      },
      mentorAssistantRating: {
        type: Number,
        default: 0
      },
    },
    salary: {
      leaderSalary: {
        type: Number,
        default: 0
      },
      mentorSalary: {
        type: Number,
        default: 0
      },
      mentorAssistantSalary: {
        type: Number,
        default: 0
      },
      mentorAssistantController: {
        type: Number,
        default: 0
      },
      mentorController: {
        type: Number,
        default: 0
      },
      githubController: {
        type: Number,
        default: 0
      },
      leaderController: {
        type: Number,
        default: 0
      },
      miniLeaderController: {
        type: Number,
        default: 0
      },
      miniLeader: {
        type: Number,
        default: 0
      },
      miniMentor: {
        type: Number,
        default: 0
      },
      miniMentorController: {
        type: Number,
        default: 0
      },
    },
    restEmailToken: String,
    restEmailExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    clientId: String,
    mentorControl: [
      {
        mentorController: String,
        mentorControlComment: String,
        mentorControllerName: String, // New field
        date: Date,
      }
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
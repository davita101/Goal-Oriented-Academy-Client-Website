import mongoose from "mongoose";

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
        "admin", //! ყვერლაფერი შეუძლია
        "moderator", //! ყვერლაფერი შეუძლია
        "leader", // ! 
        "mentor",
        "mentorAssistant",
        "mentorAssistantController",
        "mentorController",
        "githubController",
        "leaderController",  //! ყვერლაფერი შეუძლია
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
      leaderGithubCheck: {
        type: Number,
        default: 0
      },

      codewarsResult: {
        type: Number,
        default: 0
      },
      projectResults: {
        type: [Number],
        default: []
      },
    },
    restEmailToken: String,
    restEmailExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    clientId: String,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
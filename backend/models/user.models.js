import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },// 🟩 leaderController
    avatar: {
      type: String,
      default: undefined
    }, // 🟪
    email: {
      type: String,
      required: true,
      unique: true
    },// 🟩 leaderController
    role: {
      type: [String],
      required: true,
      enum: [
        "admin", //! 
        "leader", // 🟩
        "mentor",//!
        "mentorAssistant",//!
        "mentorAssistantController",//!
        "mentorController", //!
        "githubController",//🟩შეუძლია ედიტი ლიდერის სტუდენტის ოღნდ შეზღუდულად
        "leaderController",  //🟩 შეუძლია ედიტი ლიდერის სტუდენტის 
        "miniLeaderController",//🟩 შეუძლია ედიტი ლიდერის ოღღონ შეზღუდულად ასვე სტუდენტზე
        "miniLeader",//!
        "student",//!
        "miniMentor",//!
        "miniMentorController",//!
        "miniStudent",//!
      ],
    }, // admin🟦
    lastLogin: {
      type: Date,
      default: Date.now
    },// 🟩 leaderController
    isVerified: {
      type: Boolean,
      default: false
    },// 🟩 leaderController
    controllers: {
      leaderController: {
        type: String,
        default: ""
      }, //🟩 leaderController
      miniLeaderController: {
        type: String,
        default: ""
      }, //🟩 miniLeaderController
      githubController: {
        type: String,
        default: ""
      }, //🟩 miniLeaderController
      mentorController: {
        type: String,
        default: ""
      }//!
    },// 🟩 leaderController
    leaderGithubUrl: {
      type: String,
      default: ""
    },// 🟩 leaderController
    leaderCodewarsUrl: {
      type: String,
      default: ""
    },// 🟩 leaderController
    fbUrl: {
      type: String,
      default: undefined
    },// 🟩 leaderController
    rating: {
      cards: {
        green: {
          type: Number,
          default: 0
        },
        purple: {
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
      }, // 🟩 leaderController
      miniLeaderGithubCheck: {
        firstCheck: {
          type: Number,
          default: 0
        },
        secondCheck: {
          type: Number,
          default: 0
        },
      }, // 🟩 miniLeaderControl only
      leaderGithubCheck: {
        type: Number,
        default: 0
      }, // 🟩 leaderController
      githubCheck: {
        firstCheck: {
          type: Number,
          default: 0
        },
        secondCheck: {
          type: Number,
          default: 0
        },
      }, // 🟩 leaderController
      parentRating: {
        type: Number,
        default: 0
      }, // 🟩 leaderController
      examResults: {
        firstCheck: {
          type: Number,
          default: 0
        },
        secondCheck: {
          type: Number,
          default: 0
        },
      }, // 🟩 leaderController
      codewarsResult: {
        type: Number,
        default: 0
      }, // 🟩 leaderController
      projectResults: {
        type: [Number],
        default: []
      },// 🟩 leaderController
      mentorRating: {
        type: Number,
        default: 0
      },// 🟩 mentorController
      mentorAssistantRating: {
        type: Number,
        default: 0
      },
      finallyRating: {
        type: Number,
        default: 0
      },
      // 🟩 mentorController
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
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
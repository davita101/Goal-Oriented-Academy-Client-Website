import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }, // 🟩 leaderController
    nickname: {
      type: String,
      default: ''
    }, // 🟩 leader
    avatar: {
      type: String,
      default: undefined
    }, // 🟪
    password: {
      type: String,
      required: true
    }, 
    email: {
      type: String,
      required: true,
      unique: true
    }, // 🟩 leaderController
    role: {
      type: [String],
      required: true,
      enum: [
        'admin', //! Admin role
        'leader', // 🟩 Leader role
        'mentor', //! Mentor role
        'mentorAssistant', //! Mentor Assistant role
        'mentorAssistantController', //! Mentor Assistant Controller role
        'mentorController', //! Mentor Controller role
        'githubController', //🟩 Can edit leader's student with limitations
        'leaderController', //🟩 Can edit leader's student
        'miniLeaderController', //🟩 Can edit leader's student with limitations
        'miniLeader', //! Mini Leader role
        'student', //! Student role
        'miniMentor', //! Mini Mentor role
        'miniMentorController', //! Mini Mentor Controller role
        'miniStudent' //! Mini Student role
      ]
    }, // admin🟦
    lastLogin: {
      type: Date,
      default: Date.now
    }, //  admin🟦
    miniLeaderId: {
      type: String
    }, // 🟩 miniLeader
    controllers: {
      leaderController: {
        type: String,
        default: ''
      }, //🟩 leaderController
      miniLeaderController: {
        type: String,
        default: ''
      }, //🟩 miniLeaderController
      githubController: {
        type: String,
        default: ''
      }, //🟩 miniLeaderController
      mentorController: {
        type: String,
        default: ''
      },
      mentorAssistantController: {
        type: String,
        default: ''
      },
      miniMentorController: {
        type: String,
        default: ''
      }
    }, // 🟩 leaderController
    isVerified: {
      type: Boolean,
      default: false
    }, // 🟩 leaderController
    information: {
      leaderInformation: {
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
          },
          leaderCheck: {
            //? delete leaderGithubUrl: {
            //? delete leaderCodewarsUrl: {
            parentRating: {
              type: Number,
              default: 0
            },
            //? update
            examResults: {
              type: [Number],
              default: []
            },
            //? update
            codewarsResult: {
              type: [Number],
              default: []
            },
            projectResults: {
              type: [Number],
              default: []
            }
          }
        },
        githubCheck: {
          //?  update
          miniLeaderCheck:  {
            type: [Number],
            default: []
          },
          //? update
          studentCheck: {
            type: [Number],
            default: []
          }
        },
        finallyRating: {
          type: Number,
          default: 0
        },
        finalSalary: {
          type: Number,
          default: 0
        }
      },
      mentorInformation: {
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
          },
          // ? update
          exam: {
            type: [Number],
            default: []
          },
          // ? update
          githubCheck: {
            type: [Number],
            default: []
          }
        },
        mentorControl: [
          {
            mentorController: String,
            mentorControlComment: String,
            group: String,
            mentorId: String,
            date: Date,
            fine: Number
          }
        ],
        finallyRating: {
          type: Number,
          default: 0
        },
        finalSalary: {
          type: Number,
          default: 0
        }
      },
      mentorAssistantInformation: {
        rating: {
          type: Number,
          default: 0
        },
        control: [
          {
            mentorAssistantController: String,
            mentorAssistantControlComment: String,
            group: String,
            mentorAssistantId: String,
            date: Date,
            fine: Number
          }
        ],
        finallyRating: {
          type: Number,
          default: 0
        },
        finalSalary: {
          type: Number,
          default: 0
        }
      }
    },
    social: {
      facebook: {
        type: String,
        default: ''
      },
      linkedin: {
        type: String,
        default: ''
      },
      github: {
        type: String,
        default: ''
      },
      //todo add codewars
      codewars: {
        type: String,
        default: ''
      }
    },
    restEmailExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    clientId: String
  },
  { timestamps: true }
)

export const UserModel = mongoose.model('User', UserSchema)

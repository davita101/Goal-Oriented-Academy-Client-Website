import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }, // 🟩 leaderController
    avatar: {
      type: String,
      default: undefined
    }, // 🟪
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
            leaderGithubUrl: {
              type: String,
              default: ''
            },
            leaderGithubCheck: {
              type: Number,
              default: 0
            },
            leaderCodewarsUrl: {
              type: String,
              default: ''
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
              }
            },
            codewarsResult: {
              type: Number,
              default: 0
            },
            projectResults: {
              type: [Number],
              default: []
            }
          }
        },
        githubCheck: {
          miniLeaderCheck: {
            firstCheck: {
              type: Number,
              default: 0
            },
            secondCheck: {
              type: Number,
              default: 0
            }
          },
          studentCheck: {
            firstCheck: {
              type: Number,
              default: 0
            },
            secondCheck: {
              type: Number,
              default: 0
            }
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
          exam: {
            type: Number,
            default: 0
          },
          githubCheck: {
            firstCheck: {
              type: Number,
              default: 0
            }
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

    restEmailExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    clientId: String
  },
  { timestamps: true }
)

export const UserModel = mongoose.model('User', UserSchema)

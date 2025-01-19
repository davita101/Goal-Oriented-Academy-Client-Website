import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    studentFbLink: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    githubLink: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      required: true
    },
    group: {
      type: Number,
      required: true
    },
    leaderId: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    // ! new fields
    parentName: {
      type: String
    },
    parentFbLink: {
      type: String
    },
    githubToken: {
      type: String
    },
    githubLastUpdate: {
      type: String
    },

    fines: {
      githubFine: {
        type: Number
      },
      miniLeaderFine: {
        type: Number
      },
      miniStudentFine: {
        type: Number
      }
    },
    aura: {
      points: {
        type: Number
      },
      classwork: {
        type: Number
      },
      attendance: {
        type: Number
      },
      help: {
        type: Number
      },
      camera: {
        type: Number
      },
      answers: {
        type: Number
      }
    },
    // ! new fields
    studentPersonalInfo: {
      studentId: String,
      studentRegion: String,
      studentCity: String,
      studentStreet: String
    },
    payedInfo: {
      type: Boolean,
      required: true
    },
    comment: {
      leaderComment: {
        type: String
      },
      miniLeaderComment: {
        type: String
      },
      leaderProof: {
        type: String
      },
      controller: {
        miniLeaderController: {
          type: String
        },
        githubController: {
          type: String
        }
      }
    }
  },
  { timestamps: true }
)
// Method to filter out payedInfo for non-admin users
StudentSchema.methods.toJSONForUser = function (userRole) {
  const studentObject = this.toObject()
  if (userRole !== 'admin') {
    delete studentObject.payedInfo
  }
  return studentObject
}
export const StudentModel = mongoose.model('Student', StudentSchema)

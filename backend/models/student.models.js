import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
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
    leaderId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    parentFbLink: {
      type: String,
      required: true,
    },
    githubToken: {
      type: String,
      required: true,
    },
    githubLastUpdate: {
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
        required: true,
      },
      answers: {
        type: Number,
        required: true,
      },
    },
    payedInfo: {
      type: Boolean,
      required: true,
    },
    comment: {
      leaderComment: {
        type: String,
      },
      leaderProof: {
        type: String,
      },
      controller: {
        miniLeaderController: {
          type: String,
        },
        leaderController: {
          type: String,
        },
      },
    },
  },
  { timestamps: true }
);
// Method to filter out payedInfo for non-admin users
StudentSchema.methods.toJSONForUser = function (userRole) {
  const studentObject = this.toObject();
  if (userRole !== 'admin') {
    delete studentObject.payedInfo;
  }
  return studentObject;
};
export const StudentModel = mongoose.model("Student", StudentSchema);

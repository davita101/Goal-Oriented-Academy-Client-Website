import { UserModel } from '../models/user.models.js'
import { StudentModel } from '../models/student.models.js'

export const getAllLeaders = async (req, res) => {

  try {
    const leaders = await UserModel.find({ role: 'leader' })
    if (!leaders || leaders.length === 0) {
      return res.status(404).json({ error: 'Leaders not found' })
    }
    res.status(200).json(leaders)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaders' })
  }
}

export const updateLeaderById = async (req, res) => {
  try {
    let updateData = {};
    const leaderId = req.params.leaderId;

    if (req.user.role.includes("leaderController")) {
      updateData = {
        ...updateData,
        "controllers": {
          ...updateData.controllers,
          "leaderController": req.body?.controllers?.leaderController
        },
        "rating": {
          ...updateData.rating,
          "cards": {
            "black": req.body?.rating?.cards?.black,
            "green": req.body?.rating?.cards?.green,
            "yellow": req.body?.rating?.cards?.yellow
          },
          "examResults": {
            "firstCheck": req.body?.rating?.examResults?.firstCheck,
            "secondCheck": req.body?.rating?.examResults?.secondCheck
          },
          "codewarsResult": req.body?.rating?.codewarsResult,
          "leaderGithubCheck": req.body?.rating?.leaderGithubCheck,
          "parentRating": req.body?.rating?.parentRating,
          "projectResults": req.body?.rating?.projectResults
        },
        "email": req.body.email,
        "name": req.body.name,
      };
    }

    if (req.user.role.includes("miniLeaderController")) {
      updateData = {
        ...updateData,
        "controllers": {
          ...updateData.controllers,
          "miniLeaderController": req.body?.controllers?.miniLeaderController
        },
        "rating": {
          ...updateData.rating,
          "miniLeaderGithubCheck": {
            "firstCheck": req.body?.rating?.miniLeaderGithubCheck?.firstCheck,
            "secondCheck": req.body?.rating?.miniLeaderGithubCheck?.secondCheck
          }
        }
      };
    }

    if (req.user.role.includes("githubController")) {
      updateData = {
        ...updateData,
        "controllers": {
          ...updateData.controllers,
          "githubController": req.body?.controllers?.githubController
        },
        "rating": {
          ...updateData.rating,
          "githubCheck": {
            "firstCheck": req.body?.rating?.githubCheck?.firstCheck,
            "secondCheck": req.body?.rating?.githubCheck?.secondCheck
          }
        }
      };
    }
    const leader = await UserModel.findByIdAndUpdate(
      leaderId,
      updateData,
      { new: true }
    );
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found or no updates made' });
    }

    res.status(200).json(leader);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating leader' });
  }
};
export const deleteLeader = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ leaderId: req.params.leaderId })
    if (req.user.role.includes("admin")) {
      return res.status(401).json({ error: 'Only admin can delete' })
    }
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.status(200).json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error deleting student:', error)
    res.status(500).json({ error: 'Error deleting student' })
  }
}

export const deleteLeaderById = async (req, res) => {
  try {
    const leader = await UserModel.findByIdAndDelete(req.params.leaderId)
    if (req.user.role.includes("admin")) {
      return res.status(401).json({ error: 'Only admin can delete' })
    }
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' })
    }
    res.status(200).json(leader)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leader' })
  }
}

export const getLeaderById = async (req, res) => {
  try {
    const leader = await UserModel.findById(req.params.leaderId)
    if (!leader) {
      return res.status(404).json({ error: 'Leader not found' })
    }
    res.status(200).json(leader)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leader' })
  }
}


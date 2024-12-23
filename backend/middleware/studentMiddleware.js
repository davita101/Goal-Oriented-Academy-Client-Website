import { canStudentEdit } from "../permission/student.js";

export function canViewLeaderStudentsMiddleware(req, res, next) {
    try {
        if (!canStudentEdit(req.user, req.params.leaderId)) {
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
};
export function canLeaderEditStudentMiddleware(req, res, next) {
    const userId = req.user.id;
    const userRole = req.user.role;
    const userReq = req.body;
    const leaderId = req.params.leaderId; // Assuming leaderId is passed as a URL parameter

    const allowedUpdatesForLeader = [
        'avatar', 'leaderGithubUrl', 'leaderCodewarsUrl',
        "comment.leaderComment", "comment.leaderProof",
        "studentFbLink", "email", "githubLink", "role",
        "parentFbLink", "githubToken", "githubLastUpdate"
    ];
    function isAllowedUpdate(key, value) {
        if (typeof value === 'object' && value !== null) {
            return Object.keys(value).every(subKey => isAllowedUpdate(`${key}.${subKey}`, value[subKey]));
        }
        return allowedUpdatesForLeader.includes(key)
    }

    try {
        if (!canStudentEdit(user, leaderId)) {
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        // If the user is a leader, restrict updates to allowed fields
        if (userRole.includes('leader') && userId !== leaderId) {
            for (const key of Object.keys(userReq)) {
                if (!isAllowedUpdate(key, userReq[key])) {
                    return res.status(403).json({ error: `You can't edit ${key}` });
                }
            }
        }
        if (!canStudentEdit(req.user, req.params.leaderId)) {
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
}
export function canLeaderEditMiddleware(req, res, next) {
    const userId = req.user.id;
    const userRole = req.user.role;
    const userReq = req.body;
    const leaderId = req.params.leaderId; // Assuming leaderId is passed as a URL parameter

    const allowedUpdatesForLeader = [
        'avatar', 'leaderGithubUrl', 'leaderCodewarsUrl',
        "comment.leaderComment", "comment.leaderProof",
        "studentFbLink", "email", "githubLink", "role",
        "parentFbLink", "githubToken", "githubLastUpdate"
    ];

    const fieldsToDelete = [
        '_id', 'lastLogin', 'isVerified', 'clientId', 'verificationToken',
        'verificationTokenExpiresAt', 'createdAt', 'updatedAt', '_v',
    ];

    function isAllowedUpdate(key, value) {
        if (typeof value === 'object' && value !== null) {
            return Object.keys(value).every(subKey => isAllowedUpdate(`${key}.${subKey}`, value[subKey]));
        }
        return allowedUpdatesForLeader.includes(key);
    }

    try {
        // If the user is a leader, restrict updates to allowed fields
        if (userRole.includes('leader') && userRole.length === 1 && userId !== leaderId) {
            for (const key of Object.keys(userReq)) {
                if (!isAllowedUpdate(key, userReq[key])) {
                    return res.status(403).json({ error: `You can't edit ${key}` });
                }
            }
        }

        // Ensure only admins can modify the role
        if (userReq.hasOwnProperty("role") && !userRole.includes('admin')) {
            return res.status(403).json({ error: 'Only admin can modify role' });
        }

        // Remove fields that should not be updated
        const forbiddenFields = fieldsToDelete.filter(field => field in userReq);
        if (forbiddenFields.length > 0) {
            return res.status(400).json({ error: `You cannot update the following fields: ${forbiddenFields.join(', ')}` });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
}
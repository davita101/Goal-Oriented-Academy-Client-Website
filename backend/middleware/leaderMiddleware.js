import { canLeaderEdit } from "../permission/leader.js";

export function canViewLeaderMiddleware(req, res, next) {
    try {
        if (!canLeaderEdit(req.user, req.params.leaderId)) {
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
};
export function canLeaderEditMiddleware(req, res, next) {
    const userId = req.user.id;
    const userRole = req.user.role;
    const userReq = req.body;
    const leaderId = req.params.leaderId; // Assuming leaderId is passed as a URL parameter
    const allowedUpdatesForLeader = ['avatar', 'leaderGithubUrl', 'leaderCodewarsUrl'];

    try {

        function isAllowedUpdate(key, value) {
            if (typeof value === 'object' && value !== null) {
                return Object.keys(value).every(subKey => isAllowedUpdate(`${key}.${subKey}`, value[subKey]));
            }
            return allowedUpdatesForLeader.includes(key);
        }
        if (userRole.includes('leader') && !userRole.includes("laderController") && userId == leaderId) {
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
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
}
export function canDelete(req, res, next) {
    try {
        if (!canDelete(req.user)) {
            return res.status(401).json({ error: 'Only admin can delete' });
        }
        next();
    } catch (error) {
    }
}
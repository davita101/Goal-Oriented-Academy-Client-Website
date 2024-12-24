import { canViewLeader, canLeaderEdit } from "../permission/leader.js";

export function canViewLeaderMiddleware(req, res, next) {
    try {
        if (!canViewLeader(req.user, req.params.leaderId)) {
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
};
export function canLeaderEditMiddleware(req, res, next) {
    const userRole = req.user.role;
    const userReq = req.body;

    try {
        if (!canLeaderEdit(req.user, req.params.leaderId)) {
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        // Ensure only admins can modify the role
        if (userReq.hasOwnProperty("role") && !userRole.includes('admin')) {
            return res.status(403).json({ error: 'Only admin can modify role' });
        }
        if ((userReq?.controllers?.miniLeaderController || userReq?.rating?.miniLeaderGithubCheck) && !userRole.includes('miniLeaderController')) {
            return res.status(403).json({ error: 'Only miniLeaderController can modify miniLeaderController and miniLeaderGithubCheck' });
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
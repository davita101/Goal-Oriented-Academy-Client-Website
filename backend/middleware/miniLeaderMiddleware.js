import { canLeaderEdit } from "../permission/minLeader.js";

export function canMiniLEaderViewLeaderStudentsMiddleware(req, res, next) {
    try {
        if (!canLeaderEdit(req.user, req.params.leaderId)) {
            console.log(req.user);
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        if (!req.body?.controllers?.miniLeaderController ||
            !req.body?.rating?.miniLeaderGithubCheck
        )
            next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
};
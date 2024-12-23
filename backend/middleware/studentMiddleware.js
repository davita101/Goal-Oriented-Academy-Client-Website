import { canDelete, canStudentEdit } from "../permission/student.js";

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
    try {
        if (!canStudentEdit(req.user, req.params.leaderId)) {
            return res.status(401).json({ error: "You don't have permission to access!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching leader' });
    }
}
export function canLeaderDeleteStudentMiddleware(req, res, next) {
    try {
        if (!canDelete(req.user)) {
            return res.status(401).json({ error: "You don't have permission to delete this student" });
        }
        next();
    } catch (error) {
        console.error('Error in canLeaderDeleteStudentMiddleware:', error);
        return res.status(500).json({ error: 'Error processing request' });
    }
}
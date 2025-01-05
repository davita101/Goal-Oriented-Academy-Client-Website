function canStudentEdit(user, leaderId) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("githubController") ||
        user.role.includes("miniLeaderController") ||
        user.role.includes("leaderController") ||
        user.role.includes("mentorAssistant") ||
        user.role.includes("mentor") ||
        user.id === (leaderId)
    )
}
function canDelete(user) {
    return (
        user.role.includes("admin")
    )
}
function onlyLeader(user, leaderId) {
    return (
        user.id === (leaderId)
    )
}


export { canStudentEdit, canDelete, onlyLeader }
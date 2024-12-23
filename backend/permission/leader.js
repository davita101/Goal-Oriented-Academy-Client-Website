function canViewLeader(user, leaderId) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("leaderController") ||
        user.id === (leaderId)
    )
}
function canDelete(user) {
    return (
        user.role.includes("admin")
    )
}
function canLeaderEdit(user, leaderId) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("leaderController") ||
        user.id === (leaderId)
    )
}


export { canViewLeader, canLeaderEdit, canDelete}

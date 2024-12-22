function canViewLeader(user, leaderId) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("leaderController") ||
        user.id === (leaderId)
    )
}

function canViewStudent(user) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("leaderController") 
    )
}
function canLeaderEdit(user, leaderId) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("leaderController")||
        user.id === (leaderId)
    )
}

export{canViewLeader, canLeaderEdit}

function canViewLeader(user, leaderId) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("leaderController") ||
        user.role.includes("miniLeaderController") ||
        user.role.includes("githubController") ||
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
        user.role.includes("miniLeaderController") ||
        user.role.includes("githubController") ||
        user.id === (leaderId)
    )
}
function canMiniLeaderEdit(userReq, controller) {
    return (
        controller === "miniLEaderController" &&
        userReq?.controllers?.miniLeaderController
       && userReq?.rating?.miniLeaderGithubCheck)
}



export { canViewLeader, canLeaderEdit, canDelete, canMiniLeaderEdit }

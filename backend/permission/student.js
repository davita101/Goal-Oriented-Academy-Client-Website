function canStudentEdit(user, leaderId) {
    return (
        user.role.includes("admin") ||
        user.role.includes("moderator") ||
        user.role.includes("githubController") ||
        user.id === (leaderId)
    )
}


export { canStudentEdit }
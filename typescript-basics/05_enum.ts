enum UserRole {
    ADMIN = "ADMIN",
    SCRUB = "SCRUB"
}

function isAdmin(user: UserRole) {
    return user === UserRole.ADMIN
}

const user = UserRole.ADMIN

console.log(isAdmin(user))
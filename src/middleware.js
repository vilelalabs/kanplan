export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard",
        "/api/tasks",
        "/api/projects",


    ]
}
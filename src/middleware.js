export { default } from "next-auth/middleware"

// Pages and API routes that require a session. The API routes also check the
// session and the owner themselves (src/lib/server/auth.js); this is a second layer.
export const config = {
    matcher: [
        "/dashboard",
        "/profile",
        "/api/projects/:path*",
        "/api/tasks/:path*",
        "/api/privacy",
    ]
}

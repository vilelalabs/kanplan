// Version of the privacy policy (= its "last updated" date). Users whose recorded
// version differs are asked to accept it again on their next visit (PrivacyGate).
// Change it only when the policy changes in a way users must re-read.
export const PRIVACY_POLICY_VERSION = "2026-11-08";

// How the acceptance was given, stored in User.privacyPolicySource:
// "signup-checkbox" (sign-up form), "signin-notice" (first sign-in with Google/GitHub,
// under the notice on the login page) or "reaccept" (the update dialog).
export function privacyRecord(source) {
    return {
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
        privacyPolicyAt: new Date(),
        privacyPolicySource: source,
    };
}

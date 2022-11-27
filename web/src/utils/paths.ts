export const ROOT = "/" as const;

export const LOGIN_PAGE = "/login" as const;

export const GROUP_LANDING_PAGE = "/:groupId" as const;

export const SUBMIT_CHALLENGE_PAGE = "/:groupId/new-challenge" as const;

export const INVITATION_PAGE = "/invite/:invitationCode" as const;

export const PROFILE_PAGE = "/profile" as const;

export const POST_PHOTO_PAGE = "/:groupId/post" as const;

const SHARE_URL =
  ":protocol//:host/share/challenge/:groupId/:challengeId" as const;

export function getGroupLandingPagePath(groupId: string) {
  return GROUP_LANDING_PAGE.replace(":groupId", groupId);
}

export function getPostPhotoPagePath(groupId: string) {
  return POST_PHOTO_PAGE.replace(":groupId", groupId);
}

export function getSubmitChallengePathPage(groupId: string) {
  return SUBMIT_CHALLENGE_PAGE.replace(":groupId", groupId);
}

export function createShareUrl(groupId: string, challengeId: string) {
  return SHARE_URL.replace(":protocol", window.location.protocol)
    .replace(":host", window.location.host)
    .replace(":groupId", groupId)
    .replace(":challengeId", challengeId);
}

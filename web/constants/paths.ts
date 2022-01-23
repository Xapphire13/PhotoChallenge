export const ROOT = "/" as const;

export const LOGIN_PAGE = `${ROOT}login` as const;

export const SUBMIT_CHALLENGE_PAGE = `${ROOT}new-challenge` as const;

export const INVITATION_PAGE = `${ROOT}invite/:invitationCode` as const;

export const PROFILE_PAGE = `${ROOT}profile` as const;

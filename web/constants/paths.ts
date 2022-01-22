export const ROOT = "/" as const;

export const LOGIN = `${ROOT}login` as const;

export const SUBMIT_CHALLENGE = `${ROOT}new-challenge` as const;

export const INVITATION = `${ROOT}invite/:invitationCode` as const;

export const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9_\-]{3,16}$/;
export const EMAIL_REGEX: RegExp = /\S+@\S+\.\S+/;
export const PASSWORD_REGEX: RegExp = /^(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
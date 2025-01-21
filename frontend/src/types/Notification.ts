export enum Status {
  Error = "error",
  Info = "info",
  Warn = "warn",
  Success = "success",
}

export type MessageType = {
  message: string,
  state: Status
} | null;
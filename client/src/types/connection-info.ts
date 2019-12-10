import { ConnectionStatus } from "common/types/connection-status";
export interface ConnectionInfo {
  error?: string;
  status: ConnectionStatus;
}

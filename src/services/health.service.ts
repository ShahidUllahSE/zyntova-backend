import mongoose from 'mongoose'

export function getHealthStatus() {
  const dbState = mongoose.connection.readyState
  const dbStatus =
    dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected'

  return {
    status: 'ok' as const,
    timestamp: new Date().toISOString(),
    database: dbStatus,
  }
}

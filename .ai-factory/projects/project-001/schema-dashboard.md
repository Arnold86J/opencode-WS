# Schéma data Dashboard — TASK-044 COMPLETED

> DATABASE_ARCHITECT: Prisma schema Bet + indexes
model Bet { id, userId, amount, odds, sport, competition, date, status PENDING @index([userId,date]) }
Policy: database.yml destructive_migration requires backup+simulation

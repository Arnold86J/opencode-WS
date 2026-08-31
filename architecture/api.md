# API Contract — Template (OpenAPI-like)

## Endpoints

### POST /api/bets
- **Auth:** required
- **Body:** `{ amount: number, odds: number, sport: string, competition: string, date: string }`
- **Response 201:** `{ id, status: "pending" }`
- **Errors:** 400 validation, 401 unauthorized

### GET /api/bets
- **Query:** `?status=pending&sport=football`
- **Response:** `{ bets: Bet[] }`

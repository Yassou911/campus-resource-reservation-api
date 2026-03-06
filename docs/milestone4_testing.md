# Milestone 4 Testing Notes

## Failed Validation Example
POST /api/users without full_name

Request:
{
 "email": "test@email.com"
}

Response:
400 Bad Request
Missing required field: full_name

## Business Rule Example
POST /api/reservations where end_time is before start_time

Response:
400 Bad Request
End time must be after start time

## Successful Request
POST /api/users with valid data

Request:
{
 "full_name": "John Doe",
 "email": "john@email.com"
}

Response:
201 Created
User successfully added

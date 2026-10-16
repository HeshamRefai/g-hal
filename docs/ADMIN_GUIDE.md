# G-HAL Admin Guide

## User Management

Users are created on first OAuth login. `OWNER_UNION_ID` in `.env` gets admin role.

Promote user:
```sql
UPDATE users SET role = 'admin' WHERE unionId = 'USER_UNION_ID';
```

Valid roles: `user`, `manager`, `admin`, `agent`

## Database

Push schema:
```bash
npm run db:push
```

Generate migration:
```bash
npm run db:generate
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_ID` | Yes | Application ID |
| `APP_SECRET` | Yes | JWT signing secret |
| `DATABASE_URL` | Yes | MySQL connection string |
| `OWNER_UNION_ID` | Yes | Admin user union ID |

## Policy Engine

Effects: `ALLOW`, `DENY`, `APPROVAL_REQUIRED`

Default action: **DENY** (P2 Protocol)

## Audit Chain

SHA-256 hash chaining (P10 Protocol). Verify integrity via "Verify Chain" button.

## Backup

```bash
mysqldump -u user -p ghal_db > backup.sql
mysql -u user -p ghal_db < backup.sql
```

## Security

- OAuth 2.0 authentication
- httpOnly secure session cookies
- Role-based access control
- SHA-256 audit chain
- Multi-tenancy via `tenant_id`

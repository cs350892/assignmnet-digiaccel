# To-Do List App (Digiaccel SDE-1 Assignment)

MERN stack to-do app with weekly task summaries, search, and mobile-first UI.

## Stack

- **Backend:** Node.js, Express (ES modules), MongoDB, Mongoose
- **Frontend:** React, Vite, Tailwind CSS (coming next)

## Backend setup

1. Install [MongoDB](https://www.mongodb.com/try/download/community) locally, or use MongoDB Atlas.
2. Copy env file and adjust if needed:

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

API base: `http://localhost:5000`

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/tasks/weeks` | Weekly cards with open/completed counts |
| GET | `/api/tasks?q=&weekKey=` | List/search tasks |
| GET | `/api/tasks/:id` | Single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Task body (create/update)

```json
{
  "title": "Buy groceries",
  "description": "Optional notes",
  "dateTime": "2026-11-04T10:30:00.000Z",
  "priority": "High",
  "status": "In Progress"
}
```

Weeks run **Monday → Sunday** based on `dateTime`.

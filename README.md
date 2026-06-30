# Culinary Blog

Full-stack culinary blog app.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Local infrastructure: Docker Compose

## Repository structure

```text
culinary-blog/
  docker-compose.yml
  client/my-app/
  server/my-app/
```

## Requirements

- Node.js
- npm
- Docker Desktop
- Git

## Local MongoDB with Docker

From the repository root, start MongoDB:

```bash
docker compose up -d
```

MongoDB runs locally at:

```text
mongodb://127.0.0.1:27017/culinary_blog
```

Check running containers:

```bash
docker ps
```

Stop MongoDB:

```bash
docker compose down
```

Stop MongoDB and remove local database data:

```bash
docker compose down -v
```

## Backend setup

Create backend env file:

```bash
cd server/my-app
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Expected backend env values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/culinary_blog
CLIENT_URL=http://localhost:5173
```

Install and start backend:

```bash
npm install
npm start
```

Backend runs at:

```text
http://localhost:5000
```

Useful endpoints:

```text
GET /api/health
GET /api/recipes
POST /api/recipes
GET /api/recipes/popular?limit=6
GET /api/recipes/:id
PUT /api/recipes/:id
DELETE /api/recipes/:id
```

## Frontend setup

In a second terminal:

```bash
cd client/my-app
npm install
npm run dev
```

Frontend usually runs at:

```text
http://localhost:5173
```

The Vite dev server proxies API calls from `/api` to the backend on port 5000.

## Test create recipe

```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"title":"Protein pancakes","description":"Simple high-protein pancakes.","ingredients":["2 eggs","50g oats","100g skyr"],"steps":["Blend ingredients","Fry on low heat"],"imageUrl":""}'
```

Then open:

```text
http://localhost:5173/recipes
```

## Troubleshooting

### Backend cannot connect to MongoDB

Start the database:

```bash
docker compose up -d
```

Then restart the backend.

### Port 27017 is already used

Another MongoDB instance is probably running. Stop it or change the port mapping in `docker-compose.yml`.

### Frontend cannot fetch recipes

Check backend health first:

```text
http://localhost:5000/api/health
```

Then restart the frontend dev server.

## DevOps roadmap

- [x] Local MongoDB with Docker Compose
- [ ] Backend Dockerfile
- [ ] Frontend Dockerfile
- [ ] Full Docker Compose stack
- [ ] GitHub Actions CI
- [ ] Docker image build
- [ ] Cloud deployment
- [ ] Nginx reverse proxy
- [ ] HTTPS

## License

MIT

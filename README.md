# Culinary Blog (Full‑Stack)

A full‑stack "Culinary Blog" app with a Node.js/Express backend + MongoDB Atlas and a React (Vite) frontend. The project is set up to make deploying the frontend to Vercel/Netlify and the backend to Render/Fly/VM straightforward.

## Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas + Mongoose
- **API**: REST (`/api/*`)

## Repository structure

```
culinary-blog/
  client/
    my-app/              # Frontend (Vite + React)
  server/
    my-app/              # Backend (Express + Mongoose)
```

## What works now

### Backend
- ✅ Connected to MongoDB Atlas via `MONGO_URI`
- ✅ Health endpoint: `GET /api/health` → `{ "ok": true }`
- ✅ Recipes prefix: `/api/recipes` (returns JSON in development/test mode)
- ✅ CORS configured for frontend ↔ backend communication

### Frontend
- ✅ `RecipeList` component fetches data from the backend via Axios
- ✅ Backend URL configured via Vite env var: `VITE_API_URL`
- ✅ Basic routing (React Router ready to extend)

## Requirements

- Node.js (v16+) + npm
- MongoDB Atlas account (cluster, user, IP Access List)
- Git

## Environment setup

### 1) Backend: `server/my-app/.env`

Create a `.env` file inside `server/my-app/`:

```env
MONGO_URI=mongodb://USER:PASSWORD@HOST1:27017,HOST2:27017,HOST3:27017/DBNAME?tls=true&authSource=admin&retryWrites=true&w=majority&appName=culinary-blog
PORT=5000
```

**Notes:**
- `tls=true` is **required** for MongoDB Atlas
- In Atlas → **Network Access / IP Access List**, add your current IP
- **Do not commit `.env`** (keep it in `.gitignore`)
- Replace `USER`, `PASSWORD`, `HOST1-3`, `DBNAME` with your Atlas values

### 2) Frontend: `client/my-app/.env.local`

Create `.env.local` inside `client/my-app/`:

```env
VITE_API_URL=http://localhost:5000
```

In Vite, only variables prefixed with `VITE_` are exposed to the client.

## Run locally (dev)

### 1) Backend

```bash
cd server/my-app
npm install
npm start
```

**Endpoint tests:**
- http://localhost:5000/api/health → `{"ok":true}`
- http://localhost:5000/api/recipes → test data

After start you should see:
```
MongoDB connected
Server running on port 5000
```

### 2) Frontend (Vite)

```bash
cd client/my-app
npm install
npm run dev
```

Frontend usually runs at:
- http://localhost:5173

## Frontend ↔ backend connection

The frontend sends requests to:

- `GET ${VITE_API_URL}/api/recipes`
- `GET ${VITE_API_URL}/api/health`

In Vite code, use:

```js
const API = import.meta.env.VITE_API_URL;
axios.get(`${API}/api/recipes`)
```

## Roadmap (what we want to build next)

### API / Recipes CRUD
- [ ] `GET /api/recipes` – list recipes from MongoDB
- [ ] `POST /api/recipes` – create a recipe
- [ ] `GET /api/recipes/:id` – recipe details
- [ ] `PUT/PATCH /api/recipes/:id` – update a recipe
- [ ] `DELETE /api/recipes/:id` – delete a recipe

### Data model (Mongoose schema)
- [ ] Fields: `title`, `description`, `ingredients[]`, `steps[]`, `image`, `category`, `createdAt`
- [ ] Validation on the Mongoose level

### Frontend (UI/UX)
- [ ] Create recipe form
- [ ] Routing (list → details → edit)
- [ ] Loading states + error handling
- [ ] Responsive design (mobile-first)
- [ ] Better ID handling (`_id` from MongoDB)

### Security & configuration
- [ ] Restrict CORS to frontend domains (prod)
- [ ] Input validation (express-validator)
- [ ] Rate limiting
- [ ] Helmet.js (security headers)
- [ ] Separate dev/prod configuration

### Extra features
- [ ] Recipe search
- [ ] Category filtering
- [ ] Image uploads (Cloudinary/AWS S3)
- [ ] User authentication (JWT)
- [ ] Favorite recipes
- [ ] Ratings & comments

## Deployment (planned)

### Backend (Render/Fly.io/Railway)

**Step-by-step (Render):**
1. Push code to GitHub
2. In Render: New → Web Service → connect the repo
3. **Build Command**: `cd server/my-app && npm install`
4. **Start Command**: `cd server/my-app && npm start`
5. **Environment Variables**:
   - `MONGO_URI=mongodb://...` (from Atlas)
   - `PORT=5000`
6. In Atlas → Network Access: add Render IP (or `0.0.0.0/0` for temporary testing)

### Frontend (Vercel/Netlify)

**Step-by-step (Vercel):**
1. Push code to GitHub
2. In Vercel: New Project → connect the repo
3. **Root Directory**: `client/my-app`
4. **Framework Preset**: Vite
5. **Environment Variables**:
   - `VITE_API_URL=https://your-backend.onrender.com`
6. Deploy → automatic rebuild on push

**Important**: After changing `VITE_API_URL`, you must redeploy (Vite injects env at build time).

## Troubleshooting

### Backend

**`bad auth : authentication failed`**
- Verify your Atlas user/password in **Database Access**
- Ensure the password is correctly encoded if it contains special chars (`@`, `#`, `:`, `/`)
- Verify `authSource=admin` in your connection string

**`MongoServerError: connection timed out`**
- In Atlas → **Network Access / IP Access List**, add your current IP
- For testing you can add `0.0.0.0/0` (NOT for production!)

**`querySrv ECONNREFUSED`**
- Related to `mongodb+srv://` (SRV DNS)
- Use a standard `mongodb://` seed list (as shown above)

### Frontend

**Blank screen / empty recipe list**
- If the API returns `[]`, that is expected until you add records to the database
- Check DevTools → Network → ensure `/api/recipes` returns 200

**Frontend does not see env var**
- In Vite use `import.meta.env.VITE_*`
- Restart `npm run dev` after editing `.env.local`
- Don't use `process.env` in the browser

**CORS error in console**
- Ensure the backend uses `cors()` middleware
- Make sure the frontend is calling the correct URL (matching `VITE_API_URL`)

## Quick Start

```bash
# 1) Clone
git clone <repo-url>
cd culinary-blog

# 2) Backend
cd server/my-app
cp .env.example .env  # edit .env with your MongoDB values
npm install
npm start

# 3) Frontend (new terminal)
cd ../../client/my-app
echo "VITE_API_URL=http://localhost:5000" > .env.local
npm install
npm run dev
```

Open http://localhost:5173 and you're good to go! 🎉

## Key files layout

```
server/my-app/
  ├── app.js              # main Express app
  ├── routes/
  │   └── recipes.js      # routes for /api/recipes
  ├── models/
  │   └── Recipe.js       # Mongoose schema (to add)
  └── .env                # env vars (DO NOT commit)

client/my-app/
  ├── src/
  │   ├── components/
  │   │   └── RecipeList.jsx
  │   ├── App.jsx
  │   └── main.jsx
  └── .env.local          # VITE_API_URL
```

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(scope): ...` – new feature
- `fix(scope): ...` – bug fix
- `chore(scope): ...` – tooling/config changes
- `docs: ...` – documentation updates

**Examples:**
```bash
git commit -m "feat(api): add GET /api/recipes endpoint"
git commit -m "feat(ui): create RecipeForm component"
git commit -m "fix(db): correct MongoDB connection string"
git commit -m "chore: update README with deploy instructions"
```

## License

MIT

## Authors

Edward – Full‑Stack Developer

---

**Project status**: 🚧 Actively under development

**Last updated**: Feb 10, 2026
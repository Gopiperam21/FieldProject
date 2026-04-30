# FieldProject
The Scholarship Processing System is a web-based application designed to simplify and automate the process of managing student scholarship applications. It enables students to apply for scholarships online while allowing administrators to efficiently review, verify, and approve applications.

## Deploy on Render

1. Push this repository to GitHub.
2. Create a MongoDB Atlas database and copy its connection string.
3. In Render, create a new Blueprint from this repository. Render will read `render.yaml`.
4. Add the required environment variable when Render asks for it:
   - `MONGO_URI`: your MongoDB Atlas connection string
5. Render will generate `JWT_SECRET` automatically and run:
   - Build command: `npm install`
   - Start command: `npm start`

The app will be available at your Render service URL. The frontend is served from `/`, the API is served from `/api`, and Render checks `/health`.

Note: file uploads work on Render's free web service, but uploaded files are not permanent after restarts or redeploys. For permanent uploads, add a Render persistent disk mounted at `/opt/render/project/src/uploads` or set `UPLOAD_DIR` to your disk mount path.

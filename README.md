# Messenger App

A simple real-time web messenger app using Node.js, Express, and Socket.IO, with media sharing.

## Features

- Real-time messaging
- Image/file sharing
- Simple frontend (HTML/JS)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies

```bash
npm install express socket.io multer
```

### 3. Run the app

```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Deploy to GitHub

Commit your code and push to your GitHub repository:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## Notes

- Uploaded media is saved in the `uploads/` folder and served statically.
- Messages are stored in memory (will be lost on server restart).
- No authentication (for demo purposes).

## Customization

- Change the `user` field in `public/script.js` to support usernames.
- Add persistent storage (e.g., MongoDB) for message history.
- Improve frontend style.

## License

MIT
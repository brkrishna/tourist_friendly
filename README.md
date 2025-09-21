# Setup Instructions for Tourist Friendly Portal

Follow these steps to set up the project on a new machine:

## 1. Prerequisites
- **Node.js** (v18 or later recommended)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## 2. Clone the Repository
```sh
git clone <REPO_URL>
cd tourist_friendly
```
Replace `<REPO_URL>` with the actual repository URL.

## 3. Install Dependencies
```sh
npm install
```

## 4. Set Up Environment Variables (if needed)
- If the project requires environment variables, create a `.env.local` file in the root directory.
- Copy any required variables from `.env.example` or project documentation.

## 5. Run the Development Server
```sh
npm run dev
```
- The app will usually be available at [http://localhost:3000](http://localhost:3000).

## 6. Run Tests (Optional)
```sh
npm run test
```

## 7. Build for Production (Optional)
```sh
npm run build
npm start
```

---

**Troubleshooting:**
- If you encounter issues, ensure Node.js and npm are up to date.
- Check the `README.md` or `DEPLOYMENT.md` for more details.

---

**Contact:**
- For help, contact the project maintainer or open an issue in the repository.

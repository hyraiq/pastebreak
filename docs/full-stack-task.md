# Installation

In the root...

```bash
nvm use
npm install

# Run the backend
cd backend
# Copy the .env.dist file
cp .env.dist .env

# TODO: Fill in any missing environment variables

# Run the backend server
npm run start:dev


# In a separate terminal, run the frontend
cd frontend
npm run start:dev
```
# Installation

In the root...

```bash
nvm use
npm install

# Run the backend
cd backend
# Copy the .env.dist file
cp .env.dist .env

# TODO: Fill in any missing environment variables, including your OpenAI API key, Langsmith API key and dataset ID
# (still within the backend directory), run the experiment
npm run experiment
```
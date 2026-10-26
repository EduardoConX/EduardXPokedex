# EduardXPokedex

A web application for personally tracking Pokémon you have caught, still need to catch, or have as duplicates. The app combines a visual interface with data stored in Firebase, allowing you to check the status of each Pokémon and filter your collection based on various criteria.

## Features

- Displays the complete list of Pokémon, including their number, name, and status.
- Allows searching by name.
- Provides filtering by:
  - caught
  - pending (not yet caught)
  - duplicates
- Shows counters for each category.
- Includes a dark mode.
- Allows you to view the order in which Pokémon were caught and access detailed information for each individual Pokémon.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Firebase Realtime Database
- TanStack Vue Query
- Vue Router

## Project Structure

- `src/pages/`: Main application pages.
- `src/components/`: Reusable components.
- `src/composables/`: Data access logic and queries.
- `src/database/`: Firebase configuration.
- `src/interfaces/`: TypeScript interfaces.
- `src/data/`: Pokémon generation data.

## Requirements

- Node.js 18+
- npm or pnpm
- A Firebase account with a configured Realtime Database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/EduardoConX/EduardXPokedex.git
cd EduardXPokedex
```

2. Install dependencies:
```bash
npm install
```
or, if you prefer pnpm:
```bash
pnpm install
```

3. Create an `.env` file based on `example.env` and add your Firebase credentials:
```bash
cp example.env .env
```

4. Configure the environment variables with the values from your Firebase project. Make sure the names match those used in `src/database/config.ts`.

## Environment Variables

Example:

```env
VITE_BASE_URL=
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_DATABASE_URL=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

> Note: The project uses a single set of variables for Firebase initialization; if any names are added or changed, they must remain consistent within `src/database/config.ts`.

## Running in Development

```bash
npm run dev
```

The application will be available on Vite's default port, typically:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

To preview the compiled version:

```bash
npm run preview
```

## Data Flow

The app queries the Firebase database via composables located in `src/composables/` and renders the information in the user interface. The core content is organized around the Pokémon collection and their capture status.

## Future Improvements

- Add unit tests for filters and counters.
- Review and clean up the Firebase configuration.
- Improve documentation regarding the data flow.
- Add CI and linting to ensure code quality.

## License

This project is distributed under the license specified in the `LICENSE` file.
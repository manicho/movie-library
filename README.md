# Movie Library

**A Movie Library system to view and save your favorite movies. React Native - Expo - Javascript**

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Description

The Movie Library System is a feature-rich mobile application developed with React Native and Expo, making it easily accessible on both Android and iOS platforms. This innovative application empowers movie enthusiasts to seamlessly explore, discover, and curate their favorite movies.

## Features

- Save your favorite movies (Async Storage)
- View the Movie details
- View the Cast details
- Similars movies
- Sync with The Movie DB Rest API https://www.themoviedb.org/
- JavaScript Throughout
- Internal API

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Basic knowledge of React Native, Expo, and JavaScript

## Installation

To get started with this project, follow these installation steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/manicho/movie-library.git
   cd movie-library
   ```

2. Install dependencies for both the API and the client:

   ```bash
   npm install
   ```

## Usage

To use the project, follow these steps:

Configure the necessary environment variables (see Environment Variables).

Start the local development server:

```bash
npm run start
```

## Configuration

The project can be configured using environment variables (see Environment Variables). Additionally, the following configuration options are available:

Database Configuration: You can configure the database connection in the API's ormconfig.js or equivalent file.

Authentication Methods: Customize authentication methods by modifying the authentication controllers and services.

## Local Development

For local development, you can use the following scripts:

npm run start: Start the project.

npm run android: Start the project for Android development.

npm run ios: Start the project for iOS development.

npm run web: Start the project for web development.

## Environment Variables

To run this project, you need to set up environment variables. Create a .env file in the root of the project.

.env file

```env
MOVIE_API_KEY=your-themoviedb-api-key
```

## Deployment

To deploy this project, follow your hosting provider's instructions for deploying a React Native application. Make sure to set the appropriate environment variables for production.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

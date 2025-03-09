# Airbnb Automate

A TypeScript-based Node.js script that automates the process of fetching Airbnb reservations and exporting them into a formatted Excel file.

## Overview

This project connects to the Airbnb API to retrieve reservation data. It filters out canceled reservations and generates an Excel file (`reservations.xlsx`) with a detailed table including:

- Confirmation code
- Start date
- Number of nights
- Guest details
- Earnings information (including cleaning fees, conciergerie fees, and net revenue)

The application uses a recursive strategy to fetch reservations in batches (40 per page) until all reservations have been retrieved.

## Features

- **API Integration:** Connects to the Airbnb API using environment-based credentials.
- **Data Processing:** Filters reservations (e.g., removing canceled ones) and calculates fees.
- **Excel Generation:** Uses [ExcelJS](https://github.com/exceljs/exceljs) to create a styled Excel table.
- **TypeScript:** Fully typed code to help maintain robustness and clarity.

## Prerequisites

- **Node.js** (v12 or above recommended)
- **npm** (or yarn) to install dependencies
- An active internet connection
- Valid Airbnb API credentials

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://your-repo-url.git
   cd airbnb_automate
   ```
2. **Install dependencies:**
   ```bash
    npm install
   ```

# Configuration

Create a .env file in the root directory of the project with the following environment variables (update the values accordingly):

```bash
# Airbnb API credentials and tokens
AIRBNB_API_KEY=your_airbnb_api_key
AIRBNB_CSRF_TOKEN=your_airbnb_csrf_token
BROWSER_COOKIES=your_browser_cookies

# Client request IDs for paginated requests (the key must be formatted as AIRBNB_CLIENT_REQUEST_ID_<pageIndex>)
AIRBNB_CLIENT_REQUEST_ID_0=your_client_request_id_for_page0
AIRBNB_CLIENT_REQUEST_ID_1=your_client_request_id_for_page1
# Add more as necessary...

```

Note: Ensure that you have valid API credentials and the necessary request IDs for each page you intend to fetch.

# Usage

To compile the TypeScript files and run the script, use the following command:

```bash
npm run start
```

This command will:

1. Compile the TypeScript source (src/index.ts) to JavaScript.
2. Execute the generated JavaScript file.
3. Fetch reservations data from the Airbnb API.
4. Generate an Excel file named reservations.xlsx in the project directory.

# Troubleshooting

- API Issues: If the script logs errors regarding the API response (e.g., non-200 status codes), verify your API credentials and ensure that the environment variables are set correctly.
- Data Format: If the format of the data returned by the Airbnb API changes, you might need to update the data parsing logic in src/helpers/index.ts.

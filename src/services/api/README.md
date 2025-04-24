# API service

## Overview

The API service provides standardized communication with backend servers through RESTful HTTP requests. It utilizes `axios` for handling requests and responses, with support for both public and authenticated API calls.

## Service Files

- helper.ts: Contains utility functions for creating API instances with proper configuration
- index.ts: Exports the main HTTP client instances (public and private)
- `type.ts`: Defines TypeScript interfaces for API responses
- README.md: Documentation for the API service

## Configuration

The API service uses `CONFIG.SERVER_URL` as the base URL for all requests. To modify the base URL, update the variable `VITE_APP_SERVER_URL` from `.env` file with the desired value for `CONFIG.SERVER_URL` and restart the server for the changes to take effect.

## Usage

### Making Public API Calls

For endpoints that don't require authentication:

```typescript
import { http } from "@/src/services/api";

async function fetchPublicData() {
  try {
    const response = await http.public.get("/endpoint");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch public data:", error);
    throw error;
  }
}
```

### Making Authenticated API Calls

For endpoints that require authentication:

```typescript
import { http } from "@/src/services/api";

async function fetchProtectedData() {
  try {
    const response = await http.private.get("/protected-endpoint");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch protected data:", error);
    throw error;
  }
}
```

### Creating Custom API Instances

For specialized API configurations:

```typescript
import { createApiInstance } from "@/src/services/api/helper";

const customApi = createApiInstance({
  baseURL: "https://custom-api.example.com",
  headers: {
    "X-Custom-Header": "value"
  }
});

async function fetchFromCustomApi() {
  const response = await customApi.get("/endpoint");
  return response.data;
}
```
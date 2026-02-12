# Authentication Pages

This directory contains authentication-related pages for the editor application.

## Token Authentication Page

**Route**: `/auth/token/:token`

**File**: `token/[token]/index.tsx`

### Purpose
This page handles authentication by validating a store token and saving it to session storage.

### How it works
1. **Token Extraction**: Extracts the token from the URL parameter
2. **Validation**: Calls the backend API endpoint `/auth/refresh-dual` with the token
3. **Storage**: Saves the response data to session storage
4. **Redirect**: Redirects to the dashboard upon success

### API Endpoint
- **URL**: `{VITE_API_BASE_URL}/auth/refresh-dual`
- **Method**: POST
- **Body**: 
  ```json
  {
    "storeUserToken": "{{store_token}}"
  }
  ```
- **Response**:
  ```json
  {
    "storeUserToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "storeUsername": "محمد"
  }
  ```

### Session Storage
The following values are saved to session storage:
- `storeUserToken`: The validated JWT token
- `storeUsername`: The store user's name

### Error Handling
- Shows loading spinner during validation
- Displays error message if validation fails
- Provides option to return to home page on error

### Usage Example
```
https://your-app.com/auth/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Auth Utilities

**File**: `../../shared/utils/auth.ts`

### Available Functions
- `saveAuthData(data)`: Save authentication data to session storage
- `getAuthData()`: Get authentication data from session storage
- `clearAuthData()`: Clear authentication data from session storage
- `isAuthenticated()`: Check if user is authenticated
- `validateStoreToken(token)`: Validate token with backend API

### Environment Variables
- `VITE_API_BASE_URL`: Base URL for API requests (defaults to https://api.mel.iq/api/v1)

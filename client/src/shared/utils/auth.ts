/**
 * Authentication utilities for managing store tokens and user data
 */

import { fetchAPI } from "../api/fetchy";

export interface AuthData {
  storeUserToken: string;
  storeUsername: string;
}

/**
 * Save authentication data to session storage
 */
export const saveAuthData = (data: AuthData): void => {
  try {
    sessionStorage.setItem('storeUserToken', data.storeUserToken);
    sessionStorage.setItem('storeUsername', data.storeUsername);
  } catch (error) {
    console.error('Failed to save auth data to session storage:', error);
    throw error;
  }
};

/**
 * Get authentication data from session storage
 */
export const getAuthData = (): AuthData | null => {
  try {
    const token = sessionStorage.getItem('storeUserToken');
    const username = sessionStorage.getItem('storeUsername');

    if (!token || !username) {
      return null;
    }

    return { storeUserToken: token, storeUsername: username };
  } catch (error) {
    console.error('Failed to get auth data from session storage:', error);
    return null;
  }
};

/**
 * Clear authentication data from session storage
 */
export const clearAuthData = (): void => {
  try {
    sessionStorage.removeItem('storeUserToken');
    sessionStorage.removeItem('storeUsername');
  } catch (error) {
    console.error('Failed to clear auth data from session storage:', error);
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthData() !== null;
};

/**
 * Validate store token by calling backend API
 */
export const validateStoreToken = async (token: string): Promise<AuthData> => {

  const response = await fetchAPI({
    endPoint: `/auth/refresh-dual`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      storeUserToken: token
    }),
    ignoreAuth: true
  });


  if (!response.storeUserToken || !response.storeUsername) {
    throw new Error('Invalid response from server');
  }

  return response;
};

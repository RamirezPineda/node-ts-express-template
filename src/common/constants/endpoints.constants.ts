export const PATH_PREFIX = '/api/v1';

export enum ENDPOINTS {
  HEALTH = '/health',
  AUTH_REGISTER = '/auth/register',
  AUTH_LOGIN = '/auth/login',
  
  USERS = '/users',
  USERS_ID = '/users/:id',
  USERS_ID_ENABLE_OR_DISABLE = '/users/:id/enable-or-disable',
  USER_PROFILE = '/user-profile',
}

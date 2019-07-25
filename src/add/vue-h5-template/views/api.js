import http from '@cli/api/http';

// eslint-disable-next-line import/prefer-default-export
export const api = params => http.post('/url', params);

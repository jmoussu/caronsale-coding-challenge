export type RequestConfiguration = {
  query?: any;
  headers?: object;
};

export type APIResponse = {
  data: any;
  status: number;
};

export type APIError = {
  response?: APIResponse;
  request?: any;
  message?: string;
};

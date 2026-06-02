declare global {
  namespace Express {
    interface Response {
      error: (params: {
        errorCode?: string | null;
        reason?: string | null;
        data?: unknown | null;
      }) => Response;
    }
  }
}

export {};

export const ROUTES = {
  PUBLIC: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  PROTECTED: {
    FEED: "/feed",
    PROFILE: (username: string) => `/profile/${username}`,
    SETTINGS: "/settings",
  },
};

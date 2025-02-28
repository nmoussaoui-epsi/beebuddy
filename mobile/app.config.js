import "dotenv/config";

export default {
  expo: {
    name: "BeeBuddy",
    slug: "beebuddy",
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};

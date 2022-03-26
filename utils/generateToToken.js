import Jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "365d",
  });
};

export const createRefreshToken = (payload) => {
    return Jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "365d",
    });
  };
  
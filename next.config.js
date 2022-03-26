module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.pixabay.com",
      "res.cloudinary.com",
      "videohive.img.customer.envatousercontent.com",
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    MONGODB_URL: process.env.DB_CONECTION,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRETE,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
    CLOUD_UPDATE_PRESET:process.env.CLOUD_UPDATE_PRESET
  }
};

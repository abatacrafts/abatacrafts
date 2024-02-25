const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) { }

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  // {
  //   resolve: `@medusajs/file-local`,
  //   options: {
  //     upload_dir: "uploads",
  //   },
  // },
  // {
  //   resolve: "@medusajs/admin",
  //   /** @type {import('@medusajs/admin').PluginOptions} */
  //   options: {
  //     autoRebuild: false,
  //     serve: false,
  //     develop: {
  //       open: process.env.OPEN_BROWSER !== "false",
  //     },
  //   },
  // },
  {
    resolve: `medusa-payment-paystack`,
    /** @type {import("medusa-payment-paystack").PluginOptions} */
    options: {
      secret_key: process.env.PAYSTACK_SECRET_KEY,
    },
  },
  {
    resolve: `medusa-fulfillment-kaduna`,
    /** @type {import("medusa-fulfillment-kaduna").PluginOptions} */
  },
  {
    resolve: "medusa-file-r2",
    options: {
      account_id: process.R2_ACCOUNT_ID,
      access_key: process.R2_ACCESS_KEY,
      secret_key: process.R2_SECRET_KEY,
      bucket: process.env.R2_BUCKET_NAME,
      public_url: process.env.R2_BUCKET_PUBLIC_URL,
    },
  },
  {
    resolve: `medusa-plugin-mailjet`,
    options: {
      public_key: process.env.MAILJET_PUBLIC_KEY,
      private_key: process.env.MAILJET_PRIVATE_KEY,
      from: "AbataCrafts noreply@abatacrafts",
      template_error_reporting: "AbataCrafts noreply@abatacrafts",
      customer_created_template: "[used on customer.created]",
      gift_card_created_template: "[used on gift_card.created]",
      order_placed_template: "[used on order.placed]",
      order_canceled_template: "[used on order.canceled]",
      order_shipped_template: "[used on order.shipment_created]",
      order_completed_template: "[used on order.completed]",
      user_password_reset_template: "[used on user.password_reset]",
      customer_password_reset_template: "[used on customer.password_reset]",
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  redis_url: REDIS_URL,
  database_extra:
    process.env.NODE_ENV !== "development"
      ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
      : {},
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};

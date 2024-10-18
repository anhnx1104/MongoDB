import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

let trelloDatabaseInstance = null;

// Khởi tạo MongoClient mà không tắt SSL
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  // Lưu trữ instance của cơ sở dữ liệu
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error("Database not connected yet");
  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

import ImageKit from "@imagekit/nodejs";
import env from "../config/env.js";

const client = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = async ({ folder, fileName, buffer }) => {
  const response = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName,
    folder,
  });
};

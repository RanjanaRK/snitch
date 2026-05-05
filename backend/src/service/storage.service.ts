import ImageKit from "@imagekit/nodejs";
import env from "../config/env.js";

const client = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

interface UploadImageParams {
  folder?: string;
  fileName: string;
  buffer: Buffer;
}

export const uploadImage = async ({
  folder = "snitch",
  fileName,
  buffer,
}: UploadImageParams) => {
  const response = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName,
    folder,
  });

  return response;
};

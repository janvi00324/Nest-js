import { Readable } from 'stream';
import cloudinary from '.././config/cloudinary.config';

export function uploadImageToCloudinary(
  file: Express.Multer.File,
  folder: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      },
    );
    Readable.from(file.buffer).pipe(uploadStream);
  });
}

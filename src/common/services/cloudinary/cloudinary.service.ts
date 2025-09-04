import { Injectable, InternalServerErrorException } from '@nestjs/common';
import cloudinary from 'src/config/cloudinary.config';
import { Readable } from 'stream';
@Injectable()

export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(
              new InternalServerErrorException('Cloudinary upload failed'),
            );
          } else {
            resolve(result!.secure_url);
          }
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}

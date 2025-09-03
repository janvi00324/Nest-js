import { Injectable } from '@nestjs/common';
import { uploadImageToCloudinary } from 'src/utils/cloudinary';

@Injectable()
export class FileUploadService {
  async handleFileUpload(file: Express.Multer.File, folder: string) {
    //store in cloudnary or aws s3 if you use memory storage
    //use file.buffer if you use memory storage.
    const cloudinaryUrl = await uploadImageToCloudinary(file, folder);
    return { message: 'File uploaded successfully', filePath: cloudinaryUrl };
  }
}

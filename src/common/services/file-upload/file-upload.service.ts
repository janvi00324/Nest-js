import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  handleFileUpload(file: Express.Multer.File) {
    //store in cloudnary or aws s3 if you use memory storage
    //use file.buffer if you use memory storage.
    return { message: 'File uploaded successfully', filePath: file.path };
  }
}

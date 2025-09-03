import { FileUploadService } from './file-upload.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}

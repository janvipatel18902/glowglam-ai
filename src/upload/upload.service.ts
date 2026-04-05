import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getImageUrl(filename: string) {
    return {
      filename,
      url: `http://localhost:5000/uploads/${filename}`,
    };
  }
}

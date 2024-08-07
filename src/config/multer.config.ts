import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const multerOptionsFactory = (configService: ConfigService) => {
  cloudinary.config({
    cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get<string>('CLOUDINARY_API_KEY'),
    api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: 'blog_posts',
        format: 'png',
        public_id: file.originalname.split('.')[0], // Utiliza el nombre del archivo sin la extensión como ID
      };
    },
  });

  return {
    storage: storage,
  };
};

https://medium.com/@datails/nestjs-keep-it-simple-stupid-4101d8bdf59c
npm run migration:generate --name=CreateUsersTable
npm run migration:run

📧 Mailing
@nestjs-modules/mailer → NestJS integration with nodemailer.
nodemailer → Sends emails via SMTP/transport.
handlebars → Template engine for email HTML.
@types/nodemailer → TypeScript types for nodemailer.

🔐 Authentication & Security
passport-jwt → Passport strategy for JWT auth.
bcrypt → Hashing and comparing passwords.
@nestjs/jwt → NestJS JWT utilities (sign/verify tokens).
@nestjs/passport → Integrates Passport strategies into NestJS.

📂 File Uploads / Storage
<!-- multer → Middleware for handling file uploads. -->
@types/multer → TypeScript types for multer.
cloudinary → Upload & manage media files in Cloudinary.
<!-- stream → Node.js stream handling (used in uploads/downloads). -->

📑 Validation & Transformation
class-transformer → Transform plain objects ↔️ class instances.
class-validator → Validate DTOs with decorators.

⚙️ Utilities
dotenv → Load environment variables from .env.
morgan → HTTP request logging middleware.
uuid → Generate unique IDs (tokens, refs).

🗄️ Database
typeorm → ORM for relational databases.
pg → PostgreSQL driver for TypeORM.

node cron 
@nestjs/schedule

🚀 NestJS Core
@nestjs/common → Decorators, helpers, exceptions, interceptors, guards, pipes.
@nestjs/config → Load config/env module.
@nestjs/core → Bootstrapping (NestFactory) + Nest runtime.
@nestjs/platform-express → Express.js adapter (HTTP APIs).
@nestjs/typeorm → TypeORM integration with NestJS.
<!-- @nestjs/mapped-types → Utilities for DTOs (PartialType, PickType, etc.). -->
<!-- reflect-metadata → Enables decorators & dependency injection. -->

cron job 
@nestjs/schedule

Database Integration
Authentication & Authorization
File Uploads
Mail sending
Task Scheduling
Event Emitters 
Stripe
Redis

MGIP (Middleware → Guards → Interceptors → Pipes → Controller → Route Handler → Response → Interceptors):

4 score 
Application, Module , Controller, Route 

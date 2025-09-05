import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1756989362734 implements MigrationInterface {
    name = 'CreateUserTable1756989362734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(200) NOT NULL, "profile_image" text, "is_verified" boolean NOT NULL DEFAULT false, "otp" character varying(10), "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "reset_token" character varying, "reset_token_expiry" TIMESTAMP WITH TIME ZONE, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

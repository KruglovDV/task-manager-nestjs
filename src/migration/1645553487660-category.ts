import {MigrationInterface, QueryRunner} from "typeorm";

export class category1645553487660 implements MigrationInterface {
    name = 'category1645553487660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_categories_category" ("taskId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_1372634eccb70bb5caf3cf9658f" PRIMARY KEY ("taskId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2056dac1666845d896a91625bf" ON "task_categories_category" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0246f9ff610eb0a727c5a5287" ON "task_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "task_categories_category" ADD CONSTRAINT "FK_2056dac1666845d896a91625bf9" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_categories_category" ADD CONSTRAINT "FK_c0246f9ff610eb0a727c5a52877" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_categories_category" DROP CONSTRAINT "FK_c0246f9ff610eb0a727c5a52877"`);
        await queryRunner.query(`ALTER TABLE "task_categories_category" DROP CONSTRAINT "FK_2056dac1666845d896a91625bf9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0246f9ff610eb0a727c5a5287"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2056dac1666845d896a91625bf"`);
        await queryRunner.query(`DROP TABLE "task_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}

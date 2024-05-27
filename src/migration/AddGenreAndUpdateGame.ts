import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenreAndUpdateGame1633096380154 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_genre_id" PRIMARY KEY ("id")
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "game_genres_genre" (
                "gameId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "PK_game_genre" PRIMARY KEY ("gameId", "genreId")
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "game_genres_genre"
            ADD CONSTRAINT "FK_game_genre_game"
            FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "game_genres_genre"
            ADD CONSTRAINT "FK_game_genre_genre"
            FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "game"
            DROP COLUMN "genre";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game_genres_genre" DROP CONSTRAINT "FK_game_genre_genre";
        `);

        await queryRunner.query(`
            ALTER TABLE "game_genres_genre" DROP CONSTRAINT "FK_game_genre_game";
        `);

        await queryRunner.query(`
            DROP TABLE "game_genres_genre";
        `);

        await queryRunner.query(`
            DROP TABLE "genre";
        `);

        await queryRunner.query(`
            ALTER TABLE "game"
            ADD "genre" character varying;
        `);
    }
}

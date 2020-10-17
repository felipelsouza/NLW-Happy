import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addPhoneNumberColumn1602971033317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'phone_number',
            type: 'varchar'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'phone_number');
    }

}

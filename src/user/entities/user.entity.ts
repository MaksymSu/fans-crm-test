import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'users' })
export class User extends Model<User>{
    @ApiProperty({ example: '33', description: 'unique id' })
    @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
    id: number;

    @ApiProperty({ example: 'Connor256', description: 'Screen name' })
    @Column({ type: DataType.STRING, allowNull: true })
    screenName: string;

    @ApiProperty({ example: '123@gmail.com', description: 'Email' })
    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

    @ApiProperty({ example: '123456As$', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
}

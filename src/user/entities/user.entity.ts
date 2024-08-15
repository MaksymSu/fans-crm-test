import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'users' })
export class User extends Model<User>{
    @Column({ type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    screenName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email: string;
}

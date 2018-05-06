import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Users } from './Users';

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 200 })
    hash: string;

    @OneToOne(type => Users, users => users.auth)
    @JoinColumn()
    users: Users;

}

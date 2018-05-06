import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from './User';

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 200 })
    hash: string;

    @OneToOne(type => User, users => users.auth)
    @JoinColumn()
    users: User;

}

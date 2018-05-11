import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from './User';

@Entity()
export class Auth {

    @OneToOne(type => User, users => users.auth, { primary: true })
    @JoinColumn()
    user: User;

    @Column({ type: 'varchar', length: 200 })
    hash: string;

}

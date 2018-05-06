import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Auth } from './Auth'

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    displayname: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @OneToOne(type => Auth, auth => auth.users, { cascade: true })
    auth: Auth;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from './User';

@Entity()
export class Auth {

    @OneToOne(type => User, user => user.auth, { primary: true, onDelete: "CASCADE"  })
    @JoinColumn()
    user: User;

    @Column({ type: 'varchar', length: 200 })
    hash: string;

}

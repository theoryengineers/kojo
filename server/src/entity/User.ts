import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Auth } from './Auth'
import { Assignment } from "./Project.assignment";
import { Story } from "./Story";
import { Project } from "./Project";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column({ type: 'varchar', length: 25, unique: true })
    displayname: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column()
    joined: string;

    @OneToOne(type => Auth, auth => auth.user, { cascade: true, onDelete: "CASCADE"  })
    auth: Auth;

    @OneToMany(type => Assignment, assignment => assignment.user, { cascade: true, onDelete: "CASCADE"  })
    assignment: Assignment;

    @OneToMany(type => Story, story => story.user, { cascade: true, onDelete: "CASCADE"  })
    story: Story;

}

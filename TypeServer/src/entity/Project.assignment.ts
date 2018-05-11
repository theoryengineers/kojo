import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Project } from './Project';
import { User } from "./User";

@Entity({ orderBy: { project: 'ASC' } })
export class Assignment {

    @ManyToOne(type => Project, project => project.assignment, { primary: true, onDelete: 'CASCADE' })
    project: Project;

    @ManyToOne(type => User, user => user.assignment, { primary: true, onDelete: 'CASCADE' })
    user: User;

    @Column()
    user_role: string;

}

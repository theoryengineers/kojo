import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Project } from './Project';

@Entity()
export class Assignment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Project, project => project.assignment)
    project: Project;

    @Column()
    user_id: number;

    @Column()
    user_role: string;

}

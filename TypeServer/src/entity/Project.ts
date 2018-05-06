import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Assignment } from './Project.assignment';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    project_id: number;

    @Column()
    project_name: string;

    @Column()
    created_on: string;

    @OneToMany(type => Assignment, assignment => assignment.project, { cascade: true })
    assignment: Assignment[]

}

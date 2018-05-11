import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Assignment } from './Project.assignment';
import { Sprint } from './Project.sprint';
import { Story } from "./Story";

@Entity({ orderBy: { project_id: 'ASC' } })
export class Project {

    @PrimaryGeneratedColumn()
    project_id: number;

    @Column()
    project_name: string;

    @Column()
    created_on: string;

    @OneToMany(type => Assignment, assignment => assignment.project, { cascade: true })
    assignment: Assignment[];

    @OneToMany(type => Sprint, sprint => sprint.project, { cascade: true })
    sprint: Sprint[];

    @OneToMany(type => Story, story => story.project, { cascade: true })
    story: Story[];
}

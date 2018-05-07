import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Project } from './Project';

@Entity()
export class Sprint {

    @PrimaryGeneratedColumn()
    sprint_id: number;

    @Column()
    sprint_name: string;

    @Column()
    sprint_description: string;

    @ManyToOne(type => Project, project => project.sprint, { onDelete: 'CASCADE' })
    project: Project;
}

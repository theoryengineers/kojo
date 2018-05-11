import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Project } from './Project';

@Entity()
export class Assignment {

    @ManyToOne(type => Project, project => project.assignment, { primary: true, onDelete: 'CASCADE' })
    project: Project;

    @PrimaryColumn()
    user_id: number;

    @Column()
    user_role: string;

}

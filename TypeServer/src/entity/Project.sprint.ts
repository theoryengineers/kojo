import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Project } from './Project';
import { Story } from "./Story";

@Entity({ orderBy: { project: 'ASC' } })
export class Sprint {

    @PrimaryGeneratedColumn()
    sprint_id: number;

    @Column()
    sprint_name: string;

    @Column()
    sprint_description: string;

    @ManyToOne(type => Project, project => project.sprint, { onDelete: 'CASCADE' })
    project: Project;

    @OneToMany(type => Story, story => story.sprint, { cascade: true })
    story: Story[];

}

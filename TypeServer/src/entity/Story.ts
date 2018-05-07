import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Project } from "./Project";
import { Sprint } from "./Project.sprint";

@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    story_id: number;

    @Column()
    story_title: string;

    @Column()
    story_category: string;

    @Column()
    story_description: string;

    @Column()
    story_order: number;

    @ManyToOne(type => Project, project => project.story, { onDelete: 'CASCADE' })
    project: Project;

    @ManyToOne(type => Sprint, sprint => sprint.story, { onDelete: 'SET NULL' })
    sprint: Sprint;

}
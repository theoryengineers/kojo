import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Project } from "./Project";
import { Sprint } from "./Project.sprint";
import { User } from "./User";

@Entity()
export class Story {

    @ManyToOne(type => Project, project => project.story, { primary: true, onDelete: 'CASCADE' })
    project: Project;

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

    @ManyToOne(type => User, user => user.story, { onDelete: 'SET NULL' })
    user: User;

    @ManyToOne(type => Sprint, sprint => sprint.story, { onDelete: 'SET NULL' })
    sprint: Sprint;

}
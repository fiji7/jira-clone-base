import { TaskStatus } from "../enums/TaskEnum";

export interface History {
    title: string;
    created: string;
}

export interface Task {
    id: number;
    status: TaskStatus;
    title: string;
    description: string;
    created: string;
    history: History[]
}
import { TaskStatus } from "../enums/TaskEnum";

export interface Task {
    id: number;
    status: TaskStatus;
    title: string;
    description: string;
    created: string;
}
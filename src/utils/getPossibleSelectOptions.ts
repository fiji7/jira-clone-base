import { TaskStatus } from "./enums/TaskEnum";


export const getPossibleSelectOptions = (taskStatus: TaskStatus): TaskStatus[] => {
    switch (taskStatus) {
        case TaskStatus.TO_DO:
            return [TaskStatus.IN_PROGRESS, TaskStatus.TO_DO]
        case TaskStatus.IN_PROGRESS:
            return [TaskStatus.BLOCKED, TaskStatus.IN_QA, TaskStatus.IN_PROGRESS]
        case TaskStatus.BLOCKED:
            return [TaskStatus.TO_DO, TaskStatus.BLOCKED]
        case TaskStatus.IN_QA:
            return [TaskStatus.TO_DO, TaskStatus.DONE, TaskStatus.IN_QA]
        case TaskStatus.DONE:
            return [TaskStatus.DEPLOYED, TaskStatus.DONE]
        default:
            return []
    };
};
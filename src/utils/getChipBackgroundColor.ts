import { TaskStatus } from "./enums/TaskEnum";


export const getChipBackgroundColor = (taskStatus: TaskStatus) => {
    switch (taskStatus) {
        case TaskStatus.TO_DO:
            return { main: 'grey.[300]', secondary: 'grey.[600]' }
        case TaskStatus.IN_PROGRESS:
            return { main: 'secondary.light', secondary: 'secondary.main' }
        case TaskStatus.BLOCKED:
            return { main: 'error.light', secondary: 'error.dark' }
        case TaskStatus.IN_QA:
            return { main: 'warning.light', secondary: 'warning.dark' }
        case TaskStatus.DONE:
            return { main: 'success.light', secondary: 'info.dark' }
        case TaskStatus.DEPLOYED:
            return { main: 'success.main', secondary: 'white' }
        default:
            return { main: 'grey.[300]', secondary: 'grey.[600]' }
    };
};
import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Task } from "../components/HomePage/HomePage";

interface TaskContextType {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);


export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
      throw new Error('useTaskContext must be used within a TaskContextProvider');
    }
    return context;
  };
export interface Task {
  id: number
  done: boolean
  title: string
}

export interface Column {
  id: number
  title: string
  tasks: Task[]
}

export const tasks: Task[] = [
  {
    id: 1,
    done: false,
    title: 'Estudar React',
  },
  {
    id: 2,
    done: false,
    title: 'Estudar Tailwind CSS',
  },
  {
    id: 3,
    done: false,
    title: 'Estudar TypeScript',
  },
  {
    id: 4,
    done: true,
    title: 'Estudar Python',
  }
]

export const columns: Column[] = [
  {
    id: 1,
    title: 'To Do',
    tasks: tasks,
  },
  {
    id: 2,
    title: 'Doing',
    tasks: [],
  },
  {
    id: 3,
    title: 'Done',
    tasks: [],
  }
]

export const columOrder = [1, 2, 3]

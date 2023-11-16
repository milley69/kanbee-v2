export interface Project {
  id: number
  title: string
  adminId: string
  membersId: string[]
  kanban: Column[]
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

export interface Task {
  id: string
  title: string
  labels: string[]
  deadline: Date | null
  createAt: Date
}

export interface NewTask {
  columnTitle: string
  task: Task
}

export interface Members {
  username: string
  avatar: string
}

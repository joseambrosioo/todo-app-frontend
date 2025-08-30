export interface Todo {
  id: string
  title: string
  color: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateTodoRequest {
  title: string
  color?: string
}

export interface UpdateTodoRequest {
  title?: string
  color?: string
  completed?: boolean
}

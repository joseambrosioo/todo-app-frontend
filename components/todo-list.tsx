import { TodoItem } from "@/components/todo-item"

interface Todo {
  id: string
  title: string
  color: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoListProps {
  todos: Todo[]
  onToggleComplete: (id: string, completed: boolean) => void
  onEditTask: (todo: Todo) => void
  onDeleteTask: (id: string) => void
}

export function TodoList({ todos, onToggleComplete, onEditTask, onDeleteTask }: TodoListProps) {
  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  )
}

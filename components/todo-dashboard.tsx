"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TodoList } from "@/components/todo-list"
import { TodoModal } from "@/components/todo-modal"
import { TodoAPI, type Todo } from "@/lib/api"
import { Rocket, Plus } from "lucide-react"

export function TodoDashboard() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setError(null)
      const todosData = await TodoAPI.getTodos()
      setTodos(todosData)
    } catch (error) {
      console.error("Error fetching todos:", error)
      setError("Failed to load todos")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = () => {
    setEditingTodo(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (todo: Todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTodo(null)
  }

  const handleTaskSaved = () => {
    fetchTodos()
    handleCloseModal()
  }

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await TodoAPI.updateTodo(id, { completed: !completed })
      fetchTodos()
    } catch (error) {
      console.error("Error toggling todo:", error)
      setError("Failed to update todo")
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await TodoAPI.deleteTodo(id)
      fetchTodos()
    } catch (error) {
      console.error("Error deleting todo:", error)
      setError("Failed to delete todo")
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Rocket className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold">
              <span className="text-blue-400">Todo</span> <span className="text-purple-400">App</span>
            </h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>
        )}

        {/* Create Task Button */}
        <Button
          onClick={handleCreateTask}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-medium mb-8"
        >
          Create Task
          <div className="ml-2 w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
        </Button>

        {/* Task Counters */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-medium">Tasks</span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">{totalCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-medium">Completed</span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
              {completedCount} de {totalCount}
            </span>
          </div>
        </div>

        {/* Todo List or Empty State */}
        {todos.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 opacity-30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-400 mb-2">You don't have any tasks registered yet.</h3>
            <p className="text-gray-500">Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {/* Modal */}
        <TodoModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleTaskSaved} editingTodo={editingTodo} />
      </div>
    </div>
  )
}

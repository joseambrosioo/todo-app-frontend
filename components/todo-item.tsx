"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { DeleteConfirmationModal } from "./delete-confirmation-modal"

interface Todo {
  id: string
  title: string
  color: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

const colorClasses = {
  red: "border-red-500",
  orange: "border-orange-500",
  yellow: "border-yellow-500",
  green: "border-green-500",
  blue: "border-blue-500",
  purple: "border-purple-500",
  pink: "border-pink-500",
  magenta: "border-fuchsia-500",
  brown: "border-amber-700",
}

export function TodoItem({ todo, onToggleComplete, onEdit, onDelete }: TodoItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    onDelete(todo.id)
    setShowDeleteConfirm(false)
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div
        className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 group hover:bg-gray-750 transition-colors cursor-pointer"
        onClick={() => onEdit(todo)}
      >
        <button
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed 
              ? "bg-purple-500 border-purple-500" 
              : `${colorClasses[todo.color as keyof typeof colorClasses] || "border-blue-500"} bg-transparent hover:border-purple-500`
          }`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleComplete(todo.id, todo.completed)
          }}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <p className={`text-white ${todo.completed ? "line-through text-gray-500" : ""} transition-colors`}>
            {todo.title}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 hover:bg-red-400/10"
          onClick={handleDeleteClick}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        taskTitle={todo.title}
      />
    </>
  )
}

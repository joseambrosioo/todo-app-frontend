"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { ArrowLeft, Check, Plus } from "lucide-react"
import { TodoAPI, type Todo } from "@/lib/api"

interface TodoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  editingTodo: Todo | null
}

const colors = [
  { name: "red", class: "bg-red-500" },
  { name: "orange", class: "bg-orange-500" },
  { name: "yellow", class: "bg-yellow-500" },
  { name: "green", class: "bg-green-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "purple", class: "bg-purple-500" },
  { name: "pink", class: "bg-pink-500" },
  { name: "magenta", class: "bg-fuchsia-500" },
  { name: "brown", class: "bg-amber-700" },
]

export function TodoModal({ isOpen, onClose, onSave, editingTodo }: TodoModalProps) {
  const [title, setTitle] = useState("")
  const [selectedColor, setSelectedColor] = useState("blue")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title)
      setSelectedColor(editingTodo.color)
    } else {
      setTitle("")
      setSelectedColor("blue")
    }
    setError(null)
  }, [editingTodo, isOpen])

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (editingTodo) {
        // Update existing todo
        await TodoAPI.updateTodo(editingTodo.id, {
          title: title.trim(),
          color: selectedColor,
        })
      } else {
        // Create new todo
        await TodoAPI.createTodo({
          title: title.trim(),
          color: selectedColor,
        })
      }

      onSave()
    } catch (error) {
      console.error("Error saving todo:", error)
      setError(error instanceof Error ? error.message : "Failed to save todo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 rounded text-sm">{error}</div>
          )}

          <div>
            <Label htmlFor="title" className="text-blue-400 font-medium mb-3 block">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Brush you teeth"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
            />
          </div>

          <div>
            <Label className="text-blue-400 font-medium mb-3 block">Color</Label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-10 h-10 rounded-full ${color.class} ${
                    selectedColor === color.name ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800" : ""
                  } transition-all hover:scale-110`}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={!title.trim() || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
          >
            {loading ? (
              "Saving..."
            ) : editingTodo ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

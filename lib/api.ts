export interface Todo {
  id: string
  title: string
  color: string
  completed: boolean
  created_at: string
  updated_at: string
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

export class TodoAPI {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

  private static async request(url: string, options?: RequestInit) {
    const fullUrl = `${this.baseURL}${url}`

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    if (response.status === 204) {
      return null
    }

    return response.json()
  }

  static async getTodos(): Promise<Todo[]> {
    return await this.request("/api/todos")
  }

  static async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    return await this.request("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    })
  }

  static async updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo> {
    return await this.request(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  static async deleteTodo(id: string): Promise<void> {
    await this.request(`/api/todos/${id}`, {
      method: "DELETE",
    })
  }
}

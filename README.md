# Todo App Frontend

Next.js 14 frontend application for the Todo app with modern React components and TypeScript.

## Features

- Modern Next.js 14 with App Router
- React 18 with TypeScript
- Beautiful UI with Tailwind CSS
- Radix UI components for accessibility
- Dark theme support
- Responsive design
- Real-time updates
- Form validation with React Hook Form and Zod

## Setup

### Prerequisites

- Node.js 18+
- npm
- Backend API running on localhost:3001

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:3001)

## Project Structure

```
├── app/                                  # Next.js app directory
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # Root layout
│   └── page.tsx                          # Home page
├── components/                           # React components
│   ├── ui/                               # UI components (Radix UI)
│   ├── delete-confirmation-modal.tsx     # Delete todo confirmation modal
│   ├── theme-provider.tsx                # Theme provider
│   ├── todo-dashboard.tsx                # Main todo dashboard
│   ├── todo-list.tsx                     # Todo list component
│   ├── todo-item.tsx                     # Individual todo item
│   └── todo-modal.tsx                    # Add/edit todo modal
├── hooks/                                # Custom React hooks
├── lib/                                  # Utilities and configurations
└── public/                               # Static assets
└── styles/                               # Global CSS
```

## Components

- **Delete Confirmation Modal**: Displays delete confimation modal
- **Theme Provider**: Theme provider
- **TodoDashboard**: Main application container
- **TodoList**: Displays list of todos
- **TodoItem**: Individual todo with actions
- **TodoModal**: Form for adding/editing todos
- **UI Components**: Radix UI components for consistent design

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Custom CSS**: Global styles and component-specific styles

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **State Management**: React hooks
- **Icons**: Lucide React

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

import React from 'react'
import {
  HiMenu as ListIcon,
  HiX as DeleteIcon,
  HiRefresh as RefreshIcon
} from 'react-icons/hi'

export default function App() {
  const [tasks, setTasks] = React.useState(null)
  const [currentTitle, setCurrentTitle] = React.useState('')
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState(null)
  const hasTasks = tasks?.length > 0

  const fetchTasks = () => {
    fetch('/tasks')
      .then((res) => res.json())
      .then(setTasks)
      .then(() => setLastUpdatedAt(Date.now()))
  }

  React.useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreateTask = (event) => {
    event.preventDefault()

    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: currentTitle
      })
    }).then(() => {
      setCurrentTitle('')
      fetchTasks()
    })
  }

  const updateTask = (id, nextTask) => {
    fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nextTask)
    }).then(fetchTasks)
  }

  const deleteTask = (id) => {
    fetch(`/tasks/${id}`, { method: 'DELETE' }).then(fetchTasks)
  }

  return (
    <div className="flex items-center space-x-12" style={{ maxWidth: 800 }}>
      <div className="flex-shrink-0" style={{ width: 400 }}>
        <div className="bg-white border border-orange-800 border-opacity-50 rounded-xl shadow-2xl">
          <header className={`relative ${hasTasks ? 'shadow-sm' : ''}`}>
            <form onSubmit={handleCreateTask}>
              <ListIcon
                size={16}
                className="absolute ml-4 left-2 text-gray-600"
                style={{ marginTop: 22 }}
              />
              <input
                name="title"
                value={currentTitle}
                onChange={({ target }) => setCurrentTitle(target.value)}
                autoComplete="off"
                placeholder="What should I do today?"
                className={`pl-10 pr-4 py-4 w-full border-b border-gray-300 text-lg rounded-xl focus:ring-2 focus:ring-orange-600 ${
                  hasTasks ? 'rounded-bl-none rounded-br-none' : ''
                }`}
              />
            </form>
          </header>

          {hasTasks && (
            <ul className="bg-gray-100 text-gray-700 font-medium rounded-bl-xl rounded-br-xl overflow-hidden">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="px-4 py-4 flex items-center justify-between space-x-4 border-b">
                  <span
                    className={`backdrop-filter transition-all duration-200 space-x-3 ${
                      task.isDone ? 'pl-2 opacity-50 grayscale' : ''
                    }`}>
                    <input
                      type="checkbox"
                      className="border shadow-sm"
                      checked={task.isDone}
                      onChange={({ target }) => {
                        updateTask(task.id, { isDone: target.checked })
                      }}
                    />
                    <span
                      className="flex-1 mr-6"
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault()
                          event.currentTarget.blur()
                        }
                      }}
                      onBlur={({ target }) => {
                        updateTask(task.id, { title: target.textContent })
                      }}>
                      {task.isDone ? <s>{task.title}</s> : task.title}
                    </span>
                  </span>
                  <button
                    className="ml-2 w-6 h-6 flex items-center justify-center text-gray-500 text-sm rounded-md hover:text-orange-600"
                    onClick={() => deleteTask(task.id)}>
                    <DeleteIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="mt-8 text-center text-sm">
          <button
            className="inline-flex items-center text-orange-900"
            onClick={fetchTasks}>
            <RefreshIcon className="mr-1" />
            Refetch
          </button>
          <p className="opacity-50">
            Last synced{' '}
            {new Date(lastUpdatedAt).toLocaleTimeString('en-US', {
              seconds: '2-digit',
              minutes: '2-digit',
              hours: '2-digit',
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </footer>
      </div>

      <aside className="hidden md:block text-sm">
        <h2 className="mb-1 text-orange-900 text-xl font-medium">
          REST API example
        </h2>
        <p>
          This task app performs CRUD operations against API handlers generated
          from the "task" data model and intercepted by{' '}
          <a
            href="https://github.com/mswjs/msw"
            target="_blank"
            rel="noreferrer"
            className="text-orange-800 underline">
            Mock Service Worker
          </a>
          .
        </p>
        <ul className="my-5 pl-8 space-y-2 list-disc">
          <li>Type a new task and press "Enter".</li>
          <li>Double-click on the title to rename it.</li>
          <li>Click the checkbox to mark the task as done.</li>
          <li>Click "X" to delete a task.</li>
        </ul>
        <p>
          Open the "Network" in DevTools to explore the HTTP requests
          corresponding to the actions you make.
        </p>
      </aside>
    </div>
  )
}

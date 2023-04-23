
export async function getTasks() {
  const res = await fetch('/api/tasks')
  const data = await res.json()
  return data
}

export async function postTasks(title, projectId) {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, projectId })
  })
  const data = await res.json()
  return data
}

export async function updateTasks(id, description) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({ description })
  })

  const data = await res.json()

  return data
}

export async function deleteTasks(id) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  })

  const data = await res.json()
  return data
}
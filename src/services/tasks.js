
export async function getTasks(email, projectId) {

  const res = await fetch(`/api/tasks/tasks`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, projectId })
  })
  const data = await res.json()
  return data
  
}

export async function postTasks(title, projectId) {
  const res = await fetch('/api/tasks/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, projectId })
  })
  const data = await res.json()
  return data
}

export async function updateTask(id, title, description) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  })

  const data = await res.json()
  return data
}

export async function updateTaskStatus(id, status) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
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
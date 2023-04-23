
export async function getProjects() {
    const res = await fetch('/api/projects')
    const data = await res.json()
    return data
  }

  
export async function postProjects(title) {
  const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
  })
  const data = await res.json()
  return data
}

export async function deleteProjects(id) {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'DELETE'
  })
   
  const data = await res.json()
  console.log(data)
  return data
}
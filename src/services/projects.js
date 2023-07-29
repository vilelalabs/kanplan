
export async function getProjects(email,archived) {
  const res = await fetch(`/api/projects/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  const data = await res.json()
  const filteredProjects = data.filter((project) => project.archived === archived)
  //console.log(filteredProjects)
  return filteredProjects
}


export async function postProjects(title, email) {

  const res = await fetch('/api/projects/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, email })
  })
  const data = await res.json()
  return data
}

export async function updateProjectTitle(id, title) {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
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
  return data
}

export async function archiveProjects(id) {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PUT'
  })
  const data = await res.json()
  return data
}
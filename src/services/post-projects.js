
export default async function postProjects(title) {
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

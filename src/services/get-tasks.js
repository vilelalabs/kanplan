
export default async function getTasks() {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    return data
  }

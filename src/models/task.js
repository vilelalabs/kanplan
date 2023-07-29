


export const Status = {
    ToDo: "to-do",
    InProgress: "in-progress",
    Done: "done"
}

export class Task {
    constructor(id, title, description, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

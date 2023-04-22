


export const Status = {
    ToDo: "to-do",
    InProgress: "in-progress",
    Done: "done"
}

export class Task {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

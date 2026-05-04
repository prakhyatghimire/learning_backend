import express from "express";
const app = express();
let count = 0;

const logger = (req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
};

const counter = (req, res, next) => {
    count++;
    console.log(count);
    next();
};

const validation = (req, res, next) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            error: "no title"
        });
    }
    next();
};

const checker = (req, res, next) => {
    const taskid = parseInt(req.params.id);
    if (isNaN(taskid)) {
        return res.status(400).json({
            error: "wrong id"
        });
    }
    next();
};

const block = (req, res, next) => {
    if (req.query.block === "true") {
        return res.status(403).json({
            error: "the request is blocked"
        });
    }
    next();
};

app.use(express.json());
app.use(logger);
app.use(counter);
app.use(block);

let task = [];
let nextID = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(task);
});

// CREATE task
app.post("/tasks", validation, (req, res) => {
    const newTask = {
        id: nextID++,
        title: req.body.title,
        completed: req.body.completed || false
    };
    task.push(newTask);
    res.status(201).json(newTask);
});

// UPDATE task
app.put("/tasks/:id", checker, (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const foundTask = task.find(t => t.id === id);

    if (!foundTask) {
        return res.status(404).json({
            error: "task not found"
        });
    }

    if (title !== undefined) foundTask.title = title;
    if (completed !== undefined) foundTask.completed = completed;

    res.json(foundTask);
});

// DELETE task
app.delete("/tasks/:id", checker, (req, res) => {
    const id = parseInt(req.params.id);

    const index = task.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "task not found"
        });
    }

    const deletedTask = task.splice(index, 1);

    res.json({
        message: "task deleted",
        task: deletedTask[0]
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
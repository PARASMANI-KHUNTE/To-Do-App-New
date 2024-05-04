const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas', err);
    }
}

connectToDatabase();

app.get('/', async (req, res) => {
    const db = client.db('todoapp');
    const pendingTasksCollection = db.collection('pending');
    const completedTasksCollection = db.collection('completed');

    try {
        const pendingTasks = await pendingTasksCollection.find().toArray();
        const completedTasks = await completedTasksCollection.find().toArray();
        
        res.sendFile(path.join(__dirname, 'index.html'), {
            tasks: { pending: pendingTasks, completed: completedTasks }
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal server error');
    }
});


// Add task to pending collection
app.post('/tasks/pending', async (req, res) => {
    const { taskInput } = req.body;
    if (!taskInput) {
        return res.status(400).json({ error: 'Task input is required' });
    }

    const db = client.db('todoapp');
    const pendingTasksCollection = db.collection('pending');

    try {
        const result = await pendingTasksCollection.insertOne({ taskInput });
        res.status(201).json({ message: 'Task added to pending list successfully', taskId: result.insertedId });
    } catch (err) {
        console.error('Error adding task to pending list', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Move task from pending collection to completed collection
app.put('/tasks/:id/complete', async (req, res) => {
    const taskId = req.params.id;

    if (!ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const db = client.db('todoapp');
    const pendingTasksCollection = db.collection('pending');
    const completedTasksCollection = db.collection('completed');

    try {
        const task = await pendingTasksCollection.findOne({ _id: new ObjectId(taskId) });
        if (!task) {
            return res.status(404).json({ error: 'Task not found in pending list' });
        }

        const result = await pendingTasksCollection.deleteOne({ _id: new ObjectId(taskId) });
        if (result.deletedCount === 0) {
            return res.status(500).json({ error: 'Failed to delete task from pending list' });
        }

        await completedTasksCollection.insertOne(task);
        res.json({ message: 'Task moved to completed list successfully' });
    } catch (err) {
        console.error('Error moving task to completed list', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Move task from completed collection to pending collection
app.put('/tasks/:id/undo', async (req, res) => {
    const taskId = req.params.id;

    if (!ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const db = client.db('todoapp');
    const pendingTasksCollection = db.collection('pending');
    const completedTasksCollection = db.collection('completed');

    try {
        const task = await completedTasksCollection.findOne({ _id: new ObjectId(taskId) });
        if (!task) {
            return res.status(404).json({ error: 'Task not found in completed list' });
        }

        const result = await completedTasksCollection.deleteOne({ _id: new ObjectId(taskId) });
        if (result.deletedCount === 0) {
            return res.status(500).json({ error: 'Failed to delete task from completed list' });
        }

        await pendingTasksCollection.insertOne(task);
        res.json({ message: 'Task moved to pending list successfully' });
    } catch (err) {
        console.error('Error moving task to pending list', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

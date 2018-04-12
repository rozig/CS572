const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

router.get('/', (req, res) => {
	const db = req.app.db;
	db.collection('tasks').find({status: 'incomplete'}, {$sort: {created_date: -1}}).toArray((err, tasks) => {
		res.render('tasks', {tasks: tasks});
	});
});

router.post('/', (req, res) => {
	const task = {
		task: req.body.task,
		status: 'incomplete',
		created_date: new Date(),
		updated_date: ''
	};
	const db = req.app.db;

	db.collection('tasks').insert(task, (err, taskInserted) => {
		if(err) throw err;

		res.redirect('/tasks');
	});
});

router.get('/completed', (req, res) => {
	const db = req.app.db;
	db.collection('tasks').find({status: 'completed'}, {$sort: {created_date: -1}}).toArray((err, tasks) => {
		res.render('tasks_completed', {tasks: tasks});
	});
});

router.post('/:task_id', (req, res) => {
	const id = new ObjectID(req.params.task_id);
	const db = req.app.db;

	db.collection('tasks').update({_id: id}, {'$set': {status: 'completed', updated_date: new Date()}}, (err, numUpdated) => {
		res.send({status: 'success'});
	});
});

router.delete('/:task_id', (req, res) => {
	const id = new ObjectID(req.params.task_id);
	const db = req.app.db;

	db.collection('tasks').remove({_id: id}, (err, result) => {
		res.send({status: 'success'});
	});
});

module.exports = router;

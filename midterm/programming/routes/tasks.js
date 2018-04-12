const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	const collection = req.collection;

	collection.find({completed: false}).toArray((err, tasks) => {
		res.render('tasks', {tasks: tasks});
	});
});

router.post('/', (req, res) => {

});

router.get('/completed', (req, res) => {});

router.post('/:task_id', (req, res) => {});

router.delete('/:task_id', (req, res) => {});

module.exports = router;

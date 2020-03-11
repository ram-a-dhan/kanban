const { Task } = require('../models')

class TaskController {
    static add = async (req, res, next) => {
        try {
            let userId = req.userData.id
            let newTask = {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                userId: userId
            }
            let addNewTask = await Task.create(newTask)
            res.status(201).json(addNewTask)
        } catch (err) {
            next(err)
        }
    }

    static showAll = async (req, res, next) => {
        try {
            let userId = req.userData.id
            let tasks = await Task.findAll({ where: { userId } })
            res.status(200).json(tasks)
        } catch (err) {
            next(err)
        }
    }

    static showOne = async (req, res, next) => {
        try {
            let taskId = Number(req.params.id)
            let task = await Task.findOne({ where: { id: taskId } })
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }

    static edit = async (req, res, next) => {
        try {
            let taskId = Number(req.params.id)
            let editTask = {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description
            }
            let task = await Task.update(editTask, { where: { id: taskId } })
            res.status(201).json(task)
        } catch (err) {
            next(err)
        }
    }

    static delete = async (req, res, next) => {
        try {
            let taskId = Number(req.params.id)
            let task = await Task.destroy({ where: { id: taskId } })
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = TaskController
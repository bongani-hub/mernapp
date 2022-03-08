const express = require('express')
const router = express.Router()
const { getGoals,setGoal, updateGoals, deletetGoals, } = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoals).delete(deletetGoals)

module.exports = router
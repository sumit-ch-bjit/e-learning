import express from 'express'
const router = express.Router()


router.get('/all-courses', (req, res) => {
    res.send("course route activated")
})

export default router;
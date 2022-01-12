const express =require("express")
const { authAdmin, registerAdmin } = require("../controller/adminController")
const { getAllUsers, deleteUser, updateUser, getUser}  = require("../controller/userControllers")

const router = express.Router()

router.route("/").get(getAllUsers)
router.route("/delete/:id").delete(deleteUser)
router.route("/edit/:id").patch(updateUser)
router.route("/adminlogin").post(authAdmin)
router.route("/adminregister").post(registerAdmin)
router.route("/edit/:id").get(getUser)

module.exports = router
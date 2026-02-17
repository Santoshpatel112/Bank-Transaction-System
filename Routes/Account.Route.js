import expres from 'express'
const router =expres.Router();
import authmiddleware from '../middleware/auth.middleware.js';
import creatAccount from '../Controllers/Account.Controller.js'

router.post("/",authmiddleware,creatAccount);


export default router;





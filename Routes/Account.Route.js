import expres from 'express'
const router =expres.Router();
import authmiddleware from '../middleware/auth.middleware';


router.post("/",authmiddleware);


export default router;





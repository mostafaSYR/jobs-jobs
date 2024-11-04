import { Router } from "express";
import { approveJob, markJobAsSpam, listAllJobs, submitJob, listJobs } from "../controllers/jobController";

const router = Router();

router.get("/jobs/:id/approve", approveJob);     
router.get("/jobs/:id/spam", markJobAsSpam); 
router.post('/jobs', submitJob);    
router.get("/all-jobs", listAllJobs);        
router.get("/", listJobs);        

export default router;

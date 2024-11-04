import { Router } from "express";
import { approveJob, markJobAsSpam, listApprovedJobs, submitJob, listAllJobs } from "../controllers/jobController";

const router = Router();

router.get("/jobs/:id/approve", approveJob);     
router.get("/jobs/:id/spam", markJobAsSpam); 
router.post('/jobs', submitJob);    
router.get("/jobs", listApprovedJobs);        
router.get("/", listAllJobs);        

export default router;

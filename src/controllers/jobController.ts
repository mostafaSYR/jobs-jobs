import { Request, Response } from "express";
import prisma from "../prismaClient";
import { JobStatus } from "@prisma/client";
import { sendNotification } from "../utils/notification";

export const listAllJobs = async (req: Request, res: Response) => {
  const jobs = await prisma.job.findMany({
    include: {
      user: true,
    }
  });
  res.render('jobList', { jobs });
};


export const listApprovedJobs = async (req: Request, res: Response) => {
  const jobs = await prisma.job.findMany({
    where: {
      status: JobStatus.APPROVED
    },
    include: {
      user: true,
    }
  });
  console.log(jobs);
  res.render('jobList', { jobs });
};



export const markJobAsSpam = async (req: Request, res: Response) => {
  const jobId = Number(req.params.id);
  const job = await prisma.job.update(
    {
      where: {
        id: jobId,
      },
      data: {
        status: JobStatus.SPAM,
      }
    }
  );
  
  return res.redirect("/");
};

export const approveJob = async (req: Request, res: Response) => {
  const jobId = Number(req.params.id);
  const job = await prisma.job.update(
    {
      where: {
        id: jobId,
      },
      data: {
        status: JobStatus.APPROVED,
      }
    }
  );
  return res.redirect("/");
};


export const showJobPostForm = async (req: Request, res: Response) => {
  res.render('jobPost');
}

export const submitJob = async (req: Request, res: Response) => {
  const { email, title, description } = req.body;
  let status: JobStatus = JobStatus.APPROVED;
  try {
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({ data: { email } });
            status = JobStatus.PENDING;
        }

        const job = await prisma.job.create({
            data: {
                title,
                description,
                userId: user.id,
                status,
            },
        });

        if ( JobStatus.PENDING === status) {
          sendNotification({
              ...job,
              email: user.email,
            });
        }

        return res.redirect("/");
  } catch (error) {
        console.error(error);
        return res.status(500).render("jobSubmission", { error: "Something went wrong" });
  }
}

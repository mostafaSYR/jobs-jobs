import axios from 'axios';
const xml2js = require('xml2js');

import { EXTERNAL_JOB, IJob } from '../interfaces/Job';
import safeHtml from './safeHtml';

const EXTERNAL_JOBS_URL: string = process.env.EXTERNAL_JOBS_URL || '';

export const fetchExternalJobs = async (): Promise<IJob[]> => {
    try {
        let jobs: IJob[] = [];
        const response = await axios.get(`${EXTERNAL_JOBS_URL}/xml`);
        const xml = response.data;


        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xml);

        Object.values(result['workzag-jobs'].position).forEach((entry: any) => {
             jobs.push({
                 id: entry.id[0],
                 title: entry.name[0],
                 description: '',
                 htmlDescription: Object.values(entry.jobDescriptions[0]).map((jobDescript: any) => {
                    return safeHtml(`<strong> ${jobDescript[0].name}</strong><br>
                    <p>${jobDescript[0].value}</p>
                    <br><br>
                    `);
                 }).join(''),
                 email: 'external@external',
                 external: true,
                 externalLink: `${EXTERNAL_JOBS_URL}/job/${entry.id[0]}`,
                 status: EXTERNAL_JOB,
             });
         }); 

        return jobs;
    } catch (error) {
        console.error('Error fetching external jobs:', error);
        return [];
    }
};

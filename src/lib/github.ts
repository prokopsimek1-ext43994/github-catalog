import { Octokit, App } from 'octokit';

export const github = new Octokit({ auth: process.env.GITHUB_TOKEN });

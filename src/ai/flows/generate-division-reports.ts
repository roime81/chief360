'use server';

/**
 * @fileOverview AI flow for generating division-specific reports.
 *
 * - generateDivisionReport - A function that generates a division-specific report.
 * - GenerateDivisionReportInput - The input type for the generateDivisionReport function.
 * - GenerateDivisionReportOutput - The return type for the generateDivisionReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDivisionReportInputSchema = z.object({
  divisionName: z.string().describe('The name of the division to generate the report for.'),
  kpis: z.string().describe('Key performance indicators for the division.'),
  trends: z.string().describe('Recent trends observed in the division.'),
  challenges: z.string().describe('Current challenges faced by the division.'),
  reporting: z.string().describe('Unique reporting metrics for the division'),
});

export type GenerateDivisionReportInput = z.infer<typeof GenerateDivisionReportInputSchema>;

const GenerateDivisionReportOutputSchema = z.object({
  report: z.string().describe('The generated division-specific report.'),
});

export type GenerateDivisionReportOutput = z.infer<typeof GenerateDivisionReportOutputSchema>;

export async function generateDivisionReport(input: GenerateDivisionReportInput): Promise<GenerateDivisionReportOutput> {
  return generateDivisionReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDivisionReportPrompt',
  input: {schema: GenerateDivisionReportInputSchema},
  output: {schema: GenerateDivisionReportOutputSchema},
  prompt: `You are an AI assistant specialized in generating division-specific reports for CEOs. Use the provided information to generate a comprehensive report.

Division Name: {{{divisionName}}}
Key Performance Indicators: {{{kpis}}}
Recent Trends: {{{trends}}}
Current Challenges: {{{challenges}}}
Unique Reporting Metrics: {{{reporting}}}

Generate a concise report summarizing the key insights and trends for the specified division. Focus on providing actionable information that the CEO can use to understand the division's performance and challenges.
`,
});

const generateDivisionReportFlow = ai.defineFlow(
  {
    name: 'generateDivisionReportFlow',
    inputSchema: GenerateDivisionReportInputSchema,
    outputSchema: GenerateDivisionReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

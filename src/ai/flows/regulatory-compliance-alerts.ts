'use server';

/**
 * @fileOverview Regulatory Compliance Alerts AI agent.
 *
 * - regulatoryComplianceAlerts - A function that handles the regulatory compliance alerts process.
 * - RegulatoryComplianceInput - The input type for the regulatoryComplianceAlerts function.
 * - RegulatoryComplianceOutput - The return type for the regulatoryComplianceAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegulatoryComplianceInputSchema = z.object({
  companyPractices: z.string().describe('Description of company practices.'),
  documentation: z.string().describe('Relevant company documentation.'),
});
export type RegulatoryComplianceInput = z.infer<typeof RegulatoryComplianceInputSchema>;

const RegulatoryComplianceOutputSchema = z.object({
  complianceGaps: z.string().describe('Identified compliance gaps with LHDN, PERKESO, and KWSP regulations.'),
  recommendations: z.string().describe('Recommendations to mitigate identified compliance gaps.'),
});
export type RegulatoryComplianceOutput = z.infer<typeof RegulatoryComplianceOutputSchema>;

export async function regulatoryComplianceAlerts(
  input: RegulatoryComplianceInput
): Promise<RegulatoryComplianceOutput> {
  return regulatoryComplianceAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regulatoryComplianceAlertsPrompt',
  input: {schema: RegulatoryComplianceInputSchema},
  output: {schema: RegulatoryComplianceOutputSchema},
  prompt: `You are an AI-powered regulatory compliance assistant. Your task is to analyze company practices and documentation against LHDN, PERKESO, and KWSP regulations to identify potential compliance gaps and provide recommendations.

Analyze the following company practices and documentation:

Company Practices: {{{companyPractices}}}
Documentation: {{{documentation}}}

Identify any compliance gaps with LHDN, PERKESO, and KWSP regulations, and provide recommendations to mitigate these gaps. Return the compliance gaps and recommendations in a structured format.`,
});

const regulatoryComplianceAlertsFlow = ai.defineFlow(
  {
    name: 'regulatoryComplianceAlertsFlow',
    inputSchema: RegulatoryComplianceInputSchema,
    outputSchema: RegulatoryComplianceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

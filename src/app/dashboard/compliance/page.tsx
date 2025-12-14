"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  regulatoryComplianceAlerts,
  type RegulatoryComplianceInput,
  type RegulatoryComplianceOutput,
} from '@/ai/flows/regulatory-compliance-alerts';
import { AlertTriangle, Bot, CheckCircle, Loader2 } from 'lucide-react';

const formSchema = z.object({
  companyPractices: z.string().min(20, 'Please describe company practices in more detail.'),
  documentation: z.string().min(20, 'Please provide relevant documentation excerpts.'),
});

export default function CompliancePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [complianceOutput, setComplianceOutput] = useState<RegulatoryComplianceOutput | null>(null);

  const form = useForm<RegulatoryComplianceInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyPractices: 'We pay employees on the 28th of each month. EPF is contributed at 11% for employees and 13% for the employer. Overtime is paid at 1.5x the hourly rate for work beyond 8 hours a day.',
      documentation: 'Employee Handbook, Section 5.3: "All statutory contributions including LHDN PCB, PERKESO, and KWSP will be deducted and paid according to Malaysian law."',
    },
  });

  const onSubmit: SubmitHandler<RegulatoryComplianceInput> = async (data) => {
    setIsLoading(true);
    setComplianceOutput(null);
    try {
      const result = await regulatoryComplianceAlerts(data);
      setComplianceOutput(result);
      toast({
        title: 'Analysis Complete',
        description: 'Compliance check finished successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Analyzing Compliance',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Regulatory Compliance AI</CardTitle>
          <CardDescription>
            Cross-check company practices against LHDN, PERKESO, and KWSP regulations.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="companyPractices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Practices</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your company's practices regarding payroll, contributions, leave, etc."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Documentation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste relevant excerpts from employee handbooks, policies, or contracts."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Compliance'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="space-y-6">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <CardTitle className="font-headline">Compliance Gaps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="min-h-[100px]">
             {isLoading && (
              <div className="flex flex-col items-center gap-2 text-muted-foreground pt-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Identifying potential gaps...</p>
              </div>
            )}
            {!isLoading && !complianceOutput && (
                <div className="text-center text-muted-foreground pt-4">
                    <Bot className="mx-auto h-12 w-12" />
                    <p className="mt-2">Potential gaps will be listed here.</p>
                </div>
            )}
            {complianceOutput && <div className="whitespace-pre-wrap text-sm">{complianceOutput.complianceGaps}</div>}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <CardTitle className="font-headline">Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="min-h-[100px]">
            {isLoading && (
              <div className="flex flex-col items-center gap-2 text-muted-foreground pt-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Formulating recommendations...</p>
              </div>
            )}
            {!isLoading && !complianceOutput && (
                <div className="text-center text-muted-foreground pt-4">
                    <Bot className="mx-auto h-12 w-12" />
                    <p className="mt-2">Actionable recommendations will appear here.</p>
                </div>
            )}
            {complianceOutput && <div className="whitespace-pre-wrap text-sm">{complianceOutput.recommendations}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

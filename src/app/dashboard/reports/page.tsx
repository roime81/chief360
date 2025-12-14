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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  generateDivisionReport,
  type GenerateDivisionReportInput,
  type GenerateDivisionReportOutput,
} from '@/ai/flows/generate-division-reports';
import { divisions } from '@/lib/placeholder-data';
import { Bot, Loader2 } from 'lucide-react';

const formSchema = z.object({
  divisionName: z.string().min(1, 'Please select a division.'),
  kpis: z.string().min(10, 'Please provide some KPIs.'),
  trends: z.string().min(10, 'Please describe recent trends.'),
  challenges: z.string().min(10, 'Please describe current challenges.'),
  reporting: z.string().min(10, 'Please describe unique reporting metrics.'),
});

export default function ReportsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [reportOutput, setReportOutput] = useState<GenerateDivisionReportOutput | null>(null);

  const form = useForm<GenerateDivisionReportInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      divisionName: '',
      kpis: '- Revenue Growth: +15%\n- Customer Churn: -2%',
      trends: 'Increasing demand for cloud services.',
      challenges: 'High competition in the mid-market segment.',
      reporting: 'Monthly recurring revenue (MRR) and customer lifetime value (CLV).',
    },
  });

  const onSubmit: SubmitHandler<GenerateDivisionReportInput> = async (data) => {
    setIsLoading(true);
    setReportOutput(null);
    try {
      const result = await generateDivisionReport(data);
      setReportOutput(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Report',
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
          <CardTitle className="font-headline">Generate Division Report</CardTitle>
          <CardDescription>
            Use AI to generate a comprehensive report for a specific division.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="divisionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisions.map((d) => (
                          <SelectItem key={d.name} value={d.name}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kpis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Performance Indicators</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., - Revenue Growth: +15%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Trends</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Increasing demand for cloud services." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="challenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Challenges</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., High competition in the mid-market segment." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reporting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Reporting Metrics</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Monthly recurring revenue (MRR)." {...field} />
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
                    Generating...
                  </>
                ) : (
                  'Generate Report'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">AI Generated Report</CardTitle>
          <CardDescription>The output from the AI will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-6">
          {isLoading && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Generating your report...</p>
            </div>
          )}
          {!isLoading && !reportOutput && (
            <div className="text-center text-muted-foreground">
              <Bot className="mx-auto h-12 w-12" />
              <p className="mt-2">Your report will be shown here once generated.</p>
            </div>
          )}
          {reportOutput && (
            <div className="w-full h-full text-sm whitespace-pre-wrap rounded-md bg-muted/50 p-4 overflow-auto">
              {reportOutput.report}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { companyKpis, divisionKpis, individualKpis } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';

const KpiBadge = ({ status }: { status: string }) => {
    return (
        <Badge variant={status === 'success' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'} className={cn(
            'border-transparent',
            status === 'success' && 'bg-green-500/20 text-green-700 hover:bg-green-500/30',
            status === 'warning' && 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30',
            status === 'danger' && 'bg-red-500/20 text-red-700 hover:bg-red-500/30'
        )}>
            {status === 'success' ? 'On Track' : status === 'warning' ? 'Needs Attention' : 'At Risk'}
        </Badge>
    )
}

const individualKpiChartData = individualKpis.map(kpi => ({
    name: kpi.name,
    Value: kpi.value,
    Target: kpi.target,
}));

export default function KpiMonitoringPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Company-Wide KPIs</CardTitle>
          <CardDescription>Overall performance indicators for the organization.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {companyKpis.map(kpi => (
                    <Card key={kpi.metric} className="flex flex-col justify-between">
                        <CardHeader className="pb-2">
                            <CardDescription>{kpi.metric}</CardDescription>
                            <CardTitle className="text-3xl">{kpi.value}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>Target: {kpi.target}</span>
                                <KpiBadge status={kpi.status} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Divisional KPIs</CardTitle>
                <CardDescription>Key metrics for each business division.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Division</TableHead>
                            <TableHead>KPI</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {divisionKpis.map((kpi, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{kpi.division}</TableCell>
                                <TableCell>{kpi.kpi}</TableCell>
                                <TableCell>{kpi.value}</TableCell>
                                <TableCell className="text-right">
                                    <KpiBadge status={kpi.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Individual KPI Performance</CardTitle>
                <CardDescription>Comparison of value vs. target for key individuals.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={individualKpiChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                        />
                        <Legend />
                        <Bar dataKey="Value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Target" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

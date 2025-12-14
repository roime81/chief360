import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Progress } from "@/components/ui/progress";

import { stats, divisions, recentActivities } from '@/lib/placeholder-data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>{' '}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Divisions Overview</CardTitle>
            <CardDescription>
              Performance and employee distribution across divisions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Division</TableHead>
                  <TableHead>Head</TableHead>
                  <TableHead className="text-right">Employees</TableHead>
                  <TableHead className="text-right">KPI Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {divisions.map((division) => (
                  <TableRow key={division.name}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: division.color }} />
                            <div className="font-medium">{division.name}</div>
                        </div>
                    </TableCell>
                    <TableCell>{division.head}</TableCell>
                    <TableCell className="text-right">{division.employees}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                            <span>{division.kpiProgress}%</span>
                            <Progress value={division.kpiProgress} className="w-24 h-2" />
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={activity.avatar} alt="Avatar" data-ai-hint="person portrait"/>
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}{' '}
                    <span className="font-normal text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                   <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

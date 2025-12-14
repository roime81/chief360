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
import { Button } from '@/components/ui/button';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import { employees } from '@/lib/placeholder-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function EmployeesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">Employee Lifecycle</CardTitle>
          <CardDescription>Manage employee onboarding, status, and offboarding.</CardDescription>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Onboard Employee
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.division}</TableCell>
                <TableCell>{new Date(employee.hireDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={'outline'} className={cn(
                    'font-semibold',
                    employee.status === 'Active' && 'bg-green-500/20 text-green-700 border-transparent',
                    employee.status === 'Onboarding' && 'bg-blue-500/20 text-blue-700 border-transparent',
                    employee.status === 'Offboarded' && 'bg-gray-500/20 text-gray-700 border-transparent'
                  )}>
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Initiate Offboarding</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

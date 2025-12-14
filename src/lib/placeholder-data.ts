import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart,
  FileText,
  GanttChartSquare,
  LayoutDashboard,
  Network,
  Users,
} from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/org-chart', label: 'Org Chart', icon: Network },
  { href: '/dashboard/kpi-monitoring', label: 'KPI Monitoring', icon: BarChart },
  { href: '/dashboard/workflows', label: 'Workflows', icon: GanttChartSquare },
  { href: '/dashboard/employees', label: 'Employees', icon: Users },
  { href: '/dashboard/reports', label: 'AI Reports', icon: FileText },
  { href: '/dashboard/compliance', label: 'AI Compliance', icon: AlertTriangle },
];

export const user = {
  name: 'Roime Puniran',
  email: 'roimepuniran@gmail.com',
  avatar: 'https://picsum.photos/seed/100/100/100',
  isSuperAdmin: true,
};

export const stats = [
  {
    title: 'Active Employees',
    value: '1,254',
    change: '+12.5%',
    icon: Users,
    description: 'vs. last month',
  },
  {
    title: 'Active Workflows',
    value: '84',
    change: '+5',
    icon: GanttChartSquare,
    description: 'in progress',
  },
  {
    title: 'Pending Tasks',
    value: '231',
    change: '-2.1%',
    icon: Activity,
    description: 'vs. last week',
  },
  {
    title: 'Completed Tasks',
    value: '4,890',
    change: '+20.1%',
    icon: ArrowUpRight,
    description: 'this month',
  },
];

export const divisions = [
  { name: 'Technology', head: 'Alex Johnson', employees: 350, kpiProgress: 85, color: 'var(--chart-1)' },
  { name: 'Marketing', head: 'Maria Garcia', employees: 120, kpiProgress: 92, color: 'var(--chart-2)' },
  { name: 'Sales', head: 'David Smith', employees: 250, kpiProgress: 78, color: 'var(--chart-3)' },
  { name: 'Human Resources', head: 'Emily White', employees: 50, kpiProgress: 95, color: 'var(--chart-4)' },
  { name: 'Finance', head: 'Chris Green', employees: 80, kpiProgress: 88, color: 'var(--chart-5)' },
];

export const recentActivities = [
  {
    user: 'Samantha Bell',
    action: 'onboarded a new employee',
    details: 'John Doe to the Sales team',
    timestamp: '5m ago',
    avatar: 'https://picsum.photos/seed/101/40/40',
  },
  {
    user: 'AI Assistant',
    action: 'flagged a compliance risk',
    details: 'in PERKESO reporting for Q2',
    timestamp: '1h ago',
    avatar: 'https://picsum.photos/seed/102/40/40',
  },
  {
    user: 'Michael Brown',
    action: 'completed workflow',
    details: '"Q3 Marketing Campaign Launch"',
    timestamp: '3h ago',
    avatar: 'https://picsum.photos/seed/103/40/40',
  },
  {
    user: 'Jessica Williams',
    action: 'updated KPI target',
    details: 'for the Technology division',
    timestamp: '1d ago',
    avatar: 'https://picsum.photos/seed/104/40/40',
  },
];

// Data for Org Chart
export const orgChartData = {
  name: 'Orchestrator 360',
  role: 'CEO: Roime Puniran',
  avatar: 'https://picsum.photos/seed/100/40/40',
  children: [
    {
      name: 'Technology',
      role: 'CTO: Alex Johnson',
      avatar: 'https://picsum.photos/seed/110/40/40',
      children: [
        { name: 'Engineering', role: 'Head: Jane Doe', avatar: 'https://picsum.photos/seed/111/40/40' },
        { name: 'Product', role: 'Head: John Smith', avatar: 'https://picsum.photos/seed/112/40/40' },
      ],
    },
    {
      name: 'Marketing',
      role: 'CMO: Maria Garcia',
      avatar: 'https://picsum.photos/seed/120/40/40',
      children: [
        { name: 'Content', role: 'Head: Emily Jones', avatar: 'https://picsum.photos/seed/121/40/40' },
        { name: 'Performance', role: 'Head: Mike Brown', avatar: 'https://picsum.photos/seed/122/40/40' },
      ],
    },
    {
        name: 'Sales',
        role: 'CSO: David Smith',
        avatar: 'https://picsum.photos/seed/130/40/40'
    },
    {
        name: 'Finance',
        role: 'CFO: Chris Green',
        avatar: 'https://picsum.photos/seed/140/40/40'
    }
  ],
};

// Data for KPI Monitoring
export const companyKpis = [
  { metric: 'Revenue Growth', value: '15.2%', target: '12%', status: 'success' },
  { metric: 'Customer Satisfaction', value: '92%', target: '90%', status: 'success' },
  { metric: 'Employee Turnover', value: '8%', target: '10%', status: 'success' },
  { metric: 'Profit Margin', value: '24%', target: '25%', status: 'warning' },
];

export const divisionKpis = [
    { division: 'Technology', kpi: 'System Uptime', value: '99.98%', status: 'success' },
    { division: 'Technology', kpi: 'New Features Shipped', value: '12', status: 'success' },
    { division: 'Marketing', kpi: 'Lead Generation', value: '1,200', status: 'success' },
    { division: 'Marketing', kpi: 'Conversion Rate', value: '4.5%', status: 'warning' },
    { division: 'Sales', kpi: 'New MRR', value: '$120k', status: 'success' },
    { division: 'Sales', kpi: 'Avg. Deal Size', value: '$15k', status: 'danger' },
];

export const individualKpis = [
  { name: 'Alice', division: 'Sales', kpi: 'Deals Closed', value: 15, target: 12 },
  { name: 'Bob', division: 'Technology', kpi: 'Bugs Fixed', value: 32, target: 25 },
  { name: 'Charlie', division: 'Marketing', kpi: 'Articles Published', value: 8, target: 8 },
];

// Data for Workflows
export const workflows = [
    { id: 'WF001', name: 'New Client Onboarding', division: 'Sales', status: 'In Progress', progress: 75, assignee: 'Alice' },
    { id: 'WF002', name: 'Q4 Financial Report', division: 'Finance', status: 'In Progress', progress: 50, assignee: 'Chris G.' },
    { id: 'WF003', name: 'Website Redesign', division: 'Technology', status: 'Completed', progress: 100, assignee: 'Alex J.' },
    { id: 'WF004', name: 'Hiring Pipeline', division: 'Human Resources', status: 'Blocked', progress: 25, assignee: 'Emily W.' },
    { id: 'WF005', name: 'Social Media Campaign', division: 'Marketing', status: 'In Progress', progress: 90, assignee: 'Maria G.' },
];

// Data for Employees
export const employees = [
  { id: 'E001', name: 'Alex Johnson', role: 'CTO', division: 'Technology', status: 'Active', hireDate: '2020-01-15' },
  { id: 'E002', name: 'Maria Garcia', role: 'CMO', division: 'Marketing', status: 'Active', hireDate: '2019-03-22' },
  { id: 'E003', name: 'John Doe', role: 'Sales Executive', division: 'Sales', status: 'Onboarding', hireDate: '2024-07-01' },
  { id: 'E004', name: 'Jane Smith', role: 'Frontend Developer', division: 'Technology', status: 'Active', hireDate: '2022-05-10' },
  { id: 'E005', name: 'Peter Jones', role: 'Accountant', division: 'Finance', status: 'Offboarded', hireDate: '2021-08-30' },
];
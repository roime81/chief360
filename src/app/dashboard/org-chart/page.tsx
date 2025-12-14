"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { orgChartData } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import React from 'react';

type OrgNodeData = {
  name: string;
  role: string;
  avatar: string;
  children?: OrgNodeData[];
};

const OrgNode = ({ node, isRoot = false, isLast = false }: { node: OrgNodeData, isRoot?: boolean, isLast?: boolean }) => {
  return (
    <div className={cn("relative flex items-start", !isRoot && "pl-12 pt-8")}>
      {!isRoot && (
        <>
          <div className="absolute left-0 top-0 h-full w-12">
            <div className="h-1/2 w-full border-b border-l border-border"></div>
            {!isLast && <div className="h-1/2 w-full border-l border-border"></div>}
          </div>
          <div className="absolute left-6 top-[2.75rem] h-px w-6 border-t border-border"></div>
        </>
      )}

      <div className="relative z-10">
        <Card className="min-w-[200px] hover:shadow-lg transition-shadow bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar>
              <AvatarImage src={node.avatar} data-ai-hint="person portrait"/>
              <AvatarFallback>{node.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{node.name}</p>
              <p className="text-xs text-muted-foreground">{node.role}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="flex flex-col justify-start">
          {node.children.map((child, index) => (
            <OrgNode key={child.name} node={child} isLast={index === node.children!.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function OrgChartPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Organizational Chart</CardTitle>
        <CardDescription>A dynamic view of the company's structure and reporting lines.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto p-6">
        <div className="inline-block min-w-full">
            <OrgNode node={orgChartData} isRoot={true} />
        </div>
      </CardContent>
    </Card>
  );
}

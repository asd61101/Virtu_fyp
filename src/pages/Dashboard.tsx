import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import DashboardNav from '@/components/dashboard/DashboardNav';
import ProjectList from '@/components/dashboard/ProjectList';
import CostEstimationCard from '@/components/dashboard/CostEstimationCard';

const Dashboard = () => {
  const [projects, setProjects] = useState([
    { id: '1', name: 'Modern Villa Design', lastUpdated: '2024-01-20' },
    { id: '2', name: 'Commercial Office Space', lastUpdated: '2024-01-15' },
    { id: '3', name: 'Residential Apartment Complex', lastUpdated: '2024-01-10' },
  ]);

  const handleProjectDelete = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <PageHeader
            title="Your Projects"
            description="Manage and create new architectural projects"
          />
          <Button asChild className="mt-4 md:mt-0 bg-virtuspace-500 hover:bg-virtuspace-600">
            <Link to="/floor-plan-generator" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ProjectList />
          </div>
          <div className="space-y-6">
            <CostEstimationCard />
            {/* Add other utility cards here in the future */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

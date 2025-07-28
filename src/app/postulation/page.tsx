'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Building2, 
  Briefcase, 
  Calendar, 
  Users, 
  ArrowRight,
  Filter,
  Plus
} from "lucide-react";

import { agenticallerApi } from "@/api";
import Link from 'next/link';
import { type Postulation } from "@/lib/mock-data";

const postulations_url = `/users/postulations`;

export default function PostulationsPage() {
  const [postulations, setPostulations] = useState<Postulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');

  useEffect(() => {
    const fetchPostulations = async () => {
      try {
        setLoading(true);
        const response = await agenticallerApi.get(postulations_url);
        setPostulations(response.data.postulations || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching postulations:', err);
        setError('Failed to load postulations');
      } finally {
        setLoading(false);
      }
    };

    fetchPostulations();
  }, []);

  const filteredPostulations = postulations.filter(postulation => {
    const matchesSearch = postulation.job_position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         postulation.job_company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = !filterCompany || postulation.job_company.toLowerCase().includes(filterCompany.toLowerCase());
    return matchesSearch && matchesCompany;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUniqueCompanies = () => {
    return [...new Set(postulations.map(p => p.job_company))];
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading postulations...</div>
        </div>
      </div>
    );
  }

  if (error && postulations.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Postulations</h1>
          <p className="text-muted-foreground">
            Manage and track all job postulations and their candidates
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          New Postulation
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by position or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="pl-10 pr-8 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Companies</option>
            {getUniqueCompanies().map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Total Postulations</p>
              <p className="text-2xl font-bold">{postulations.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Companies</p>
              <p className="text-2xl font-bold">{getUniqueCompanies().length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Active Candidates</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
                             <p className="text-2xl font-bold">49</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Postulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPostulations.map((postulation) => (
          <Card key={postulation._id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {postulation.job_position}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Building2 className="h-3 w-3 mr-1" />
                    {postulation.job_company}
                  </p>
                </div>
                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                   {postulation.questions?.length || 0} Candidates
                 </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Required Skills</p>
                                     <div className="flex flex-wrap gap-1">
                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border border-input bg-background">
                       {postulation.relevant_skill_1}
                     </span>
                     <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border border-input bg-background">
                       {postulation.relevant_skill_2}
                     </span>
                   </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Sample Questions</p>
                  <div className="space-y-1">
                    {postulation.questions?.slice(0, 2).map((question, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        • {question}
                      </p>
                    ))}
                    {postulation.questions && postulation.questions.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{postulation.questions.length - 2} more...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                                 <div className="text-xs text-muted-foreground">
                   Created {formatDate(postulation.createdAt)}
                 </div>
                <Link href={`/postulation/${postulation._id}`}>
                  <Button size="sm" variant="outline">
                    View Candidates
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPostulations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm || filterCompany ? 'No postulations match your search criteria.' : 'No postulations found.'}
          </div>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setFilterCompany('');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

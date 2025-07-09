'use client';
const api_url = 'http://localhost:4004/api/users/create-call';
const candidates_url = 'http://localhost:4004/api/users/candidates';
const postulations_url = 'http://localhost:4004/api/users/postulations';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockCandidates, type Candidate ,type Postulation} from "@/lib/mock-data";
import Image from "next/image";
import { Phone, Mail, Linkedin, MapPin, Calendar, Award,Ticket,Orbit, ChevronDown, ChevronUp } from "lucide-react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function PostulationPage() {
  const params = useParams();
  const postulationId = params.postulationId as string;
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [postulation, setPostulation] = useState<Postulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());

  const toggleCard = (candidateId: string) => {
    const newCollapsed = new Set(collapsedCards);
    if (newCollapsed.has(candidateId)) {
      newCollapsed.delete(candidateId);
    } else {
      newCollapsed.add(candidateId);
    }
    setCollapsedCards(newCollapsed);
  };

  const columns = [
    { key: 'screening', title: 'Screening', color: 'border-blue-500' },
    { key: 'screening_finished', title: 'Screening Finished', color: 'border-green-500' },
    { key: 'technical_interview', title: 'Technical Interview', color: 'border-yellow-500' },
    { key: 'technical_interview_finished', title: 'Technical Interview Finished', color: 'border-orange-500' },
    { key: 'final_meeting', title: 'Final Meeting', color: 'border-purple-500' }
  ];

  const getCandidatesByState = (state: string) => {
    return candidates.filter(candidate => candidate.current_state === state);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(candidates_url);
        const postulationsResponse = await axios.get(postulations_url);
        const postulation = postulationsResponse.data.postulations.find((item:Postulation) => item._id === postulationId)
        console.log({postulation,postulationsResponse, postulationId})
       setPostulation(postulation);
        // Filter candidates by postulation ID
        const filteredCandidates = response.data.candidates.filter((candidate: Candidate) => 
          candidate.postulation_id === postulationId
        );
        
        const candidates = filteredCandidates.map((candidate: Candidate,i: number) => {
          const postulation = postulationsResponse.data.postulations.find((postulation: Postulation) => postulation._id === candidate.postulation_id);
          return{
            ...mockCandidates[i % mockCandidates.length], // Use modulo to avoid index out of bounds
            ...candidate,
            ...postulation,
            questions: postulation?.questions || [],
          }       
         });
        console.log(candidates);
        setCandidates(candidates);
       
        setError(null);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to load candidates');
        // Fallback to mock data if API fails
        setCandidates(mockCandidates.filter(c => c.postulation_id === postulationId));
      } finally {
        setLoading(false);
      }
    };

    if (postulationId) {
      fetchCandidates();
    }
  }, [postulationId]);

  const handleScreening = async (candidate: Candidate) => {
    try {
      const response = await axios.post(api_url, {
        customer_name: candidate.customer_name,
        job_position: candidate.job_position,
        job_company: candidate.job_company,
        relevant_skill_1: candidate.relevant_skill_1,
        relevant_skill_2: candidate.relevant_skill_2,
        customer_phone: candidate.customer_phone
      });
      console.log('Screening initiated:', response.data);
    } catch (error) {
      console.error('Error initiating screening:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Candidates for Postulation {postulationId}</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading candidates...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Candidates for Postulation {postulationId}</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Candidates for Postulation {postulation?.job_position || postulationId}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {columns.map((column) => (
          <div key={column.key} className={`border-2 ${column.color} rounded-lg p-4 min-h-[600px] bg-transparent`}>
            <h2 className="text-lg font-semibold mb-4 text-primary">{column.title}</h2>
            <div className="space-y-4">
              {getCandidatesByState(column.key).map((candidate) => (
                <Card key={candidate.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleCard(candidate.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12">
                          <Image
                            src={candidate.avatar}
                            alt={candidate.customer_name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">{candidate.customer_name}</h3>
                          <p className="text-xs text-primary">{candidate.job_position}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {collapsedCards.has(candidate.id) ? (
                          <ChevronDown className="h-4 w-4 text-primary" />
                        ) : (
                          <ChevronUp className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>

                    {!collapsedCards.has(candidate.id) && (
                      <>
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center text-primary mb-2">
                            <Mail className="h-3 w-3 mr-1" />
                            <span className="text-xs">{candidate.email}</span>
                          </div>
                          <div className="flex items-center text-primary mb-2">
                            <Phone className="h-3 w-3 mr-1" />
                            <span className="text-xs">{candidate.customer_phone}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          {/* User Info */}
                          <div className="flex items-center text-primary">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{candidate.location}</span>
                          </div>
                          <div className="flex items-center text-primary">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Available: {candidate.availability}</span>
                          </div>
                          <div className="flex items-center text-primary">
                            <Linkedin className="h-3 w-3 mr-1" />
                            <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" 
                               className="text-primary hover:underline">
                              LinkedIn
                            </a>
                          </div>

                          {/* Postulation Info */}
                          <div className="border-t pt-2 mt-2">
                            <div className="flex items-center text-primary">
                              <Ticket className="h-3 w-3 mr-1" />
                              <span className="text-xs">{candidate.job_position}</span>
                            </div>
                            <div className="flex items-center text-primary">
                              <Orbit className="h-3 w-3 mr-1" />
                              <span className="text-xs">{candidate.job_company}</span>
                            </div>
                            <div className="flex items-center text-primary">
                              <Award className="h-3 w-3 mr-1" />
                              <span className="text-xs">
                                <strong className="text-orange-600">{candidate.relevant_skill_1}</strong>, 
                                <strong className="text-orange-600"> {candidate.relevant_skill_2}</strong>
                              </span>
                            </div>
                          </div>
                          
                          {candidate.questions && candidate.questions.length > 0 && (
                            <div className="flex items-start text-orange-600">
                              <Award className="h-3 w-3 mr-1 mt-0.5" />
                              <span className="text-xs">
                                <strong className="text-primary">Questions:</strong> <br/>
                                {candidate.questions.slice(0, 2).map((question: string, index: number) => (
                                  <span key={index} className="text-xs">• {question} <br/></span> 
                                ))}
                                {candidate.questions.length > 2 && (
                                  <span className="text-xs text-gray-500">+{candidate.questions.length - 2} more</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 pt-2 border-t">
                          <span className="text-xs text-primary">
                            {candidate.experience_years} years experience
                          </span>
                          <Button 
                            onClick={() => handleScreening(candidate)}
                            className="bg-primary hover:bg-primary/90 text-black text-xs w-full mt-2"
                            size="sm"
                          >
                            Execute Screening
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
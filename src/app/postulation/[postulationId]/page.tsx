'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockCandidates, type Candidate ,type Postulation} from "@/lib/mock-data";
import Image from "next/image";
import { Phone, Mail, Linkedin, MapPin, Calendar, Award,Ticket,Orbit, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { agenticallerApi } from "@/api";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';


export default function PostulationPage() {

const api_url = "/users/create-screening";
const candidates_url = "/users/candidates";
const postulations_url = "/users/postulations";

  const params = useParams();
  const postulationId = params.postulationId as string;
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [postulation, setPostulation] = useState<Postulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());
  const [interviewDates, setInterviewDates] = useState<Record<string, string>>({});

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
    { key: 'screening', title: 'Screening', color: 'border-cyan-400' ,callbackFunction: (candidate: Candidate)=> handleScreening(candidate), cta : 'Execute Screening'},
    { key: 'screening_finished', title: 'Screening Finished', color: 'border-emerald-400',disabled:true, cta : 'Screening in progress'},
    { key: 'technical_interview', title: 'Technical Interview', color: 'border-yellow-400',callbackFunction: (candidate: Candidate)=> handleTechnicalInterview(candidate), cta : 'Trigger interview' },
    { key: 'technical_interview_finished', title: 'Interview Done', color: 'border-orange-400',disabled:true, cta : 'Interview in progress' },
    { key: 'final_meeting', title: 'Final Meeting', color: 'border-pink-400', disabled:true, cta : 'Schedulded in your calendar'}
  ];

  const getCandidatesByState = (state: string) => {
    return candidates.filter(candidate => candidate.current_state === state);
  };

  const getTimeUntilInterview = (candidateId: string) => {
    const interviewDate = interviewDates[candidateId];
    if (!interviewDate) return null;
    
    const now = new Date();
    const interview = new Date(interviewDate);
    const diffMs = interview.getTime() - now.getTime();
    
    if (diffMs <= 0) return "Interview time has passed";
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m remaining`;
    } else {
      return `${diffMinutes}m remaining`;
    }
  };

  const handleTechnicalInterview = async (candidate: Candidate) => {
    console.log('Technical Interview initiated:', candidate);
    setLoading(true);
    await agenticallerApi.post(`/users/create-interview`, {
        candidate_id: candidate._id,
        postulation_id: postulationId,
    })
    setLoading(false);
  };

  useEffect(() => {
    const fetchCandidates = async (initial: boolean = false) => {
      try {
        if(initial){
            setLoading(true);
        }
        const response = await agenticallerApi.get(candidates_url);
        const postulationsResponse = await agenticallerApi.get(postulations_url);
        const postulation = postulationsResponse.data.postulations.find((item:Postulation) => item._id === postulationId)
       setPostulation(postulation);
        // Filter candidates by postulation ID
        const filteredCandidates = response.data.candidates.filter((candidate: Candidate) => 
          candidate.postulation_id === postulationId
        );
        
        const candidates = filteredCandidates.map((candidate: Candidate,i: number) => {
          const postulation = postulationsResponse.data.postulations.find((postulation: Postulation) => postulation._id === candidate.postulation_id);
          const mockCandidate = mockCandidates[i % mockCandidates.length];
          return{
            ...mockCandidate, // Use mock data as base
            ...postulation,
            ...candidate,
            avatar: candidate.avatar || mockCandidate.avatar, // Ensure avatar is preserved
            questions: postulation?.questions || [],
          }       
         });
        setCandidates(candidates);

        // Fetch interview dates for candidates in technical_interview status
        const technicalInterviewCandidates = candidates.filter((c: Candidate) => c.current_state === 'technical_interview');
        const interviewDatesData: Record<string, string> = {};
        
        for (const candidate of technicalInterviewCandidates) {
          try {
            const interviewResponse = await agenticallerApi.get(`/users/candidates/${candidate._id}/interviews`);
            if (interviewResponse.data.nextInterviewDate) {
              interviewDatesData[candidate._id] = interviewResponse.data.nextInterviewDate;
            }
          } catch (err) {
            console.error(`Error fetching interview date for candidate ${candidate._id}:`, err);
          }
        }
        
        setInterviewDates(interviewDatesData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to load candidates');
        // Fallback to mock data if API fails
      } finally {
        setLoading(false);
      }
    };

    if (postulationId) {
      // Initial fetch
      fetchCandidates(true);
      
      // Set up polling every 5 seconds
      const interval = setInterval(fetchCandidates, 5000);
      
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [postulationId]);

  const handleScreening = async (candidate: Candidate) => {
    try {
      setLoading(true);
      const response = await agenticallerApi.post(api_url, {
        candidate_email: candidate.candidate_email,
        candidate_phone: candidate.candidate_phone,
        candidate_name: candidate.candidate_name,
        job_position: candidate.job_position,
        job_company: candidate.job_company,
        relevant_skill_1: candidate.relevant_skill_1,
        postulation_id: postulationId,
        candidate_id: candidate._id,
        relevant_skill_2: candidate.relevant_skill_2,
        customer_phone: candidate.customer_phone
      });
      console.log('Screening initiated:', response.data);
    } catch (error) {
      console.error('Error initiating screening:', error);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Candidates for {postulation?.job_position || 'Postulation'}
          </h1>
          <p className="text-slate-600">Manage and track candidate progress through the hiring pipeline</p>
        </div>
        
        {/* Postulation Information */}
        {postulation && (
          <div className="mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-slate-800 flex items-center">
              <Ticket className="h-6 w-6 mr-3 text-blue-600" />
              Postulation Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center text-blue-700 mb-3">
                  <Ticket className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">Position</span>
                </div>
                <p className="text-lg font-semibold text-blue-900">{postulation.job_position}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center text-purple-700 mb-3">
                  <Orbit className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">Company</span>
                </div>
                <p className="text-lg font-semibold text-purple-900">{postulation.job_company}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center text-orange-700 mb-3">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">Skills Required</span>
                </div>
                <p className="text-lg font-semibold text-orange-900">
                  {postulation.relevant_skill_1 && (
                    <span>{postulation.relevant_skill_1}</span>
                  )}
                  {postulation.relevant_skill_1 && postulation.relevant_skill_2 && ", "}
                  {postulation.relevant_skill_2 && (
                    <span>{postulation.relevant_skill_2}</span>
                  )}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center text-green-700 mb-3">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">Questions</span>
                </div>
                <div className="text-sm text-green-900">
                  {postulation.questions && postulation.questions.length > 0 ? (
                    postulation.questions.map((question: string, index: number) => (
                      <p key={index} className="mb-1">• {question}</p>
                    ))
                  ) : (
                    <p className="text-green-600 italic">No questions specified</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {columns.map((column) => (
            <div key={column.key} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Column Header */}
              <div className={`p-6 border-b border-slate-200 bg-gradient-to-r ${column.color.replace('border-', 'from-').replace('-400', '-50')} to-white`}>
                <h2 className="text-lg font-semibold text-slate-800 flex items-center justify-between">
                  {column.title}
                  <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full">
                    {getCandidatesByState(column.key).length}
                  </span>
                </h2>
              </div>
              
              {/* Column Content */}
              <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                {getCandidatesByState(column.key).map((candidate) => (
                  <Card key={candidate.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border-slate-200 bg-gradient-to-br from-white to-slate-50">
                    <div className="p-4">
                      <div 
                        className="flex items-center justify-between cursor-pointer group"
                        onClick={() => toggleCard(candidate.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative h-12 w-12 ring-2 ring-slate-200">
                            <Image
                              src={candidate.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                              alt={candidate.customer_name || "Candidate"}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {candidate.candidate_name}
                            </h3>
                            <p className="text-xs text-slate-600">{candidate.job_position}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {collapsedCards.has(candidate.id) ? (
                            <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                          ) : (
                            <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                          )}
                        </div>
                      </div>

                      {!collapsedCards.has(candidate.id) && (
                        <>
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="space-y-3">
                              <div className="flex items-center text-slate-600">
                                <Mail className="h-3 w-3 mr-2 text-blue-500" />
                                <span className="text-xs">{candidate.candidate_email}</span>
                              </div>
                              <div className="flex items-center text-slate-600">
                                <Phone className="h-3 w-3 mr-2 text-green-500" />
                                <span className="text-xs">{candidate.candidate_phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs mt-4">
                            <div className="flex items-center text-slate-600">
                              <MapPin className="h-3 w-3 mr-2 text-red-500" />
                              <span>{candidate.location}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                              <Calendar className="h-3 w-3 mr-2 text-purple-500" />
                              <span>Available: {candidate.availability}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                              <Linkedin className="h-3 w-3 mr-2 text-blue-600" />
                              <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" 
                                 className="hover:text-blue-700 hover:underline transition-colors">
                                LinkedIn
                              </a>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                                {candidate.experience_years} years experience
                              </span>
                            </div>

                            {/* Show interview time for technical_interview candidates */}
                            {candidate.current_state === 'technical_interview' && (
                              <div className="mb-3">
                                <div className="flex items-center text-xs bg-orange-100 text-orange-700 px-3 py-2 rounded-lg border border-orange-200">
                                  <Calendar className="h-3 w-3 mr-2" />
                                  <span className="font-medium">
                                    {getTimeUntilInterview(candidate._id) || 'Loading interview time...'}
                                  </span>
                                </div>
                              </div>
                            )}

                            {column.cta && (
                              <Button 
                                disabled={column.disabled}
                                onClick={() => {
                                    column.callbackFunction && column.callbackFunction(candidate)
                                }}
                                className={`w-full text-xs font-medium transition-all duration-200 ${
                                  column.disabled 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg'
                                }`}
                                size="sm"
                              >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : column.cta}
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
                
                {getCandidatesByState(column.key).length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-sm">No candidates</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
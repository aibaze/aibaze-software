export interface Candidate {
  id: string;
  _id: string;
  customer_name: string;
  job_position: string;
  job_company: string;
  relevant_skill_1: string;
  relevant_skill_2: string;
  customer_phone: string;
  email: string;
  avatar: string;
  experience_years: number;
  location: string;
  availability: string;
  linkedin_url: string;
  postulation_id: string;
  questions?: string[];
  candidate_phone?: string;
  candidate_email?: string;
  candidate_name?: string;
  current_state?: 'screening' | 'screening_finished' | 'technical_interview' | 'technical_interview_finished' | 'final_meeting';
}

export interface Postulation {
  _id: string;
  job_position: string;
  job_company: string;
  questions: string[];
  relevant_skill_1?: string;
  relevant_skill_2?: string;
  createdAt: string;
  updatedAt: string;
}



export const mockCandidates = [
  {
    avatar: "https://i.pravatar.cc/150?img=2",
    experience_years: 12,
    location: "Dubai, UAE",
    availability: "2 weeks notice",
    linkedin_url: "https://linkedin.com/in/melina-viera",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=1",
    experience_years: 8,
    location: "Abu Dhabi, UAE",
    availability: "Immediate",
    linkedin_url: "https://linkedin.com/in/james-rodriguez",
  },
  {
    id: "3",
    customer_name: "Sarah Chen",
    job_position: "Regional Sales Director",
    job_company: "Amazon",
    relevant_skill_1: "Enterprise Sales",
    relevant_skill_2: "Strategic Planning",
    customer_phone: "+971509876543",
    email: "sarah.chen@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    experience_years: 10,
    location: "Dubai, UAE",
    availability: "1 month notice",
    linkedin_url: "https://linkedin.com/in/sarah-chen",
    postulation_id: "3"
  }
]; 
'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';

// Demo data remains the same as before
const jobsData = [
    {
      "id": 1,
      "title": "Frontend Developer",
      "company": "TechCorp Solutions",
      "location": "Remote",
      "salary": "$80,000 - $120,000",
      "type": "Full-time",
      "experience": "2-4 years",
      "accommodations": ["Flexible Hours", "Screen Reader Compatible", "Remote Work"],
      "disabilities": ["Visual Impairment", "Mobility"],
      "description": "We're looking for a frontend developer with strong React experience. Join our inclusive team building accessible web applications.",
      "requirements": [
        "Strong proficiency in React and Next.js",
        "Experience with accessibility standards",
        "Knowledge of modern CSS and responsive design"
      ],
      "benefits": [
        "Health insurance",
        "401(k) matching",
        "Learning budget"
      ],
      "posted": "2024-02-08",
      "department": "Engineering",
      "industry": "Technology"
    },
    {
      "id": 2,
      "title": "Data Analyst",
      "company": "DataWise Analytics",
      "location": "New York, NY",
      "salary": "$70,000 - $90,000",
      "type": "Hybrid",
      "experience": "1-3 years",
      "accommodations": ["Wheelchair Accessible", "Flexible Hours", "Ergonomic Equipment"],
      "disabilities": ["Mobility", "Hearing Impairment"],
      "description": "Join our data team to analyze and visualize complex datasets. We value diverse perspectives in data interpretation.",
      "requirements": [
        "SQL proficiency",
        "Experience with data visualization tools",
        "Statistical analysis skills"
      ],
      "benefits": [
        "Comprehensive healthcare",
        "Transportation allowance",
        "Gym membership"
      ],
      "posted": "2024-02-07",
      "department": "Analytics",
      "industry": "Business Intelligence"
    },
    {
      "id": 3,
      "title": "UX Designer",
      "company": "Creative Labs",
      "location": "San Francisco, CA",
      "salary": "$90,000 - $130,000",
      "type": "On-site",
      "experience": "3-5 years",
      "accommodations": ["ASL Interpreter", "Ergonomic Equipment", "Flexible Schedule"],
      "disabilities": ["Hearing Impairment", "Mobility"],
      "description": "Design beautiful and accessible user experiences for our diverse user base.",
      "requirements": [
        "Portfolio of accessible design work",
        "Experience with user research",
        "Proficiency in Figma"
      ],
      "benefits": [
        "Unlimited PTO",
        "Health and dental",
        "Stock options"
      ],
      "posted": "2024-02-09",
      "department": "Design",
      "industry": "Technology"
    },
    {
      "id": 4,
      "title": "Project Manager",
      "company": "Global Innovations Inc",
      "location": "Chicago, IL",
      "salary": "$85,000 - $110,000",
      "type": "Full-time",
      "experience": "4-6 years",
      "accommodations": ["Voice Recognition Software", "Flexible Hours", "Remote Options"],
      "disabilities": ["Mobility", "Speech"],
      "description": "Lead diverse teams in delivering cutting-edge technology projects.",
      "requirements": [
        "PMP Certification",
        "Agile methodology experience",
        "Strong communication skills"
      ],
      "benefits": [
        "Life insurance",
        "Professional development",
        "Parental leave"
      ],
      "posted": "2024-02-06",
      "department": "Operations",
      "industry": "Technology"
    },
    {
      "id": 5,
      "title": "Content Writer",
      "company": "Digital Media Pro",
      "location": "Remote",
      "salary": "$55,000 - $75,000",
      "type": "Full-time",
      "experience": "1-3 years",
      "accommodations": ["Screen Reader Compatible", "Voice Recognition", "Flexible Schedule"],
      "disabilities": ["Visual Impairment", "Mobility", "Speech"],
      "description": "Create engaging content for our digital platforms with a focus on accessibility.",
      "requirements": [
        "Strong writing skills",
        "SEO knowledge",
        "Content management experience"
      ],
      "benefits": [
        "Healthcare",
        "Remote work stipend",
        "Wellness programs"
      ],
      "posted": "2024-02-05",
      "department": "Marketing",
      "industry": "Media"
    },
    {
      "id": 6,
      "title": "Software Engineer",
      "company": "Innovative Systems",
      "location": "Austin, TX",
      "salary": "$95,000 - $140,000",
      "type": "Hybrid",
      "experience": "3-5 years",
      "accommodations": ["Screen Magnification", "Flexible Hours", "Remote Options"],
      "disabilities": ["Visual Impairment", "Mobility"],
      "description": "Build scalable backend systems with a focus on accessibility and inclusion.",
      "requirements": [
        "Java/Python expertise",
        "AWS experience",
        "Microservices architecture"
      ],
      "benefits": [
        "Full healthcare",
        "Stock options",
        "Education allowance"
      ],
      "posted": "2024-02-04",
      "department": "Engineering",
      "industry": "Technology"
    },
    {
      "id": 7,
      "title": "HR Specialist",
      "company": "People First Corp",
      "location": "Boston, MA",
      "salary": "$60,000 - $80,000",
      "type": "Full-time",
      "experience": "2-4 years",
      "accommodations": ["Sign Language Support", "Flexible Schedule", "Accessible Office"],
      "disabilities": ["Hearing Impairment", "Mobility"],
      "description": "Join our HR team to foster an inclusive and accessible workplace.",
      "requirements": [
        "HR certification",
        "DEI experience",
        "Employee relations"
      ],
      "benefits": [
        "Health benefits",
        "401(k)",
        "Professional development"
      ],
      "posted": "2024-02-03",
      "department": "Human Resources",
      "industry": "Corporate Services"
    },
    {
      "id": 8,
      "title": "Marketing Manager",
      "company": "Brand Builders",
      "location": "Miami, FL",
      "salary": "$75,000 - $95,000",
      "type": "Hybrid",
      "experience": "4-6 years",
      "accommodations": ["Flexible Hours", "Remote Options", "Assistive Technology"],
      "disabilities": ["Mobility", "Visual Impairment"],
      "description": "Lead inclusive marketing campaigns that resonate with diverse audiences.",
      "requirements": [
        "Digital marketing experience",
        "Team management",
        "Campaign planning"
      ],
      "benefits": [
        "Medical and dental",
        "Paid time off",
        "Bonuses"
      ],
      "posted": "2024-02-02",
      "department": "Marketing",
      "industry": "Advertising"
    },
    {
      "id": 9,
      "title": "Customer Support Specialist",
      "company": "ServiceHub",
      "location": "Remote",
      "salary": "$45,000 - $60,000",
      "type": "Full-time",
      "experience": "0-2 years",
      "accommodations": ["Screen Reader", "Flexible Schedule", "Remote Work"],
      "disabilities": ["Visual Impairment", "Mobility", "Hearing Impairment"],
      "description": "Provide excellent customer support through various accessible communication channels.",
      "requirements": [
        "Customer service experience",
        "Communication skills",
        "Problem-solving ability"
      ],
      "benefits": [
        "Health insurance",
        "Wellness program",
        "Training opportunities"
      ],
      "posted": "2024-02-01",
      "department": "Customer Service",
      "industry": "Technology"
    },
    {
      "id": 10,
      "title": "Financial Analyst",
      "company": "Global Finance Group",
      "location": "Denver, CO",
      "salary": "$70,000 - $90,000",
      "type": "On-site",
      "experience": "2-4 years",
      "accommodations": ["Ergonomic Equipment", "Flexible Hours", "Accessible Office"],
      "disabilities": ["Mobility", "Visual Impairment"],
      "description": "Analyze financial data and prepare reports for strategic decision-making.",
      "requirements": [
        "Financial modeling",
        "Excel expertise",
        "Business analysis"
      ],
      "benefits": [
        "401(k) matching",
        "Health benefits",
        "Performance bonuses"
      ],
      "posted": "2024-01-31",
      "department": "Finance",
      "industry": "Financial Services"
    }
  ]

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisabilities, setSelectedDisabilities] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const allDisabilities = [...new Set(jobsData.flatMap(job => job.disabilities))];
  const jobTypes = [...new Set(jobsData.map(job => job.type))];

  const handleApply = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    toast.success('Application Submitted!', {
      description: 'Your application has been successfully submitted. Good luck! 🚀',
    });
  };

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDisabilities = selectedDisabilities.length === 0 ||
                               selectedDisabilities.some(d => job.disabilities.includes(d));
    
    const matchesType = !selectedType || job.type === selectedType;

    return matchesSearch && matchesDisabilities && matchesType;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Find Your Next Opportunity
        </h1>
        <p className="text-gray-600 mb-6">Discover inclusive opportunities that match your skills</p>
        
        {/* Search and Filters */}
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
            <Input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allDisabilities.map(disability => (
              <Button
                key={disability}
                variant={selectedDisabilities.includes(disability) ? "default" : "outline"}
                size="sm"
                className={`
                  ${selectedDisabilities.includes(disability)
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                    : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}
                `}
                onClick={() => {
                  setSelectedDisabilities(prev =>
                    prev.includes(disability)
                      ? prev.filter(d => d !== disability)
                      : [...prev, disability]
                  );
                }}
              >
                {disability}
              </Button>
            ))}
            
            {jobTypes.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                className={`
                  ${selectedType === type
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                    : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}
                `}
                onClick={() => setSelectedType(prev => prev === type ? "" : type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Job Listings */}
      <AnimatePresence mode="popLayout">
        {filteredJobs.map(job => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            layout
            className="mb-4"
          >
            <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">{job.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-indigo-500" />
                      <span className="text-indigo-600">{job.company}</span>
                      <span className="text-gray-400">•</span>
                      <MapPin className="h-4 w-4 text-indigo-500" />
                      <span className="text-indigo-600">{job.location}</span>
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.accommodations.map(accommodation => (
                    <Badge 
                      key={accommodation} 
                      variant="outline"
                      className="border-purple-200 text-purple-600 bg-purple-50"
                    >
                      {accommodation}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">{job.salary}</span>
                  </span>
                  <Button
                    disabled={appliedJobs.has(job.id)}
                    onClick={() => handleApply(job.id)}
                    className={`
                      ${!appliedJobs.has(job.id)
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                        : 'bg-gray-300'}
                      text-white transition-all
                    `}
                  >
                    {appliedJobs.has(job.id) ? 'Applied ✓' : 'Apply Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-lg"
        >
          No jobs found matching your criteria
        </motion.div>
      )}
    </div>
  );
};

export default JobListings;
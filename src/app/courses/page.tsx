'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Calendar, Users, Award, BookOpen, Laptop, Globe, Clock, CheckCircle, ArrowRight, Download, ClipboardCheck, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'

const courses = [
  {
    id: 'ngs-analysis',
    category: 'Genomics',
    title: 'NGS Data Analysis Pipeline',
    description: 'End-to-end next-generation sequencing analysis from raw reads to variant interpretation.',
    level: 'Intermediate',
    duration: '8 weeks',
    format: 'Hybrid',
    cohort: 'Monthly',
    price: 'PKR 45,000',
    topics: ['Quality Control (FastQC)', 'Read Alignment (BWA)', 'Variant Calling (GATK)', 'Annotation (VEP/ANNOVAR)', 'CNV & SV Detection'],
    prerequisites: ['Basic Linux', 'Python/R basics', 'Molecular biology'],
    outcomes: ['Complete analysis pipeline', 'GitHub portfolio', 'Certification', 'Research publication prep'],
    instructor: 'Dr. Haseeb Raza',
    nextBatch: 'Jan 15, 2025',
    seats: 25,
    popular: true,
  },
  {
    id: 'multiomics',
    category: 'Genomics',
    title: 'Advanced Multiomics Integration',
    description: 'Integrative analysis of genomics, transcriptomics, metagenomics, and epigenomics data.',
    level: 'Advanced',
    duration: '12 weeks',
    format: 'Online',
    cohort: 'Quarterly',
    price: 'PKR 75,000',
    topics: ['Multiomics Experimental Design', 'Data Integration Methods', 'Pathway Analysis', 'Network Biology', 'Machine Learning Integration'],
    prerequisites: ['NGS Analysis course', 'Statistics', 'R/Python proficiency'],
    outcomes: ['Multiomics publication', 'Advanced portfolio', 'Industry connections', 'PhD prep'],
    instructor: 'Kaneez Rubab',
    nextBatch: 'Feb 1, 2025',
    seats: 15,
    popular: false,
  },
  {
    id: 'rna-seq',
    category: 'Transcriptomics',
    title: 'RNA-seq & Differential Expression',
    description: 'Complete RNA-seq workflow from experimental design to biological interpretation.',
    level: 'Beginner',
    duration: '6 weeks',
    format: 'Hybrid',
    cohort: 'Monthly',
    price: 'PKR 35,000',
    topics: ['RNA-seq Library Prep', 'Alignment (STAR/Salmon)', 'DESeq2/edgeR', 'Functional Enrichment', 'Visualization'],
    prerequisites: ['Basic biology', 'R fundamentals'],
    outcomes: ['DE analysis pipeline', 'Publication figures', 'Certification', 'Internship eligibility'],
    instructor: 'Dr. Haseeb Raza',
    nextBatch: 'Jan 20, 2025',
    seats: 30,
    popular: true,
  },
  {
    id: 'scrnaseq',
    category: 'Transcriptomics',
    title: 'Single-Cell RNA-seq Analysis',
    description: 'Cutting-edge scRNA-seq analysis using Seurat, Scanpy, and trajectory inference.',
    level: 'Advanced',
    duration: '8 weeks',
    format: 'Online',
    cohort: 'Bi-monthly',
    price: 'PKR 55,000',
    topics: ['scRNA-seq QC', 'Clustering & Annotation', 'Trajectory (Monocle/Slingshot)', 'Cell-cell Communication', 'Multi-modal Integration'],
    prerequisites: ['RNA-seq course', 'R/Python advanced', 'Statistics'],
    outcomes: ['scRNA-seq publication', 'Atlas contribution', 'Advanced certification', 'Collaborator network'],
    instructor: 'Kaneez Rubab',
    nextBatch: 'Mar 1, 2025',
    seats: 20,
    popular: false,
  },
  {
    id: 'metagenomics',
    category: 'Metagenomics',
    title: 'Metagenomics & Microbiome Analysis',
    description: 'From 16S amplicon to shotgun metagenomics - complete microbiome profiling.',
    level: 'Intermediate',
    duration: '8 weeks',
    format: 'Hybrid',
    cohort: 'Quarterly',
    price: 'PKR 50,000',
    topics: ['16S/ITS Analysis (QIIME2)', 'Shotgun Assembly (MEGAHIT)', 'Binning (MetaBAT)', 'Functional Annotation', 'Resistome/Virulome'],
    prerequisites: ['NGS basics', 'Linux command line', 'Microbial ecology'],
    outcomes: ['Microbiome pipeline', 'AMR surveillance skills', 'Certification', 'Clinical collab prep'],
    instructor: 'Dr. Haseeb Raza',
    nextBatch: 'Apr 1, 2025',
    seats: 20,
    popular: true,
  },
  {
    id: 'ribosome-profiling',
    category: 'Transcriptomics',
    title: 'Ribosome Profiling (Ribo-seq)',
    description: 'Translation-level analysis: ribosome occupancy, codon usage, and translational control.',
    level: 'Advanced',
    duration: '6 weeks',
    format: 'Online',
    cohort: 'Bi-annually',
    price: 'PKR 45,000',
    topics: ['Ribo-seq Library Prep', 'ORF Discovery (RiboTaper)', 'Translation Efficiency', 'uORF Analysis', 'Codon Optimality'],
    prerequisites: ['RNA-seq advanced', 'Genomics background', 'Linux/HPC'],
    outcomes: ['Translation publication', 'Niche expertise', 'Certification', 'Research collabs'],
    instructor: 'Kaneez Rubab',
    nextBatch: 'Jun 1, 2025',
    seats: 12,
    popular: false,
  },
  {
    id: 'cadd',
    category: 'Drug Design',
    title: 'Computer-Aided Drug Design (CADD)',
    description: 'Structure-based and ligand-based drug design with molecular dynamics simulations.',
    level: 'Intermediate',
    duration: '10 weeks',
    format: 'Hybrid',
    cohort: 'Quarterly',
    price: 'PKR 60,000',
    topics: ['Molecular Docking (AutoDock/Vina)', 'MD Simulations (GROMACS)', 'Free Energy Calculations', 'Pharmacophore Modeling', 'ADMET Prediction'],
    prerequisites: ['Structural biology', 'Linux/HPC', 'Python scripting'],
    outcomes: ['Drug discovery pipeline', 'Simulation portfolio', 'Certification', 'Pharma industry prep'],
    instructor: 'Dr. Haseeb Raza',
    nextBatch: 'Feb 15, 2025',
    seats: 18,
    popular: true,
  },
  {
    id: 'cheminformatics',
    category: 'Drug Design',
    title: 'Cheminformatics & ML for Drug Discovery',
    description: 'Chemical space exploration, molecular generation, and property prediction with ML.',
    level: 'Advanced',
    duration: '8 weeks',
    format: 'Online',
    cohort: 'Quarterly',
    price: 'PKR 55,000',
    topics: ['RDKit & Descriptors', 'Molecular Fingerprints', 'Generative Models', 'Graph Neural Networks', 'De Novo Design'],
    prerequisites: ['CADD course', 'Python/ML', 'Chemistry background'],
    outcomes: ['ML molecule generator', 'Publication-ready', 'Certification', 'Startup/Pharma ready'],
    instructor: 'Kaneez Rubab',
    nextBatch: 'May 1, 2025',
    seats: 15,
    popular: false,
  },
  {
    id: 'ml-diagnostics',
    category: 'AI/ML',
    title: 'ML for Medical Diagnostics',
    description: 'Build and deploy diagnostic ML models for pathogen ID, disease prediction, and imaging.',
    level: 'Intermediate',
    duration: '10 weeks',
    format: 'Hybrid',
    cohort: 'Quarterly',
    price: 'PKR 65,000',
    topics: ['Medical Data Handling', 'CNNs for Imaging', 'Tabular ML (XGBoost)', 'Model Explainability', 'Clinical Deployment'],
    prerequisites: ['Python/ML basics', 'Statistics', 'Healthcare domain knowledge'],
    outcomes: ['Diagnostic model', 'FDA/regulatory awareness', 'Certification', 'Healthcare AI portfolio'],
    instructor: 'Dr. Haseeb Raza',
    nextBatch: 'Mar 15, 2025',
    seats: 20,
    popular: true,
  },
  {
    id: 'generative-ai',
    category: 'AI/ML',
    title: 'Generative AI & LLMs for Research',
    description: 'Prompt engineering, RAG, fine-tuning, and agent frameworks for scientific workflows.',
    level: 'Beginner',
    duration: '6 weeks',
    format: 'Online',
    cohort: 'Monthly',
    price: 'PKR 40,000',
    topics: ['Prompt Engineering', 'RAG with LangChain', 'LoRA Fine-tuning', 'Agent Systems', 'Multimodal Models'],
    prerequisites: ['Python basics', 'API usage', 'Research workflow'],
    outcomes: ['Custom research agents', 'Automation portfolio', 'Certification', 'Productivity boost'],
    instructor: 'Dr. Haseeb Raza',
    nextBatch: 'Jan 10, 2025',
    seats: 30,
    popular: true,
  },
  {
    id: 'ml-fundamentals',
    category: 'AI/ML',
    title: 'ML Fundamentals for Biologists',
    description: 'Core ML concepts tailored for life scientists - from preprocessing to deployment.',
    level: 'Beginner',
    duration: '8 weeks',
    format: 'Hybrid',
    cohort: 'Monthly',
    price: 'PKR 35,000',
    topics: ['Supervised/Unsupervised', 'Feature Engineering', 'Cross-Validation', 'Hyperparameter Tuning', 'Deployment (Streamlit/FastAPI)'],
    prerequisites: ['Basic Python', 'High school math', 'Biology background'],
    outcomes: ['ML project portfolio', 'Kaggle-ready', 'Certification', 'Advanced track prep'],
    instructor: 'Kaneez Rubab',
    nextBatch: 'Jan 25, 2025',
    seats: 25,
    popular: false,
  },
  {
    id: 'internship',
    category: 'Internship',
    title: 'Microinformatics Internship Program',
    description: 'Flagship 6-month research internship with publication-driven cohorts and mentorship.',
    level: 'All Levels',
    duration: '6 months',
    format: 'Hybrid',
    cohort: 'Bi-annually',
    price: 'PKR 120,000',
    topics: ['Research Project Design', 'Literature Review', 'Data Analysis', 'Manuscript Writing', 'Conference Presentation'],
    prerequisites: ['Any background', 'Passion for research', 'Commitment'],
    outcomes: ['PubMed publication', 'Thesis support', 'Alumni network', 'Career guidance', 'Recommendation letters'],
    instructor: 'Dr. Haseeb Raza & Kaneez Rubab',
    nextBatch: 'Feb 1, 2025',
    seats: 30,
    popular: true,
  },
]

const categories = ['All', 'Genomics', 'Transcriptomics', 'Metagenomics', 'Drug Design', 'AI/ML', 'Internship']

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const stats = [
    { label: 'Total Courses', value: courses.length },
    { label: 'Active Students', value: '100+' },
    { label: 'Publications', value: '15+' },
    { label: 'Completion Rate', value: '94%' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="gradient">
              <BookOpen className="h-3 w-3 mr-1" />
              Training Programs
            </Badge>
            <Badge variant="success">Hybrid Learning</Badge>
            <Badge variant="info">Certification Included</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Explore Our <span className="gradient-text">Courses & Programs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            From beginner-friendly fundamentals to advanced research internships. 
            Choose your path in computational biology, AI/ML, or drug discovery.
          </motion.p>
        </div>
      </section>

      <section className="py-8 lg:py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-4"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 lg:sticky lg:top-24 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-gradient-to-r text-white'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500/50'
                      }`}
                      style={{
                        background: activeCategory === cat 
                          ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' 
                          : undefined
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
              >
                <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Why Our Courses?
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Publication-driven</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Live mentorship</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Real datasets</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Industry tools</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Lifetime access</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Career support</li>
                </ul>
              </motion.div>
            </aside>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="lg:hidden"
                  />
                </div>
                <div className="flex flex-wrap gap-2 lg:hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {filteredCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Card variant="elevated" hover className="overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/3 relative bg-gradient-to-br p-6" style={{ background: `linear-gradient(135deg, ${course.popular ? '#8b5cf6' : '#059669'}, ${course.popular ? '#ec4899' : '#0d9488'})` }}>
                          <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <Badge variant={course.popular ? 'warning' : 'success'} className="text-xs">
                                  {course.category}
                                </Badge>
                                {course.popular && (
                                  <Badge variant="warning" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                              <p className="text-purple-100 dark:text-purple-200 text-sm mb-6 line-clamp-2">{course.description}</p>
                            </div>
                            <div className="space-y-3 text-sm text-purple-100 dark:text-purple-200">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> {course.duration}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" /> {course.seats} seats
                              </div>
                              <div className="flex items-center gap-2">
                                <Laptop className="h-4 w-4" /> {course.format}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" /> Next: {course.nextBatch}
                              </div>
                              <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                                <span className="text-2xl font-bold text-white">{course.price}</span>
                              </div>
                            </div>
                          </div>
                          {course.popular && (
                            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 blur-xl" />
                          )}
                        </div>
                        
                        <div className="lg:w-2/3 p-6 flex flex-col">
                          <div className="flex-1">
                            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                                  <BookOpen className="h-3.5 w-3.5" /> Level
                                </div>
                                <div className="font-medium text-slate-900 dark:text-white">{course.level}</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <div className="flex items-center gap-1.5 text-slate-500 dark:text:slate-400 mb-1">
                                  <Users className="h-3.5 w-3.5" /> Instructor
                                </div>
                                <div className="font-medium text-slate-900 dark:text-white text-xs">{course.instructor}</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                                  <Award className="h-3.5 w-3.5" /> Certificate
                                </div>
                                <div className="font-medium text-emerald-600 dark:text-emerald-400">Included</div>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h5 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-purple-500" /> What You'll Learn
                                </h5>
                                <ul className="space-y-1.5">
                                  {course.topics.map((topic) => (
                                    <li key={topic} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                  <Award className="h-4 w-4 text-purple-500" /> Outcomes
                                </h5>
                                <ul className="space-y-1.5">
                                  {course.outcomes.map((outcome) => (
                                    <li key={outcome} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                                      {outcome}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h5 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                  <ClipboardCheck className="h-4 w-4 text-purple-500" /> Prerequisites
                                </h5>
                                <ul className="space-y-1.5">
                                  {course.prerequisites.map((prereq) => (
                                    <li key={prereq} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                      {prereq}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <Button variant="gradient" size="lg" asChild className="flex-1 sm:flex-none">
                              <a href="/contact?course={course.id}">Apply Now <ArrowRight className="h-4 w-4 ml-2" /></a>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="flex-1 sm:flex-none">
                              <a href="/courses/{course.id}/syllabus">View Syllabus <Download className="h-4 w-4 ml-2" /></a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <Search className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No courses found</h3>
                  <p className="text-slate-600 dark:text-slate-300">Try adjusting your filters or search terms</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="gradient" className="mb-4 mx-auto" style={{ background: 'linear-gradient(135deg, #ffffff20, #ffffff10)' }}>
              Ready to Start Learning?
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Join Our Next <span className="text-emerald-200">Cohort</span>
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Limited seats available. Apply now to secure your spot in our publication-driven programs 
              with expert mentorship and real research projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" variant="secondary" asChild className="w-full sm:w-auto bg-white text-emerald-600 hover:bg-emerald-50">
                <a href="/contact">Apply Now</a>
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="xl" variant="outline" asChild className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                <a href="/contact">Schedule a Call</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
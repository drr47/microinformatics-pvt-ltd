'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Brain, FlaskConical, Box, Network, Zap, Target, Globe, Users, Award, Lightbulb, Rocket } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { NeuralNetwork } from '@/components/visualizations/NeuralNetwork'

const focusAreas = [
  {
    id: 'medical-ai',
    title: 'Medical AI Research',
    description: 'Developing localized AI models for healthcare diagnostics, disease prediction, and clinical decision support.',
    icon: Brain,
    color: 'from-emerald-500 to-teal-500',
    projects: ['Pathogen ID from Genomics', 'Cancer Risk Prediction', 'Radiology AI Assistants', 'AMR Surveillance'],
    status: 'Active',
  },
  {
    id: 'drug-discovery',
    title: 'Drug Discovery & Simulations',
    description: 'AI-powered molecular modeling, docking simulations, and generative chemistry for novel therapeutics.',
    icon: FlaskConical,
    color: 'from-blue-500 to-cyan-500',
    projects: ['Protein-Ligand Binding', 'De Novo Drug Design', 'ADMET Prediction', 'Repurposing Screening'],
    status: 'Active',
  },
  {
    id: 'structural-biology',
    title: 'Structural Biology Modeling',
    description: 'AI-driven protein structure prediction, folding dynamics, and molecular interaction analysis.',
    icon: Box,
    color: 'from-purple-500 to-pink-500',
    projects: ['AlphaFold Integration', 'Protein-Protein Docking', 'Cryo-EM Analysis', 'Conformational Dynamics'],
    status: 'Building',
  },
  {
    id: 'hardware-rnd',
    title: 'AI Diagnostic Hardware',
    description: 'Developing portable AI-driven diagnostic devices for rapid pathogen detection and point-of-care testing.',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    projects: ['Biosensor Integration', 'Edge AI Deployment', 'Microfluidics Design', 'Clinical Validation'],
    status: 'R&D Phase',
  },
]

const collaborations = [
  { name: 'NIH / NCBI', type: 'Data & Compute', desc: 'Genomic data access and cloud computing credits', logo: 'NIH' },
  { name: 'AKU Hospital', type: 'Clinical Partner', desc: 'Patient data, clinical validation, trial sites', logo: 'AKU' },
  { name: 'FAST University', type: 'Academic', desc: 'Joint research, student exchange, faculty collab', logo: 'FAST' },
  { name: 'NUST', type: 'Academic', desc: 'AI research, hardware lab access, PhD pipeline', logo: 'NUST' },
  { name: 'Punjab Govt Health', type: 'Government', desc: 'Public health data, deployment channels, policy', logo: 'GOV' },
  { name: 'Tech Startups', type: 'Industry', desc: 'Co-development, commercialization, funding', logo: 'TECH' },
]

const projects = [
  {
    title: 'AMR Pathogen Classifier',
    description: 'Deep learning model identifying antimicrobial resistance from whole-genome sequences with 94% accuracy. Deployed for surveillance in partner hospitals.',
    tags: ['Genomics', 'CNN', 'Production', 'Healthcare'],
    progress: 95,
    status: 'Deployed',
    lead: 'Haseeb Raza',
  },
  {
    title: 'Protein Structure Predictor',
    description: 'Fine-tuned AlphaFold pipeline for local pathogens and novel protein families. Integrated with docking for drug discovery.',
    tags: ['Structural Bio', 'Transformers', 'Research', 'Open Source'],
    progress: 70,
    status: 'Beta',
    lead: 'Kaneez Rubab',
  },
  {
    title: 'Medical Report Generator',
    description: 'Fine-tuned LLM (Llama-3-70B) for automated radiology report generation from chest X-rays. Clinical validation ongoing.',
    tags: ['LLM', 'LoRA', 'Medical NLP', 'Clinical'],
    progress: 60,
    status: 'In Progress',
    lead: 'AI Team',
  },
  {
    title: 'Diagnostic Biosensor AI',
    description: 'Edge AI model for portable diagnostic device. Real-time pathogen detection from blood/saliva samples. Hardware integration in progress.',
    tags: ['Edge AI', 'Hardware', 'Biosensors', 'R&D'],
    progress: 40,
    status: 'R&D',
    lead: 'Hardware Team',
  },
  {
    title: 'Single-Cell Atlas Builder',
    description: 'AI-powered cell type annotation and atlas construction for scRNA-seq data across Pakistani population cohorts.',
    tags: ['scRNA-seq', 'Transformers', 'Population', 'Publication'],
    progress: 80,
    status: 'Writing',
    lead: 'Kaneez Rubab',
  },
  {
    title: 'Drug-Target GNN',
    description: 'Graph neural network for predicting drug-target interactions. Screening compound libraries for neglected tropical diseases.',
    tags: ['GNN', 'Drug Discovery', 'PyG', 'Collaboration'],
    progress: 55,
    status: 'In Progress',
    lead: 'Collaborators',
  },
]

const programs = [
  {
    title: 'AI Research Fellowship',
    duration: '6-12 months',
    description: 'Full-time research positions working on center projects with publication targets and mentorship.',
    benefits: ['Stipend', 'Compute Access', 'Publication Support', 'Conference Travel'],
    eligibility: 'MS/PhD in CS, Biology, or related',
  },
  {
    title: 'Visiting Researcher Program',
    duration: '1-3 months',
    description: 'Short-term collaborations for external researchers to access our compute, data, and expertise.',
    benefits: ['Lab Access', 'Data Sharing', 'Co-authorship', 'Networking'],
    eligibility: 'Faculty/Researchers from partner institutes',
  },
  {
    title: 'Student Research Internship',
    duration: '3-6 months',
    description: 'Hands-on AI/ML projects for undergraduate and graduate students with real healthcare impact.',
    benefits: ['Mentorship', 'Project Ownership', 'Certification', 'Career Guidance'],
    eligibility: 'BS/MS Students in relevant fields',
  },
  {
    title: 'Industry Innovation Sprint',
    duration: '8-12 weeks',
    description: 'Collaborative problem-solving with industry partners on specific AI/healthcare challenges.',
    benefits: ['IP Rights', 'Pilot Deployment', 'Funding Access', 'Scale Support'],
    eligibility: 'Healthcare/Pharma/Biotech companies',
  },
]

export default function AICenterPage() {
  const [activeTab, setActiveTab] = useState<'focus' | 'projects' | 'collaborations' | 'programs'>('focus')

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="gradient">
              <Brain className="h-3 w-3 mr-1" />
              Est. September 2026
            </Badge>
            <Badge variant="success">Flagship Division</Badge>
            <Badge variant="info">Faisalabad, Pakistan</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Pakistan AI Center <br />
            <span className="gradient-text">of Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            A national hub for medical AI research, industrial collaboration, and technology transfer. 
            Building localized AI solutions for healthcare challenges in Pakistan and beyond.
          </motion.p>
        </div>
      </section>

      <section className="py-8 lg:py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Research Areas', value: '4', icon: Brain },
              { label: 'Active Projects', value: '6+', icon: FlaskConical },
              { label: 'Collaborations', value: '6', icon: Network },
              { label: 'Researchers', value: '15+', icon: Users },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-4"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="focus" className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-48 lg:sticky lg:top-24 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                  Focus Areas
                </h3>
                {focusAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setActiveTab('focus')}
                    className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === 'focus' ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full mb-1" style={{ background: `linear-gradient(135deg, ${area.color.split(' to ')[0]}, ${area.color.split(' to ')[1]})` }} />
                    {area.title}
                  </button>
                ))}
              </motion.div>
            </aside>

            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {focusAreas.map((area, i) => (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="mb-8"
                  >
                    <div className="flex items-start gap-6 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${area.color.split(' to ')[0]}, ${area.color.split(' to ')[1]})` }}>
                        <area.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{area.title}</h3>
                          <Badge variant={area.status === 'Active' ? 'success' : area.status === 'Building' ? 'info' : 'warning'}>{area.status}</Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{area.description}</p>
                      </div>
                    </div>
                    <div className="ml-20 flex flex-wrap gap-2">
                      {area.projects.map((project) => (
                        <Badge key={project} variant="outline" className="text-sm">{project}</Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-4">Active Projects</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Flagship <span className="gradient-text">Research Projects</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Production-ready and research-grade AI models solving real healthcare problems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" hover className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h4>
                        <Badge variant={project.status === 'Deployed' ? 'success' : project.status === 'Beta' ? 'info' : project.status === 'R&D' ? 'warning' : 'default'} className="mt-1 text-xs">
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-500 dark:text-slate-400">Progress</span>
                        <span className="font-medium text-slate-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, #059669, #0d9488)` }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Lead: {project.lead}</span>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="collaborations" className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-4">Partnerships</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Strategic <span className="gradient-text">Collaborations</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Partnering with leading institutions to accelerate medical AI innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborations.map((collab, i) => (
              <motion.div
                key={collab.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="outlined" hover className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white font-bold" style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
                    {collab.logo}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{collab.name}</h4>
                  <Badge variant="outline" className="text-xs mb-3">{collab.type}</Badge>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{collab.desc}</p>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#">View Partnership</a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-4">Join Us</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Research <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Multiple pathways to engage with the center's research and innovation ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" hover className="p-6 h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                    <Rocket className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{program.title}</h4>
                  <Badge variant="outline" className="text-xs mb-3">{program.duration}</Badge>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1">{program.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h5 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Benefits</h5>
                    <ul className="space-y-1">
                      {program.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Eligibility: {program.eligibility}</p>
                  </div>
                  
                  <Button variant="outline" className="mt-4 w-full" asChild>
                    <a href="/contact">Apply</a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Badge variant="gradient" className="mb-4" style={{ background: 'linear-gradient(135deg, #ffffff20, #ffffff10)' }}>
                  Live Demo
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Real-time Neural Network
                </h2>
                <p className="text-emerald-100 mb-6">
                  Watch our medical AI models in action - live forward propagation visualization
                  of the diagnostic classifiers running in our center.
                </p>
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto bg-white text-emerald-600 hover:bg-emerald-50">
                  <a href="/ai-ml">Explore AI/ML Page</a>
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20"
            >
              <div className="aspect-video relative p-4">
                <NeuralNetwork />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useState } from 'react'
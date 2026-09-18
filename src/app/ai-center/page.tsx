'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Brain, FlaskConical, Box, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const stats = [
  { value: '4', label: 'Research Areas' },
  { value: '6+', label: 'Active Projects' },
  { value: '6', label: 'Collaborations' },
  { value: '15+', label: 'Researchers' },
]

const focusAreas = [
  { title: 'Medical AI Research', description: 'Localized models for diagnostics, disease prediction and clinical decision support.', icon: Brain, accent: 'from-emerald-500 to-teal-500' },
  { title: 'Drug Discovery & Simulations', description: 'AI-powered molecular modeling, docking and generative chemistry.', icon: FlaskConical, accent: 'from-blue-500 to-cyan-500' },
  { title: 'Structural Biology Modeling', description: 'Protein structure prediction, folding dynamics and interaction analysis.', icon: Box, accent: 'from-purple-500 to-pink-500' },
  { title: 'AI Diagnostic Hardware', description: 'Portable AI-driven devices for rapid point-of-care pathogen detection.', icon: Zap, accent: 'from-amber-500 to-orange-500' },
]

const projects = [
  { title: 'AMR Pathogen Classifier', description: 'Deep learning model identifying antimicrobial resistance from whole-genome sequences with 94% accuracy.', tags: ['Genomics', 'CNN', 'Production'], status: 'Deployed' },
  { title: 'Protein Structure Predictor', description: 'Fine-tuned AlphaFold pipeline for local pathogens and novel protein families.', tags: ['Structural Bio', 'Transformers', 'Research'], status: 'Beta' },
  { title: 'Medical Report Generator', description: 'Fine-tuned LLM for automated radiology report generation from chest X-rays.', tags: ['LLM', 'Medical NLP', 'Clinical'], status: 'In Progress' },
]

export default function AICenterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <Badge variant="gradient" className="mb-4">Flagship Division</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Pakistan AI Center <span className="gradient-text">of Excellence</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              A national hub for medical AI research, industrial collaboration and technology transfer.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card variant="elevated" hover className="h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.accent} flex items-center justify-center mb-3`}>
                      <area.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Flagship Research Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              >
                <Card variant="elevated" hover className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant={project.status === 'Deployed' ? 'success' : project.status === 'Beta' ? 'info' : 'warning'}>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/contact">Partner With the AI Center <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Brain, Zap, GraduationCap, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { NeuralNetwork } from '@/components/visualizations/NeuralNetwork'

const tracks = [
  {
    title: 'ML for Healthcare Diagnostics',
    description: 'Train custom models for pathogen identification, disease prediction and medical imaging.',
    icon: Brain,
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Generative AI & LLMs',
    description: 'Prompt engineering, RAG systems, and fine-tuning foundation models for research.',
    icon: Zap,
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'ML Fundamentals for Biologists',
    description: 'Core machine learning concepts tailored for life scientists, from data to deployment.',
    icon: GraduationCap,
    accent: 'from-purple-500 to-pink-500',
  },
  {
    title: 'AI for Scientific Research',
    description: 'Advanced techniques for hypothesis generation, experiment design and discovery.',
    icon: FlaskConical,
    accent: 'from-amber-500 to-orange-500',
  },
]

export default function AIMLPage() {
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
            <Badge variant="gradient" className="mb-4">AI Center of Excellence</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Artificial Intelligence & <span className="gradient-text">Machine Learning</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              From fundamentals to generative AI and medical diagnostics, with hands-on training on real healthcare data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {tracks.map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" hover className="h-full group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.accent} flex items-center justify-center mb-3`}>
                      <track.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{track.title}</CardTitle>
                    <CardDescription>{track.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Live Neural Network
            </h2>
            <p className="text-slate-600 dark:text-slate-300">Watch forward propagation in real time. Drag to rotate.</p>
          </motion.div>

          <Card variant="elevated" className="overflow-hidden mb-16">
            <div className="h-[400px] w-full">
              <NeuralNetwork />
            </div>
          </Card>

          <div className="text-center">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/courses">Enroll in AI/ML Program <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

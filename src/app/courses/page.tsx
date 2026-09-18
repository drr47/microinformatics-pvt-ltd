'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const courses = [
  { id: 'ngs', title: 'NGS Data Analysis', desc: 'End-to-end sequencing analysis from raw reads to variant interpretation.', level: 'Intermediate', duration: '8 weeks', price: 'PKR 45,000', popular: true },
  { id: 'multiomics', title: 'Multiomics Integration', desc: 'Integrative analysis of genomics, transcriptomics and epigenomics.', level: 'Advanced', duration: '12 weeks', price: 'PKR 75,000', popular: false },
  { id: 'rna-seq', title: 'RNA-seq Analysis', desc: 'Complete RNA-seq workflow from experimental design to interpretation.', level: 'Beginner', duration: '6 weeks', price: 'PKR 35,000', popular: false },
  { id: 'ai-ml', title: 'AI for Healthcare', desc: 'Machine learning diagnostics and generative AI for biology.', level: 'Intermediate', duration: '10 weeks', price: 'PKR 55,000', popular: true },
  { id: 'python-bio', title: 'Python for Bioinformatics', desc: 'Programming fundamentals applied to biological data.', level: 'Beginner', duration: '6 weeks', price: 'PKR 30,000', popular: false },
  { id: 'drug-design', title: 'Drug Design & CADD', desc: 'Molecular docking and dynamics simulations for drug discovery.', level: 'Advanced', duration: '12 weeks', price: 'PKR 80,000', popular: false },
]

export default function CoursesPage() {
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
            <Badge variant="gradient" className="mb-4">All Programs</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Courses <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Hands-on training from experts in bioinformatics, AI, and healthcare research.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card variant="elevated" hover className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{course.level}</Badge>
                      {course.popular && <Badge variant="success">Popular</Badge>}
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{course.duration}</span>
                      <span className="flex items-center gap-1.5"><Tag className="h-4 w-4" />{course.price}</span>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.id}`}>
                        View Details <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button size="xl" variant="gradient" asChild>
              <Link href="/contact">Talk to an Advisor</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

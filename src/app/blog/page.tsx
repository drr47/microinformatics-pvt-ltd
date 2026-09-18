'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const posts = [
  { title: 'From Microscope to Scripts: Our Journey in Computational Biology Training', excerpt: 'How Microinformatics is transforming biology education in Pakistan by teaching students to code and analyze NGS data.', category: 'Announcements', author: 'Haseeb Raza', date: 'Jan 15, 2025', readTime: '8 min' },
  { title: 'Complete NGS Analysis Pipeline: A Step-by-Step Tutorial', excerpt: 'From raw FASTQ files to annotated variants using BWA, GATK and ANNOVAR with real datasets.', category: 'Tutorials', author: 'Kaneez Rubab', date: 'Jan 10, 2025', readTime: '15 min' },
  { title: 'Our First Cohort Publishes in PubMed: A Milestone Celebration', excerpt: 'Celebrating our internship program\u2019s first batch of students who achieved peer-reviewed publications.', category: 'Student Stories', author: 'Haseeb Raza', date: 'Jan 5, 2025', readTime: '5 min' },
  { title: 'Deep Learning for Antimicrobial Resistance Prediction from Genomic Data', excerpt: 'Using CNNs to predict AMR phenotypes from whole-genome sequences with 94% accuracy.', category: 'Publications', author: 'Kaneez Rubab', date: 'Dec 28, 2024', readTime: '12 min' },
  { title: 'Announcing Pakistan AI Center of Excellence in Faisalabad', excerpt: 'Official launch of our flagship AI research center focused on medical AI and drug discovery.', category: 'Announcements', author: 'Haseeb Raza', date: 'Dec 20, 2024', readTime: '6 min' },
  { title: 'RNA-seq Differential Expression Analysis with DESeq2', excerpt: 'Master RNA-seq analysis from count matrices to publication-ready volcano plots.', category: 'Tutorials', author: 'Kaneez Rubab', date: 'Dec 15, 2024', readTime: '18 min' },
  { title: 'Student Spotlight: From Zero Coding to Published Researcher', excerpt: 'Interview with a microbiology student who learned Python and co-authored a research paper.', category: 'Student Stories', author: 'Haseeb Raza', date: 'Dec 10, 2024', readTime: '7 min' },
  { title: 'Molecular Docking Tutorial: AutoDock Vina for Beginners', excerpt: 'Hands-on tutorial for protein-ligand docking and binding affinity prediction.', category: 'Tutorials', author: 'Kaneez Rubab', date: 'Dec 5, 2024', readTime: '14 min' },
  { title: 'Generative AI for Drug Discovery: Fine-tuning ChemBERTa', excerpt: 'Using transformer models for molecular generation and property prediction.', category: 'Research', author: 'Kaneez Rubab', date: 'Nov 20, 2024', readTime: '10 min' },
]

export default function BlogPage() {
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
            <Badge variant="gradient" className="mb-4">Insights & Updates</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Research, tutorials, student stories and announcements from the Microinformatics team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {posts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Card variant="elevated" hover className="h-full flex flex-col">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                      <span>{post.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/contact">Subscribe for Updates <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

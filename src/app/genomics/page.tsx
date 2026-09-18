'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DNAHelix } from '@/components/visualizations/DNAHelix'
import { RNAStrand } from '@/components/visualizations/RNAStrand'
import { ProteinFolding } from '@/components/visualizations/ProteinFolding'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

const tracks = [
  { title: 'Genomics', desc: 'Whole genome and exome sequencing analysis, variant calling and interpretation.' },
  { title: 'Transcriptomics', desc: 'RNA-seq differential expression, splicing analysis and functional enrichment.' },
  { title: 'Metagenomics', desc: 'Microbial community profiling, taxonomic and functional annotation.' },
]

const visualizations = [
  { title: 'DNA Double Helix', component: DNAHelix, accent: 'from-emerald-500 to-teal-500' },
  { title: 'RNA Strand', component: RNAStrand, accent: 'from-blue-500 to-cyan-500' },
  { title: 'Protein Folding', component: ProteinFolding, accent: 'from-purple-500 to-pink-500' },
]

export default function GenomicsPage() {
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
            <Badge variant="gradient" className="mb-4">Computational Biology</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Genomics & <span className="gradient-text">Multiomics</span> Training
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Master the complete pipeline from raw sequencing data to biological insight.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {tracks.map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{track.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{track.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Interactive 3D Visualizations
            </h2>
            <p className="text-slate-600 dark:text-slate-300">Drag to rotate. Explore molecular structures in real time.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {visualizations.map((viz, i) => (
              <motion.div
                key={viz.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <Card variant="elevated" hover className="h-full overflow-hidden">
                  <div className={`h-1 w-full bg-gradient-to-r ${viz.accent}`} />
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 text-center">{viz.title}</h3>
                    <div className="h-[360px] w-full">
                      <viz.component />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Button size="xl" variant="gradient" asChild>
              <Link href="/courses">Explore Genomics Courses <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

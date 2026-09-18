'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown, FlaskConical, Dna, Zap, Brain, Globe, Layers } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DNAHelix } from '@/components/visualizations/DNAHelix'
import { RNAStrand } from '@/components/visualizations/RNAStrand'
import { ProteinFolding } from '@/components/visualizations/ProteinFolding'

const tracks = [
  {
    id: 'genomics',
    title: 'Genomics',
    description: 'Whole genome sequencing analysis, variant calling, annotation, and comparative genomics pipelines.',
    icon: Dna,
    color: 'from-emerald-500 to-teal-500',
    topics: ['WGS/WES Analysis', 'Variant Calling (GATK)', 'Annotation (ANNOVAR)', 'CNV Detection', 'Population Genetics'],
    applications: ['Disease Gene Discovery', 'Population Studies', 'Cancer Genomics', 'Rare Disease Diagnosis'],
    tools: ['BWA', 'GATK', 'SAMtools', 'BCFtools', 'VEP', 'ANNOVAR', 'PLINK'],
  },
  {
    id: 'transcriptomics',
    title: 'Transcriptomics',
    description: 'RNA-seq differential expression, alternative splicing, isoform quantification, and single-cell RNA analysis.',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    topics: ['RNA-seq Pipeline', 'DESeq2/edgeR', 'Alternative Splicing', 'scRNA-seq (Seurat)', 'Trajectory Analysis'],
    applications: ['Biomarker Discovery', 'Drug Response', 'Developmental Biology', 'Immune Profiling'],
    tools: ['STAR', 'Salmon', 'Kallisto', 'DESeq2', 'Seurat', 'Monocle', 'Scanpy'],
  },
  {
    id: 'metagenomics',
    title: 'Metagenomics',
    description: 'Microbial community profiling, functional annotation, resistome analysis, and microbiome-host interactions.',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    topics: ['16S/ITS Amplicon', 'Shotgun Metagenomics', 'Assembly & Binning', 'Resistome/Virulome', 'Host-Microbe Interaction'],
    applications: ['Gut Microbiome', 'Environmental Samples', 'AMR Surveillance', 'Probiotic Development'],
    tools: ['QIIME2', 'Kraken2', 'MetaPhlAn', 'MEGAHIT', 'MetaBAT', 'CheckM', 'CARD'],
  },
  {
    id: 'ribosome',
    title: 'Ribosome Profiling',
    description: 'Translation dynamics, ribosome occupancy, codon usage bias, and translational regulation analysis.',
    icon: Brain,
    color: 'from-amber-500 to-orange-500',
    topics: ['Ribo-seq Analysis', 'Translation Efficiency', 'ORF Discovery', 'uORF Regulation', 'Codon Optimality'],
    applications: ['Translation Control', 'Disease Mechanisms', 'Viral Translation', 'Synthetic Biology'],
    tools: ['Ribo-seq Pipeline', 'RiboTaper', 'ORFik', 'Riborex', 'Plastid', 'RiboWaltz'],
  },
  {
    id: 'cadd',
    title: 'Computer-Aided Drug Design',
    description: 'Structure-based and ligand-based drug design, molecular docking, dynamics simulations, and ADMET prediction.',
    icon: FlaskConical,
    color: 'from-red-500 to-rose-500',
    topics: ['Molecular Docking', 'MD Simulations', 'Pharmacophore Modeling', 'QSAR/QSPR', 'ADMET Prediction'],
    applications: ['Lead Optimization', 'Virtual Screening', 'Binding Affinity', 'Drug Repurposing'],
    tools: ['AutoDock', 'Vina', 'GROMACS', 'AMBER', 'Schrodinger', 'MOE', 'OpenEye'],
  },
  {
    id: 'cheminformatics',
    title: 'Cheminformatics',
    description: 'Chemical space exploration, molecular descriptors, similarity searching, and ML-guided molecule generation.',
    icon: Layers,
    color: 'from-indigo-500 to-purple-500',
    topics: ['Molecular Descriptors', 'Fingerprinting', 'Similarity Search', 'Generative Models', 'Property Prediction'],
    applications: ['Compound Library Design', 'SAR Analysis', 'De Novo Design', 'Toxicity Prediction'],
    tools: ['RDKit', 'DeepChem', 'Mordred', 'ChemBERTa', 'MolBART', 'GraphINVENT'],
  },
]

const visualizations = {
  dna: { component: DNAHelix, title: 'DNA Double Helix', description: 'Interactive 3D DNA with base pair visualization' },
  rna: { component: RNAStrand, title: 'RNA Single Strand', description: 'Dynamic RNA folding and unfolding animation' },
  protein: { component: ProteinFolding, title: 'Protein Folding', description: 'Real-time protein folding simulation' },
}

export default function GenomicsPage() {
  const [activeTrack, setActiveTrack] = useState('genomics')
  const [activeViz, setActiveViz] = useState<'dna' | 'rna' | 'protein'>('dna')
  const [showVizDetails, setShowVizDetails] = useState(false)

  const track = tracks.find(t => t.id === activeTrack) || tracks[0]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="gradient">
              <Dna className="h-3 w-3 mr-1" />
              Computational Biology & Bioinformatics
            </Badge>
            <Badge variant="success">NGS & Multiomics</Badge>
            <Badge variant="info">CADD & Cheminformatics</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Advanced <span className="gradient-text">Genomics & Multiomics</span> Training
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Master the complete pipeline from raw sequencing data to biological insights. 
            Hands-on training in genomics, transcriptomics, metagenomics, ribosome profiling, 
            computer-aided drug design, and cheminformatics.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <aside className="lg:sticky lg:top-24 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                  Training Tracks
                </h3>
                {tracks.map((t, i) => (
                  <motion.button
                    key={t.id}
                    onClick={() => setActiveTrack(t.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      activeTrack === t.id
                        ? 'bg-gradient-to-r text-white shadow-lg'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50'
                    }`}
                    style={{
                      background: activeTrack === t.id 
                        ? `linear-gradient(135deg, ${t.color.split(' to ')[0]}, ${t.color.split(' to ')[1]})` 
                        : undefined
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.color.split(' to ')[0]}, ${t.color.split(' to ')[1]})` }}
                    >
                      <t.icon className={activeTrack === t.id ? 'h-5 w-5 text-white' : 'h-5 w-5'} style={{ color: activeTrack === t.id ? 'white' : undefined }} />
                    </div>
                    <span className="font-medium text-sm">{t.title}</span>
                    {activeTrack === t.id && <ChevronRight className="h-4 w-4 ml-auto text-white" />}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
              >
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">Key Highlights</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Publication-driven cohorts</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live research projects</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> PubMed/Scopus indexing</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Hybrid online/offline</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Industry-standard tools</li>
                </ul>
              </motion.div>
            </aside>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-3 gap-6"
              >
                <Card variant="elevated" hover className="p-6">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: `linear-gradient(135deg, ${track.color.split(' to ')[0]}, ${track.color.split(' to ')[1]})` }}>
                      <track.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{track.title}</CardTitle>
                    <CardDescription>{track.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-slate-900 dark:text-white text-sm">Core Topics</h5>
                      <div className="flex flex-wrap gap-2">
                        {track.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" hover className="p-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Applications</CardTitle>
                    <CardDescription>Real-world use cases</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {track.applications.map((app) => (
                        <motion.div key={app} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${track.color.split(' to ')[0]}, ${track.color.split(' to ')[1]})` }} />
                          {app}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" hover className="p-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Tools & Technologies</CardTitle>
                    <CardDescription>Industry-standard software</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {track.tools.map((tool) => (
                        <Badge key={tool} variant="default" className="text-xs">{tool}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Interactive 3D Visualizations</h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Explore molecular structures in real-time 3D</p>
                  </div>
                  <div className="flex gap-2">
                    {Object.entries(visualizations).map(([key, viz]) => (
                      <button
                        key={key}
                        onClick={() => setActiveViz(key as 'dna' | 'rna' | 'protein')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          activeViz === key
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50'
                        }`}
                      >
                        {viz.title}
                      </button>
                    ))}
                  </div>
                </div>

<div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                   <div className="h-[350px] sm:h-[450px] relative">
                     {activeViz === 'dna' && <DNAHelix basePairs={40} autoRotate={true} showLabels={true} height={450} />}
                     {activeViz === 'rna' && <RNAStrand length={60} height={450} />}
                     {activeViz === 'protein' && <ProteinFolding length={80} height={450} />}
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/95 via-transparent to-transparent">
                    <p className="text-white text-sm text-center">
                      {visualizations[activeViz].description} • Drag to rotate • Scroll to zoom
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Course Structure & Delivery</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: 'Live Interactive Sessions', desc: 'Weekly live classes with hands-on coding', icon: FlaskConical },
                    { title: 'Real Research Data', desc: 'Work with actual NGS/multiomics datasets', icon: Dna },
                    { title: 'Mentor Support', desc: '1-on-1 guidance from published researchers', icon: Brain },
                    { title: 'Portfolio Projects', desc: 'Build publication-ready analysis pipelines', icon: Zap },
                    { title: 'Peer Collaboration', desc: 'Team-based projects simulating real labs', icon: Globe },
                    { title: 'Certification', desc: 'Verified certificate upon completion', icon: Layers },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                      <Card variant="outlined" hover className="p-6 text-center h-full">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500">
                          <item.icon className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">{item.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 text-center"
              >
                <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto">
                  <a href="/courses#apply">Apply for Genomics Track</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
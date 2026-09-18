'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Calendar, Clock, BookOpen, FlaskConical, Brain, Globe, Award, Download, ExternalLink, Tag, FileText, Video } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const categories = ['All', 'Research', 'Tutorials', 'Announcements', 'Student Stories', 'Publications', 'Events']

const posts = [
  {
    id: 1,
    title: 'From Microscope to Scripts: Our Journey in Computational Biology Training',
    excerpt: 'How Microinformatics is transforming biology education in Pakistan by teaching students to code, analyze NGS data, and publish research.',
    category: 'Announcements',
    author: 'Haseeb Raza',
    date: '2025-01-15',
    readTime: '8 min',
    tags: ['Education', 'Bioinformatics', 'Pakistan', 'Training'],
    featured: true,
    type: 'article',
  },
  {
    id: 2,
    title: 'Complete NGS Analysis Pipeline: A Step-by-Step Tutorial',
    excerpt: 'From raw FASTQ files to annotated variants - a comprehensive guide using BWA, GATK, and ANNOVAR with real datasets.',
    category: 'Tutorials',
    author: 'Kaneez Rubab',
    date: '2025-01-10',
    readTime: '15 min',
    tags: ['NGS', 'GATK', 'Variant Calling', 'Tutorial'],
    featured: false,
    type: 'tutorial',
  },
  {
    id: 3,
    title: 'Our First Cohort Publishes in PubMed: A Milestone Celebration',
    excerpt: 'Celebrating our internship program\'s first batch of students who achieved peer-reviewed publications in antimicrobial resistance research.',
    category: 'Student Stories',
    author: 'Haseeb Raza',
    date: '2025-01-05',
    readTime: '5 min',
    tags: ['Publications', 'Students', 'AMR', 'Success Stories'],
    featured: true,
    type: 'article',
  },
  {
    id: 4,
    title: 'Deep Learning for Antimicrobial Resistance Prediction from Genomic Data',
    excerpt: 'Our latest research using CNNs to predict AMR phenotypes from whole-genome sequences with 94% accuracy. Model architecture and results.',
    category: 'Publications',
    author: 'Kaneez Rubab',
    date: '2024-12-28',
    readTime: '12 min',
    tags: ['Deep Learning', 'AMR', 'Genomics', 'CNN', 'Research'],
    featured: false,
    type: 'publication',
  },
  {
    id: 5,
    title: 'Announcing Pakistan AI Center of Excellence in Faisalabad',
    excerpt: 'Official launch of our flagship AI research center focused on medical AI, drug discovery, and healthcare diagnostics innovation.',
    category: 'Announcements',
    author: 'Haseeb Raza',
    date: '2024-12-20',
    readTime: '6 min',
    tags: ['AI Center', 'Launch', 'Medical AI', 'Pakistan'],
    featured: true,
    type: 'article',
  },
  {
    id: 6,
    title: 'RNA-seq Differential Expression Analysis with DESeq2: Complete Guide',
    excerpt: 'Master RNA-seq analysis from count matrices to publication-ready volcano plots and pathway enrichment analysis.',
    category: 'Tutorials',
    author: 'Kaneez Rubab',
    date: '2024-12-15',
    readTime: '18 min',
    tags: ['RNA-seq', 'DESeq2', 'Transcriptomics', 'Tutorial'],
    featured: false,
    type: 'tutorial',
  },
  {
    id: 7,
    title: 'Student Spotlight: From Zero Coding to Published Researcher',
    excerpt: 'Interview with Maria Ahmed, a microbiology student who learned Python, completed our NGS course, and co-authored a Nature Communications paper.',
    category: 'Student Stories',
    author: 'Haseeb Raza',
    date: '2024-12-10',
    readTime: '7 min',
    tags: ['Student Success', 'Career', 'Publications', 'Inspiration'],
    featured: false,
    type: 'article',
  },
  {
    id: 8,
    title: 'Molecular Docking Tutorial: AutoDock Vina for Beginners',
    excerpt: 'Hands-on tutorial for protein-ligand docking, binding affinity prediction, and result visualization using AutoDock Tools and Vina.',
    category: 'Tutorials',
    author: 'Kaneez Rubab',
    date: '2024-12-05',
    readTime: '14 min',
    tags: ['CADD', 'Docking', 'AutoDock', 'Drug Design'],
    featured: false,
    type: 'tutorial',
  },
  {
    id: 9,
    title: 'Metagenomics Workshop Recap: 16S to Shotgun Analysis',
    excerpt: 'Highlights from our 3-day intensive metagenomics workshop covering QIIME2, Kraken2, assembly, binning, and functional annotation.',
    category: 'Events',
    author: 'Haseeb Raza',
    date: '2024-11-28',
    readTime: '5 min',
    tags: ['Metagenomics', 'Workshop', 'Microbiome', 'Events'],
    featured: false,
    type: 'article',
  },
  {
    id: 10,
    title: 'Generative AI for Drug Discovery: Fine-tuning ChemBERTa',
    excerpt: 'How we\'re using transformer models for molecular generation and property prediction. Includes Colab notebook and model weights.',
    category: 'Research',
    author: 'Kaneez Rubab',
    date: '2024-11-20',
    readTime: '10 min',
    tags: ['Generative AI', 'Drug Discovery', 'Transformers', 'ChemBERTa'],
    featured: false,
    type: 'publication',
  },
  {
    id: 11,
    title: 'Ribosome Profiling Reveals Translational Control in Stress Response',
    excerpt: 'Our latest publication using Ribo-seq to uncover novel uORFs and codon optimality effects in bacterial stress response.',
    category: 'Publications',
    author: 'Kaneez Rubab',
    date: '2024-11-15',
    readTime: '11 min',
    tags: ['Ribo-seq', 'Translation', 'Bacteria', 'Stress Response'],
    featured: false,
    type: 'publication',
  },
  {
    id: 12,
    title: 'Announcing January 2025 Cohort: Applications Now Open',
    excerpt: 'New batches starting for NGS Analysis, RNA-seq, ML Diagnostics, and Generative AI. Early bird discount until Dec 31.',
    category: 'Announcements',
    author: 'Admissions Team',
    date: '2024-11-10',
    readTime: '3 min',
    tags: ['Admissions', 'Courses', 'January 2025', 'Deadline'],
    featured: true,
    type: 'article',
  },
]

const resources = [
  {
    title: 'NGS Analysis Pipeline Cheatsheet',
    description: 'Quick reference for commands, parameters, and best practices',
    type: 'PDF',
    size: '2.3 MB',
    icon: FileText,
    category: 'Genomics',
  },
  {
    title: 'RNA-seq Workflow Diagram',
    description: 'Visual flowchart from experimental design to publication',
    type: 'PDF',
    size: '1.8 MB',
    icon: FileText,
    category: 'Transcriptomics',
  },
  {
    title: 'Python for Bioinformatics Cheatsheet',
    description: 'Essential Biopython, pandas, and matplotlib commands',
    type: 'PDF',
    size: '1.5 MB',
    icon: FileText,
    category: 'Programming',
  },
  {
    title: 'ML Model Deployment Checklist',
    description: 'Production readiness checklist for healthcare ML models',
    type: 'PDF',
    size: '890 KB',
    icon: FileText,
    category: 'AI/ML',
  },
  {
    title: 'Molecular Docking Protocol',
    description: 'Step-by-step SOP for AutoDock Vina and GROMACS MD',
    type: 'PDF',
    size: '3.1 MB',
    icon: FileText,
    category: 'Drug Design',
  },
  {
    title: 'scRNA-seq Analysis Notebook',
    description: 'Complete Scanpy tutorial with PBMC dataset',
    type: 'Notebook',
    size: '4.2 MB',
    icon: FileText,
    category: 'Transcriptomics',
  },
  {
    title: 'Genomics Video Course - Module 1',
    description: 'Introduction to NGS technologies and data formats',
    type: 'Video',
    size: '1.2 GB',
    icon: Video,
    category: 'Genomics',
  },
  {
    title: 'AI in Healthcare Reading List',
    description: 'Curated papers, blogs, and courses for medical AI',
    type: 'PDF',
    size: '560 KB',
    icon: FileText,
    category: 'AI/ML',
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<'posts' | 'resources'>('posts')

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = filteredPosts.filter(p => p.featured)
  const regularPosts = filteredPosts.filter(p => !p.featured)

  const categoryColors: Record<string, string> = {
    'Research': 'from-blue-500 to-cyan-500',
    'Tutorials': 'from-emerald-500 to-teal-500',
    'Announcements': 'from-purple-500 to-pink-500',
    'Student Stories': 'from-amber-500 to-orange-500',
    'Publications': 'from-red-500 to-rose-500',
    'Events': 'from-indigo-500 to-purple-500',
  }

  const typeIcons = {
    article: FileText,
    tutorial: BookOpen,
    publication: Award,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="gradient">
              <BookOpen className="h-3 w-3 mr-1" />
              Knowledge Hub
            </Badge>
            <Badge variant="success">Weekly Updates</Badge>
            <Badge variant="info">Free Resources</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Blog & <span className="gradient-text">Resources</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Latest research insights, step-by-step tutorials, student success stories, 
            and free downloadable resources for computational biology and AI practitioners.
          </motion.p>
        </div>
      </section>

      <section className="py-8 lg:py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSearchQuery('') }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r text-white shadow'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50'
                  }`}
                  style={{
                    background: activeCategory === cat 
                      ? 'linear-gradient(135deg, #6366f1, #a855f7)' 
                      : undefined
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`} aria-label="Grid view"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`} aria-label="List view"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button onClick={() => setActiveTab('posts')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'posts' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
              Articles & Posts
            </button>
            <button onClick={() => setActiveTab('resources')} className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'resources' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
              Resources & Downloads
            </button>
          </div>

          {activeTab === 'posts' && (
            <>
              {featuredPosts.length > 0 && activeCategory === 'All' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Featured</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPosts.slice(0, 3).map((post, i) => (
                      <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                        <FeaturedPostCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{activeCategory === 'All' ? 'Latest Posts' : `${activeCategory} Posts`}</h2>
                {viewMode === 'grid' ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post, i) => (
                      <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {regularPosts.map((post, i) => (
                      <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                        <PostCardList post={post} />
                      </motion.div>
                    ))}
                  </div>
                )}
                {filteredPosts.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <Search className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No posts found</h3>
                    <p className="text-slate-600 dark:text-slate-300">Try adjusting your filters or search terms</p>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}

          {activeTab === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Free Downloads & Resources</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, i) => (
                  <motion.div key={resource.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                    <ResourceCard resource={resource} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-24 lg:py-32 relative overflow-hidden">
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
              Stay Updated
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Subscribe to Our <span className="text-emerald-200">Newsletter</span>
            </h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Get the latest tutorials, research updates, and course announcements delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!') }}>
              <Input name="email" type="email" placeholder="your@email.com" required className="flex-1" />
              <Button type="submit" variant="secondary" size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-sm text-emerald-200">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const categoryColors: Record<string, string> = {
  'Research': 'from-blue-500 to-cyan-500',
  'Tutorials': 'from-emerald-500 to-teal-500',
  'Announcements': 'from-purple-500 to-pink-500',
  'Student Stories': 'from-amber-500 to-orange-500',
  'Publications': 'from-red-500 to-rose-500',
  'Events': 'from-indigo-500 to-purple-500',
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  article: FileText,
  tutorial: BookOpen,
  publication: Award,
}

function FeaturedPostCard({ post }: { post: typeof posts[0] }) {
  const color = categoryColors[post.category] || 'from-indigo-500 to-purple-500'
  const TypeIcon = typeIcons[post.type] || FileText
  
  return (
    <Card variant="elevated" hover className="h-full overflow-hidden relative">
      <div className="absolute top-3 right-3">
        <Badge variant="gradient" className="text-xs">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</Badge>
      </div>
      <div className="h-48 bg-gradient-to-br relative" style={{ background: `linear-gradient(135deg, ${color.split(' to ')[0]}, ${color.split(' to ')[1]})` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <TypeIcon className="h-12 w-12 text-white/20" />
        </div>
      </div>
      <CardContent className="p-6 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs" style={{ borderColor: color.split(' to ')[0] }}>{post.category}</Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime} read</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-3 w-3" /> {post.date}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href={`/blog/${post.id}`}>Read More <ChevronRight className="h-3 w-3 ml-1" /></a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PostCard({ post }: { post: typeof posts[0] }) {
  const color = categoryColors[post.category] || 'from-indigo-500 to-purple-500'
  const TypeIcon = typeIcons[post.type] || FileText
  
  return (
    <Card variant="outlined" hover className="h-full flex flex-col">
      <div className="h-40 bg-gradient-to-br relative" style={{ background: `linear-gradient(135deg, ${color.split(' to ')[0]}, ${color.split(' to ')[1]})` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <TypeIcon className="h-10 w-10 text-white/20" />
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="gradient" className="text-xs">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</Badge>
        </div>
      </div>
      <CardContent className="p-5 pt-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs" style={{ borderColor: color.split(' to ')[0] }}>{post.category}</Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime} read</span>
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-3 w-3" /> {post.date}
            <span>·</span>
            <Clock className="h-3 w-3" /> {post.readTime}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href={`/blog/${post.id}`}>Read</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PostCardList({ post }: { post: typeof posts[0] }) {
  const color = categoryColors[post.category] || 'from-indigo-500 to-purple-500'
  const TypeIcon = typeIcons[post.type] || FileText
  
  return (
    <Card variant="outlined" hover className="p-4 flex items-center gap-4">
      <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${color.split(' to ')[0]}, ${color.split(' to ')[1]})` }}>
        <TypeIcon className="h-7 w-7 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs" style={{ borderColor: color.split(' to ')[0] }}>{post.category}</Badge>
          <Badge variant="gradient" className="text-xs">{post.type}</Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime}</span>
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <a href={`/blog/${post.id}`}>Read <ChevronRight className="h-3 w-3 ml-1" /></a>
      </Button>
    </Card>
  )
}

function ResourceCard({ resource }: { resource: typeof resources[0] }) {
  const categoryColor = categoryColors[resource.category] || 'from-indigo-500 to-purple-500'
  
  return (
    <Card variant="outlined" hover className="p-5 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${categoryColor.split(' to ')[0]}, ${categoryColor.split(' to ')[1]})` }}>
          <resource.icon className="h-6 w-6 text-white" />
        </div>
        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
      </div>
      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{resource.title}</h4>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1">{resource.description}</p>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
        <span className="flex items-center gap-1"><resource.icon className="h-3 w-3" /> {resource.size}</span>
        <Badge variant="default" className="text-xs">{resource.category}</Badge>
      </div>
      <Button variant="outline" size="sm" className="w-full" asChild>
        <a href="#">
          <Download className="h-4 w-4 mr-2" />
          Download
        </a>
      </Button>
    </Card>
  )
}

import { Search } from 'lucide-react'
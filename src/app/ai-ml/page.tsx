'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Brain, Cpu, Zap, Search, Code2, GraduationCap, FlaskConical, Shield, Network } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { NeuralNetwork } from '@/components/visualizations/NeuralNetwork'

const tracks = [
  {
    id: 'ml-diagnostics',
    title: 'ML for Healthcare Diagnostics',
    description: 'Train custom ML models for pathogen identification, disease prediction, and medical image analysis.',
    icon: Brain,
    color: 'from-emerald-500 to-teal-500',
    topics: ['CNN for Medical Imaging', 'Pathogen Classification', 'Disease Risk Prediction', 'Biomarker Discovery', 'Model Interpretability'],
    applications: ['AMR Detection', 'Cancer Screening', 'Infectious Disease', 'Radiology AI', 'Digital Pathology'],
    tools: ['PyTorch', 'TensorFlow', 'MONAI', 'nnU-Net', 'Grad-CAM', 'SHAP', 'MLflow'],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & LLMs',
    description: 'Practical applications of foundation models, prompt engineering, RAG systems, and fine-tuning for research.',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    topics: ['Prompt Engineering', 'RAG Systems', 'Fine-tuning LoRA', 'Agent Frameworks', 'Multimodal Models'],
    applications: ['Literature Mining', 'Protocol Generation', 'Code Assistant', 'Data Analysis', 'Grant Writing'],
    tools: ['OpenAI API', 'LangChain', 'LlamaIndex', 'HuggingFace', 'vLLM', 'Ollama', 'Weights & Biases'],
  },
  {
    id: 'ml-fundamentals',
    title: 'ML Fundamentals for Biologists',
    description: 'Core ML concepts tailored for life scientists - from data preprocessing to model deployment.',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500',
    topics: ['Supervised/Unsupervised', 'Feature Engineering', 'Cross-Validation', 'Hyperparameter Tuning', 'Model Deployment'],
    applications: ['Gene Expression', 'Protein Structure', 'Drug Response', 'Phenotype Prediction', 'Clinical Data'],
    tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'Optuna', 'Streamlit', 'Docker', 'FastAPI'],
  },
  {
    id: 'ai-research',
    title: 'AI for Scientific Research',
    description: 'Advanced AI techniques for hypothesis generation, experiment design, and automated discovery.',
    icon: FlaskConical,
    color: 'from-amber-500 to-orange-500',
    topics: ['Active Learning', 'Bayesian Optimization', 'Symbolic Regression', 'Graph Neural Networks', 'AlphaFold-style'],
    applications: ['Protein Design', 'Drug Discovery', 'Materials Science', 'Genomics', 'Systems Biology'],
    tools: ['PyTorch Geometric', 'DGL', 'JAX', 'Flax', 'Equinox', 'DeepSpeed', 'Ray'],
  },
]

const projects = [
  {
    title: 'AMR Pathogen Classifier',
    description: 'CNN model identifying antimicrobial resistance patterns from genomic sequences with 94% accuracy.',
    tags: ['Genomics', 'CNN', 'PyTorch', 'Production'],
    status: 'Deployed',
  },
  {
    title: 'Drug-Target Interaction Predictor',
    description: 'Graph neural network predicting binding affinity for novel compound-protein pairs.',
    tags: ['GNN', 'Drug Discovery', 'PyG', 'Research'],
    status: 'In Progress',
  },
  {
    title: 'Medical Report Generator',
    description: 'Fine-tuned LLM for automated radiology report generation from chest X-rays.',
    tags: ['LLM', 'LoRA', 'Medical NLP', 'Clinical'],
    status: 'Beta Testing',
  },
  {
    title: 'Single-Cell Type Annotator',
    description: 'Transformer-based cell type annotation for scRNA-seq data across tissues.',
    tags: ['scRNA-seq', 'Transformers', 'Bioinformatics', 'Open Source'],
    status: 'Published',
  },
]

export default function AIMLPage() {
  const [activeTrack, setActiveTrack] = useState('ml-diagnostics')
  const [activeProject, setActiveProject] = useState(0)

  const track = tracks.find(t => t.id === activeTrack) || tracks[0]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="gradient">
              <Brain className="h-3 w-3 mr-1" />
              AI Center of Excellence
            </Badge>
            <Badge variant="info">Medical AI Focus</Badge>
            <Badge variant="success">Production-Ready Models</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Artificial Intelligence & <span className="gradient-text">Machine Learning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            From fundamental ML concepts to cutting-edge generative AI and medical diagnostics. 
            Hands-on training with real healthcare data, production deployment, and research-grade projects.
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
                  AI/ML Tracks
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
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50'
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
                className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
              >
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Learning Outcomes</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Build & deploy ML models</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Fine-tune foundation models</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Medical AI best practices</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> MLOps & monitoring</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Research publications</li>
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
                    <CardDescription>Real-world impact areas</CardDescription>
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
                    <CardTitle className="text-lg">Tools & Frameworks</CardTitle>
                    <CardDescription>Industry-standard stack</CardDescription>
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
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Live Neural Network Visualization</h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">Watch forward propagation in real-time</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="info" className="text-xs">Forward Pass Animation Active</Badge>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="h-[400px] relative">
                    <NeuralNetwork />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/95 via-transparent to-transparent">
                    <p className="text-white text-sm text-center">
                      5-layer deep network • 39 neurons • Live forward propagation • Drag to rotate
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Featured AI Projects</h3>
                  <div className="flex gap-2">
                    {projects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveProject(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          activeProject === i ? 'bg-blue-500 w-8' : 'bg-slate-300 dark:bg-slate-600 hover:bg-blue-500'
                        }`} />
                    ))}
                  </div>
                </div>

                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="elevated" className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {projects[activeProject].status}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{projects[activeProject].title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">{projects[activeProject].description}</p>
                        <div className="flex flex-wrap gap-2">
                          {projects[activeProject].tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 grid md:grid-cols-3 gap-6"
              >
                {[
                  { title: 'Medical Imaging AI', desc: 'CNNs for radiology, pathology, ophthalmology', icon: Search },
                  { title: 'Generative Biology', desc: 'Protein design, molecule generation, DNA synthesis', icon: Code2 },
                  { title: 'MLOps & Deployment', desc: 'Model serving, monitoring, CI/CD for ML', icon: Cpu },
                  { title: 'Responsible AI', desc: 'Bias detection, fairness, explainability, privacy', icon: Shield },
                  { title: 'Edge AI', desc: 'Mobile deployment, quantization, optimization', icon: Network },
                  { title: 'Research Integration', desc: 'Lab automation, experiment design, discovery', icon: FlaskConical },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Card variant="outlined" hover className="p-6 text-center h-full">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
                        <item.icon className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{item.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 text-center"
              >
                <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto">
                  <a href="/courses#apply">Enroll in AI/ML Program</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
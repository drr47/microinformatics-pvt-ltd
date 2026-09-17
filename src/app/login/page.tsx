'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ChevronRight, Brain, FlaskConical, GraduationCap, Award, BookOpen, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Input, Select } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type AuthMode = 'login' | 'register'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (mode === 'register') {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    } else {
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.password) newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setFormStatus('submitting')
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production, replace with actual auth API
    console.log(`${mode} attempt:`, { email: formData.email, role: formData.role })
    
    setFormStatus('success')
    setTimeout(() => {
      router.push('/portal')
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const benefits = [
    { icon: BookOpen, title: 'Course Access', desc: 'All enrolled courses and materials' },
    { icon: Brain, title: 'AI Lab Access', desc: 'GPU compute for ML projects' },
    { icon: FlaskConical, title: 'Research Datasets', desc: 'Curated NGS & multiomics data' },
    { icon: GraduationCap, title: 'Progress Tracking', desc: 'Certificates & completion status' },
    { icon: Award, title: 'Publication Support', desc: 'Manuscript templates & guidance' },
    { icon: Users, title: 'Community Forum', desc: 'Peer & mentor discussions' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8C11.589 8 8 11.589 8 16C8 20.411 11.589 24 16 24C20.411 24 24 20.411 24 16C24 11.589 20.411 8 16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 16H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="3" fill="currentColor"/>
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            {mode === 'login' 
              ? 'Sign in to access your courses, research projects, and AI lab' 
              : 'Join 100+ researchers and students in computational biology'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="elevated" className="p-6">
              <CardHeader className="text-center mb-6">
                <CardTitle className="text-xl">{mode === 'login' ? 'Sign In' : 'Register'}</CardTitle>
                <CardDescription>
                  {mode === 'login' 
                    ? 'Enter your credentials to access the portal' 
                    : 'Create your free account to get started'}
                </CardDescription>
              </CardHeader>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 mb-6"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {mode === 'login' ? 'Welcome Back!' : 'Account Created!'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {mode === 'login' 
                      ? 'Redirecting to your dashboard...' 
                      : 'Redirecting to portal...'}
                  </p>
                </motion.div>
              )}

              {formStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <>
                      <Input
                        name="name"
                        label="Full Name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        icon={<User className="h-5 w-5" />}
                      />
                      <Input
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@university.edu"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        icon={<Mail className="h-5 w-5" />}
                      />
                      <Select
                        name="role"
                        label="I am a"
                        options={[
                          { value: 'student', label: 'Student / Researcher' },
                          { value: 'professional', label: 'Industry Professional' },
                          { value: 'faculty', label: 'Faculty / PI' },
                        ]}
                        value={formData.role}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                        icon={<Lock className="h-5 w-5" />}
                        showToggle={true}
                        isShowing={showPassword}
                        onToggleShow={() => setShowPassword(!showPassword)}
                      />
                      <Input
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                        icon={<Lock className="h-5 w-5" />}
                        showToggle={true}
                        isShowing={showConfirmPassword}
                        onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </>
                  )}

                  {mode === 'login' && (
                    <>
                      <Input
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@university.edu"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        icon={<Mail className="h-5 w-5" />}
                      />
                      <Input
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                        icon={<Lock className="h-5 w-5" />}
                        showToggle={true}
                        isShowing={showPassword}
                        onToggleShow={() => setShowPassword(!showPassword)}
                      />
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                          Remember me
                        </label>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/forgot-password">Forgot password?</Link>
                        </Button>
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    isLoading={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'} {' '}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setFormStatus('idle'); setErrors({}) }}
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Or continue with</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                    <Link href="/auth/github">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                    <Link href="/auth/google">
                      <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Google
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          <p>By continuing, you agree to our <Link href="/terms" className="text-emerald-600 dark:text-emerald-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">Privacy Policy</Link></p>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-wrap justify-center gap-4 max-w-4xl px-4">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50"
          >
            <benefit.icon className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{benefit.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Search, Brain } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <span className="text-9xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            404
          </span>
        </div>
        
        <Card variant="elevated" className="p-8">
          <Brain className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">
                <Search className="h-5 w-5 mr-2" />
                Explore Courses
              </Link>
            </Button>
          </div>
        </Card>
        
        <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>Microinformatics (Pvt.) Ltd</p>
          <p>Bridging Life Sciences with Advanced Computing</p>
        </div>
      </motion.div>
    </div>
  )
}
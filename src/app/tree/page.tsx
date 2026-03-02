import React from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Folder, FileText, Globe, Shield, LayoutTemplate, Layers, Zap, BookOpen } from 'lucide-react'
import { adminGetAllBrands, adminGetAllServices, adminGetAllPublishedContent } from '@/lib/firebase-admin'
import { TreeClientWrapper } from './client-wrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Site Architecture Tree | Smart Motor Abu Dhabi',
    description: 'Live visualization of the Smart Motor programmatic SEO engine. Explore all brand, service, and content pages across the site.',
    alternates: {
        canonical: 'https://smartmotor.ae/tree',
    },
    robots: {
        index: false,
        follow: true,
    },
}

// --- Types ---
type TreeNode = {
  title: string
  href?: string
  icon?: React.ReactNode
  isDynamic?: boolean
  children?: TreeNode[]
  count?: number
}

// Helper to calculate total nodes in a tree branch
function countNodes(node: TreeNode): number {
  let count = node.href ? 1 : 0
  if (node.children) {
    count += node.children.reduce((acc, child) => acc + countNodes(child), 0)
  }
  return count
}

export default async function SiteTreePage() {
  // 1. Fetch Real Data from Firebase
  const [brands, services, blogPosts] = await Promise.all([
    adminGetAllBrands(),
    adminGetAllServices(),
    adminGetAllPublishedContent('BLOG')
  ])

  // Sort for better readability
  brands.sort((a, b) => a.name.localeCompare(b.name))
  services.sort((a, b) => a.name.localeCompare(b.name))

  // 2. Build Dynamic Trees
  
  // A. Brand Hubs (Brand Only)
  const brandNodes: TreeNode[] = brands.map(brand => {
    const slug = brand.slug || brand.id
    // Check if brand has specific services assigned, otherwise assume all (potential)
    const brandServiceNodes = services.map(service => ({
      title: `${brand.name} + ${service.name}`,
      href: `/brand/${slug}/${service.slug}`,
      isDynamic: true,
      icon: <Zap className="w-3 h-3 text-orange-200" />
    }))

    return {
      title: brand.name,
      href: `/brand/${slug}`,
      isDynamic: true,
      icon: <Layers className="w-3 h-3 text-orange-400" />,
      children: brandServiceNodes // These are the cross-product pages
    }
  })

  // B. Service Pages (General)
  const serviceNodes: TreeNode[] = services.map(service => ({
    title: service.name,
    href: `/services/${service.slug}`,
    isDynamic: true,
    icon: <Zap className="w-3 h-3 text-yellow-500" />
  }))

  // C. Blog Posts
  const blogNodes: TreeNode[] = blogPosts.map(post => ({
    title: post.title,
    href: `/smart-tips/${post.slug}`, // Assuming smart-tips is the blog route
    isDynamic: true,
    icon: <FileText className="w-3 h-3 text-blue-400" />
  }))

  // 3. Construct Main Tree
  const publicTree: TreeNode[] = [
    {
      title: 'Main Public Site',
      icon: <Globe className="w-4 h-4 text-blue-500" />,
      children: [
        { title: 'Home', href: '/' },
        { title: 'About Us', href: '/about' },
        { title: 'Contact HQ', href: '/contact' },
        { title: 'F.A.Q', href: '/faq' },
        { title: 'Expert Careers', href: '/careers' },
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms & Conditions', href: '/terms' },
      ],
    },
    {
      title: `Service Catalog (${serviceNodes.length})`,
      icon: <Zap className="w-4 h-4 text-yellow-600" />,
      children: [
        { title: 'All Services Index', href: '/services' },
        ...serviceNodes
      ],
    },
    {
      title: `Brand Ecosystem (${brandNodes.length} Brands × ${services.length} Services = ${brandNodes.length * services.length} Potential Pages)`,
      icon: <Layers className="w-4 h-4 text-orange-600" />,
      children: [
        { title: 'All Brands Index', href: '/brands' }, // Assuming this exists or redirects
        ...brandNodes
      ],
    },
    {
      title: `Intelligence Hub (${blogNodes.length} Articles)`,
      icon: <BookOpen className="w-4 h-4 text-red-600" />,
      children: [
        { title: 'Hub Home', href: '/hub' },
        { title: 'Smart Tips Index', href: '/smart-tips' },
        ...blogNodes
      ],
    },
    {
      title: 'Interactive Tools',
      icon: <LayoutTemplate className="w-4 h-4 text-purple-600" />,
      children: [
        { title: 'Car Comparison', href: '/vault/compare' },
        { title: 'Leyla AI', href: '/leyla' },
        { title: 'Design System', href: '/design-system' },
      ],
    },
    {
      title: 'User Portal',
      icon: <Folder className="w-4 h-4 text-green-600" />,
      children: [
        { title: 'Login', href: '/user/login' },
        { title: 'Register', href: '/user/register' },
        { title: 'Dashboard', href: '/user/dashboard' },
      ],
    },
  ]

  // Calculate Total Pages
  const totalPublicPages = publicTree.reduce((acc, node) => acc + countNodes(node), 0)

  // Admin Tree (Static for now)
  const adminTree: TreeNode[] = [
    {
      title: 'Admin Core',
      icon: <Shield className="w-4 h-4 text-brand-red" />,
      children: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Analytics', href: '/admin/analytics' },
        { title: 'Content Manager', href: '/admin/content' },
        { title: 'Settings', href: '/admin/settings' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-brand-bg p-6 md:p-12 font-sans selection:bg-brand-red selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
                <span className="text-white font-black italic">S</span>
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tighter text-brand-dark">
                Site Architecture <span className="text-brand-red">Tree</span>
              </h1>
            </div>
            <p className="text-sm text-gray-500 font-medium max-w-2xl">
              Live visualization of the Smart Motor programmatic SEO engine. 
              Currently generating <span className="text-brand-red font-black">{totalPublicPages}</span> unique, indexable pages from {brands.length} brands and {services.length} services.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-5 py-2.5 bg-green-50 text-green-700 border border-green-100 text-xs font-black uppercase tracking-widest rounded-full">
              Status: {brands.length > 0 ? 'Connected to Firebase' : 'Database Empty'}
            </div>
            <Link href="/">
              <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-black uppercase tracking-widest rounded-full transition-colors">
                Home
              </button>
            </Link>
          </div>
        </div>

        {/* Tree Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Public Tree */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <h2 className="text-sm font-black uppercase tracking-widest text-brand-dark">
                  Public Sitemap
                </h2>
              </div>
              <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                {totalPublicPages} Routes
              </span>
            </div>
            <div className="space-y-1 font-mono text-sm">
              <TreeClientWrapper nodes={publicTree} />
            </div>
          </div>

          {/* Admin Tree */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit sticky top-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <Shield className="w-5 h-5 text-gray-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-brand-dark">
                Admin OS
              </h2>
            </div>
            <div className="space-y-1 font-mono text-sm">
              <TreeClientWrapper nodes={adminTree} />
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Database Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-brand-dark">{brands.length}</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Brands</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-brand-dark">{services.length}</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Services</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-brand-dark">{blogPosts.length}</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Articles</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-brand-red">{brands.length * services.length}</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Potential Pages</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MenuIcon, XIcon, PhoneIcon, UserIcon } from 'lucide-react'
import { cn, publicPath } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Tooltip } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

const navLinks = [
  { href: '#about', label: 'About Us', id: 'about' },
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#brands', label: 'Brands', id: 'brands' },
  { href: '#packages', label: 'Packages', id: 'packages' },
  { href: '/smart-tips', label: 'Smart Tips', id: 'smart-tips' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  // True when we're on the home page and anchor scrolling works
  const isHomePage = pathname === '/'

  // Do not show on admin routes, auth routes, or the dedicated leyla page
  const isHiddenPage = pathname?.startsWith('/admin') || pathname?.startsWith('/auth') || pathname === '/leyla'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll Spy Logic
  useEffect(() => {
    if (isHiddenPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' } // Trigger when section is in middle of viewport
    )

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a direct page link (not an anchor), let the browser handle it
    if (!href.startsWith('#')) return

    e.preventDefault()
    const targetId = href.replace('#', '')
    setIsMobileMenuOpen(false)

    // If we're already on the home page, scroll directly
    if (isHomePage) {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    // On other pages, navigate to home with hash
    // After navigation the browser will auto-scroll to the anchor
    router.push(`/#${targetId}`)
  }

  if (isHiddenPage) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-0">
      <div className={cn(
        'w-full max-w-[95%] md:max-w-7xl mx-auto px-6 md:px-10 transition-all duration-500 rounded-b-[3rem] border border-white/10 shadow-sm',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-4'
          : 'bg-white/10 backdrop-blur-md py-6'
      )}>
        <nav className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-50">
            <img
              src={publicPath("/branding/logo.png")}
              alt="Smart Motor Auto Repair Abu Dhabi - Premium Car Service Center"
              className={cn(
                'transition-all duration-500 object-contain',
                isScrolled ? 'h-12 md:h-14' : 'h-16 md:h-20'
              )}
            />
          </Link>

          {/* Desktop Nav - Single Row */}
          <div className="hidden lg:flex items-center justify-center gap-1 bg-gray-100/50 backdrop-blur-md p-1.5 rounded-full border border-white/20 mx-6 shadow-inner whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    'relative px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-full z-10 flex-nowrap',
                    !isActive && 'text-brand-dark/60 hover:text-brand-dark'
                  )}
                  style={isActive ? { color: '#FFFFFF' } : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-brand-dark rounded-full -z-10 shadow-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Desktop Right Actions - Call Button ONLY (no socials) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Tooltip content="Call us directly for immediate assistance" position="bottom">
                <a
                  href="tel:80076278"
                  onClick={() => trackEvent('phone_click', 'Contact', 'navbar', 1)}
                  className={cn(
                    'group flex items-center gap-3 pl-1 pr-6 py-1.5 rounded-full transition-all duration-300 border shadow-sm',
                    isScrolled
                      ? 'bg-brand-dark text-white border-transparent hover:bg-brand-red'
                      : 'bg-white/80 backdrop-blur-md text-brand-dark border-white/20 hover:bg-brand-dark hover:text-white'
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md",
                    isScrolled ? "bg-white/10 text-white" : "bg-brand-red text-white"
                  )}>
                    <PhoneIcon size={14} className="fill-current" />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <span className={cn("text-[8px] font-black uppercase tracking-[0.2em] leading-none mb-1 transition-colors duration-300", isScrolled ? "text-gray-300 group-hover:text-white/80" : "text-gray-500 group-hover:text-gray-300")}>Toll Free</span>
                    <span className="text-xs font-black tracking-widest leading-none">800 76278</span>
                  </div>
                </a>
              </Tooltip>
            </div>

            <Button
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                const bookingSection = document.getElementById('booking')
                if (bookingSection) {
                  bookingSection.scrollIntoView({ behavior: 'smooth' })
                } else {
                  router.push('/#booking')
                }
              }}
              className="bg-brand-red text-white rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl hidden md:flex"
            >
              Book Now
            </Button>

            <Tooltip content="User Dashboard" position="bottom">
              <Link href="/user/dashboard" className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border",
                isScrolled 
                  ? "bg-brand-dark text-white border-white/10 hover:bg-brand-red hover:border-transparent" 
                  : "bg-white/80 backdrop-blur-md text-brand-dark border-white/20 hover:bg-brand-dark hover:text-white"
              )}>
                <UserIcon size={16} />
              </Link>
            </Tooltip>
          </div>

          {/* Mobile hamburger */}
          <Tooltip content={isMobileMenuOpen ? "Close menu" : "Open menu"} position="bottom">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-3 rounded-full transition-colors relative z-50',
                isScrolled || isMobileMenuOpen ? 'bg-gray-100 text-brand-dark' : 'bg-white/20 backdrop-blur-md text-brand-dark'
              )}
            >
              {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </Tooltip>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 lg:hidden transition-all duration-500 flex flex-col pt-32 px-8",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
        )}>
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-black text-3xl text-brand-dark uppercase tracking-tighter"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-gray-500 mr-4 text-lg font-medium">0{i + 1}</span>
                {link.label}
              </a>
            ))}

            <div className="mt-12 pt-12 border-t border-gray-100 space-y-4">
              <Link 
                href="/user/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 w-full bg-white text-brand-dark border-2 border-brand-dark p-6 rounded-[2rem] shadow-sm active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserIcon size={24} />
                </div>
                <div>
                  <p className="text-xl font-black tracking-widest uppercase">My Profile</p>
                </div>
              </Link>
              <a href="tel:80076278" onClick={() => trackEvent('phone_click', 'Contact', 'mobile_menu', 1)} className="flex items-center gap-4 w-full bg-brand-dark text-white p-6 rounded-[2rem] shadow-xl active:scale-95 transition-transform">
                <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center">
                  <PhoneIcon size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Toll Free</p>
                  <p className="text-xl font-black tracking-widest">800 76278</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

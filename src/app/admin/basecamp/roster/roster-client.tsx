'use client'

import { Mail, Phone, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase-db'

export interface Employee {
  id: string
  name: string
  role: string
  department: string
  photo: string
  email: string
  phone: string
  status: 'active' | 'away' | 'busy'
}

function mapRoleToDepartment(role: string): string {
    const r = role?.toUpperCase() || ''
    if (r.includes('ADMIN')) return 'Management'
    if (r.includes('MARKETING')) return 'Marketing'
    if (r.includes('TECH') || r.includes('MECHANIC')) return 'Workshop'
    if (r.includes('SERVICE')) return 'Service Center'
    return 'General'
}

function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="group relative bg-brand-charcoal border border-white/[0.08] rounded-2xl p-4 md:p-5 hover:bg-white/[0.02] hover:border-[#FBBF24]/40 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      <div className="relative flex items-center gap-3 md:gap-4">
        <div className="relative flex-shrink-0">
          <div className={cn(
            "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl p-[2px] shadow-2xl",
            employee.status === 'active' ? "bg-emerald-500/50" : 
            employee.status === 'busy' ? "bg-red-500/50" : "bg-amber-500/50"
          )}>
            <img 
              src={employee.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'} 
              alt={employee.name} 
              className="w-full h-full object-cover rounded-[10px] md:rounded-[14px]"
            />
          </div>
          <div className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-brand-charcoal",
            employee.status === 'active' ? "bg-emerald-500" : 
            employee.status === 'busy' ? "bg-red-500" : "bg-amber-500"
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-black text-xs md:text-sm uppercase tracking-tight truncate leading-tight">
            {employee.name}
          </h3>
          <p className="text-[#FBBF24] text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-0.5 leading-none">
            {employee.role}
          </p>
          <div className="flex items-center gap-2 mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <span className="text-[8px] md:text-[9px] text-white/60 font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
              {employee.department}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 md:mt-5 pt-3 md:pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href={`mailto:${employee.email}`} className="text-white/30 hover:text-[#FBBF24] transition-colors p-1">
            <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </a>
          <a href={`tel:${employee.phone}`} className="text-white/30 hover:text-[#FBBF24] transition-colors p-1">
            <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </a>
        </div>
        <button className="text-white/30 hover:text-white transition-colors flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
          Profile <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
        </button>
      </div>
    </div>
  )
}

export function RosterClient({ initialEmployees }: { initialEmployees: Employee[] }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [filter, setFilter] = useState('All Employees')
  
  useEffect(() => {
    if (!db) return

    // Connect to real-time Firestore listener for 'users' collection
    const q = query(collection(db, 'users'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedEmployees: Employee[] = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name || 'Unknown',
          email: data.email || '',
          phone: data.phoneNumber || '',
          role: data.role || 'Member',
          department: mapRoleToDepartment(data.role || ''),
          photo: data.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
          status: data.status || 'active'
        }
      })
      setEmployees(updatedEmployees)
    }, (error) => {
      console.error('Roster sync error:', error)
    })

    return () => unsubscribe()
  }, [])

  const filteredEmployees = employees.filter(emp => {
      if (filter === 'All Employees') return true
      return emp.department === filter
  })

  return (
    <>
      {/* Filters/Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-white/[0.06] pb-1 overflow-x-auto no-scrollbar">
        {['All Employees', 'Management', 'Marketing', 'Service Center', 'Workshop'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setFilter(tab)}
            className={cn(
              "px-5 py-2.5 rounded-t-xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all",
              filter === tab ? "bg-white/[0.08] text-white border-b-2 border-[#FBBF24]" : "text-white/40 hover:text-white/60 hover:bg-white/5"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </>
  )
}

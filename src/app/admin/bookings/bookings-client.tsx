'use client'

import { format, parseISO } from 'date-fns'
import { Hash, User, Car, Calendar, Clock, ChevronRight, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface BookingCardProps {
    booking: any
}

function BookingCard({ booking }: BookingCardProps) {
    const statusColors = {
        'CONFIRMED': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        'PENDING': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        'CANCELLED': 'bg-red-500/10 text-red-500 border-red-500/20',
        'COMPLETED': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    } as any

    const dateStr = booking.bookingDate?.toDate?.() 
        ? booking.bookingDate.toDate().toISOString() 
        : booking.bookingDate || booking.date

    return (
        <div className="group relative bg-white border border-black/5 rounded-2xl p-5 hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white">
                        <Hash size={12} />
                    </div>
                    <span className="font-black text-xs text-brand-dark uppercase tracking-tighter">
                        {booking.bookingRef || booking.id?.slice(0, 8)}
                    </span>
                </div>
                <span className={cn(
                    "text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border",
                    statusColors[booking.status] || 'bg-gray-100 text-gray-500 border-gray-200'
                )}>
                    {booking.status}
                </span>
            </div>

            <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3">
                    <User size={14} className="text-brand-red" />
                    <span className="text-xs font-bold text-brand-dark">{booking.customerName || booking.fullName}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Car size={14} className="text-brand-red" />
                    <span className="text-xs font-bold text-brand-dark uppercase italic">{booking.brand} {booking.model}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-brand-red" />
                    <span className="text-xs font-bold text-brand-dark">
                        {dateStr ? format(typeof dateStr === 'string' ? parseISO(dateStr) : dateStr, 'PPP') : 'N/A'}
                    </span>
                </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-gray-50 text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-brand-dark group-hover:text-white transition-all flex items-center justify-center gap-2">
                Manage Details <ChevronRight size={12} />
            </button>
        </div>
    )
}

export function BookingsClient({ initialBookings }: { initialBookings: any[] }) {
    const [filter, setFilter] = useState('ALL')
    
    const stats = {
        total: initialBookings.length,
        confirmed: initialBookings.filter(b => b.status === 'CONFIRMED').length,
        pending: initialBookings.filter(b => b.status === 'PENDING').length,
    }

    const filtered = initialBookings.filter(b => {
        if (filter === 'ALL') return true
        return b.status === filter
    })

    return (
        <div className="space-y-8">
            {/* Stats Grid - Horizontal Scroll on Mobile */}
            <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                <div className="min-w-[160px] flex-1 bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Bookings</p>
                    <p className="text-3xl font-black text-brand-dark italic">{stats.total}</p>
                </div>
                <div className="min-w-[160px] flex-1 bg-white border border-black/5 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full -mr-8 -mt-8" />
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Confirmed</p>
                    <p className="text-3xl font-black text-brand-dark italic">{stats.confirmed}</p>
                </div>
                <div className="min-w-[160px] flex-1 bg-white border border-black/5 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full -mr-8 -mt-8" />
                    <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">Pending</p>
                    <p className="text-3xl font-black text-brand-dark italic">{stats.pending}</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-black/5 overflow-x-auto no-scrollbar">
                {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map(t => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={cn(
                            "px-4 py-3 text-[9px] font-black uppercase tracking-widest transition-all relative",
                            filter === t ? "text-brand-red" : "text-gray-400 hover:text-brand-dark"
                        )}
                    >
                        {t}
                        {filter === t && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            {filtered.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No matching records found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    )
}

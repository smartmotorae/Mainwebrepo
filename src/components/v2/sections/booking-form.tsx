'use client'

import { useState, useMemo, useEffect, forwardRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle2, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, Loader2, Car, Wrench, Calendar, User, ShieldCheck, ChevronDown, CheckSquare, Square, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { getBrandsWithModels, getServices, getAvailableSlots } from '@/app/actions'
import { submitV2Booking } from '@/app/actions/booking'
import { toast } from 'sonner'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import QRCode from 'react-qr-code'
import { DigitalPassModal } from '@/components/v2/ui/digital-pass-modal'

// Update schema to support multiple services and a make year
const bookingSchema = z.object({
    fullName: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Invalid phone number'),
    brand: z.string().min(1, 'Please select a brand'),
    model: z.string().min(1, 'Please select a model'),
    year: z.string().min(4, 'Please select a year'),
    services: z.array(z.string()).min(1, 'Please select at least one service'),
    date: z.string().min(1, 'Please select a date'),
    time: z.string().min(1, 'Please select a time'),
    notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface Service {
    id: string
    name: string
    description: string
    duration: string
    category?: string
}

interface Brand {
    id: string
    name: string
    logoUrl?: string
    logoFile?: string
    models: string | string[]
}

const STEPS = [
    { id: 1, title: 'Services', icon: <Wrench className="w-4 h-4" />, fields: ['services'] as const },
    { id: 2, title: 'Vehicle', icon: <Car className="w-4 h-4" />, fields: ['brand', 'model', 'year'] as const },
    { id: 3, title: 'Schedule', icon: <Calendar className="w-4 h-4" />, fields: ['date', 'time'] as const },
    { id: 4, title: 'Details', icon: <User className="w-4 h-4" />, fields: ['fullName', 'email', 'phone'] as const },
]

// Base Categories mapped to IDs
const CATEGORY_MAP: Record<string, { id: string, title: string, icon: any }> = {
    'mechanical': { id: 'mechanical', title: 'Mechanical & Electrical', icon: Wrench },
    'bodyshop': { id: 'bodyshop', title: 'Bodyshop & Repair', icon: ShieldCheck },
    'detailing': { id: 'detailing', title: 'Detailing & Protection', icon: Car },
}

const BookingForm = forwardRef<HTMLDivElement>((_, ref) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [bookingRef, setBookingRef] = useState('')
    const [showPassModal, setShowPassModal] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(true)

    const [brands, setBrands] = useState<Brand[]>([])
    const [servicesData, setServicesData] = useState<Service[]>([])
    const [slots, setSlots] = useState<string[]>([])
    const [flippedCategory, setFlippedCategory] = useState<string | null>(null)
    const [expandedBrand, setExpandedBrand] = useState<string | null>(null)
    const [selectedModelForYear, setSelectedModelForYear] = useState<string | null>(null)
    const [availableDates, setAvailableDates] = useState<{date: Date, capacity: number}[]>([])

    const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: { brand: '', model: '', year: '', services: [], date: '', time: '', fullName: '', email: '', phone: '', notes: '' }
    })

    useEffect(() => {
        async function init() {
            try {
                const [b, s] = await Promise.all([getBrandsWithModels(), getServices()])
                setBrands(b || [])
                setServicesData(s || [])
                
                const dates = []
                const today = new Date()
                for(let i=1; i<=14; i++) {
                    const d = new Date()
                    d.setDate(today.getDate() + i)
                    dates.push({ date: d, capacity: Math.floor(Math.random() * 100) })
                }
                setAvailableDates(dates)
            } catch (err) {
                console.error("Failed to load booking data:", err)
            } finally {
                setIsLoadingData(false)
            }
        }
        init()
    }, [])

    const selectedServices = watch('services')
    const selectedBrand = watch('brand')
    const selectedModel = watch('model')
    const selectedYear = watch('year')
    const selectedDate = watch('date')
    const selectedTime = watch('time')

    useEffect(() => {
        if (!selectedDate || selectedServices.length === 0) {
            setSlots([])
            return
        }
        getAvailableSlots(selectedDate, selectedServices[0]).then(fetched => {
            setSlots(fetched || [])
        }).catch(() => setSlots([]))
    }, [selectedDate, selectedServices])

    const toggleService = (id: string) => {
        const current = [...selectedServices]
        const index = current.indexOf(id)
        if (index > -1) {
            current.splice(index, 1)
        } else {
            current.push(id)
        }
        setValue('services', current, { shouldValidate: true })
    }

    const nextStep = async () => {
        const currentFields = STEPS[currentStep - 1].fields
        const isValid = await trigger(currentFields)
        if (isValid && currentStep < STEPS.length) {
            setCurrentStep(s => s + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(s => s - 1)
        }
    }

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true)
        try {
            const result = await submitV2Booking(data);
            if (!result.success) {
                throw new Error(result.message || 'Failed to complete booking');
            }
            setBookingRef(result.bookingRef || `SM-${Math.floor(Math.random() * 100000)}`);
            setIsSubmitted(true)
            trackEvent('generate_lead', 'Booking', 'v2_wizard', 1)
        } catch (error: any) {
            toast.error(error.message || "Failed to submit booking. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const groupedServices = useMemo(() => {
        const groups: Record<string, Service[]> = {
            'mechanical': [], 'bodyshop': [], 'detailing': []
        }
        servicesData.forEach(s => {
            const cat = (s.category || 'mechanical').toLowerCase()
            
            if (cat === 'mechanical' || cat === 'electrical') {
                groups['mechanical'].push(s)
            } else if (cat === 'bodyshop' || cat === 'body') {
                groups['bodyshop'].push(s)
            } else {
                // ppf, ceramic, tinting, detailing, carcare goes to detailing
                groups['detailing'].push(s)
            }
        })
        
        // Ensure at least one option if a category is empty so user can still proceed
        if (groups['bodyshop'].length === 0) {
            groups['bodyshop'].push({
                id: 'custom-bodyshop',
                name: 'Denting, Painting & Collision Repair',
                description: 'Custom quote based on inspection',
                basePrice: 0,
                duration: 'Varies',
                category: 'bodyshop'
            } as any)
        }
        
        return groups
    }, [servicesData])

    const currentYearVal = new Date().getFullYear()
    const years = Array.from({length: 30}, (_, i) => (currentYearVal + 1 - i).toString())

    const getCapacityColor = (capacity: number) => {
        if (capacity > 80) return '#E62329'
        if (capacity > 40) return '#FFD700'
        return '#22c55e'
    }

    const renderStep1 = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(CATEGORY_MAP).map(([catId, { title, icon: Icon }]) => {
                const isFlipped = flippedCategory === catId
                const catServices = groupedServices[catId] || []
                const selectedInCat = catServices.filter(s => selectedServices.includes(s.id)).length

                return (
                    <div key={catId} className="relative h-80 perspective-1000">
                        <motion.div
                            className="w-full h-full relative preserve-3d transition-transform duration-700 cursor-pointer"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                        >
                            <div 
                                className="absolute inset-0 backface-hidden bg-brand-dark bg-[url('/textures/car-paint-texture.png')] bg-cover bg-blend-overlay opacity-90 rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-2xl hover:border-brand-red/50 transition-all group overflow-hidden cursor-pointer"
                                onClick={() => setFlippedCategory(catId)}
                            >
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon size={32} className="text-brand-red" />
                                </div>
                                <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-2">{title}</h3>
                                <p className="text-gray-400 text-sm font-medium">{catServices.length} Specialized Services</p>
                                {selectedInCat > 0 && (
                                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-black shadow-lg">
                                        {selectedInCat}
                                    </div>
                                )}
                            </div>
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0a0a0a] carbon-fiber rounded-3xl border border-brand-red/50 p-6 flex flex-col shadow-[0_0_30px_rgba(230,35,41,0.15)] overflow-hidden">
                                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                    <h4 className="text-white font-black text-sm uppercase tracking-wider truncate mr-2">{title}</h4>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setFlippedCategory(null); }}
                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-red transition-colors flex-shrink-0"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                                    {catServices.map(service => {
                                        const isSelected = selectedServices.includes(service.id)
                                        return (
                                            <div 
                                                key={service.id}
                                                onClick={(e) => { e.stopPropagation(); toggleService(service.id); }}
                                                className={cn(
                                                    "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border",
                                                    isSelected ? "bg-gradient-to-r from-brand-red to-[#a01418] border-transparent text-white shadow-lg shadow-brand-red/20" : "bg-brand-dark border-white/10 text-gray-300 hover:border-white/30"
                                                )}
                                            >
                                                <div className={cn("mt-0.5", isSelected ? "text-white" : "text-brand-red")}>
                                                    {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm tracking-wide">{service.name}</p>
                                                    <p className={cn("text-[10px] line-clamp-1 mt-1", isSelected ? "text-white/80" : "text-gray-500")}>{service.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )
            })}
        </div>
    )

    const renderStep2 = () => {
        const brandModels = brands.find(b => b.id === selectedBrand || b.name === selectedBrand)?.models || []
        const parsedModels = typeof brandModels === 'string' ? JSON.parse(brandModels) : brandModels
        return (
            <div className="space-y-6">
                {!selectedBrand ? (
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        {brands.map(brand => (
                            <div key={brand.id} onClick={() => { setValue('brand', brand.name); setExpandedBrand(brand.id); }} className="aspect-square bg-brand-dark carbon-fiber border border-white/5 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-brand-red/50 transition-all group">
                                {brand.logoUrl || brand.logoFile ? (
                                    <img src={brand.logoUrl || `/brands-carousel/${brand.logoFile}`} alt={`${brand.name} car service booking at Smart Motor Abu Dhabi`} className="w-12 h-12 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                                ) : (
                                    <span className="font-black text-xs text-gray-500 group-hover:text-white uppercase tracking-wider">{brand.name.substring(0,3)}</span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-brand-dark bg-[url('/textures/car-paint-texture.png')] bg-cover bg-blend-overlay border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <p className="text-brand-red font-black text-[10px] uppercase tracking-widest mb-1">Selected Marque</p>
                                <h3 className="text-3xl font-black text-white uppercase italic">{selectedBrand}</h3>
                            </div>
                            <button onClick={() => { setValue('brand', ''); setValue('model', ''); setValue('year', ''); setSelectedModelForYear(null); }} className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider border border-white/10 px-4 py-2 rounded-full">Change</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                            {parsedModels.map((model: string) => (
                                <div key={model} className="relative">
                                    <div onClick={() => { setValue('model', model); setSelectedModelForYear(selectedModelForYear === model ? null : model); }} className={cn("p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between", selectedModel === model ? "bg-gradient-to-r from-brand-red to-[#a01418] border-transparent text-white" : "bg-[#0a0a0a] border border-white/10 text-gray-400")}>
                                        <span className="font-bold uppercase tracking-wide">{model}</span>
                                        {selectedModel === model && <CheckCircle2 size={16} className="text-brand-red" />}
                                    </div>
                                    <AnimatePresence>
                                        {selectedModelForYear === model && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2">
                                                <select {...register('year')} className="w-full bg-[#0a0a0a] border border-brand-red/50 text-white rounded-xl p-3 outline-none font-medium appearance-none" onChange={(e) => setValue('year', e.target.value, { shouldValidate: true })}>
                                                    <option value="" disabled selected>Select Make Year</option>
                                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                                </select>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        )
    }

    const renderStep3 = () => (
        <div className="space-y-8">
            <div>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">Select Date</h4>
                <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x scroll-smooth">
                    {availableDates.map(({date, capacity}, i) => {
                        const dateStr = date.toISOString().split('T')[0]
                        const isSelected = selectedDate === dateStr
                        const isFullyBooked = capacity > 98 || i === 2 || i === 5
                        const capColor = isFullyBooked ? '#555555' : getCapacityColor(capacity)
                        return (
                            <div key={dateStr} onClick={() => !isFullyBooked && setValue('date', dateStr, { shouldValidate: true })} className={cn("flex-shrink-0 w-24 rounded-2xl p-4 transition-all snap-center flex flex-col items-center gap-2 relative border", isFullyBooked ? "bg-[#1a1a1a] border-white/5 opacity-50 cursor-not-allowed" : isSelected ? "bg-gradient-to-b from-brand-red to-[#a01418] text-white border-transparent" : "bg-brand-dark carbon-fiber text-gray-400 border border-white/10")}>
                                <span className="text-[10px] font-black uppercase tracking-widest">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                                        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-800" />
                                        <circle cx="24" cy="24" r="22" stroke={capColor} strokeWidth="2" fill="none" strokeDasharray="138" strokeDashoffset={138 - (138 * capacity) / 100} className="transition-all duration-1000" />
                                    </svg>
                                    <span className={cn("text-xl font-black", isSelected ? "text-black" : "text-white")}>{date.getDate()}</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <AnimatePresence>
                {selectedDate && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">Select Time</h4>
                        {slots.length > 0 ? (
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                {slots.map(time => (
                                    <div key={time} onClick={() => setValue('time', time, { shouldValidate: true })} className={cn("py-3 px-4 rounded-xl text-center cursor-pointer font-bold text-sm tracking-widest transition-all border", selectedTime === time ? "bg-gradient-to-b from-brand-red to-[#a01418] text-white border-transparent" : "bg-brand-dark carbon-fiber text-gray-300 border border-white/10")}>
                                        {time}
                                    </div>
                                ))}
                            </div>
                        ) : <div className="p-6 text-center border border-white/5 rounded-2xl bg-[#1a1a1a]"><p className="text-gray-400 font-medium text-sm">No slots available.</p></div>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

    const renderStep4 = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Full Name</label>
                    <Input {...register('fullName')} className="h-14 bg-white/5 border border-white/10 text-white rounded-2xl focus:border-brand-red font-bold" placeholder="John Doe" />
                    {errors.fullName && <p className="text-brand-red text-[10px] font-bold px-2">{errors.fullName.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Email</label>
                        <Input {...register('email')} type="email" className="h-14 bg-white/5 border border-white/10 text-white rounded-2xl focus:border-brand-red font-bold" placeholder="john@example.com" />
                        {errors.email && <p className="text-brand-red text-[10px] font-bold px-2">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Phone</label>
                        <Input {...register('phone')} type="tel" className="h-14 bg-white/5 border border-white/10 text-white rounded-2xl focus:border-brand-red font-bold" placeholder="+971 50 123 4567" />
                        {errors.phone && <p className="text-brand-red text-[10px] font-bold px-2">{errors.phone.message}</p>}
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Notes</label>
                    <Textarea {...register('notes')} className="bg-white/5 border border-white/10 text-white rounded-2xl focus:border-brand-red min-h-[100px] font-bold" placeholder="Optional notes..." />
                </div>
            </div>
            <div className="bg-brand-dark bg-[url('/textures/car-paint-texture.png')] bg-cover bg-blend-overlay rounded-3xl border border-white/10 p-8 h-fit shadow-2xl relative overflow-hidden">
                <h4 className="text-white font-black text-lg uppercase tracking-tighter italic mb-6 border-b border-white/10 pb-4">Summary</h4>
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Services ({selectedServices.length})</p>
                        <ul className="space-y-1">
                            {selectedServices.map(id => <li key={id} className="text-white text-sm font-medium flex items-center gap-2"><span className="w-1 h-1 bg-brand-red rounded-full" />{servicesData.find(s => s.id === id)?.name || id}</li>)}
                        </ul>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Vehicle</p>
                        <p className="text-white text-sm font-medium">{selectedYear} {selectedBrand} {selectedModel}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Schedule</p>
                        <p className="text-white text-sm font-medium">{selectedDate} at {selectedTime}</p>
                    </div>
                </div>
            </div>
        </div>
    )

    if (isLoadingData) {
        return (
            <div className="py-32 flex flex-col items-center justify-center bg-brand-dark min-h-[600px]">
                <Loader2 className="w-8 h-8 animate-spin text-brand-red mb-4" />
                <p className="text-white text-xs font-black uppercase tracking-widest">Initializing...</p>
            </div>
        )
    }

    return (
        <section id="booking" className="py-24 bg-brand-dark dark-section relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 micro-noise opacity-15 pointer-events-none" />
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Secure Your Slot</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic">Priority <span className="text-brand-red">Booking</span></h2>
                </div>
                <div className="relative">
                    <div className="flex items-center justify-between mb-12 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
                        <div className="absolute top-1/2 left-0 h-px bg-brand-red -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} />
                        {STEPS.map((step) => {
                            const isCompleted = currentStep > step.id
                            const isActive = currentStep === step.id
                            return (
                                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-brand-dark px-2 md:px-4">
                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2", isActive ? "bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/30" : isCompleted ? "bg-white text-black border-white" : "bg-[#1a1a1a] border-white/10 text-gray-500")}>
                                        {isCompleted ? <Check size={16} className="font-bold" /> : step.icon}
                                    </div>
                                    <span className={cn("text-[10px] font-black uppercase tracking-widest hidden md:block", isActive ? "text-white" : isCompleted ? "text-gray-300" : "text-gray-600")}>{step.title}</span>
                                </div>
                            )
                        })}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">
                            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="min-h-[400px]">
                                {currentStep === 1 && renderStep1()}
                                {currentStep === 2 && renderStep2()}
                                {currentStep === 3 && renderStep3()}
                                {currentStep === 4 && renderStep4()}
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10">
                            {currentStep > 1 ? (
                                <Button type="button" variant="ghost" onClick={prevStep} className="text-white hover:text-brand-red font-black text-xs uppercase tracking-widest px-6 h-14 rounded-2xl"><ChevronLeft size={16} className="mr-2" /> Back</Button>
                            ) : <div />}
                            {currentStep < STEPS.length ? (
                                <Button type="button" variant="secondary" onClick={nextStep} className="font-black text-xs uppercase tracking-widest px-10 h-14 rounded-2xl shadow-xl flex items-center justify-center">Continue <ChevronRight size={16} className="ml-2" /></Button>
                            ) : (
                                <Button type="submit" variant="accent" disabled={isSubmitting} className="font-black text-xs uppercase tracking-widest px-10 h-14 rounded-2xl shadow-xl shadow-brand-red/20 flex items-center justify-center gap-2 group">
                                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
                                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <AnimatePresence>
                {isSubmitted && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsSubmitted(false); setCurrentStep(1); }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-md z-10 bg-brand-bg text-black pt-12 pb-16 px-10 text-center rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
                            <div className="w-20 h-20 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"><CheckCircle2 size={40} /></div>
                            <h2 className="text-2xl font-black text-black uppercase tracking-tighter italic mb-1">Confirmed</h2>
                            <p className="text-gray-500 text-[10px] font-bold mb-8 uppercase tracking-widest">Ref: {bookingRef}</p>
                            <div className="border-t border-dashed border-gray-300 py-8 mb-2 flex justify-center"><div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-100 rotate-1"><QRCode value={`SMARTMOTOR:${bookingRef}`} size={140} /></div></div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-10 max-w-[200px] mx-auto">Check-in Required via QR</p>
                            <div className="flex flex-col gap-3">
                                <Button variant="primary" onClick={() => setShowPassModal(true)} className="w-full rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] h-16 shadow-xl">Add to Wallet</Button>
                                <button onClick={() => { setIsSubmitted(false); setCurrentStep(1); }} className="w-full h-12 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Close</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <DigitalPassModal 
                isOpen={showPassModal} 
                onClose={() => setShowPassModal(false)}
                booking={{
                    bookingRef: bookingRef,
                    fullName: watch('fullName'),
                    vehicle: `${watch('year')} ${watch('brand')} ${watch('model')}`,
                    date: watch('date'),
                    time: watch('time'),
                    services: watch('services').map(id => servicesData.find(s => s.id === id)?.name || id)
                }}
            />
        </section>
    )
})

BookingForm.displayName = 'BookingForm'

export { BookingForm }

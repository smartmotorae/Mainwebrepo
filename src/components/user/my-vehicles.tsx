'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Vehicle } from '@/types/user';
import { Loader2, Car, Plus, X, Edit, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const vehicleSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear(), 'Invalid year'),
  vin: z.string().optional(),
  licensePlate: z.string().optional(),
  lastServiceMileage: z.number().optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

export function MyVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/user/vehicles');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      const data: Vehicle[] = await response.json();
      setVehicles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onAddVehicleSubmit = async (data: VehicleFormData) => {
    try {
      const response = await fetch('/api/user/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }
      toast.success('Vehicle added successfully!');
      setIsAdding(false);
      reset();
      fetchVehicles();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const onEditVehicleSubmit = async (data: VehicleFormData) => {
    if (!editingVehicleId) return;
    try {
      const response = await fetch(`/api/user/vehicles/${editingVehicleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update vehicle');
      }
      toast.success('Vehicle updated successfully!');
      setEditingVehicleId(null);
      reset();
      fetchVehicles();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const response = await fetch(`/api/user/vehicles/${vehicleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }
      toast.success('Vehicle deleted successfully!');
      fetchVehicles();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const startEditing = (vehicle: Vehicle) => {
    setEditingVehicleId(vehicle.id);
    setValue('make', vehicle.make);
    setValue('model', vehicle.model);
    setValue('year', vehicle.year);
    setValue('vin', vehicle.vin);
    setValue('licensePlate', vehicle.licensePlate);
    setValue('lastServiceMileage', vehicle.lastServiceMileage);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-black/5 shadow-xl flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-10 w-10 animate-spin text-brand-red mb-4" />
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Fleet...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-brand-red/20 shadow-xl text-center">
        <p className="text-brand-red font-bold uppercase text-xs tracking-widest mb-2">Sync Error</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black uppercase tracking-tighter italic text-brand-dark text-balance">My Garage</h2>
        {!isAdding && !editingVehicleId && (
          <Button 
            onClick={() => setIsAdding(true)} 
            variant="outline" 
            className="rounded-full font-black text-[10px] uppercase tracking-widest border-black/10 hover:bg-brand-dark hover:text-white transition-all"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Vehicle
          </Button>
        )}
      </div>

      {(isAdding || editingVehicleId) && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-5 md:p-8 border border-brand-red/20 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-black uppercase tracking-tighter italic text-brand-dark">
              {editingVehicleId ? 'Update Vehicle' : 'Register New Vehicle'}
            </h3>
            <button onClick={() => { setIsAdding(false); setEditingVehicleId(null); reset(); }} className="text-gray-400 hover:text-brand-red transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(editingVehicleId ? onEditVehicleSubmit : onAddVehicleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Make</label>
                <Input {...register('make')} placeholder="e.g. Porsche" className="h-12 bg-brand-bg border-black/5 text-brand-dark rounded-xl focus:ring-1 focus:ring-brand-red/50 font-bold text-sm" />
                {errors.make && <p className="text-brand-red text-[9px] font-bold">{errors.make.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Model</label>
                <Input {...register('model')} placeholder="e.g. 911 GT3" className="h-12 bg-brand-bg border-black/5 text-brand-dark rounded-xl focus:ring-1 focus:ring-brand-red/50 font-bold text-sm" />
                {errors.model && <p className="text-brand-red text-[9px] font-bold">{errors.model.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Year</label>
                <Input {...register('year', { valueAsNumber: true })} type="number" placeholder="2024" className="h-12 bg-brand-bg border-black/5 text-brand-dark rounded-xl focus:ring-1 focus:ring-brand-red/50 font-bold text-sm" />
                {errors.year && <p className="text-brand-red text-[9px] font-bold">{errors.year.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">License Plate</label>
                <Input {...register('licensePlate')} placeholder="Dubai A 12345" className="h-12 bg-brand-bg border-black/5 text-brand-dark rounded-xl focus:ring-1 focus:ring-brand-red/50 font-bold text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">VIN (Optional)</label>
                <Input {...register('vin')} placeholder="17-digit Chassis No." className="h-12 bg-brand-bg border-black/5 text-brand-dark rounded-xl focus:ring-1 focus:ring-brand-red/50 font-bold text-sm" />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full h-14 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest mt-4">
              {editingVehicleId ? 'Update Fleet Record' : 'Register to Garage'}
            </Button>
          </form>
        </motion.div>
      )}

      {vehicles.length === 0 && !isAdding && !editingVehicleId ? (
        <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center">
          <Car className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest text-balance">Your garage is empty. Add your first vehicle to start tracking service history.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="group relative bg-white rounded-2xl p-6 border border-black/5 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[180px]"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-1">{vehicle.make}</p>
                    <h3 className="text-xl font-black text-brand-dark uppercase italic tracking-tighter">{vehicle.year} {vehicle.model}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-bg border border-black/5 flex items-center justify-center text-brand-dark">
                    <Car size={20} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  {vehicle.licensePlate && (
                    <div className="bg-gray-100 px-2 py-1 rounded border border-gray-200">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Plate</p>
                      <p className="text-[10px] font-bold text-brand-dark">{vehicle.licensePlate}</p>
                    </div>
                  )}
                  {vehicle.vin && (
                    <div className="bg-gray-100 px-2 py-1 rounded border border-gray-200">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">VIN</p>
                      <p className="text-[10px] font-bold text-brand-dark truncate max-w-[100px]">{vehicle.vin}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative z-10 flex justify-end gap-2 mt-6 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => startEditing(vehicle)}
                  className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-brand-dark hover:bg-gray-100 transition-all"
                  title="Edit Vehicle"
                >
                  <Edit size={14} />
                </button>
                <button 
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                  className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-brand-red hover:bg-brand-red/5 transition-all"
                  title="Remove Vehicle"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

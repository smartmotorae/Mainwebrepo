'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Award, Gem, User, History, CheckCircle2, Edit, X, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const loyaltyAdjustmentSchema = z.object({
  points: z.number().int().optional(),
  tier: z.enum(['bronze', 'silver', 'gold', 'platinum']).optional(),
  reason: z.string().min(3, 'Reason is required'),
});

type LoyaltyAdjustmentFormData = z.infer<typeof loyaltyAdjustmentSchema>;

export default function LoyaltyManagementPage() {
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<UserProfile | null>(null);
  const [isAdjustingLoyalty, setIsAdjustingLoyalty] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]); // To store audit logs

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<LoyaltyAdjustmentFormData>({
    resolver: zodResolver(loyaltyAdjustmentSchema),
  });

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/customers?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    // TODO: Implement an API endpoint for fetching audit logs specific to loyalty
    // For now, mock some audit logs
    setAuditLogs([
      { id: '1', action: 'Loyalty adjustment', target: 'John Doe', oldPoints: 100, newPoints: 150, reason: 'Bonus for referral', timestamp: '2026-02-20' },
      { id: '2', action: 'Tier upgrade', target: 'Jane Smith', oldTier: 'bronze', newTier: 'silver', reason: 'Reached point threshold', timestamp: '2026-02-18' },
    ]);
  };

  useEffect(() => {
    fetchCustomers();
    fetchAuditLogs();
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers();
  };

  const onLoyaltyAdjustSubmit = async (data: LoyaltyAdjustmentFormData) => {
    if (!selectedCustomer) return;

    try {
      const response = await fetch('/api/admin/loyalty', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: selectedCustomer.uid,
          points: data.points !== undefined ? data.points : selectedCustomer.loyaltyPoints,
          tier: data.tier !== undefined ? data.tier : selectedCustomer.tier,
          adminId: 'current_admin_uid', // Replace with actual admin UID
          reason: data.reason,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to adjust loyalty');
      }
      toast.success('Loyalty adjusted successfully!');
      setIsAdjustingLoyalty(false);
      setSelectedCustomer(null);
      reset();
      fetchCustomers(); // Re-fetch customers to update loyalty display
      fetchAuditLogs(); // Re-fetch audit logs
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const getTierColor = (tier: UserProfile['tier']) => {
    switch (tier) {
      case 'bronze': return 'text-amber-700';
      case 'silver': return 'text-slate-400';
      case 'gold': return 'text-yellow-500';
      case 'platinum': return 'text-blue-400';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-black text-brand-dark mb-6 uppercase tracking-tighter italic">Loyalty Management</h1>

      <Card className="bg-white rounded-lg shadow-md mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-brand-dark uppercase tracking-tight">Customer Loyalty</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
            <Input
              type="text"
              placeholder="Search customer by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-black placeholder:text-gray-400"
            />
            <Button type="submit" variant="primary">
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
          </form>

          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
              <span className="ml-3 text-gray-400 font-black uppercase tracking-widest text-xs">Loading customers...</span>
            </div>
          ) : error ? (
            <div className="p-6 text-red-600">
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Error: {error}</p>
            </div>
          ) : customers.length === 0 ? (
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No customers found.</p>
          ) : (
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.uid} className="border p-4 rounded-lg bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="font-black text-brand-dark flex items-center gap-2"><User className="w-4 h-4 text-gray-500" />{customer.name}</p>
                    <p className="text-xs text-gray-700">Email: {customer.email}</p>
                    <p className={`text-xs ${getTierColor(customer.tier)} flex items-center gap-2`}><Award className="w-4 h-4 text-gray-500" />Tier: <span className="font-black uppercase tracking-widest text-brand-red">{customer.tier}</span> ({customer.loyaltyPoints} points)</p>
                  </div>
                  <Button onClick={() => { setSelectedCustomer(customer); setIsAdjustingLoyalty(true); reset({ points: customer.loyaltyPoints, tier: customer.tier, reason: '' }); }} variant="outline" size="sm" className="text-xs font-black uppercase tracking-widest">
                    <Edit className="w-4 h-4 mr-2" /> Adjust
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isAdjustingLoyalty && selectedCustomer && (
        <Card className="bg-white rounded-lg shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-brand-dark">Adjust Loyalty for {selectedCustomer.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onLoyaltyAdjustSubmit)} className="space-y-4">
              <div>
                <label htmlFor="points" className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Loyalty Points</label>
                <Input id="points" type="number" {...register('points', { valueAsNumber: true })} className="text-black placeholder:text-gray-400" />
                {errors.points && <p className="text-red-500 text-xs mt-1">{errors.points.message}</p>}
              </div>
              <div>
                <label htmlFor="tier" className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Loyalty Tier</label>
                <Select onValueChange={(value: UserProfile['tier']) => setValue('tier', value)} defaultValue={selectedCustomer.tier}>
                  <SelectTrigger className="w-full text-black placeholder:text-gray-400">
                    <SelectValue placeholder="Select a tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tier && <p className="text-red-500 text-xs mt-1">{errors.tier.message}</p>}
              </div>
              <div>
                <label htmlFor="reason" className="block text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Reason for Adjustment</label>
                <Input id="reason" {...register('reason')} className="text-black placeholder:text-gray-400" />
                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => { setIsAdjustingLoyalty(false); setSelectedCustomer(null); reset(); }} className="text-xs font-black uppercase tracking-widest">
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button type="submit" variant="primary" className="text-xs font-black uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-brand-dark uppercase tracking-tight">Loyalty Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {auditLogs.length === 0 ? (
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No audit logs found.</p>
          ) : (
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="border p-4 rounded-lg bg-gray-50">
                  <p className="font-black text-brand-dark flex items-center gap-2"><History className="w-4 h-4 text-gray-500" />{log.action} for {log.target}</p>
                  <p className="text-xs text-gray-700">Admin: {log.changedBy} | Reason: {log.reason}</p>
                  <p className="text-xs text-gray-700">Points: <span className="font-black text-brand-red">{log.oldPoints}</span> -&gt; <span className="font-black text-brand-red">{log.newPoints}</span> | Tier: <span className="font-black uppercase tracking-widest text-brand-red">{log.oldTier || 'N/A'}</span> -&gt; <span className="font-black uppercase tracking-widest text-brand-red">{log.newTier || 'N/A'}</span></p>
                  <p className="text-xs text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" />Timestamp: {log.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

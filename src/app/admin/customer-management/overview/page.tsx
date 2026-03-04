'use client';

import { UserProfile } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, User, Mail, Phone, Car, Award, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CustomerOverviewPage() {
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const customersPerPage = 10; // Assuming 10 customers per page for now

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/customers?search=${searchTerm}&limit=${customersPerPage}&offset=${(currentPage - 1) * customersPerPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
      // For a real pagination, the API would return total count, then calculate totalPages
      // For now, mock total pages based on fetched data length
      setTotalPages(Math.ceil(data.length / customersPerPage) || 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchCustomers();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-black text-brand-dark mb-6 uppercase tracking-tighter italic">Customer Overview</h1>

      <Card className="bg-white rounded-lg shadow-md mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-brand-dark uppercase tracking-tight">Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
            <Input
              type="text"
              placeholder="Search by name or email..."
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
                <div key={customer.uid} className="border p-4 rounded-lg bg-gray-50">
                  <p className="font-black text-brand-dark flex items-center gap-2"><User className="w-4 h-4 text-gray-500" />{customer.name}</p>
                  <p className="text-xs text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-500" />{customer.email}</p>
                  {customer.phone && <p className="text-xs text-gray-700 flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500" />{customer.phone}</p>}
                  <p className="text-xs text-gray-700 flex items-center gap-2"><Award className="w-4 h-4 text-gray-500" />Loyalty Tier: <span className="font-black uppercase tracking-widest text-brand-red">{customer.tier}</span> ({customer.loyaltyPoints} points)</p>
                  {/* TODO: Link to detailed customer profile page */}
                  <Button variant="ghost" className="mt-2 text-xs text-brand-red font-black uppercase tracking-widest">View Details</Button>
                </div>
              ))}
            </div>
          )}

          {/* Basic Pagination */}
          {customers.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="text-xs font-black uppercase tracking-widest"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="text-xs font-black uppercase tracking-widest"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

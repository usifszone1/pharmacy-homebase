
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft, Filter, Pill, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/components/NavBar';
import { useToast } from '@/components/ui/toast';
import { fetchCustomers, Customer } from '@/utils/database';

interface Medicine {
  id: number;
  name: string;
  type: string;
  price: number;
  stock: boolean;
}

const mockMedicines: Medicine[] = [
  { id: 1, name: 'Paracetamol', type: 'Pain Relief', price: 25, stock: true },
  { id: 2, name: 'Amoxicillin', type: 'Antibiotic', price: 45, stock: true },
  { id: 3, name: 'Omeprazole', type: 'Antacid', price: 35, stock: false },
  { id: 4, name: 'Metformin', type: 'Diabetes', price: 30, stock: true },
  { id: 5, name: 'Atorvastatin', type: 'Cholesterol', price: 60, stock: true },
  { id: 6, name: 'Aspirin', type: 'Pain Relief', price: 15, stock: true },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('medicines');
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>(mockMedicines);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch all customers when component mounts
  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error('Failed to load customers:', error);
        toast({
          title: 'Error',
          description: 'Failed to load customer data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomers();
  }, [toast]);

  // Handle search filter
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If search is cleared, reset to original lists
      setFilteredMedicines(mockMedicines);
      setFilteredCustomers(customers);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(async () => {
      try {
        if (activeTab === 'medicines') {
          const queryLower = searchQuery.toLowerCase();
          const results = mockMedicines.filter(medicine => 
            medicine.name.toLowerCase().includes(queryLower) ||
            medicine.type.toLowerCase().includes(queryLower)
          );
          setFilteredMedicines(results);
        } else {
          // For customers, use our API endpoint
          const results = await fetchCustomers(searchQuery);
          setFilteredCustomers(results);
        }
      } catch (error) {
        console.error('Search error:', error);
        toast({
          title: 'Search Error',
          description: 'An error occurred while searching. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab, customers, toast]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-pharmacy-bg pb-20">
      <NavBar />
      
      <main className="container-custom pt-32">
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-navy hover:text-pharmacy-accent transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-display">Search</h1>
          <p className="text-gray-600 max-w-2xl">
            Find medications, customers, or services available at EL-ZOHOR PHARMACY.
          </p>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for medicines or customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-14 border border-gray-300 focus:ring-pharmacy-accent focus:border-pharmacy-accent rounded-lg shadow-sm"
          />
        </div>
        
        {/* Tabs for different search categories */}
        <Tabs defaultValue="medicines" onValueChange={handleTabChange} className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="medicines" className="data-[state=active]:bg-navy data-[state=active]:text-white">
                <Pill className="h-4 w-4 mr-2" />
                Medicines
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-navy data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Customers
              </TabsTrigger>
            </TabsList>
            
            <Button variant="ghost" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-navy"></div>
            </div>
          )}
          
          {/* Medicines Tab Content */}
          <TabsContent value="medicines" className={cn(isLoading ? 'hidden' : 'block')}>
            {filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map((medicine) => (
                  <div 
                    key={medicine.id}
                    className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-navy mb-2">{medicine.name}</h3>
                      <p className="text-gray-600 mb-4">Type: {medicine.type}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-medium text-navy">{medicine.price} EGP</span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium",
                          medicine.stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}>
                          {medicine.stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No medicines found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          {/* Customers Tab Content */}
          <TabsContent value="customers" className={cn(isLoading ? 'hidden' : 'block')}>
            {filteredCustomers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden shadow-card">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Organization</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Last Visit</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-navy">{customer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.organization || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {new Date(customer.lastVisit).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button variant="ghost" className="text-pharmacy-accent hover:text-navy transition-colors">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No customers found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Search;

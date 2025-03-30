
import { useState, useEffect } from 'react';
import { ArrowRight, Search as SearchIcon, Filter, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NavBar from '@/components/NavBar';
import { useToast } from '@/hooks/use-toast';
import { fetchCustomers, Customer, getCustomerCategories } from '@/utils/database';

const ArabicSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const categories = getCustomerCategories();

  // Fetch all customers when component mounts
  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to load customers:', error);
        toast({
          title: 'خطأ',
          description: 'فشل في تحميل بيانات العملاء. يرجى المحاولة مرة أخرى.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomers();
  }, [toast]);

  // Handle search
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await fetchCustomers(searchQuery, selectedCategory);
      setCustomers(results);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'خطأ في البحث',
        description: 'حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pharmacy-bg pb-20" dir="rtl" lang="ar">
      <NavBar />
      
      <main className="container-custom pt-32">
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-navy hover:text-pharmacy-accent transition-colors mb-4"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة إلى الصفحة الرئيسية
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-display">بحث العملاء</h1>
          <p className="text-gray-600 max-w-2xl">
            البحث عن العملاء المسجلين في صيدلية الزهور
          </p>
        </div>
        
        {/* Search Form */}
        <div className="bg-white p-6 rounded-xl shadow-card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="البحث باسم العميل أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12 text-right border border-gray-300 focus:ring-pharmacy-accent focus:border-pharmacy-accent rounded-lg shadow-sm"
              />
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="فئة العميل" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <Button 
              className="h-12 px-8 bg-navy hover:bg-navy/90 text-white"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                  جاري البحث...
                </span>
              ) : (
                <>
                  <SearchIcon className="h-4 w-4 ml-2" />
                  بحث
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-navy flex items-center">
            <User className="h-5 w-5 ml-2" />
            نتائج البحث
            {customers.length > 0 && (
              <span className="mr-2 text-sm text-gray-500">({customers.length} عميل)</span>
            )}
          </h2>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-navy"></div>
          </div>
        )}
        
        {/* Customers List */}
        {!isLoading && (
          <>
            {customers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden shadow-card">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-navy">الاسم</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-navy">رقم الهاتف</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-navy">الفئة</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-navy">المؤسسة</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-navy">آخر زيارة</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-navy">{customer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${customer.category === 'VIP' ? 'bg-purple-100 text-purple-800' : 
                              customer.category === 'جديد' ? 'bg-green-100 text-green-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {customer.category || 'عادي'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.organization || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {new Date(customer.lastVisit).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          <Button variant="ghost" className="text-pharmacy-accent hover:text-navy transition-colors">
                            عرض التفاصيل
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-card">
                <p className="text-gray-600">لم يتم العثور على أي عملاء مطابقين لمعايير البحث.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ArabicSearch;

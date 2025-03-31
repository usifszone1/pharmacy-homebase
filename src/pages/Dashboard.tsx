
import { useUser } from '@clerk/clerk-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-pharmacy-bg">
      <NavBar />
      
      <main className="container-custom py-16">
        <div className="bg-white shadow-card rounded-xl p-8">
          <h1 className="text-3xl font-bold text-navy mb-6">Welcome, {user?.firstName || 'User'}</h1>
          <p className="text-lg text-gray-700 mb-4">This is your personal dashboard at EL-ZOHOR PHARMACY.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-navy/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-navy mb-3">Prescriptions</h3>
              <p className="text-gray-600">View and manage your prescriptions history.</p>
            </div>
            
            <div className="bg-navy/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-navy mb-3">Invoices</h3>
              <p className="text-gray-600">Access all your pharmacy invoices.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

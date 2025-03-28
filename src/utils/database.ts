
import { databaseConfig } from '@/config/database';

interface DbConnection {
  servername: string;
  username: string;
  password: string;
  dbname: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  organization?: string;
  cardNo?: string;
  agenda?: string;
  pageNo?: string;
  notes?: string;
}

// Mock customer data - in a real implementation, this would come from the database
const mockCustomers: Customer[] = [
  { 
    id: 1, 
    name: 'Test Patient', 
    phone: '123456789', 
    lastVisit: new Date().toISOString(), 
    organization: 'Organization1',
    cardNo: '12345',
    agenda: 'Test Agenda',
    pageNo: '1',
    notes: 'Test Notes'
  },
  { id: 2, name: 'Ahmed Mohamed', phone: '0100123456', lastVisit: '2023-10-15', organization: 'National Bank Of Egypt' },
  { id: 3, name: 'Fatima Ali', phone: '0111234567', lastVisit: '2023-11-05', organization: 'ECARD' },
  { id: 4, name: 'Omar Khaled', phone: '0122345678', lastVisit: '2023-12-20', organization: 'MASHROEY' },
  { id: 5, name: 'Laila Ibrahim', phone: '0133456789', lastVisit: '2024-01-08', organization: 'Agricultural Bank of Egypt' },
  { id: 6, name: 'Mahmoud Samir', phone: '0144567890', lastVisit: '2024-02-15', organization: 'National Bank Of Egypt' },
  { id: 7, name: 'Nour Hassan', phone: '0155678901', lastVisit: '2024-03-10', organization: 'GPS' },
  { id: 8, name: 'Youssef Ahmed', phone: '0166789012', lastVisit: '2024-04-05', organization: 'TASAHEEL' },
  { id: 9, name: 'Rana Kamal', phone: '0177890123', lastVisit: '2024-05-20', organization: 'Nasser Social Bank' },
  { id: 10, name: 'Karim Mostafa', phone: '0188901234', lastVisit: '2024-06-12', organization: 'EGY Serv' },
  { id: 11, name: 'Hana El-Sayed', phone: '0199012345', lastVisit: '2024-07-01', organization: 'Egyptian Senate' }
];

export const getDbConfig = (): DbConnection => {
  return databaseConfig.db;
};

export const getOrganizations = (): string[] => {
  return databaseConfig.organizations;
};

/**
 * Function to create a database connection
 * 
 * Note: This is a placeholder function since browser-based JavaScript
 * cannot directly connect to a MySQL database. For actual implementation,
 * you would need a backend service (Node.js, PHP, etc.) 
 * that uses this configuration to create the connection.
 */
export const createDbConnection = async () => {
  console.log('Database connection would be created with these parameters:', getDbConfig());
  // In a real implementation, you would use these credentials with a backend service
  // The frontend would then communicate with that backend through APIs
  
  return {
    isConnected: true,
    message: 'This is a simulated connection. In a real app, you would connect through a backend API.'
  };
};

/**
 * Simulated API function to fetch customers
 * 
 * This mimics how a real API would work, including:
 * - Delayed response to simulate network request
 * - Optional search parameters
 * - Error handling
 */
export const fetchCustomers = async (searchQuery?: string): Promise<Customer[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // In a real implementation, this would be an API call to a backend service
    // that connects to your MySQL database with proper authentication
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(query) || 
        customer.phone.includes(query) ||
        (customer.organization && customer.organization.toLowerCase().includes(query)) ||
        (customer.cardNo && customer.cardNo.includes(query)) ||
        (customer.agenda && customer.agenda.toLowerCase().includes(query)) ||
        (customer.notes && customer.notes.toLowerCase().includes(query))
      );
    }
    
    return mockCustomers;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers. Please try again later.');
  }
};

/**
 * Get customer by ID
 */
export const getCustomerById = async (id: number): Promise<Customer | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const customer = mockCustomers.find(c => c.id === id);
    return customer || null;
  } catch (error) {
    console.error('Error fetching customer details:', error);
    throw new Error('Failed to fetch customer details. Please try again later.');
  }
};

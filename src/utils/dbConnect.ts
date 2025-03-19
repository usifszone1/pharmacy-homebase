
type DatabaseConfig = {
  servername: string;
  username: string;
  password: string;
  dbname: string;
};

const dbConfig: DatabaseConfig = {
  servername: "localhost",
  username: "zohourph_ph",
  password: "Shemo_7bibty",
  dbname: "zohourph_ph"
};

export const getDbConfig = (): DatabaseConfig => {
  return dbConfig;
};

// This function would be used in server-side code to create a connection
// For frontend, we would use this config with an API request
export const createApiEndpoint = (endpoint: string): string => {
  const { servername } = getDbConfig();
  return `https://${servername}/api/${endpoint}`;
};

// This is a mock function to simulate data fetching from the database
export const fetchDataFromDb = async <T>(endpoint: string): Promise<T> => {
  const apiUrl = createApiEndpoint(endpoint);
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    throw new Error(`Database fetch failed: ${response.status}`);
  }
  
  return response.json() as Promise<T>;
};

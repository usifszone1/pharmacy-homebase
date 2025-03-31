import { ReactNode } from 'react';
import { useAuth, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check if we're using Clerk (VITE_CLERK_PUBLISHABLE_KEY is defined)
  const isClerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  
  // If Clerk is not enabled, simply render the children
  if (!isClerkEnabled) {
    return <>{children}</>;
  }
  
  // Otherwise, use Clerk's authentication
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;

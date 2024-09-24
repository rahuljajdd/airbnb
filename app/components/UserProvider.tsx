'use client';
import React, { useEffect, useState, createContext, ReactNode } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

// Define the structure of userInfo based on what your API returns
export interface userInfo {
    id: string; // Corresponds to the ObjectId in MongoDB
    email: string;
    hashedPassword?: string; // Optional
    clerkId?: string; // Optional
    image?: string; // Optional
    username: string;
    verified?: boolean; // Optional
    verifyToken?: string; // Optional
    verifyTokenExpiry?: Date; // Optional
    otpForForgotPassword?: number; // Optional
    createdAt: Date;
    updatedAt: Date;

  }

// Define the context type
interface ContextType {
  userInfo: userInfo | null;
  setuserInfo: React.Dispatch<React.SetStateAction<userInfo | null>>;
}

// Create context with proper typing
export const Context = createContext<ContextType | undefined>(undefined);
const { Provider } = Context;

interface UserProvidersProps {
  children: ReactNode;
}

export const UserProviders = ({ children }: UserProvidersProps) => {
  const { user } = useUser();
  if(user){

console.log('user')
    console.log(user)
  }
  const [userInfo, setuserInfo] = useState<userInfo | null>(null);

  useEffect(() => {
    if (user && user.emailAddresses.length > 0) {
      axios
        .post('/api/user', {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        })
        .then((res) => {
          console.log(res.data)
          setuserInfo(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [user]);

  return (
    <Provider value={{ userInfo, setuserInfo }}>
      {children}
    </Provider>
  );
};
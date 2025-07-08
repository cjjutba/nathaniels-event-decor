import React from 'react';
import { Navbar } from '@/components/client/Navbar';
import { Footer } from '@/components/client/Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  navigate: (path: string) => void;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  currentPage,
  isMenuOpen,
  setIsMenuOpen,
  navigate,
}) => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar 
        currentPage={currentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navigate={navigate}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

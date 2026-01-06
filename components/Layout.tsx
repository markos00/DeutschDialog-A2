import React, { ReactNode } from 'react';
import { BookOpen, Gamepad2, GraduationCap, Home, Layers, Menu, PenTool, X, Book } from 'lucide-react';
import { View } from '../types';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: View.HOME, label: 'Startseite', icon: Home },
    { id: View.TOPICS, label: 'Themen', icon: BookOpen },
    { id: View.VOCAB_TRAINER, label: 'Wortschatz', icon: Layers }, 
    { id: View.GRAMMAR, label: 'Grammatik', icon: Book }, // New Nav Item
    { id: View.GAMES, label: 'Spiele', icon: Gamepad2 },
    { id: View.EXAM_HUB, label: 'Prüfung', icon: GraduationCap },
    { id: View.TOOLS, label: 'Tools', icon: PenTool },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 font-bold text-xl cursor-pointer"
              onClick={() => onNavigate(View.HOME)}
            >
              <div className="bg-white text-indigo-600 p-1.5 rounded-lg">
                <span className="text-xl">🇩🇪</span>
              </div>
              <span>{APP_NAME}</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === item.id || (currentView.startsWith('VOCAB') && item.id === View.VOCAB_TRAINER) || (currentView.startsWith('EXAM') && item.id === View.EXAM_HUB)
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-indigo-100 hover:bg-indigo-500 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-indigo-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentView === item.id
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} {APP_NAME} - Interaktives Deutschlernen mit KI-Unterstützung.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
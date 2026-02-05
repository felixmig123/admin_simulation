import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routes/AppRouter';
import { DemoBanner } from './components/ui/DemoBanner';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <DemoBanner />
          <div className="flex-1">
            <AppRouter />
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

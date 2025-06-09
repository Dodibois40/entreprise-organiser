import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Entreprise Organiser
            </h1>
          </div>
          
          {/* Contenu dynamique des pages d'authentification */}
          <Outlet />
          
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
            © {new Date().getFullYear()} Entreprise Organiser - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 
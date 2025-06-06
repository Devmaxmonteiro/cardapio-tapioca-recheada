'use client';

import React, { useState } from 'react';
import { 
  LogOut, 
  Package, 
  DollarSign, 
  Image as ImageIcon, 
  Settings,
  BarChart3,
  Home
} from 'lucide-react';
import { ProductManager } from './ProductManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'overview' | 'products' | 'prices' | 'images' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'prices', label: 'Preços', icon: DollarSign },
    { id: 'images', label: 'Imagens', icon: ImageIcon },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent setActiveTab={setActiveTab} />;
      case 'products':
        return <ProductsContent />;
      case 'prices':
        return <PricesContent />;
      case 'images':
        return <ImagesContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <OverviewContent setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  Admin - Tapioca Recheada
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/"
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Home className="h-5 w-5 mr-1" />
                Ver Site
              </a>
              <button
                onClick={onLogout}
                className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm border p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-100 text-orange-700 border-orange-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OverviewContentProps {
  setActiveTab: (tab: TabType) => void;
}

const OverviewContent: React.FC<OverviewContentProps> = ({ setActiveTab }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <Package className="h-8 w-8 mr-3" />
            <div>
              <p className="text-blue-100">Total de Produtos</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 mr-3" />
            <div>
              <p className="text-green-100">Preço Médio</p>
              <p className="text-2xl font-bold">R$ 14,50</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <ImageIcon className="h-8 w-8 mr-3" />
            <div>
              <p className="text-purple-100">Imagens</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 mr-3" />
            <div>
              <p className="text-orange-100">Status</p>
              <p className="text-2xl font-bold">Ativo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acesso Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Gerenciar Produtos</h4>
            <p className="text-sm text-gray-600 mb-3">Adicione, edite ou remova produtos do cardápio</p>
            <button 
              onClick={() => setActiveTab('products')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Ir para Produtos →
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Configurar Preços</h4>
            <p className="text-sm text-gray-600 mb-3">Atualize os preços dos produtos rapidamente</p>
            <button 
              onClick={() => setActiveTab('prices')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Ir para Preços →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsContent: React.FC = () => {
  return <ProductManager />;
};

const PricesContent: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurar Preços</h2>
      <div className="text-center py-12">
        <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Em desenvolvimento...</p>
      </div>
    </div>
  );
};

const ImagesContent: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Imagens</h2>
      <div className="text-center py-12">
        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Em desenvolvimento...</p>
      </div>
    </div>
  );
};

const SettingsContent: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h2>
      
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">Informações de Login</h3>
          <p className="text-sm text-yellow-700 mb-2">
            <strong>Usuário:</strong> admin
          </p>
          <p className="text-sm text-yellow-700">
            <strong>Senha:</strong> tapioca2024
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Como Acessar</h3>
          <p className="text-sm text-blue-700">
            Para acessar a área administrativa, vá para: <strong>/admin</strong>
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Funcionalidades</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Gerenciamento de produtos</li>
            <li>✅ Configuração de preços</li>
            <li>✅ Upload de imagens</li>
            <li>✅ Área protegida por login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 
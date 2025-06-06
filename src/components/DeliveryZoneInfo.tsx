'use client';

import React, { useState } from 'react';
import { deliveryZones } from '@/data/delivery';
import { MapPin, Clock, Truck, ChevronDown, ChevronUp } from 'lucide-react';

export const DeliveryZoneInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Truck className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">
            📍 Zonas de Entrega - Paulo Afonso, BA
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600" />
        )}
      </div>
      
      <div className="mt-2 text-sm text-blue-700">
        🚚 Entregamos em toda Paulo Afonso! Clique para ver detalhes das zonas.
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {deliveryZones
            .filter(zone => zone.isActive && zone.id !== 'zona-geral')
            .map((zone) => (
              <div key={zone.id} className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{zone.name}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-green-600">
                      <span>💰</span>
                      <span>R$ {zone.fee.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Clock className="w-3 h-3" />
                      <span>{zone.estimatedTime} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {zone.neighborhoods
                    .filter(n => !['Paulo Afonso', 'PA', 'paulo afonso', 'PAULO AFONSO', 'Bahia', 'BA', 'bahia', 'BAHIA'].includes(n))
                    .slice(0, 6)
                    .map((neighborhood) => (
                      <span
                        key={neighborhood}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                      >
                        {neighborhood}
                      </span>
                    ))}
                  {zone.neighborhoods.length > 6 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{zone.neighborhoods.length - 6} mais
                    </span>
                  )}
                </div>
              </div>
            ))}
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">Dica:</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Não encontrou seu bairro? Digite apenas &quot;Paulo Afonso&quot; no campo bairro que funciona para toda a cidade! 🏠
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 
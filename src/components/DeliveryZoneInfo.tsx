'use client';

import React, { useState } from 'react';
import { deliveryZones } from '@/data/delivery';
import { MapPin, Clock, Truck, ChevronDown, ChevronUp } from 'lucide-react';

export const DeliveryZoneInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Truck className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-green-800">
            🚚 Entrega a partir de Moxotó para Paulo Afonso
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-green-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-green-600" />
        )}
      </div>
      
      <div className="mt-2 text-sm text-green-700 font-medium">
        ✅ Valores fixos por bairro - Sempre entregamos!
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {deliveryZones
            .filter(zone => zone.isActive)
            .map((zone) => (
              <div key={zone.id} className="bg-white rounded-lg p-3 border border-green-100">
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
                    .slice(0, 4)
                    .map((neighborhood) => (
                      <span
                        key={neighborhood}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                      >
                        {neighborhood}
                      </span>
                    ))}
                  {zone.neighborhoods.length > 4 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{zone.neighborhoods.length - 4} variações
                    </span>
                  )}
                </div>
              </div>
            ))}
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
            <div className="flex items-center space-x-2 text-green-800">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">🎯 Localização:</span>
            </div>
            <p className="text-sm text-green-700 mt-1 font-medium">
              Saindo de Moxotó, Paulo Afonso - BA
            </p>
            <p className="text-xs text-green-600 mt-1">
              Valores fixos por destino - Sem promoções de desconto nos produtos
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 
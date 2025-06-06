'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CustomerData, PaymentMethod, OrderStatus } from '@/types/menu';
import { X, User, MapPin, CreditCard, ArrowLeft, ArrowRight, Phone, Send, CheckCircle, Banknote, MessageCircle } from 'lucide-react';
import { DeliveryZoneInfo } from './DeliveryZoneInfo';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { 
    state, 
    setCustomerData, 
    setPaymentMethod, 
    calculateDelivery, 
    applyPromotions, 
    nextStep, 
    previousStep, 
    createOrder, 
    generateDetailedWhatsAppMessage 
  } = useCart();
  
  const [customerForm, setCustomerForm] = useState<CustomerData>({
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      zipCode: '',
      reference: ''
    }
  });

  const [paymentForm, setPaymentForm] = useState<PaymentMethod>({
    type: 'pix'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deliveryError, setDeliveryError] = useState<string>('');

  useEffect(() => {
    if (state.customer) {
      setCustomerForm(state.customer);
    }
    if (state.payment) {
      setPaymentForm(state.payment);
    }
  }, [state.customer, state.payment]);

  const validateCustomerData = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerForm.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!customerForm.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^[\d\s\(\)\-\+]+$/.test(customerForm.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!customerForm.address.street.trim()) {
      newErrors.street = 'Rua é obrigatória';
    }

    if (!customerForm.address.number.trim()) {
      newErrors.number = 'Número é obrigatório';
    }

    if (!customerForm.address.neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro é obrigatório';
    }

    if (!customerForm.address.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!customerForm.address.zipCode.trim()) {
      newErrors.zipCode = 'CEP é obrigatório';
    } else if (!/^\d{5}-?\d{3}$/.test(customerForm.address.zipCode)) {
      newErrors.zipCode = 'CEP inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCustomerSubmit = () => {
    if (validateCustomerData()) {
      setCustomerData(customerForm);
      
      // Calcular taxa de entrega - sempre aceita entrega em Paulo Afonso
      const deliveryCalculated = calculateDelivery(customerForm.address.neighborhood);
      // Com o novo sistema, sempre terá uma zona de entrega
      setDeliveryError('');
      
      setDeliveryError('');
      nextStep();
    }
  };

  const handlePaymentSubmit = () => {
    setPaymentMethod(paymentForm);
    applyPromotions();
    nextStep();
  };

  const handleFinalizeOrder = () => {
    try {
      const order = createOrder();
      const message = generateDetailedWhatsAppMessage();
      
      // Enviar para WhatsApp
      const whatsappUrl = `https://wa.me/5575988475658?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      // Ir para tracking
      nextStep();
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header com botão voltar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            {(state.currentStep === 'payment' || state.currentStep === 'confirmation') && (
              <button
                onClick={() => {
                  if (state.currentStep === 'payment') {
                    previousStep();
                  } else if (state.currentStep === 'confirmation') {
                    previousStep();
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {state.currentStep === 'customer' && 'Dados para Entrega'}
              {state.currentStep === 'payment' && 'Forma de Pagamento'}
              {state.currentStep === 'confirmation' && 'Confirmar Pedido'}
              {state.currentStep === 'tracking' && 'Pedido Enviado!'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${['customer', 'payment', 'confirmation', 'tracking'].includes(state.currentStep) ? 'text-primary-600' : 'text-gray-400'}`}>
              <User className="w-5 h-5" />
              <span className="text-sm">Dados</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div className={`h-full bg-primary-600 rounded transition-all duration-300 ${['payment', 'confirmation', 'tracking'].includes(state.currentStep) ? 'w-1/3' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center space-x-2 ${['payment', 'confirmation', 'tracking'].includes(state.currentStep) ? 'text-primary-600' : 'text-gray-400'}`}>
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Pagamento</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div className={`h-full bg-primary-600 rounded transition-all duration-300 ${['confirmation', 'tracking'].includes(state.currentStep) ? 'w-2/3' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center space-x-2 ${['confirmation', 'tracking'].includes(state.currentStep) ? 'text-primary-600' : 'text-gray-400'}`}>
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Confirmar</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Customer Data Step */}
          {state.currentStep === 'customer' && (
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={customerForm.name}
                      onChange={(e) => setCustomerForm(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={customerForm.phone}
                      onChange={(e) => setCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="(75) 99999-9999"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      value={customerForm.email || ''}
                      onChange={(e) => setCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Endereço de Entrega
                </h3>
                
                <DeliveryZoneInfo />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rua *
                    </label>
                    <input
                      type="text"
                      value={customerForm.address.street}
                      onChange={(e) => setCustomerForm(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, street: e.target.value }
                      }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Nome da rua"
                    />
                    {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número *
                    </label>
                    <input
                      type="text"
                      value={customerForm.address.number}
                      onChange={(e) => setCustomerForm(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, number: e.target.value }
                      }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="123"
                    />
                    {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complemento
                    </label>
                    <input
                      type="text"
                      value={customerForm.address.complement || ''}
                      onChange={(e) => setCustomerForm(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, complement: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Apto, casa, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      value={customerForm.address.neighborhood}
                      onChange={(e) => setCustomerForm(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, neighborhood: e.target.value }
                      }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.neighborhood ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Nome do bairro"
                    />
                    {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      value={customerForm.address.city}
                      onChange={(e) => setCustomerForm(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, city: e.target.value }
                      }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Nome da cidade"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CEP *
                    </label>
                    <input
                      type="text"
                      value={customerForm.address.zipCode}
                      onChange={(e) => setCustomerForm(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, zipCode: e.target.value }
                      }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="00000-000"
                    />
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ponto de Referência
                    </label>
                    <input
                      type="text"
                      value={customerForm.address.reference || ''}
                      onChange={(e) => setCustomerForm(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, reference: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Próximo ao mercado, em frente à escola..."
                    />
                  </div>
                </div>
                
                {deliveryError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{deliveryError}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCustomerSubmit}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {state.currentStep === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Forma de Pagamento
              </h3>

              <div className="space-y-4">
                {/* PIX */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentForm.type === 'pix' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setPaymentForm({ type: 'pix' })}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={paymentForm.type === 'pix'}
                      onChange={() => setPaymentForm({ type: 'pix' })}
                      className="text-primary-600"
                    />
                    <div>
                      <p className="font-semibold">PIX</p>
                      <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                    </div>
                  </div>
                </div>

                {/* Money */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentForm.type === 'money' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setPaymentForm({ type: 'money' })}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={paymentForm.type === 'money'}
                      onChange={() => setPaymentForm({ type: 'money' })}
                      className="text-primary-600"
                    />
                    <div>
                      <p className="font-semibold">Dinheiro</p>
                      <p className="text-sm text-gray-600">Pagamento na entrega</p>
                    </div>
                  </div>
                  
                  {paymentForm.type === 'money' && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={paymentForm.needsChange || false}
                          onChange={(e) => setPaymentForm(prev => ({ 
                            ...prev, 
                            needsChange: e.target.checked,
                            changeAmount: e.target.checked ? prev.changeAmount : undefined
                          }))}
                          className="text-primary-600"
                        />
                        <span>Preciso de troco</span>
                      </div>
                      
                      {paymentForm.needsChange && (
                        <input
                          type="number"
                          value={paymentForm.changeAmount || ''}
                          onChange={(e) => setPaymentForm(prev => ({ 
                            ...prev, 
                            changeAmount: parseFloat(e.target.value) 
                          }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Valor que você tem"
                          min={state.total}
                          step="0.01"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Card */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentForm.type === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setPaymentForm({ type: 'card', cardType: 'credit' })}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={paymentForm.type === 'card'}
                      onChange={() => setPaymentForm({ type: 'card', cardType: 'credit' })}
                      className="text-primary-600"
                    />
                    <div>
                      <p className="font-semibold">Cartão</p>
                      <p className="text-sm text-gray-600">Crédito ou débito na entrega</p>
                    </div>
                  </div>
                  
                  {paymentForm.type === 'card' && (
                    <div className="mt-4 flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={paymentForm.cardType === 'credit'}
                          onChange={() => setPaymentForm(prev => ({ ...prev, cardType: 'credit' }))}
                          className="text-primary-600"
                        />
                        <span>Crédito</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={paymentForm.cardType === 'debit'}
                          onChange={() => setPaymentForm(prev => ({ ...prev, cardType: 'debit' }))}
                          className="text-primary-600"
                        />
                        <span>Débito</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousStep}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {state.currentStep === 'confirmation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Items:</h4>
                  {state.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <div>
                        <span>{item.quantity}x {item.name}</span>
                        {item.observations && (
                          <p className="text-sm text-gray-600">📝 {item.observations}</p>
                        )}
                      </div>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {state.subtotal.toFixed(2)}</span>
                  </div>
                  {state.deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>Taxa de entrega:</span>
                      <span>R$ {state.deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  {state.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto:</span>
                      <span>-R$ {state.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {state.customer && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Dados de Entrega:</h4>
                  <p>{state.customer.name}</p>
                  <p>{state.customer.phone}</p>
                  <p>
                    {state.customer.address.street}, {state.customer.address.number}
                    {state.customer.address.complement && `, ${state.customer.address.complement}`}
                  </p>
                  <p>{state.customer.address.neighborhood}, {state.customer.address.city}</p>
                  <p>CEP: {state.customer.address.zipCode}</p>
                </div>
              )}

              {/* Payment Info */}
              {state.payment && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Forma de Pagamento:</h4>
                  <p>
                    {state.payment.type === 'pix' && 'PIX'}
                    {state.payment.type === 'money' && 'Dinheiro'}
                    {state.payment.type === 'card' && `Cartão ${state.payment.cardType === 'credit' ? 'de Crédito' : 'de Débito'}`}
                  </p>
                  {state.payment.needsChange && state.payment.changeAmount && (
                    <p className="text-sm text-gray-600">
                      Troco para: R$ {state.payment.changeAmount.toFixed(2)}
                    </p>
                  )}
                </div>
              )}

              {state.delivery && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800">
                    ⏰ Tempo estimado de entrega: {state.delivery.estimatedTime} minutos
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={previousStep}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  onClick={handleFinalizeOrder}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                >
                  <span>Finalizar Pedido</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Tracking Step */}
          {state.currentStep === 'tracking' && (
            <div className="text-center space-y-6">
              <div className="text-green-600 text-6xl">✅</div>
              <h3 className="text-2xl font-bold text-green-600">Pedido Enviado!</h3>
              <p className="text-gray-600">
                Seu pedido foi enviado para nosso WhatsApp e logo entraremos em contato para confirmar.
              </p>
              {state.delivery && (
                <p className="text-lg">
                  ⏰ Tempo estimado: {state.delivery.estimatedTime} minutos
                </p>
              )}
              <button
                onClick={() => {
                  onClose();
                  // Reset cart optionally
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium"
              >
                Fazer Novo Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 
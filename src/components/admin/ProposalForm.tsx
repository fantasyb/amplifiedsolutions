// src/components/admin/ProposalForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { availableServices } from '@/data/services';
import { CheckCircle, DollarSign, Calendar, User, Building, Plus, X, Edit2 } from 'lucide-react';
import { Service } from '@/types/proposal';

export default function ProposalForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomServiceForm, setShowCustomServiceForm] = useState(false);
  const [editingCustomIndex, setEditingCustomIndex] = useState<number | null>(null);
  const [customServices, setCustomServices] = useState<Service[]>([]);
  const [customServiceForm, setCustomServiceForm] = useState({
    title: '',
    description: '',
    price: 0,
    features: [''] // Start with one empty feature
  });
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientCompany: '',
    clientPhone: '',
    selectedServices: [] as string[],
    customServices: [] as Service[], // Store custom services separately
    cost: 1500,
    notes: '',
    expiresIn: 30,
    paymentType: 'full' as 'full' | 'partial' | 'installments',
    downPayment: 500,
    installmentCount: 3,
    isRecurring: false,
  });

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleCustomServiceToggle = (customServiceId: string) => {
    const currentlySelected = formData.customServices.find(s => s.id === customServiceId);
    
    if (currentlySelected) {
      // Remove from selected custom services
      setFormData(prev => ({
        ...prev,
        customServices: prev.customServices.filter(s => s.id !== customServiceId),
        cost: prev.cost - (currentlySelected.price || 0)
      }));
    } else {
      // Add to selected custom services
      const serviceToAdd = customServices.find(s => s.id === customServiceId);
      if (serviceToAdd) {
        setFormData(prev => ({
          ...prev,
          customServices: [...prev.customServices, serviceToAdd],
          cost: prev.cost + (serviceToAdd.price || 0)
        }));
      }
    }
  };

  const addCustomServiceFeature = () => {
    setCustomServiceForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateCustomServiceFeature = (index: number, value: string) => {
    setCustomServiceForm(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeCustomServiceFeature = (index: number) => {
    setCustomServiceForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const saveCustomService = () => {
    if (!customServiceForm.title || customServiceForm.price <= 0) {
      alert('Please provide a service name and price');
      return;
    }

    const validFeatures = customServiceForm.features.filter(f => f.trim() !== '');
    
    const newService: Service = {
      id: `custom-${Date.now()}`,
      title: customServiceForm.title,
      description: customServiceForm.description,
      price: customServiceForm.price,
      features: validFeatures,
      isCustom: true
    };

    if (editingCustomIndex !== null) {
      // Update existing custom service
      setCustomServices(prev => 
        prev.map((service, index) => 
          index === editingCustomIndex ? newService : service
        )
      );
      setEditingCustomIndex(null);
    } else {
      // Add new custom service
      setCustomServices(prev => [...prev, newService]);
    }

    // Reset form
    setCustomServiceForm({
      title: '',
      description: '',
      price: 0,
      features: ['']
    });
    setShowCustomServiceForm(false);
  };

  const editCustomService = (index: number) => {
    const service = customServices[index];
    setCustomServiceForm({
      title: service.title,
      description: service.description,
      price: service.price || 0,
      features: service.features.length > 0 ? service.features : ['']
    });
    setEditingCustomIndex(index);
    setShowCustomServiceForm(true);
  };

  const deleteCustomService = (index: number) => {
    const serviceToDelete = customServices[index];
    
    // Remove from custom services list
    setCustomServices(prev => prev.filter((_, i) => i !== index));
    
    // Also remove from selected services if it was selected
    setFormData(prev => ({
      ...prev,
      customServices: prev.customServices.filter(s => s.id !== serviceToDelete.id),
      cost: prev.customServices.find(s => s.id === serviceToDelete.id) 
        ? prev.cost - (serviceToDelete.price || 0)
        : prev.cost
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine predefined and custom services for submission
      const allSelectedServices = [
        ...formData.selectedServices,
        ...formData.customServices.map(s => s.id)
      ];

      const requestData = {
        ...formData,
        selectedServices: formData.selectedServices,
        customServices: formData.customServices, // Send custom services separately
      };

      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const { proposalId } = await response.json();
        router.push(`/proposal/${proposalId}`);
      }
    } catch (error) {
      console.error('Error creating proposal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Client Information */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Client Information</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Client Name *
            </label>
            <input
              type="text"
              required
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.clientEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Company
            </label>
            <input
              type="text"
              value={formData.clientCompany}
              onChange={(e) => setFormData(prev => ({ ...prev, clientCompany: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="ABC Real Estate"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Services Selection */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Select Services</h2>
          </div>
          <button
            type="button"
            onClick={() => setShowCustomServiceForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Custom Service
          </button>
        </div>
        
        {/* Custom Service Form */}
        {showCustomServiceForm && (
          <div className="mb-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingCustomIndex !== null ? 'Edit' : 'Add'} Custom Service
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowCustomServiceForm(false);
                  setEditingCustomIndex(null);
                  setCustomServiceForm({
                    title: '',
                    description: '',
                    price: 0,
                    features: ['']
                  });
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={customServiceForm.title}
                    onChange={(e) => setCustomServiceForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Custom Integration"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    value={customServiceForm.price}
                    onChange={(e) => setCustomServiceForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="1"
                    placeholder="500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={customServiceForm.description}
                  onChange={(e) => setCustomServiceForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Brief description of the service..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {customServiceForm.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateCustomServiceFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Feature description"
                      />
                      {customServiceForm.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCustomServiceFeature(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCustomServiceFeature}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomServiceForm(false);
                    setEditingCustomIndex(null);
                    setCustomServiceForm({
                      title: '',
                      description: '',
                      price: 0,
                      features: ['']
                    });
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveCustomService}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingCustomIndex !== null ? 'Update' : 'Add'} Service
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Custom Services List */}
        {customServices.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Custom Services</h3>
            <div className="grid gap-4">
              {customServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    formData.customServices.some(s => s.id === service.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        formData.customServices.some(s => s.id === service.id)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300'
                      }`}
                      onClick={() => handleCustomServiceToggle(service.id)}
                    >
                      {formData.customServices.some(s => s.id === service.id) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1" onClick={() => handleCustomServiceToggle(service.id)}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {service.title}
                            <span className="ml-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                              Custom
                            </span>
                          </h3>
                          <p className="text-slate-600 mb-2">{service.description}</p>
                          {service.features.length > 0 && (
                            <div className="text-sm text-slate-500">
                              {service.features.length} features included
                            </div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ${service.price}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          editCustomService(index);
                        }}
                        className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCustomService(index);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Predefined Services */}
        <div className="grid gap-4">
          <h3 className="text-sm font-semibold text-slate-700">Standard Services</h3>
          {Object.values(availableServices).map((service) => (
            <div
              key={service.id}
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                formData.selectedServices.includes(service.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  formData.selectedServices.includes(service.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-slate-300'
                }`}>
                  {formData.selectedServices.includes(service.id) && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {service.title}
                    {service.highlighted && (
                      <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-600 mb-3">{service.description}</p>
                  <div className="text-sm text-slate-500">
                    {service.features.length} features included
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & Details */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Pricing & Details</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Total Cost ($)
            </label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData(prev => ({ ...prev, cost: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              step="1"
            />
            {formData.customServices.length > 0 && (
              <p className="text-sm text-slate-500 mt-1">
                Custom services total: ${formData.customServices.reduce((sum, s) => sum + (s.price || 0), 0)}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Expires In (days)
            </label>
            <select
              value={formData.expiresIn}
              onChange={(e) => setFormData(prev => ({ ...prev, expiresIn: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Any additional information for the client..."
          />
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Payment Options</h2>
        </div>
        
        <div className="space-y-6">
          {/* Payment Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Payment Structure
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.paymentType === 'full'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, paymentType: 'full' }))}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    formData.paymentType === 'full'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300'
                  }`}>
                    {formData.paymentType === 'full' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Full Payment</h4>
                    <p className="text-sm text-slate-600">Pay entire amount (one-time or recurring)</p>
                  </div>
                </div>
              </div>

              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.paymentType === 'partial'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, paymentType: 'partial' }))}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    formData.paymentType === 'partial'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300'
                  }`}>
                    {formData.paymentType === 'partial' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Down Payment</h4>
                    <p className="text-sm text-slate-600">Pay partial amount to start</p>
                  </div>
                </div>
              </div>

              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.paymentType === 'installments'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, paymentType: 'installments' }))}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    formData.paymentType === 'installments'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300'
                  }`}>
                    {formData.paymentType === 'installments' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Installments</h4>
                    <p className="text-sm text-slate-600">Split into multiple payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Payment Details */}
          {formData.paymentType === 'full' && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isRecurringFull"
                  checked={formData.isRecurring}
                  onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isRecurringFull" className="text-sm font-medium text-slate-700">
                  Make this a recurring monthly payment
                </label>
              </div>
              {formData.isRecurring && (
                <p className="text-xs text-slate-500 mt-2 ml-7">
                  Client will be charged ${formData.cost} every month for ongoing services.
                </p>
              )}
            </div>
          )}

          {formData.paymentType === 'partial' && (
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Down Payment Amount ($)
                </label>
                <input
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => setFormData(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  min="0"
                  max={formData.cost}
                  step="1"
                />
              </div>
              <div className="flex items-end">
                <div className="text-sm text-slate-600">
                  <div>Remaining: <span className="font-semibold">${formData.cost - formData.downPayment}</span></div>
                  <div>Percentage: <span className="font-semibold">{Math.round((formData.downPayment / formData.cost) * 100)}%</span></div>
                </div>
              </div>
            </div>
          )}

          {formData.paymentType === 'installments' && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Number of Installments
                  </label>
                  <select
                    value={formData.installmentCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, installmentCount: Number(e.target.value) }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  >
                    <option value={2}>2 payments</option>
                    <option value={3}>3 payments</option>
                    <option value={4}>4 payments</option>
                    <option value={6}>6 payments</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-slate-600">
                    <div>Per installment: <span className="font-semibold">${Math.round(formData.cost / formData.installmentCount)}</span></div>
                    <div>Every 30 days</div>
                  </div>
                </div>
              </div>
              
              {/* Recurring Toggle */}
              <div className="border-t border-blue-200 pt-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isRecurring" className="text-sm font-medium text-slate-700">
                    Make this a recurring service (continues monthly after installments complete)
                  </label>
                </div>
                {formData.isRecurring && (
                  <p className="text-xs text-slate-500 mt-2 ml-7">
                    After {formData.installmentCount} payments, client will be charged ${Math.round(formData.cost / formData.installmentCount)} monthly for ongoing services.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || (formData.selectedServices.length === 0 && formData.customServices.length === 0)}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating Proposal...' : 'Create Proposal'}
        </button>
      </div>
    </form>
  );
}
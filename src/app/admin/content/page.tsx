// src/app/admin/content/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Upload, Link, FileText, Video, BookOpen, Plus, X, Save, ExternalLink, Users } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'link' | 'file' | 'video';
  category: 'reports' | 'resources' | 'training' | 'links';
  clientIds: string[];
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
}

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'reports' | 'resources' | 'training' | 'links'>('reports');
  const [content, setContent] = useState<Record<string, ContentItem[]>>({
    reports: [],
    resources: [],
    training: [],
    links: []
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    url: '',
    type: 'link' as 'link' | 'file' | 'video',
    clientIds: [] as string[]
  });

  const contentTypes = {
    reports: { title: 'Reports & Analytics', icon: FileText },
    resources: { title: 'Resources & Downloads', icon: BookOpen },
    training: { title: 'Training Materials', icon: Video },
    links: { title: 'Quick Links', icon: Link }
  };

  // Load existing content and clients
  useEffect(() => {
    loadContent();
    loadClients();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClients = async () => {
    try {
      const response = await fetch('/api/admin/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || (!newItem.url && newItem.type !== 'file')) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newItem,
          category: activeTab,
          id: Date.now().toString()
        })
      });

      if (response.ok) {
        await loadContent();
        setNewItem({ title: '', description: '', url: '', type: 'link', clientIds: [] });
        alert('Content added successfully!');
      }
    } catch (error) {
      console.error('Error adding content:', error);
      alert('Error adding content');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/admin/content/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadContent();
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const { url } = await response.json();
        setNewItem({ ...newItem, url, type: 'file' });
        alert('File uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const handleClientSelection = (clientId: string) => {
    const updatedClientIds = newItem.clientIds.includes(clientId)
      ? newItem.clientIds.filter(id => id !== clientId)
      : [...newItem.clientIds, clientId];
    
    setNewItem({ ...newItem, clientIds: updatedClientIds });
  };

  const getClientNames = (clientIds: string[]) => {
    if (!clientIds || clientIds.length === 0) return 'All Clients';
    const names = clientIds.map(id => {
      const client = clients.find(c => c.id === id);
      return client ? client.name : 'Unknown';
    });
    return names.join(', ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management</h1>
        <p className="text-slate-600">Manage reports, resources, training materials, and links for client portals</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <nav className="flex space-x-8">
          {Object.entries(contentTypes).map(([key, content]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {content.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Add New Item Form */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Add New {contentTypes[activeTab].title} Item
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="link">External Link</option>
              <option value="file">File Upload</option>
              <option value="video">Video Link</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Enter description..."
          />
        </div>

        {newItem.type === 'file' ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Upload File</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.png,.mp4,.mov"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700">Click to upload file</span>
                <p className="text-sm text-slate-500 mt-1">PDF, DOC, XLS, PPT, Images, Videos</p>
              </label>
              {newItem.url && (
                <p className="text-sm text-green-600 mt-2">✓ File uploaded: {newItem.url}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">URL *</label>
            <input
              type="url"
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>
        )}

        {/* Client Assignment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Assign to Clients (leave empty for all clients)
          </label>
          <div className="border border-slate-300 rounded-lg p-4 bg-white">
            {clients.length === 0 ? (
              <p className="text-slate-500 text-sm">No clients found. Create some clients first.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {clients.map((client) => (
                  <label key={client.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newItem.clientIds.includes(client.id)}
                      onChange={() => handleClientSelection(client.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">
                      {client.name} ({client.company || client.email})
                    </span>
                  </label>
                ))}
              </div>
            )}
            {newItem.clientIds.length === 0 && (
              <p className="text-xs text-blue-600 mt-2">
                ℹ️ No clients selected - this content will be visible to all clients
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Current Items */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Current {contentTypes[activeTab].title} ({content[activeTab]?.length || 0})
        </h2>
        
        <div className="space-y-3">
          {content[activeTab]?.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {item.type === 'link' && <Link className="w-5 h-5 text-blue-600" />}
                  {item.type === 'file' && <FileText className="w-5 h-5 text-blue-600" />}
                  {item.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-slate-500">{item.url}</span>
                    {item.type === 'link' && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      <Users className="w-3 h-3 mr-1" />
                      {getClientNames(item.clientIds)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="p-2 text-slate-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {(!content[activeTab] || content[activeTab].length === 0) && (
          <div className="text-center py-8 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No {contentTypes[activeTab].title.toLowerCase()} added yet</p>
            <p className="text-sm">Use the form above to add your first item</p>
          </div>
        )}
      </div>
    </div>
  );
}
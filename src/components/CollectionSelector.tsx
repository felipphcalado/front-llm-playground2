import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getAllCollections } from '../api/collections';

interface CollectionSelectorProps {
  selectedCollection: string;
  onCollectionChange: (collectionId: string) => void;
}

export function CollectionSelector({ selectedCollection, onCollectionChange }: CollectionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [collections, setCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await getAllCollections();
        setCollections(data);
        if (data.length > 0 && !selectedCollection) {
          onCollectionChange(data[0]);
        }
      } catch (err) {
        setError('Failed to load collections');
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading collections...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span>{selectedCollection || 'Select Collection'}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isOpen && collections.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {collections.map((collection) => (
              <li key={collection}>
                <button
                  type="button"
                  onClick={() => {
                    onCollectionChange(collection);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 ${
                    selectedCollection === collection ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                  }`}
                >
                  {collection}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
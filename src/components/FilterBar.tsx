import React from 'react';
import {
  ShieldCheck,
  Clock,
  Star,
  SlidersHorizontal,
  RotateCcw,
  List,
  Map as MapIcon,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

interface FilterBarProps {
  viewMode: 'list' | 'map';
  setViewMode: (mode: 'list' | 'map') => void;
  resultCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  viewMode,
  setViewMode,
  resultCount
}) => {
  const {
    lang,
    filters,
    setFilters,
    resetFilters,
    categories,
    selectedCity
  } = useApp();

  const selectedCategoryObj = categories.find((c) => c.id === filters.category);

  return (
    <div className="py-3 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Active Filters and Interactive Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {/* Verified Only Chip */}
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))
              }
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                filters.verifiedOnly
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'filterVerified')}</span>
            </button>

            {/* Open Now Chip */}
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, openNowOnly: !prev.openNowOnly }))
              }
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                filters.openNowOnly
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'filterOpenNow')}</span>
            </button>

            {/* 4.0+ Rating Chip */}
            <button
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: prev.minRating === 4 ? 0 : 4
                }))
              }
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                filters.minRating === 4
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{getTranslation(lang, 'filterRating')}</span>
            </button>

            {/* Subcategories (if category selected) */}
            {selectedCategoryObj && selectedCategoryObj.subcategories.length > 0 && (
              <select
                value={filters.subcategory}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, subcategory: e.target.value }))
                }
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 focus:ring-1 focus:ring-sky-500 shrink-0"
              >
                <option value="">All {selectedCategoryObj.name} Services</option>
                {selectedCategoryObj.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            )}

            {/* Clear All Reset Button */}
            {(filters.verifiedOnly ||
              filters.openNowOnly ||
              filters.minRating > 0 ||
              filters.category ||
              filters.subcategory ||
              filters.query) && (
              <button
                onClick={resetFilters}
                className="p-1.5 rounded-xl text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1 shrink-0 font-medium"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

          {/* Right: Results Count + Sort + List/Map Segmented Control */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs text-slate-500">
              <strong className="text-slate-900 dark:text-white tabular-nums">{resultCount}</strong>{' '}
              verified providers
            </span>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any
                }))
              }
              className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-xl border-0 focus:ring-1 focus:ring-sky-500"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Top Rated (⭐)</option>
              <option value="distance">Nearest Distance</option>
              <option value="price_low">Starting Price (Lowest)</option>
            </select>

            {/* List / Map Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Interactive Map View"
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

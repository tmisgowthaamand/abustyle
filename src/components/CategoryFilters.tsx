import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { X, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

type FilterType = "checkbox" | "toggle" | "slider";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  id: string;
  title: string;
  type: FilterType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

interface CategoryFiltersProps {
  sections: FilterSection[];
  accent?: string;
  className?: string;
  onFilterChange?: (filters: Record<string, any>) => void;
}

export function CategoryFilters({ 
  sections, 
  accent, 
  className = "",
  onFilterChange
}: CategoryFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localFilters, setLocalFilters] = useState<Record<string, any>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // Initialize local filters from URL or props
  useEffect(() => {
    const initialFilters: Record<string, any> = {};
    
    // Get filters from URL params
    searchParams.forEach((value, key) => {
      if (key !== 'page') { // Don't include page in filters
        initialFilters[key] = value;
      }
    });
    
    setLocalFilters(initialFilters);
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters };
    
    if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    setLocalFilters(newFilters);
    
    // If onFilterChange is provided, call it with the new filters
    if (onFilterChange) {
      onFilterChange(newFilters);
    } else {
      // Otherwise, update the URL directly
      const newParams = new URLSearchParams();
      
      // Add all filters to URL params
      Object.entries(newFilters).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          newParams.set(k, v.join(','));
        } else if (v !== undefined && v !== '') {
          newParams.set(k, String(v));
        }
      });
      
      // Update URL without page refresh
      setSearchParams(newParams);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    if (onFilterChange) {
      onFilterChange({});
    } else {
      setSearchParams({});
    }
    setLocalFilters({});
  };

  // Handle individual filter changes
  const handleCheckboxChange = (filterKey: string, optionId: string) => {
    const currentValue = getFilterValue(filterKey) || [];
    const newValue = Array.isArray(currentValue) ? [...currentValue] : [];
    
    const optionIndex = newValue.indexOf(optionId);
    if (optionIndex > -1) {
      newValue.splice(optionIndex, 1);
    } else {
      newValue.push(optionId);
    }
    
    handleFilterChange(filterKey, newValue.length > 0 ? newValue : undefined);
  };

  // Handle slider change
  const handleSliderChange = (filterKey: string, value: number[]) => {
    handleFilterChange(filterKey, value[0]);
  };

  // Get filter value from local state
  const getFilterValue = (key: string): any => {
    return localFilters[key];
  };

  // Generate active filter chips
  const activeFilterChips = sections.flatMap(section => {
    const value = localFilters[section.id];
    if (!value) return [];
    
    if (Array.isArray(value)) {
      return value.map(v => ({
        id: `${section.id}-${v}`,
        label: section.options?.find(o => o.id === v)?.label || v,
        sectionId: section.id,
        value: v
      }));
    }
    
    return [{
      id: `${section.id}-${value}`,
      label: section.type === 'slider' 
        ? `${section.prefix || ''}${value}${section.suffix || ''}` 
        : section.options?.find(o => o.id === value)?.label || value,
      sectionId: section.id,
      value
    }];
  });
  
  // Calculate active filters count
  const activeFilterCount = activeFilterChips.length;

  // Render filter section
  const renderFilterSection = (section: FilterSection) => (
    <div key={section.id} className="border-b border-gray-200 pb-6">
      <h3 className="text-sm font-medium text-gray-900 mb-4">
        {section.title}
      </h3>
      {section.type === 'checkbox' && section.options && (
        <div className="space-y-3">
          {section.options.map((option) => (
            <div key={option.id} className="flex items-center">
              <Checkbox 
                id={`${section.id}-${option.id}`}
                checked={getFilterValue(section.id)?.includes(option.id) || false}
                onCheckedChange={() => handleCheckboxChange(section.id, option.id)}
                className="h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
              />
              <label
                htmlFor={`${section.id}-${option.id}`}
                className="ml-3 text-sm text-gray-600"
              >
                {option.label}
                {option.count && (
                  <span className="text-gray-400 ml-1">({option.count})</span>
                )}
              </label>
            </div>
          ))}
        </div>
      )}
      {section.type === 'slider' && (
        <div className="px-1">
          <Slider
            defaultValue={[section.min || 0]}
            min={section.min}
            max={section.max}
            step={section.step}
            value={[getFilterValue(section.id) || section.min || 0]}
            onValueChange={(value) => handleSliderChange(section.id, value)}
            className="mt-4"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{section.prefix}{section.min}{section.suffix}</span>
            <span>{section.prefix}{getFilterValue(section.id) || section.min}{section.suffix}</span>
            <span>{section.prefix}{section.max}{section.suffix}</span>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile filter dialog
  const mobileFilter = (
    <div className="lg:hidden">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {sections.map(section => renderFilterSection(section))}
            
            {/* Mobile filter actions */}
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setMobileOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                style={{ backgroundColor: accent }}
                onClick={() => {
                  // Apply filters and close the sheet
                  Object.entries(localFilters).forEach(([key, value]) => {
                    handleFilterChange(key, value);
                  });
                  setMobileOpen(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  // Desktop filters
  const desktopFilters = (
    <div className="hidden lg:block">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        {activeFilterChips.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-sm text-rose-600 hover:text-rose-700"
          >
            Clear all
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {sections.map(section => renderFilterSection(section))}
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Mobile filter dialog */}
      {mobileFilter}

      {/* Active filters */}
      {activeFilterChips.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Filters:</span>
          {activeFilterChips.map(chip => (
            <div 
              key={chip.id}
              className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {chip.label}
              <button
                type="button"
                className="ml-1 rounded-full text-gray-400 hover:text-gray-500"
                onClick={() => {
                  const currentValue = getFilterValue(chip.sectionId);
                  if (Array.isArray(currentValue)) {
                    const newValue = currentValue.filter((v: any) => v !== chip.value);
                    handleFilterChange(chip.sectionId, newValue.length > 0 ? newValue : undefined);
                  } else {
                    handleFilterChange(chip.sectionId, undefined);
                  }
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="ml-2 text-sm text-rose-600 hover:text-rose-700"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Desktop filters */}
      {desktopFilters}
    </div>
  );
}

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';

export function SearchForm({ items, onSearch, ...props }: { items: any[], onSearch: (results: any[]) => void } & React.ComponentProps<'form'>) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = query.toLowerCase();

    const filteredResults = items.flatMap((category) =>
      Array.isArray(category) ? category.filter((item) =>
        (item.title && item.title.toLowerCase().includes(searchQuery)) ||
        (item.items && item.items.some((subItem) => subItem.title && subItem.title.toLowerCase().includes(searchQuery)))
      ) : []
    );

    onSearch(filteredResults);
  };

  return (
    <div>
      <form {...props} onSubmit={handleSearch}>
        <SidebarGroup className="py-0">
          <SidebarGroupContent className="relative">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <SidebarInput
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles..."
              className="pl-2 group-data-[collapsible=icon]:hidden"
            />
            <Button type="submit" className="absolute right-2 top-2">
              <Search size={18} />
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </form>
    </div>
  );
}
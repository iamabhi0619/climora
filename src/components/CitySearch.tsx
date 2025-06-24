'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IconSearch, IconMapPin } from '@tabler/icons-react';
import { CitySearch } from '@/lib/types/cityData';
import { useLocationStore } from '@/store/locationStore';

export default function CitySearchInput() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CitySearch[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { setCoOrdinates } = useLocationStore();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                setIsFocused(true);
            }
        };
        window.addEventListener('keydown', down);
        return () => window.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        if (query.length < 2) return setResults([]);
        const timeout = setTimeout(() => {
            setLoading(true);
            axios
                .get(`/api/city?q=${encodeURIComponent(query)}`)
                .then((res) => setResults(res.data.results))
                .catch(() => setResults([]))
                .finally(() => setLoading(false));
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => setActiveIndex(-1), [results]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + results.length) % results.length);
        } else if (e.key === 'Enter' && results[activeIndex]) {
            selectCity(results[activeIndex]);
        } else if (e.key === 'Escape') {
            // Clear search on Esc
            setIsFocused(false);
            setQuery('');
            setResults([]);
            inputRef.current?.blur();
        }
    };


    const selectCity = async (city: CitySearch) => {
        // setQuery(`${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`);
        await setCoOrdinates(city.latitude, city.longitude);
        setResults([]);
        setIsFocused(false);
        setQuery('');
        setResults([]);
        inputRef.current?.blur();
    };

    const highlightMatch = (text: string) => {
        const matchIndex = text.toLowerCase().indexOf(query.toLowerCase());
        if (matchIndex === -1) return text;
        const before = text.slice(0, matchIndex);
        const match = text.slice(matchIndex, matchIndex + query.length);
        const after = text.slice(matchIndex + query.length);
        return (
            <>
                {before}
                <span className="font-semibold text-blue-600">{match}</span>
                {after}
            </>
        );
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-sm text-lg ">
            {/* Search bar with border */}
            <div
                className="flex items-center px-4 py-2 border border-gray-300 bg-white rounded-full shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-blue-400 transition cursor-text"
                onClick={() => {
                    setIsFocused(true);
                    inputRef.current?.focus();
                }}
            >
                <IconSearch className="w-5 h-5 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    className="ml-2 flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    // aria-expanded={isFocused}
                    aria-controls="city-search-dropdown"
                    aria-activedescendant={
                        activeIndex >= 0 && results[activeIndex]
                            ? `city-option-${results[activeIndex].id}`
                            : undefined
                    }
                />

            </div>

            {/* Instruction text */}
            {!isFocused && (<p className="text-sm absolute top-3 right-4 text-gray-400 text-center">Press <kbd className="font-mono bg-gray-100 px-1 rounded">⌘</kbd> + <kbd className="font-mono bg-gray-100 px-1 rounded">K</kbd> to search</p>)}

            {/* Dropdown */}
            {isFocused && query.length >= 2 && (
                <ul
                    className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-xl border border-gray-200 max-h-64 overflow-y-auto"
                    role="listbox"
                >
                    {loading ? (
                        <li className="p-4 text-center text-gray-400">Searching...</li>
                    ) : results.length === 0 ? (
                        <li className="p-4 text-center text-gray-400">No results found</li>
                    ) : (
                        results.map((city, i) => (
                            <li
                                key={city.id}
                                role="option"
                                aria-selected={activeIndex === i}
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-all ${activeIndex === i
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-100'
                                    }`}
                                onMouseEnter={() => setActiveIndex(i)}
                                onClick={() => selectCity(city)}
                            >
                                <IconMapPin className="w-4 h-4 shrink-0" />
                                <div className="text-sm leading-tight">
                                    {highlightMatch(city.name)}
                                    {city.admin1 && `, ${city.admin1}`}, {city.country}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

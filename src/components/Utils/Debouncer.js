import { useState, useEffect } from 'react';

// Debouncer hook so that search doesn't push every time input is changed
export default function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {

            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);


            return () => {
                clearTimeout(handler);
            };
        },
        // Only re-call effect if value changes
        // You could also add the "delay" var to inputs array if you ...
        // ... need to be able to change that dynamically.
        [value, delay]
    );

    return debouncedValue;
}


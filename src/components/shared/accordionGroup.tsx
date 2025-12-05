// components/AccordionGroup.tsx
'use client';
import { useState } from 'react';
import { Accordion } from './accordion';
import {AccordionGroupProps} from "@/services/types";

export const AccordionGroup: React.FC<AccordionGroupProps> = ({ items, variant = 'underline' }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordionGroup">
            {items.map((item, index) => (
                <Accordion
                    key={item.id} // Use item.id for unique key
                    item={item} // Pass single item
                    variant={variant}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};

export default AccordionGroup;
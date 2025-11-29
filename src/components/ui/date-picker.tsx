'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@components/components/ui/button';
import { Calendar } from '@components/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@components/components/ui/popover';
import { cn } from '@components/lib/utils';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  id,
  required,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const date = value ? new Date(value) : undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      onChange?.(formattedDate);
      setOpen(false);
    } else {
      onChange?.('');
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          required={required}
        />
      </PopoverContent>
    </Popover>
  );
}

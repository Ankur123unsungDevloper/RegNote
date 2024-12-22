/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react";
import { format, parse, isValid, addDays, isBefore, isAfter, isSameDay } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Calender = () => {
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(new Date());
  const [startDateEnabled, setStartDateEnabled] = React.useState(false);
  const [dueDateEnabled, setDueDateEnabled] = React.useState(true);
  const [startDate, setStartDate] = React.useState<string>("");
  const [dueDate, setDueDate] = React.useState<string>("");
  const [dueTime, setDueTime] = React.useState<string>("");
  const [reminder, setReminder] = React.useState<string>("none");

  React.useEffect(() => {
    if (startDateEnabled) {
      const today = format(new Date(), "dd/MM/yyyy");
      setStartDate(today); // Set today's date when the checkbox is checked
    } else {
      setStartDate("");
    }
  }, [startDateEnabled]);

  React.useEffect(() => {
    if (dueDateEnabled) {
      const tomorrow = addDays(new Date(), 1);
      setDueDate(format(tomorrow, "dd/MM/yyyy"));
      setDueTime(format(new Date(), "HH:mm"));
      setCalendarDate(tomorrow);
    } else {
      setDueDate("");
      setDueTime("");
      setCalendarDate(undefined);
    }
  }, [dueDateEnabled]);

  const handleDueDateChange = (value: string) => {
    setDueDate(value);
    const parsedDate = parse(value, "dd/MM/yyyy", new Date());
    if (isValid(parsedDate)) {
      setCalendarDate(parsedDate);
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setCalendarDate(selectedDate);
    if (selectedDate && dueDateEnabled) {
      setDueDate(format(selectedDate, "dd/MM/yyyy"));
    }
  };

  // Parse start date for calendar
  const parsedStartDate = isValid(parse(startDate, "dd/MM/yyyy", new Date())) 
    ? parse(startDate, "dd/MM/yyyy", new Date()) 
    : undefined;

  // Parse due date for calendar
  const parsedDueDate = isValid(parse(dueDate, "dd/MM/yyyy", new Date())) 
    ? parse(dueDate, "dd/MM/yyyy", new Date()) 
    : undefined;

  // Function to check if both dates are set
  const isBothDatesSet = () => {
    return startDateEnabled && dueDateEnabled && startDate && dueDate;
  };

  // Function to determine if both dates are set and different
  const isBothDatesSetAndDifferent = () => {
    return startDateEnabled && dueDateEnabled && startDate && dueDate;
  };

  // Function to check if a date is within the start and due date range
  const isDateInRange = (date: Date) => {
    if (isBothDatesSet()) {
      const parsedStartDate = parse(startDate, "dd/MM/yyyy", new Date());
      const parsedDueDate = parse(dueDate, "dd/MM/yyyy", new Date());
  
      // Ensure both parsed dates are valid
      if (isValid(parsedStartDate) && isValid(parsedDueDate)) {
        return (isAfter(date, parsedStartDate) || isSameDay(date, parsedStartDate)) &&
              (isBefore(date, parsedDueDate) || isSameDay(date, parsedDueDate));
      }
    }
    return false;
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-0.5 -mt-4">
        <h2 className="font-semibold">Dates</h2>
      </div>
      <div className="justify-center items-center w-full rounded-md max-w-[450px] mx-auto">
        <Calendar
          mode="single"
          selected={calendarDate}
          onSelect={handleCalendarSelect}
          className=""
          classNames={{
            months: "w-full flex flex-col sm:flex-row space-y-1 sm:space-x-4 sm:space-y-0",
            month: "space-y-1 w-full",
            table: "w-full border-collapse space-y-1",
            head_row: "flex w-full",
            head_cell: "text-muted-foreground rounded-md w-full font-bold text-[0.9rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative h-9 w-full",
            day: "h-9 w-full p-0 font-bold aria-selected:opacity-100",
            day_selected: "bg-blue-400 hover:bg-blue-500 text-blue-700",
            day_today: "bg-transparent text-blue-500 hover:text-neutral-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-500 after:hover:bg-neutral-200 after:content-['']",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            nav_button: "bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            caption: "relative flex items-center justify-center pt-1 text-sm font-medium"
          }}
          modifiers={{
            inRange: (date) => isDateInRange(date),
            startDate: (date) => {
              const parsedStartDate = parse(startDate, "dd/MM/yyyy", new Date());
              return isSameDay(date, parsedStartDate) && startDateEnabled && isValid(parsedStartDate);
            },
            endDate: (date) => {
              const parsedDueDate = parse(dueDate, "dd/MM/yyyy", new Date());
              return isSameDay(date, parsedDueDate) && dueDateEnabled && isValid(parsedDueDate);
            },
          }}
          modifiersClassNames={{
            inRange: "bg-blue-400",
            startDate: "bg-blue-400 text-blue-700 rounded-l",
            endDate: "bg-blue-400 text-blue-700 rounded-r",
          }}
        />
      </div>
      <div className="space-y-0.5 -mt-4">
        <Label htmlFor="start-date" className="text-xs font-bold text-muted-foreground">Start date</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="start-date"
            checked={startDateEnabled}
            onCheckedChange={(checked) => setStartDateEnabled(checked as boolean)}
            className="h-6 w-6"
          />
          <Input
            type="text"
            placeholder="D/M/YYYY"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-neutral-700/50 text-white text-sm p-1.5 rounded w-[6rem]"
            disabled={!startDateEnabled}
          />
        </div>
      </div>
      <div className="mt-2">
        <Label htmlFor="due-date" className="text-xs font-bold text-muted-foreground">Due date</Label>
        <div className="flex space-x-2 mt-1 items-center">
          <Checkbox
            id="due-date"
            checked={dueDateEnabled}
            onCheckedChange={(checked) => setDueDateEnabled(checked as boolean)}
            className="h-6 w-6"
          />
          <Input
            type="text"
            value={dueDate}
            onChange={(e) => handleDueDateChange(e.target.value)}
            className="bg-neutral-700 text-white p-1.5 rounded w-[6rem]"
            disabled={!dueDateEnabled}
          />
          <Input
            type="text"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="bg-neutral-700 text-white p-1 rounded w-[4rem]"
            disabled={!dueDateEnabled}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reminder" className="text-xs block mt-6">Set due date reminder</Label>
        <Select value={reminder} onValueChange={setReminder}>
          <SelectTrigger id="reminder" className="bg-neutral-700/50 text-white">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="1hour">1 hour before</SelectItem>
            <SelectItem value="1day">1 day before</SelectItem>
            <SelectItem value="1week">1 week before</SelectItem>
          </SelectContent>
        </Select>
      </div>
        <p className="text-xs text-muted-foreground mt-3.5">
          Reminders will be sent to all members and watchers of this card.
        </p>
      <div className="space-y-2 mt-0.5">
        <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">Save</Button>
        <Button className="w-full bg-neutral-700/50 hover:bg-neutral-700 hover:text-white" variant="outline" size="sm">Remove</Button>
      </div>
    </div>
  )
}



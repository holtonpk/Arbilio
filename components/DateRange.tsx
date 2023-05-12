import React, { use, useEffect, useState, ChangeEvent } from "react";
import { utcToZonedTime } from "date-fns-tz";
import { parseISO, format } from "date-fns";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
type calendarProps = {
  handleApply: any;
  selectedDate1: any | undefined;
  selectedDate2: any | undefined;
  setSelectedDate1: any;
  setSelectedDate2: any;
  closeCalendar: any;
};

export type Day = {
  dateLabel: number;
  date: Date;
  id: string;
};

const Calendar = ({
  handleApply,
  selectedDate1,
  selectedDate2,
  setSelectedDate1,
  setSelectedDate2,
  closeCalendar,
}: calendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [inputDate1, setInputDate1] = useState(
    selectedDate1?.date || undefined
  );
  const [inputDate2, setInputDate2] = useState(selectedDate2 || undefined);
  const today = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthForward = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
      setDays(getDaysForMonth(currentYear, currentMonth));
      setDays2(getDaysForMonth(currentYear, currentMonth + 1));
    }
  };

  const monthBack = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
      setDays(getDaysForMonth(currentYear, currentMonth - 2));
      setDays2(getDaysForMonth(currentYear, currentMonth - 1));
    }
  };

  function getDaysForMonth(year: number, month: number): Day[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();
    const days: Day[] = [];

    // Add previous month's days if necessary
    if (startingDayOfWeek !== 0) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const daysToAdd = startingDayOfWeek === 0 ? 7 : startingDayOfWeek;
      for (
        let i = prevMonthLastDay - daysToAdd + 1;
        i <= prevMonthLastDay;
        i++
      ) {
        const date = new Date(year, month - 1, i);
        const id = JSON.stringify(
          date.getMonth() + "_" + date.getFullYear() + "_" + date.getDate()
        );
        days.push({
          id,
          dateLabel: i,
          date,
        });
      }
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const id = JSON.stringify(
        date.getMonth() + "_" + date.getFullYear() + "_" + date.getDate()
      );
      days.push({
        id,
        dateLabel: i,
        date,
      });
    }

    // Add days from next month to fill up the last row if necessary
    // const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();

    if (days.length < 42) {
      const daysToAdd = 42 - days.length;
      for (let i = 1; i <= daysToAdd; i++) {
        const date = new Date(year, month + 1, i);
        const id = JSON.stringify(
          date.getMonth() + "_" + date.getFullYear() + "_" + date.getDate()
        );
        days.push({
          id,
          dateLabel: i,
          date,
        });
      }
    }

    return days;
  }

  const [days, setDays] = useState<Day[]>(
    getDaysForMonth(currentYear, currentMonth - 1)
  );
  const [days2, setDays2] = useState<Day[]>(
    getDaysForMonth(currentYear, currentMonth)
  );

  const handleSelectDay = (date: Day) => {
    if (selectedDate1 == undefined) {
      setSelectedDate1(date);
    } else if (selectedDate2 == undefined) {
      setSelectedDate2(date);
    } else {
      setSelectedDate1(date);
      setSelectedDate2(undefined);
    }
  };

  const handleReset = () => {
    setSelectedDate1(undefined);
    setSelectedDate2(undefined);
    setInputDate1(undefined);
    setInputDate2(undefined);
    // closeCalendar();
    handleApply();
  };

  const handleApplyLoc = () => {
    handleApply();
    closeCalendar();
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (
      selectedDate1?.date &&
      new Date(selectedDate1?.date) !== new Date(selectedDate1)
    ) {
      setInputDate1(formatDate(selectedDate1?.date));
    }
  }, [selectedDate1]);

  useEffect(() => {
    if (selectedDate2?.date) {
      setInputDate2(formatDate(selectedDate2?.date));
    }
  }, [selectedDate2]);

  const handleInputDate = (
    e: ChangeEvent<HTMLInputElement>,
    setInputDate: any,
    setSelectedDate: any
  ) => {
    const inputDate = e.target.value;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(inputDate)) {
      setInputDate(inputDate);
      return;
    }
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = parseISO(inputDate);
    const zonedDate = utcToZonedTime(utcDate, localTimeZone);
    const formattedDate = format(zonedDate, "yyyy-MM-dd");
    setInputDate(formattedDate);
    setSelectedDate({
      id: JSON.stringify(
        zonedDate.getMonth() +
          "_" +
          zonedDate.getFullYear() +
          "_" +
          zonedDate.getDate()
      ),
      dateLabel: zonedDate.getDate(),
      date: zonedDate,
    });
  };

  const handleInput1 = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputDate(e, setInputDate1, setSelectedDate1);
  };

  const handleInput2 = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputDate(e, setInputDate2, setSelectedDate2);
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] flex flex-col items-center gap-10">
      <div className="h-fit w-fit bg-white/2 blurBack border border-white rounded-md p-4 flex gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-white">Start Date</h1>
          <input
            onChange={handleInput1}
            placeholder="Select Start Date"
            type="text"
            className="bg-transparent border-2 border-indigo-500 rounded-md py-1 px-2 font-bold text-white"
            value={inputDate1 || ""}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-white">End Date</h1>
          <input
            onChange={handleInput2}
            placeholder="Select End Date"
            type="text"
            className="bg-transparent border-2 border-indigo-500 rounded-md py-1 px-2 font-bold text-white"
            value={inputDate2 || ""}
          />
        </div>
      </div>
      <div className="flex flex-col bg-white/2 rounded-md border border-white blurBack p-4">
        <div className="flex gap-10">
          <div className="relative z-[90]   p-3 h-fit gap-3 w-fit items-start  flex flex-col">
            <div className="flex flex-row items-center w-fit gap-10 justify-between  ">
              <button onClick={monthBack}>
                <Icons.chevronLeft className="h-8 w-8 fill-white" />
              </button>
              <h1 className="text-white text-lg font-bold ">
                {monthNames[currentMonth - 1] + " " + currentYear}
              </h1>
            </div>
            <div className="grid grid-cols-7 gap-2 text-indigo-600 text-sm text-center">
              {dayNames.map((name, i) => (
                <h1 key={i}>{name}</h1>
              ))}
            </div>
            <div className=" grid grid-cols-7 gap-2 h-fit  w-full grid-rows-6 text-c11 text-sm text-center items-center">
              {days.map((day, i) => {
                return (
                  <button
                    onClick={() => handleSelectDay(day)}
                    key={i}
                    disabled={day.date > today}
                    className={`${
                      (selectedDate1 && selectedDate1.id == day.id) ||
                      (selectedDate2 && selectedDate2.id == day.id)
                        ? "bg-indigo-600 text-white"
                        : (selectedDate1 &&
                            selectedDate2 &&
                            day.date > selectedDate1.date &&
                            day.date < selectedDate2.date) ||
                          (selectedDate1 &&
                            selectedDate2 &&
                            day.date > selectedDate2.date &&
                            day.date < selectedDate1.date)
                        ? "bg-indigo-500/30"
                        : "bg-transparent"
                    } ${
                      day.date.getDate() === today.getDate() &&
                      day.date.getMonth() === today.getMonth() &&
                      day.date.getFullYear() === today.getFullYear()
                        ? "text-indigo-500"
                        : day.date.getMonth() == currentMonth - 1
                        ? "text-white"
                        : "text-white/30"
                    }  hover:bg-indigo-500 hover:text-white  h-full w-full aspect-square rounded-md `}
                  >
                    {day.dateLabel}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative z-[90]  p-3 h-fit gap-3 w-fit    flex flex-col items-end">
            <div className="flex flex-row  items center justify-between gap-10 w-fit items-center ">
              <h1 className="text-white text-lg font-bold ">
                {monthNames[currentMonth] + " " + currentYear}
              </h1>
              <button onClick={monthForward}>
                <Icons.chevronRight className="h-8 w-8 fill-white" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-indigo-600 text-sm text-center">
              {dayNames.map((name, i) => (
                <h1 key={i}>{name}</h1>
              ))}
            </div>

            <div className=" grid grid-cols-7 gap-2 h-fit w-full  grid-rows-6 text-c11 text-sm text-center items-center">
              {days2.map((day, i) => {
                return (
                  <button
                    onClick={() => handleSelectDay(day)}
                    key={i}
                    disabled={day.date > today}
                    className={`${
                      (selectedDate1 && selectedDate1.id == day.id) ||
                      (selectedDate2 && selectedDate2.id == day.id)
                        ? "bg-indigo-600 text-white "
                        : (selectedDate1 &&
                            selectedDate2 &&
                            day.date > selectedDate1.date &&
                            day.date < selectedDate2.date) ||
                          (selectedDate1 &&
                            selectedDate2 &&
                            day.date > selectedDate2.date &&
                            day.date < selectedDate1.date)
                        ? "bg-indigo-500/30"
                        : "bg-transparent"
                    } ${
                      day.date.getDate() === today.getDate() &&
                      day.date.getMonth() === today.getMonth() &&
                      day.date.getFullYear() === today.getFullYear()
                        ? "text-indigo-500"
                        : day.date.getMonth() == currentMonth
                        ? "text-white"
                        : "text-white/30"
                    }  hover:bg-indigo-500 hover:text-white  h-full w-full aspect-square rounded-md disabled:opacity-5 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-white/30  `}
                  >
                    {day.dateLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full justify-end p-4 border-t-[1px] border-white/50">
          <button
            onClick={handleReset}
            className="px-3 py-1 text-xl  rounded-md w-fit  text-indigo-600 font-bold"
          >
            reset
          </button>
          <button
            onClick={handleApplyLoc}
            className="px-6 py-1 text-xl  rounded-md w-fit bg-indigo-600 text-white font-bold"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export const DateRange = ({ setDate1, setDate2 }: any) => {
  const [selectedDate1, setSelectedDate1] = useState<Day | undefined>(
    undefined
  );
  const [selectedDate2, setSelectedDate2] = useState<Day | undefined>(
    undefined
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date: Date | any) => {
    if (date != undefined) {
      let fDate = "";
      fDate = fDate + date.getDate() + " ";
      fDate = fDate + monthNames[date.getMonth()] + " ";
      fDate = fDate + date.getFullYear();
      return fDate;
    }
  };

  // useEffect(() => {
  //   setDate1(selectedDate1?.date || undefined);
  // }, [selectedDate1]);
  // useEffect(() => {
  //   setDate2(selectedDate2?.date || undefined);
  // }, [selectedDate2]);

  const handleApply = () => {
    setDate1(selectedDate1?.date || undefined);
    setDate2(selectedDate2?.date || undefined);
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  return (
    <>
      {showCalendar && (
        <>
          <div
            onClick={toggleCalendar}
            className="h-screen w-screen fixed top-0 left-0 bg-black opacity-90 z-[80] cursor-pointer"
          />
          <Calendar
            handleApply={handleApply}
            selectedDate1={selectedDate1}
            selectedDate2={selectedDate2}
            setSelectedDate1={setSelectedDate1}
            setSelectedDate2={setSelectedDate2}
            closeCalendar={toggleCalendar}
          />
        </>
      )}

      <div className=" flex flex-row items-center gap-2 z-[30]">
        <Button
          onClick={toggleCalendar}
          className=" p-1 px-4  text-[12px] flex flex-row items-center w-fit gap-2 relative cursor-pointer"
          variant="outline"
          size="lg"
        >
          <Icons.calendar className="w-4 h-4 " />
          {selectedDate1 || selectedDate2 ? (
            <>
              {selectedDate1 && formatDate(selectedDate1.date)}
              <Icons.swap className="w-5 h-5 " />
              {selectedDate2 && formatDate(selectedDate2.date)}
            </>
          ) : null}
        </Button>
      </div>
    </>
  );
};

export default DateRange;

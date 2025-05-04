import { startOfWeek, addDays, format, startOfDay } from 'date-fns';

const fmt = (date: Date) => format(date, 'yyyy-MM-dd');
const today = startOfDay(new Date());
const weekStart = startOfWeek(today, { weekStartsOn: 1 });

// Birthdays: Mon, Wed, Fri this week
const birthdayDates = [0, 2, 4].map(d => addDays(weekStart, d));

// Leaves: All cover "today"
const leaveRanges = [
  { start: addDays(today, -1), end: addDays(today, 1), type: 'Annual Leave' },
  { start: today, end: addDays(today, 2), type: 'Sick Leave' },
  { start: addDays(today, -2), end: addDays(today, 1), type: 'Work Remotely' },
];

export const mockEmployees = Array.from({ length: 20 }, (_, i) => {
  const id = (i + 1).toString();
  const hasBirthday = i < birthdayDates.length;
  const hasLeave = i < leaveRanges.length;

  return {
    id,
    name: [
      'Alice Johnson', 'Bob Smith', 'Carla Diaz', 'Daniel Lee', 'Eva Zhang',
      'Frank Nolan', 'Grace Kim', 'Hassan Ali', 'Isabel Ruiz', 'Jack Cheng',
      'Kofi Mensah', 'Laura Mendez', 'Martin Osei', 'Naomi Jacobs', 'Oliver Chan',
      'Priya Sharma', 'Quentin Dupont', 'Rosa Bennett', 'Samuel Reed', 'Tariq Yusuf',
    ][i],
    department: ['Engineering', 'Marketing', 'Product', 'Sales', 'Finance', 'HR'][i % 6],
    dateOfBirth: hasBirthday
      ? fmt(birthdayDates[i])
      : fmt(addDays(today, -(365 * (22 + i)))),
    isActive: i % 4 !== 0,
    leaves: hasLeave
      ? [{
          type: leaveRanges[i].type,
          startDate: fmt(leaveRanges[i].start),
          endDate: fmt(leaveRanges[i].end),
        }]
      : [],
  };
});
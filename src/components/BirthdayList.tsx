"use client";

import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { parseISO, isWithinInterval, startOfWeek, endOfWeek, format } from "date-fns";
import { useEffect, useState } from "react";
import BirthdayWishModal from "./BirthdayWishModal";

interface BirthdayListProps {
  employees: any[];
}

export default function BirthdayList({ employees }: BirthdayListProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [today, setToday] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToday(new Date());
    // Simulate loading state for better UX
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (today === null || isLoading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const birthdaysThisWeek = employees.filter((emp: any) => {
    const dob = parseISO(emp.dateOfBirth);
    const birthdayThisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    return isWithinInterval(birthdayThisYear, { start: thisWeekStart, end: thisWeekEnd });
  });

  return (
    <Box mt={5}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🎉 Birthdays This Week
      </Typography>
  
      {birthdaysThisWeek.length === 0 ? (
        <Typography variant="body1" color="text.secondary" mt={2}>
          No team member birthdays this week 🎈
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {birthdaysThisWeek.map((emp: any) => (
            <Grid item xs={12} sm={6} md={4} key={emp.id}>
              <Paper sx={{ p: 2, borderRadius: 3, backgroundColor: '#fffaf0' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
                    {emp.name[0]}
                  </Avatar>
                  <Typography fontWeight="bold">{emp.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {emp.department}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    🎂 {format(parseISO(emp.dateOfBirth), 'MMMM dd')}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      setSelectedName(emp.name);
                      setModalOpen(true);
                    }}
                  >
                    Send Wish
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
  
      <BirthdayWishModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        recipientName={selectedName}
      />
    </Box>
  );
}
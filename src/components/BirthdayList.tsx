"use client";

import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES } from "@/graphql/queries";
import { parseISO, isWithinInterval, startOfWeek, endOfWeek, format } from "date-fns";
import { useEffect, useState } from "react";
import BirthdayWishModal from "./BirthdayWishModal";

export default function BirthdayList() {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  if (loading || today === null) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const birthdaysThisWeek = data.employees.filter((emp: any) => {
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
import { Box, Fab, Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CollapsedEmail from "@/components/CollapsedEmail";
import EmailSection from "@/components/EmailSection";
import EmailForm from "@/components/EmailForm";
import InboxSearch from "@/components/InboxSearch";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function Home() {
  const [newEmailFormOpen, setNewEmailFormOpen] = useState(false);

  const [emails, setEmails] = useState([]);

  const fetchEmails = async (searchTerm) => {
    const res = await axios(`http://localhost:3001/email?search=${searchTerm}`);
    setEmails(res.data);
  };

  useEffect(() => {
    fetchEmails("");
  }, []);

  const toggleNewEmailForm = () => {
    setNewEmailFormOpen((prevState) => !prevState);
  };

  const [selectedEmail, setSelectedEmail] = React.useState(null);

  const selectEmail = (email) => {
    setSelectedEmail(email);
  };

  const hasData = emails?.length > 0;

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid item xs={4} sx={{ borderRight: "1px solid grey" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexShrink: 0, p: 2 }}>
              <InboxSearch fetchEmails={fetchEmails} />
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: "auto" }} className="emailItem">
              {hasData ? (
                emails.map((email) => (
                  <CollapsedEmail
                    key={email.id}
                    messageData={email}
                    handleClick={() => selectEmail(email)}
                    isActive={selectedEmail?.id === email?.id}
                  />
                ))
              ) : (
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: "100vh" }}
                >
                  <Grid item xs={3}>
                    <Typography variant="h6">Mailbox Empty</Typography>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box sx={{ overflowY: "auto", height: "100%" }}>
              {!selectedEmail ? (
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: "100vh" }}
                >
                  <Grid item xs={3}>
                    <Typography variant="h6">Select a message</Typography>
                  </Grid>
                </Grid>
              ) : (
                <EmailSection email={selectedEmail} />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {newEmailFormOpen ? (
        <Box
          sx={{
            position: "fixed",
            bottom: "8px",
            right: "8px",
            width: "400px",
            minWidth: 300,
            height: "500px",
            p: 4,
            bgcolor: "background.paper",
            border: "1px solid grey",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ height: "100%", mt: 1 }}>
            <IconButton
              aria-label="close"
              onClick={toggleNewEmailForm}
              sx={{
                position: "absolute",
                right: 4,
                top: 4,
              }}
            >
              <CloseIcon />
            </IconButton>
            <EmailForm
              onSuccess={() => {
                toggleNewEmailForm();
                fetchEmails("");
              }}
            />
          </Box>
        </Box>
      ) : (
        <Fab
          sx={fabStyle}
          color="primary"
          aria-label="add"
          onClick={toggleNewEmailForm}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
}

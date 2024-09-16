"use client";

import { Button, Grid, TextField } from "@mui/material";

import { useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function EmailForm(props) {
  const { onSuccess } = props;
  const router = useRouter();

  const toRef = useRef();
  const ccRef = useRef();
  const bccRef = useRef();
  const subjectRef = useRef();
  const bodyRef = useRef();

  const handleSubmit = async () => {
    const data = {
      to: toRef.current.value,
      cc: ccRef.current.value,
      bcc: bccRef.current.value,
      subject: subjectRef.current.value,
      body: bodyRef.current.value,
    };

    try {
      const response = await axios.post("http://localhost:3001/email", data);

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={0} sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <TextField
          inputRef={toRef}
          required
          fullWidth
          size="small"
          id="to"
          label="To"
          defaultValue=""
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={ccRef}
          fullWidth
          size="small"
          id="cc"
          label="Cc"
          defaultValue=""
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={bccRef}
          fullWidth
          size="small"
          id="bcc"
          label="Bcc"
          defaultValue=""
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={subjectRef}
          fullWidth
          size="small"
          id="subject"
          label="Subject"
          defaultValue=""
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={bodyRef}
          required
          fullWidth
          id="body"
          label="Email message"
          multiline
          rows={5}
          defaultValue=""
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

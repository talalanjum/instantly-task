"use client";

import { TextField, Typography } from "@mui/material";
import { useCallback, useRef } from "react";

function useDebounce(callback, delay) {
  const timerRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export default function InboxSearch(props) {
  const { fetchEmails } = props;

  const handleSearchRedirect = (searchText) => {
    fetchEmails(searchText);
  };

  const debouncedSearch = useDebounce(handleSearchRedirect, 500);

  const handleSearchFieldChange = (event) => {
    const searchQuery = event?.target?.value || "";

    debouncedSearch(searchQuery);
  };

  return (
    <>
      <Typography variant="h5">Mailbox</Typography>
      <TextField
        id="outlined-search"
        fullWidth
        label="Search mail"
        type="search"
        onChange={handleSearchFieldChange}
      />
    </>
  );
}

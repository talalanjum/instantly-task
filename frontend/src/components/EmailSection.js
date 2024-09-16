import { Grid, Typography } from "@mui/material";

export default function EmailSection({ email = {} }) {
  const { to, cc, bcc, subject, body } = email;

  const toText = to?.split(",").join(", ");
  const ccText = cc?.split(",").join(", ");
  const bccText = bcc?.split(",").join(", ");

  return (
    <Grid
      container
      direction="row"
      alignItems="start"
      gap="24px"
      sx={{ p: 2, marginTop: "20px" }}
    >
      <Grid item xs={12} height="fit-content">
        <Typography variant="h6" component="div">
          From: You
        </Typography>
      </Grid>
      <Grid item xs={12} height="fit-content">
        <Typography variant="h6" component="div">
          To: {toText}
        </Typography>
      </Grid>
      <Grid item xs={12} height="fit-content">
        <Typography variant="body2" component="div">
          Subject: {subject}
        </Typography>
      </Grid>
      <Grid item xs={12} height="fit-content">
        <Typography variant="body2" component="div">
          {ccText ? `CC: ${ccText}` : "No CC"}
        </Typography>
      </Grid>
      <Grid item xs={12} height="fit-content">
        <Typography variant="body2" component="div">
          {bccText ? `BCC: ${bccText}` : "No BCC"}
        </Typography>
      </Grid>
      <Grid item xs={12} height="fit-content">
        <Typography variant="body1" component="div">
          {body}
        </Typography>
      </Grid>
    </Grid>
  );
}

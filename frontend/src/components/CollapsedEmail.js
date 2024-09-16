import { Box, Divider, Grid, Typography } from "@mui/material";

export default function CollapsedEmail({
  messageData = {},
  isActive = false,
  handleClick,
}) {
  const { to, subject, body } = messageData;

  const recipients = to?.split(",");

  const handleOnGridContainerClick = () => {
    handleClick(messageData);
  };

  return (
    <Grid
      container
      sx={{
        p: 2,
        pb: 0,
        backgroundColor: isActive ? "#d3e3fd" : "none",
      }}
      onClick={handleOnGridContainerClick}
    >
      <Grid item xs={12}>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          columnGap={"8px"}
          variant="body1"
          component="div"
          wordWrap={"break-word"}
        >
          <Typography
            variant="body1"
            component="div"
            wordWrap={"break-word"}
            width={"fit-content"}
          >
            Recepients:
          </Typography>
          {recipients?.map((recipient) => (
            <Typography
              variant="body1"
              component="div"
              wordWrap={"break-word"}
              width={"fit-content"}
            >
              {recipient}
            </Typography>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">{subject}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="text.secondary">{body.slice(0, 50)}</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Divider />
      </Grid>
    </Grid>
  );
}

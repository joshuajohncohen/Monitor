import React, { useMemo, useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
import Box from "@mui/material/Box";
// import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { SessionContext } from "./Provider";

// function Tabs({ controlChannel }) {
//   const { session, device } = useContext(SessionContext);

//   function openTab(url /*, lessonPlanId*/) {
//     let shadowId = uuidv1();
//     controlChannel.trigger("client-shadow", {
//       shadowId: shadowId,
//       tabCommands: [
//         {
//           type: "openTab",
//           url: url,
//           //lessonPlanId: lessonPlanId,
//           shadowId: shadowId,
//           expiresAt: Math.floor(Date.now() / 1000) + 60,
//         },
//       ],
//     });
//   }
// }

// question: it wont show up on webpage (its imported in student jsx)


export function Tabs({ controlChannel }) {
  const { session, device } = useContext(SessionContext);
  const [url, setUrl] = useState("");

  function openTab() {
    if (url.trim() !== "") {
      let shadowId = uuidv1();
      controlChannel.trigger("client-shadow", {
        shadowId: shadowId,
        tabCommands: [
          {
            type: "openTab",
            url: url,
            shadowId: shadowId,
            expiresAt: Math.floor(Date.now() / 1000) + 60,
          },
        ],
      });
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Open Tab
      </Typography>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          marginBottom: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="open tab"
          onClick={openTab}
        >
          <Icon>arrow_forward</Icon>
        </IconButton>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icon>open_in_new</Icon>}
        onClick={openTab}
      >
        Open Tab
      </Button>
    </Box>
  );
}

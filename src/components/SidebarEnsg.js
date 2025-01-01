import React, { useState } from "react";
import styles2 from "./Sidebar.module.css"; 
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People,
  Article,
  Event,
  BarChart,
  Settings,
  ExpandLess,
  ExpandMore,
  HelpOutline,
  Logout,
  FileUpload,
  Business,
  School,

} from "@mui/icons-material";

const SidebarEnsg = ({ setActiveComponent }) => {
  const [openIncome, setOpenIncome] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleIncomeClick = () => {
    setOpenIncome(!openIncome);
  };

  const handleDashboardClick = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <div
      style={{
        width: "15%",
        height: "100vh",
        background: "white",
        padding: "10px",
        color: "#333",
        borderRight: "1px solid #ccc", 
        boxSizing: "border-box", 
        display: "flex",
        flexDirection: "column",  // Use flex to arrange items vertically
        justifyContent: "space-between", // Space between items, pushing the bottom items down
      }}
    >
      <div className={styles2.logo}>LOGO</div>
      <div className={styles2.divider}></div>

      <List>
        {/* Dashboard */}
        <ListItem sx={{ marginTop: "15%" }}  button onClick={() => setActiveComponent("Dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
         
        </ListItem>
       
        {/* Posts */}
        <ListItem   button onClick={() => setActiveComponent("EmailTemplateManager")}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="propositions de projets" />
        </ListItem>

        {/* Schedules */}
        {/* <ListItem button>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText primary="Schedules" />
        </ListItem> */}

        {/* Income Section */}
        <ListItem button onClick={() => setActiveComponent("UploadFile")}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="projets à encadrer" />         
        </ListItem>
      </List>

      {/* Divider */}
     
      <List style={{ marginTop: "auto" }}> {/* Pushes this list to the bottom */}
        {/* Help */}
        <ListItem button>
          <ListItemIcon>
            <HelpOutline />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>

        {/* Logout */}
        <ListItem button>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout Account" style={{ color: "red" }} />
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarEnsg;

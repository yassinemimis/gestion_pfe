// import React, { useState } from "react";
// import './Sidebar.css';
// import {
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     Collapse,
//     Divider,
//   } from "@mui/material";
//   import {
//     Dashboard as DashboardIcon,
//     People,
//     Article,
//     Event,
//     BarChart,
//     Settings,
//     ExpandLess,
//     ExpandMore,
//     HelpOutline,
//     Logout,
//   } from "@mui/icons-material";
// const Sidebar = () => {
//     const [openIncome, setOpenIncome] = useState(false);
//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);

//   const handleIncomeClick = () => {
//     setOpenIncome(!openIncome);
//   };

//   const handleDashboardClick = () => {
//     setIsDashboardOpen(!isDashboardOpen);
//   };
//   return (
//     <div className="sidebar">
//       <div className="logo">LOGO</div>
//       <div className="divider"></div>


//       <div
//       style={{
//         width: "250px",
//         height: "100vh",
//         background: "#f5f5f5",
//         padding: "10px",
//       }}
//     >
//       <h3 style={{ padding: "10px" }}>MAIN</h3>
//       <List>
//         {/* Dashboard */}
//         <ListItem button onClick={handleDashboardClick}>
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" />
//           {isDashboardOpen ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={isDashboardOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Earnings" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Refunds" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Declines" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Payouts" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Audience */}
//         <ListItem button>
//           <ListItemIcon>
//             <People />
//           </ListItemIcon>
//           <ListItemText primary="Audience" />
//         </ListItem>

//         {/* Posts */}
//         <ListItem button>
//           <ListItemIcon>
//             <Article />
//           </ListItemIcon>
//           <ListItemText primary="Posts" />
//         </ListItem>

//         {/* Schedules */}
//         <ListItem button>
//           <ListItemIcon>
//             <Event />
//           </ListItemIcon>
//           <ListItemText primary="Schedules" />
//         </ListItem>

//         {/* Income Section */}
//         <ListItem button onClick={handleIncomeClick}>
//           <ListItemIcon>
//             <BarChart />
//           </ListItemIcon>
//           <ListItemText primary="Income" />
//           {openIncome ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={openIncome} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Earnings" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Refunds" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Declines" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Payouts" />
//             </ListItem>
//           </List>
//         </Collapse>
//       </List>

//       {/* Divider */}
//       <Divider />

//       <h3 style={{ padding: "10px" }}>SETTINGS</h3>
//       <List>
//         {/* Settings */}
//         <ListItem button>
//           <ListItemIcon>
//             <Settings />
//           </ListItemIcon>
//           <ListItemText primary="Settings" />
//         </ListItem>

//         {/* Help */}
//         <ListItem button>
//           <ListItemIcon>
//             <HelpOutline />
//           </ListItemIcon>
//           <ListItemText primary="Help" />
//         </ListItem>

//         {/* Logout */}
//         <ListItem button>
//           <ListItemIcon>
//             <Logout />
//           </ListItemIcon>
//           <ListItemText primary="Logout Account" style={{ color: "red" }} />
//         </ListItem>
//       </List>
//     </div>
    
//     </div>

//   );
// };

// export default Sidebar;
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

const Sidebar = ({ setActiveComponent }) => {
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
        {/* Audience */}
        <ListItem  button onClick={handleDashboardClick}>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Audience" />
          {isDashboardOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isDashboardOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem  sx={{ pl: 4 }}  button onClick={() => setActiveComponent("TableEnsg")}>
            <ListItemIcon>
            <People />
          </ListItemIcon>
              <ListItemText primary="Les enseignants" />
            </ListItem>
            <ListItem  sx={{ pl: 4 }} button onClick={() => setActiveComponent("Tablecomp")}>
            <ListItemIcon>
          <Business />
        </ListItemIcon>
              <ListItemText primary="Les entreprises" />
            </ListItem>
            <ListItem  sx={{ pl: 4 }} button onClick={() => setActiveComponent("Table")}>
            <ListItemIcon>
          <School />
        </ListItemIcon>
              <ListItemText primary="Les étudiants" />
            </ListItem>
          </List>
        </Collapse>
        {/* Posts */}
        <ListItem   button onClick={() => setActiveComponent("EmailTemplateManager")}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="Emails" />
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
            <FileUpload />
          </ListItemIcon>
          <ListItemText primary="Importer" />         
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

export default Sidebar;
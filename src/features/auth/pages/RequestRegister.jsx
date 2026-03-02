
import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Box,
  Grid,
  InputAdornment,
  Paper,
  Container,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import AuthLayout from "../../../layout/AuthLayout";
import { sendRegisterRequest } from "../api/authApi";
import { validateUniversityEmail } from "../../../utils/validators";

export default function RequestRegister() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    if (!validateUniversityEmail(email)) {
      setError("Please enter a valid university email.");
      return;
    }

    try {
      const res = await sendRegisterRequest({ email });
      setMessage(res.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <AuthLayout>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            minHeight: "calc(100vh - 100px)",
          }}
        >
          {/* LEFT SIDE - Content */}
          <Grid item xs={12} md={6}>
            <Stack spacing={4} sx={{ maxWidth: 550 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    bgcolor: "#d0895b",
                    borderRadius: 2,
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SchoolOutlinedIcon sx={{ color: "#000", fontSize: 30 }} />
                </Box>
                <Typography variant="h3" fontWeight={800}>
                  Join the
                  <Box component="span" sx={{ color: "#d0895b", display: "block" }}>
                    Academic Network
                  </Box>
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "text.secondary", fontWeight: 400, lineHeight: 1.6 }}
              >
                Become part of a collaborative academic ecosystem designed
                to connect students, supervisors, and research teams.
              </Typography>

              <Stack spacing={2.5} sx={{ mt: 2 }}>
                {[
                  "Connect with supervisors",
                  "Manage your graduation project",
                  "Track academic progress",
                ].map((text, i) => (
                  <Box key={i} display="flex" alignItems="center" gap={2}>
                    <CheckCircleOutlineIcon
                      sx={{ color: "#d0895b", fontSize: 24 }}
                    />
                    <Typography variant="h6" fontWeight={500}>
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* RIGHT SIDE - مربع الكارد الواضح */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={3.5}>
                {/* Header */}
                <Box>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Request Access
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter your university email to get started
                  </Typography>
                </Box>

                {/* Alerts */}
                {error && (
                  <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert severity="success" sx={{ borderRadius: 2 }}>
                    {message}
                  </Alert>
                )}

                {/* Email Field - مربع */}
                <TextField
                  fullWidth
                  label="University Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@university.edu"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "#d0895b" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "background.default",
                      "&:hover fieldset": {
                        borderColor: "#d0895b",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontWeight: 500,
                    },
                  }}
                />

                {/* Submit Button - مربع */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.8,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    bgcolor: "#d0895b",
                    color: "#000",
                    boxShadow: "0 8px 16px rgba(245, 158, 11, 0.2)",
                    "&:hover": {
                      bgcolor: "#d0895b",
                      boxShadow: "0 12px 20px rgba(245, 158, 11, 0.3)",
                    },
                  }}
                >
                  Submit Request
                </Button>

                {/* Footer Note */}
                <Typography
                  variant="caption"
                  align="center"
                  sx={{ color: "text.disabled", display: "block" }}
                >
                  Only university email addresses are accepted
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthLayout>
  );
}
// import { useState } from "react";
// import {
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Box,
//   Grid,
//   InputAdornment,
//   Paper,
//   Container,
//   Link,
//   Checkbox,
//   FormControlLabel,
//   Divider,
//   Avatar,
// } from "@mui/material";

// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import GroupsIcon from "@mui/icons-material/Groups";
// import SearchIcon from "@mui/icons-material/Search";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import TimelineIcon from "@mui/icons-material/Timeline";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import AutoStoriesIcon from "@mui/icons-material/AutoStories";

// import AuthLayout from "../../../layout/AuthLayout";
// import { sendRegisterRequest } from "../api/authApi";
// import { validateUniversityEmail } from "../../../utils/validators";

// // درجة اللون الأساسية
// const primaryColor = "#d0895b";

// export default function CreateAcademicAccount() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   // البيانات المخفية اللي رح ترسل للباك إند
//   const hiddenData = {
//     fullName: "Aya Mohamad Abu_Ghozeh",
//     department: "Computer Systems Engineering",
//     universityId: "202210321",
//     academicYear: "2025",
//     supervisor: "Thaer Sammar, Ph.D.",
//     university: "Palestine Technical University (Kadoorie)",
//     faculty: "Faculty of Engineering and Technology",
//   };

//   const handleSubmit = async () => {
//     if (!validateUniversityEmail(email)) {
//       setError("Please enter a valid university email.");
//       return;
//     }

//     if (!agreeToTerms) {
//       setError("You must agree to Terms & Privacy.");
//       return;
//     }

//     try {
//       // دمج الإيميل مع البيانات المخفية وإرسالها للباك إند
//       const requestData = {
//         email,
//         ...hiddenData,
//         darkMode, // تفضيلات المستخدم
//       };
      
//       const res = await sendRegisterRequest(requestData);
//       setMessage(res.message);
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <AuthLayout>
//       {/* خلفية مع عناصر متحركة خفيفة */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: 0,
//           overflow: "hidden",
//           pointerEvents: "none",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: "10%",
//             left: "5%",
//             width: "300px",
//             height: "300px",
//             borderRadius: "50%",
//             background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)`,
//             animation: "float 20s infinite ease-in-out",
//           },
//           "&::after": {
//             content: '""',
//             position: "absolute",
//             bottom: "10%",
//             right: "5%",
//             width: "400px",
//             height: "400px",
//             borderRadius: "50%",
//             background: `radial-gradient(circle, ${primaryColor}15 0%, transparent 70%)`,
//             animation: "float 25s infinite ease-in-out reverse",
//           },
//           "@keyframes float": {
//             "0%": { transform: "translate(0, 0) scale(1)" },
//             "50%": { transform: "translate(30px, 20px) scale(1.1)" },
//             "100%": { transform: "translate(0, 0) scale(1)" },
//           },
//         }}
//       />

//       <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
//         <Grid 
//           container 
//           spacing={6}
//           alignItems="center"
//         >
//           {/* LEFT SIDE - Academic Content */}
//           <Grid item xs={12} md={6}>
//             <Stack spacing={4}>
//               {/* Academia GPMS - بشكل أنيق */}
//               <Box>
//                 <Typography 
//                   variant="h2" 
//                   fontWeight={800} 
//                   sx={{ 
//                     fontSize: { xs: "3rem", md: "4rem" },
//                     lineHeight: 1.1,
//                     background: `linear-gradient(135deg, #fff 0%, ${primaryColor} 100%)`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     mb: 2,
//                   }}
//                 >
//                   Academia
//                   <br />
//                   GPMS
//                 </Typography>

//                 <Typography 
//                   variant="h4" 
//                   fontWeight={600}
//                   sx={{ 
//                     color: primaryColor,
//                     mb: 2,
//                   }}
//                 >
//                   Join the Nexus of
//                   <Box component="span" sx={{ display: "block", fontWeight: 800 }}>
//                     Academic Excellence
//                   </Box>
//                 </Typography>

//                 <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, lineHeight: 1.8 }}>
//                   Become part of a community of scholars, researchers, and innovators shaping the future.
//                 </Typography>
//               </Box>

//               {/* Features - شبكة الميزات 2x2 */}
//               <Grid container spacing={2} sx={{ mt: 2 }}>
//                 {[
//                   { icon: GroupsIcon, text: "Connect with peers", color: "#2196f3" },
//                   { icon: SearchIcon, text: "Find your supervisor", color: "#4caf50" },
//                   { icon: AssignmentIcon, text: "Manage your project", color: "#f59e0b" },
//                   { icon: TimelineIcon, text: "Track your progress", color: "#e91e63" },
//                 ].map((feature, index) => (
//                   <Grid item xs={6} key={index}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1.5,
//                         p: 2,
//                         borderRadius: 2,
//                         bgcolor: "rgba(255,255,255,0.03)",
//                         border: "1px solid",
//                         borderColor: "rgba(255,255,255,0.05)",
//                         transition: "all 0.3s ease",
//                         "&:hover": {
//                           borderColor: primaryColor,
//                           transform: "translateY(-4px)",
//                           bgcolor: "rgba(208, 137, 91, 0.05)",
//                         },
//                       }}
//                     >
//                       <Avatar
//                         sx={{
//                           bgcolor: feature.color,
//                           width: 32,
//                           height: 32,
//                         }}
//                       >
//                         <feature.icon sx={{ fontSize: 18, color: "#fff" }} />
//                       </Avatar>
//                       <Typography variant="body2" fontWeight={500}>
//                         {feature.text}
//                       </Typography>
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>

//               {/* University Info - بشكل مصغر في الأسفل */}
//               <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2, opacity: 0.7 }}>
//                 <AccountBalanceIcon sx={{ fontSize: 16, color: primaryColor }} />
//                 <Typography variant="caption" color="text.secondary">
//                   Palestine Technical University (Kadoorie) • Faculty of Engineering
//                 </Typography>
//               </Box>
//             </Stack>
//           </Grid>

//           {/* RIGHT SIDE - Registration Card (بس حقل الإيميل) */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,
//                 borderRadius: 3,
//                 bgcolor: "background.paper",
//                 border: "1px solid",
//                 borderColor: "divider",
//                 backdropFilter: "blur(10px)",
//                 position: "relative",
//                 overflow: "hidden",
//                 "&::before": {
//                   content: '""',
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: 4,
//                   background: `linear-gradient(90deg, ${primaryColor}, #f0a57e)`,
//                 },
//               }}
//             >
//               <Stack spacing={3.5}>
//                 {/* Form Header */}
//                 <Box>
//                   <Typography variant="h4" fontWeight={700} gutterBottom>
//                     Create Academic Account
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Join the graduation project management ecosystem.
//                   </Typography>
//                 </Box>

//                 <Divider>
//                   <AutoStoriesIcon sx={{ color: primaryColor, fontSize: 20 }} />
//                 </Divider>

//                 {/* رسائل الخطأ/النجاح */}
//                 {error && (
//                   <Paper sx={{ p: 1.5, bgcolor: "error.dark", color: "white" }}>
//                     <Typography variant="body2">{error}</Typography>
//                   </Paper>
//                 )}
//                 {message && (
//                   <Paper sx={{ p: 1.5, bgcolor: "success.dark", color: "white" }}>
//                     <Typography variant="body2">{message}</Typography>
//                   </Paper>
//                 )}

//                 {/* Email Field فقط - الباقي مخفي */}
//                 <TextField
//                   fullWidth
//                   label="University Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your.name@university.edu"
//                   variant="outlined"
//                   size="medium"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <EmailOutlinedIcon sx={{ color: primaryColor }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       bgcolor: "background.default",
//                       "&:hover .MuiOutlinedInput-notchedOutline": {
//                         borderColor: primaryColor,
//                       },
//                     },
//                   }}
//                 />

//                 {/* Terms Checkbox */}
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={agreeToTerms}
//                       onChange={(e) => setAgreeToTerms(e.target.checked)}
//                       size="small"
//                       sx={{
//                         color: primaryColor,
//                         "&.Mui-checked": { color: primaryColor },
//                       }}
//                     />
//                   }
//                   label={
//                     <Typography variant="body2">
//                       I agree to{" "}
//                       <Link href="#" sx={{ color: primaryColor, textDecoration: "none", fontWeight: 600 }}>
//                         Terms & Privacy
//                       </Link>
//                     </Typography>
//                   }
//                 />

//                 {/* Create Account Button */}
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={handleSubmit}
//                   fullWidth
//                   sx={{
//                     borderRadius: 2,
//                     py: 1.8,
//                     fontSize: "1rem",
//                     fontWeight: 600,
//                     textTransform: "none",
//                     bgcolor: primaryColor,
//                     color: "#fff",
//                     "&:hover": {
//                       bgcolor: "#b06f47",
//                       transform: "translateY(-2px)",
//                       boxShadow: `0 8px 16px ${primaryColor}60`,
//                     },
//                   }}
//                 >
//                   Create Account
//                 </Button>

//                 {/* Sign In Link */}
//                 <Box textAlign="center">
//                   <Typography variant="body2">
//                     Already registered?{" "}
//                     <Link href="#" sx={{ color: primaryColor, textDecoration: "none", fontWeight: 600 }}>
//                       Sign in here
//                     </Link>
//                   </Typography>
//                 </Box>

//                 {/* Dark Mode Toggle */}
//                 <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
//                   <Checkbox
//                     checked={darkMode}
//                     onChange={(e) => setDarkMode(e.target.checked)}
//                     size="small"
//                     sx={{
//                       color: primaryColor,
//                       "&.Mui-checked": { color: primaryColor },
//                       p: 0.5
//                     }}
//                   />
//                   <Typography variant="caption" sx={{ color: "text.disabled" }}>
//                     DARK MODE
//                   </Typography>
//                 </Box>

//                 {/* Hidden Data - للتوضيح فقط (مش رح يظهر للمستخدم) */}
//                 <Box sx={{ display: "none" }}>
//                   {/* هذه البيانات مخفية وترسل تلقائياً مع الطلب */}
//                   <input type="hidden" name="fullName" value={hiddenData.fullName} />
//                   <input type="hidden" name="department" value={hiddenData.department} />
//                   <input type="hidden" name="universityId" value={hiddenData.universityId} />
//                   <input type="hidden" name="academicYear" value={hiddenData.academicYear} />
//                   <input type="hidden" name="supervisor" value={hiddenData.supervisor} />
//                 </Box>
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </AuthLayout>
//   );
// }
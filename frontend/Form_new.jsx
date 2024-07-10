
// //npm uninstall @mui/x-date-pickers date-fns
// //npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers@5.0.0-alpha.6 date-fns@2.25.0 --legacy-peer-deps


// // // // import React, { useState, useRef, useEffect } from 'react';
// // // // import {
// // // //   Container, CssBaseline, TextField, FormControl, Button, Grid, Typography, MenuItem
// // // // } from '@mui/material';
// // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // // import { useForm, Controller } from 'react-hook-form';
// // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
// // // // import Topbar from './Topbar';
// // // // import Sidebar from './Sidebar';
// // // // import '../Styles/Form.css';

// // // // const Form = ({ isDarkMode, toggleTheme }) => {
// // // //   const { register, handleSubmit, control, formState: { errors } } = useForm();
// // // //   const [startDate, setStartDate] = useState(new Date());
// // // //   const fileInputRef = useRef(null);

// // // //   const onSubmit = async (data) => {
// // // //     data.runDate = startDate.toISOString().split('T')[0];  // Format date as YYYY-MM-DD
// // // //     try {
// // // //       const response = await fetch('http://localhost:5000/submit_form', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(data),
// // // //       });
// // // //       const result = await response.json();
// // // //       alert(result.message);
// // // //     } catch (error) {
// // // //       console.error('Error submitting form:', error);
// // // //     }
// // // //   };

// // // //   const handleIconClick = () => {
// // // //     if (fileInputRef.current) {
// // // //       fileInputRef.current.click();
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
// // // //       <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
// // // //       <Sidebar />
// // // //       <CssBaseline />
// // // //       <Container maxWidth="md" className="form-container">
// // // //         <form onSubmit={handleSubmit(onSubmit)}>
// // // //           <Grid container spacing={2}>
// // // //             <Grid item xs={12}>
// // // //               <FormControl fullWidth variant="outlined" className="form-control">
// // // //                 <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // //                   <Controller
// // // //                     control={control}
// // // //                     name="runDate"
// // // //                     render={({ field }) => (
// // // //                       <DatePicker
// // // //                         label="Select Run Date"
// // // //                         value={startDate}
// // // //                         onChange={(date) => {
// // // //                           setStartDate(date);
// // // //                           field.onChange(date);
// // // //                         }}
// // // //                         renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
// // // //                       />
// // // //                     )}
// // // //                   />
// // // //                 </LocalizationProvider>
// // // //               </FormControl>
// // // //             </Grid>
// // // //             <Grid item xs={12}>
// // // //               <FormControl fullWidth variant="outlined" className="form-control">
// // // //                 <Controller
// // // //                   control={control}
// // // //                   name="outputType"
// // // //                   render={({ field }) => (
// // // //                     <TextField
// // // //                       select
// // // //                       label="Select Output Type"
// // // //                       {...field}
// // // //                       variant="outlined"
// // // //                       fullWidth
// // // //                     >
// // // //                       <MenuItem value="all">All</MenuItem>
// // // //                       <MenuItem value="PVTableWithHeaders">PVTableWithHeaders</MenuItem>
// // // //                       <MenuItem value="PVUSDTableWithHeaders">PVUSDTableWithHeaders</MenuItem>
// // // //                       <MenuItem value="RiskTableWithHeaders">RiskTableWithHeaders</MenuItem>
// // // //                       <MenuItem value="RiskTableWithHeadersLite">RiskTableWithHeadersLite</MenuItem>
// // // //                     </TextField>
// // // //                   )}
// // // //                 />
// // // //               </FormControl>
// // // //             </Grid>
// // // //             <Grid item xs={12}>
// // // //               <FormControl fullWidth variant="outlined" className="form-control">
// // // //                 <TextField
// // // //                   id="outputDirectory"
// // // //                   label="Enter Output Directory"
// // // //                   placeholder="\\global.nomura.com\gm\EU\Business_Reso\..."
// // // //                   variant="outlined"
// // // //                   fullWidth
// // // //                   InputProps={{
// // // //                     endAdornment: (
// // // //                       <FontAwesomeIcon icon={faFolderOpen} onClick={handleIconClick} style={{ cursor: 'pointer', marginLeft: '10px' }} />
// // // //                     ),
// // // //                   }}
// // // //                   {...register("outputDirectory", { required: true })}
// // // //                 />
// // // //                 <input
// // // //                   type="file"
// // // //                   ref={fileInputRef}
// // // //                   style={{ display: 'none' }}
// // // //                 />
// // // //               </FormControl>
// // // //             </Grid>
// // // //             <Grid item xs={12}>
// // // //               <FormControl fullWidth variant="outlined" className="form-control">
// // // //                 <TextField
// // // //                   id="curveData"
// // // //                   label="Enter Basis SOFR / Unmanaged Unsecured 3M Curve"
// // // //                   placeholder="Copy the curve (incl. tenors) from Excel without headers"
// // // //                   multiline
// // // //                   rows={2}
// // // //                   variant="outlined"
// // // //                   fullWidth
// // // //                   {...register("curveData", { required: true })}
// // // //                 />
// // // //               </FormControl>
// // // //             </Grid>
// // // //             <Grid item xs={12}>
// // // //               <Button variant="contained" color="primary" type="submit" fullWidth>
// // // //                 Submit
// // // //               </Button>
// // // //             </Grid>
// // // //           </Grid>
// // // //         </form>
// // // //       </Container>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Form;
// // // import React, { useState, useRef } from 'react';
// // // import {
// // //     Container, CssBaseline, TextField, FormControl, Button, Grid, Typography, MenuItem, Switch
// // //   } from '@mui/material';
// // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // import { useForm, Controller } from 'react-hook-form';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
// // // import '../Styles/Form.css';

// // // const Form = ({ isDarkMode, toggleTheme }) => {
// // //   const { register, handleSubmit, control, formState: { errors } } = useForm();
// // //   const [startDate, setStartDate] = useState(new Date());
// // //   const fileInputRef = useRef(null);

// // //   const onSubmit = async (data) => {
// // //     data.runDate = startDate.toISOString().split('T')[0];  // Format date as YYYY-MM-DD
// // //     try {
// // //       const response = await fetch('http://localhost:5000/submit_form', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(data),
// // //       });
// // //       const result = await response.json();
// // //       alert(result.message);
// // //     } catch (error) {
// // //       console.error('Error submitting form:', error);
// // //     }
// // //   };

// // //   const handleIconClick = () => {
// // //     if (fileInputRef.current) {
// // //       fileInputRef.current.click();
// // //     }
// // //   };

// // //   return (
// // //     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
// // //       <CssBaseline />
// // //       <Container maxWidth="md" className="form-container">
// // //         <Typography variant="h6" gutterBottom>
// // //           Toggle Theme
// // //           <Switch checked={isDarkMode} onChange={toggleTheme} />
// // //         </Typography>
// // //         <form onSubmit={handleSubmit(onSubmit)}>
// // //           <Grid container spacing={2}>
// // //             <Grid item xs={12}>
// // //               <FormControl fullWidth variant="outlined" className="form-control">
// // //                 <LocalizationProvider dateAdapter={AdapterDateFns}>
// // //                   <Controller
// // //                     control={control}
// // //                     name="runDate"
// // //                     render={({ field }) => (
// // //                       <DatePicker
// // //                         label="Select Run Date"
// // //                         value={startDate}
// // //                         onChange={(date) => {
// // //                           setStartDate(date);
// // //                           field.onChange(date);
// // //                         }}
// // //                         renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
// // //                       />
// // //                     )}
// // //                   />
// // //                 </LocalizationProvider>
// // //               </FormControl>
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <FormControl fullWidth variant="outlined" className="form-control">
// // //                 <Controller
// // //                   control={control}
// // //                   name="outputType"
// // //                   render={({ field }) => (
// // //                     <TextField
// // //                       select
// // //                       label="Select Output Type"
// // //                       {...field}
// // //                       variant="outlined"
// // //                       fullWidth
// // //                     >
// // //                       <MenuItem value="all">All</MenuItem>
// // //                       <MenuItem value="PVTableWithHeaders">PVTableWithHeaders</MenuItem>
// // //                       <MenuItem value="PVUSDTableWithHeaders">PVUSDTableWithHeaders</MenuItem>
// // //                       <MenuItem value="RiskTableWithHeaders">RiskTableWithHeaders</MenuItem>
// // //                       <MenuItem value="RiskTableWithHeadersLite">RiskTableWithHeadersLite</MenuItem>
// // //                     </TextField>
// // //                   )}
// // //                 />
// // //               </FormControl>
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <FormControl fullWidth variant="outlined" className="form-control">
// // //                 <TextField
// // //                   id="outputDirectory"
// // //                   label="Enter Output Directory"
// // //                   placeholder="\\global.nomura.com\gm\EU\Business_Reso\..."
// // //                   variant="outlined"
// // //                   fullWidth
// // //                   InputProps={{
// // //                     endAdornment: (
// // //                       <FontAwesomeIcon icon={faFolderOpen} onClick={handleIconClick} style={{ cursor: 'pointer', marginLeft: '10px' }} />
// // //                     ),
// // //                   }}
// // //                   {...register("outputDirectory", { required: true })}
// // //                 />
// // //                 <input
// // //                   type="file"
// // //                   ref={fileInputRef}
// // //                   style={{ display: 'none' }}
// // //                 />
// // //               </FormControl>
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <FormControl fullWidth variant="outlined" className="form-control">
// // //                 <TextField
// // //                   id="curveData"
// // //                   label="Enter Basis SOFR / Unmanaged Unsecured 3M Curve"
// // //                   placeholder="Copy the curve (incl. tenors) from Excel without headers"
// // //                   multiline
// // //                   rows={2}
// // //                   variant="outlined"
// // //                   fullWidth
// // //                   {...register("curveData", { required: true })}
// // //                 />
// // //               </FormControl>
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <Button variant="contained" color="primary" type="submit" fullWidth>
// // //                 Submit
// // //               </Button>
// // //             </Grid>
// // //           </Grid>
// // //         </form>
// // //       </Container>
// // //     </div>
// // //   );
// // // };

// // // export default Form;

// // import React, { useState, useRef } from 'react';
// // import { Container, CssBaseline, TextField, FormControl, Button, Grid, Typography, Switch, MenuItem } from '@mui/material';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { useForm, Controller } from 'react-hook-form';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
// // import '../Styles/Form.css';

// // const Form = () => {
// //   const [isDarkMode, setIsDarkMode] = useState(true);
// //   const { register, handleSubmit, control, formState: { errors } } = useForm();
// //   const [startDate, setStartDate] = useState(new Date());
// //   const fileInputRef = useRef(null);

// //   const onSubmit = async (data) => {
// //     data.runDate = startDate.toISOString().split('T')[0];  // Format date as YYYY-MM-DD
// //     try {
// //       const response = await fetch('http://localhost:5000/submit_form', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(data),
// //       });
// //       const result = await response.json();
// //       alert(result.message);
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //     }
// //   };

// //   const toggleTheme = () => {
// //     setIsDarkMode(!isDarkMode);
// //   };

// //   const handleIconClick = () => {
// //     if (fileInputRef.current) {
// //       fileInputRef.current.click();
// //     }
// //   };

// //   return (
// //     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
// //       <CssBaseline />
// //       <Container maxWidth="md" className="form-container">
// //         <Typography variant="h6" gutterBottom>
// //           Toggle Theme
// //           <Switch checked={!isDarkMode} onChange={toggleTheme} />
// //         </Typography>
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //           <Grid container spacing={2}>
// //             <Grid item xs={12}>
// //               <FormControl fullWidth variant="outlined" className="form-control">
// //                 <LocalizationProvider dateAdapter={AdapterDateFns}>
// //                   <Controller
// //                     control={control}
// //                     name="runDate"
// //                     render={({ field }) => (
// //                       <DatePicker
// //                         label="Select Run Date"
// //                         value={startDate}
// //                         onChange={(date) => {
// //                           setStartDate(date);
// //                           field.onChange(date);
// //                         }}
// //                         renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
// //                       />
// //                     )}
// //                   />
// //                 </LocalizationProvider>
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <FormControl fullWidth variant="outlined" className="form-control">
// //                 <Controller
// //                   control={control}
// //                   name="outputType"
// //                   render={({ field }) => (
// //                     <TextField
// //                       select
// //                       label="Select Output Type"
// //                       {...field}
// //                       variant="outlined"
// //                       fullWidth
// //                     >
// //                       <MenuItem value="all">All</MenuItem>
// //                       <MenuItem value="PVTableWithHeaders">PVTableWithHeaders</MenuItem>
// //                       <MenuItem value="PVUSDTableWithHeaders">PVUSDTableWithHeaders</MenuItem>
// //                       <MenuItem value="RiskTableWithHeaders">RiskTableWithHeaders</MenuItem>
// //                       <MenuItem value="RiskTableWithHeadersLite">RiskTableWithHeadersLite</MenuItem>
// //                     </TextField>
// //                   )}
// //                 />
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <FormControl fullWidth variant="outlined" className="form-control">
// //                 <TextField
// //                   id="outputDirectory"
// //                   label="Enter Output Directory"
// //                   placeholder="\\global.nomura.com\gm\EU\Business_Reso\..."
// //                   variant="outlined"
// //                   fullWidth
// //                   InputProps={{
// //                     endAdornment: (
// //                       <FontAwesomeIcon icon={faFolderOpen} onClick={handleIconClick} style={{ cursor: 'pointer', marginLeft: '10px' }} />
// //                     ),
// //                   }}
// //                   {...register("outputDirectory", { required: true })}
// //                 />
// //                 <input
// //                   type="file"
// //                   ref={fileInputRef}
// //                   style={{ display: 'none' }}
// //                 />
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <FormControl fullWidth variant="outlined" className="form-control">
// //                 <TextField
// //                   id="curveData"
// //                   label="Enter Basis SOFR / Unmanaged Unsecured 3M Curve"
// //                   placeholder="Copy the curve (incl. tenors) from Excel without headers"
// //                   multiline
// //                   rows={2}
// //                   variant="outlined"
// //                   fullWidth
// //                   {...register("curveData", { required: true })}
// //                 />
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <Button variant="contained" color="primary" type="submit" fullWidth>
// //                 Submit
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         </form>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default Form;


// import React, { useState, useRef } from 'react';
// import { Container, CssBaseline, TextField, FormControl, Button, Grid, Typography, MenuItem, Switch } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useForm, Controller } from 'react-hook-form';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
// import Topbar from './Topbar';  // Make sure to import Topbar
// import '../Styles/Form.css';

// const Form = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true); // State for theme
//   const { register, handleSubmit, control } = useForm();
//   const [startDate, setStartDate] = useState(new Date());
//   const fileInputRef = useRef(null);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const onSubmit = async (data) => {
//     data.runDate = startDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//     try {
//       const response = await fetch('http://localhost:5000/submit_form', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       const result = await response.json();
//       alert(result.message);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleIconClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
//       <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> {/* Include Topbar here */}
//       <CssBaseline />
//       <Container maxWidth="md" className="form-container">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <FormControl fullWidth variant="outlined" className="form-control">
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <Controller
//                     control={control}
//                     name="runDate"
//                     render={({ field }) => (
//                       <DatePicker
//                         label="Select Run Date"
//                         value={startDate}
//                         onChange={(date) => {
//                           setStartDate(date);
//                           field.onChange(date);
//                         }}
//                         renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
//                       />
//                     )}
//                   />
//                 </LocalizationProvider>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth variant="outlined" className="form-control">
//                 <Controller
//                   control={control}
//                   name="outputType"
//                   render={({ field }) => (
//                     <TextField
//                       select
//                       label="Select Output Type"
//                       {...field}
//                       variant="outlined"
//                       fullWidth
//                     >
//                       <MenuItem value="all">All</MenuItem>
//                       <MenuItem value="PVTableWithHeaders">PVTableWithHeaders</MenuItem>
//                       <MenuItem value="PVUSDTableWithHeaders">PVUSDTableWithHeaders</MenuItem>
//                       <MenuItem value="RiskTableWithHeaders">RiskTableWithHeaders</MenuItem>
//                       <MenuItem value="RiskTableWithHeadersLite">RiskTableWithHeadersLite</MenuItem>
//                     </TextField>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth variant="outlined" className="form-control">
//                 <TextField
//                   id="outputDirectory"
//                   label="Enter Output Directory"
//                   placeholder="\\global.nomura.com\gm\EU\Business_Reso\..."
//                   variant="outlined"
//                   fullWidth
//                   InputProps={{
//                     endAdornment: (
//                       <FontAwesomeIcon icon={faFolderOpen} onClick={handleIconClick} style={{ cursor: 'pointer', marginLeft: '10px' }} />
//                     ),
//                   }}
//                   {...register("outputDirectory", { required: true })}
//                 />
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   style={{ display: 'none' }}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth variant="outlined" className="form-control">
//                 <TextField
//                   id="curveData"
//                   label="Enter Basis SOFR / Unmanaged Unsecured 3M Curve"
//                   placeholder="Copy the curve (incl. tenors) from Excel without headers"
//                   multiline
//                   rows={2}
//                   variant="outlined"
//                   fullWidth
//                   {...register("curveData", { required: true })}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="contained" color="primary" type="submit" fullWidth>
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </div>
//   );
// };

// export default Form;


import React, { useState, useRef, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container, CssBaseline, TextField, FormControl, Button, Grid, Typography, MenuItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { ThemeContext } from '../Components/ThemeContext';
import '../Styles/Form.css';

const Form = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const fileInputRef = useRef(null);

  const onSubmit = async (data) => {
    data.runDate = startDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
      const response = await fetch('http://localhost:5000/submit_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Topbar />
      <Sidebar />
      <div className="form-container">
        <Container maxWidth="md" className="form-content">
          <Typography variant="h6" gutterBottom>
            FVABot Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" className="form-control">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      control={control}
                      name="runDate"
                      render={({ field }) => (
                        <DatePicker
                          label="Select Run Date"
                          value={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                            field.onChange(date);
                          }}
                          renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" className="form-control">
                  <Controller
                    control={control}
                    name="outputType"
                    render={({ field }) => (
                      <TextField
                        select
                        label="Select Output Type"
                        {...field}
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="PVTableWithHeaders">PVTableWithHeaders</MenuItem>
                        <MenuItem value="PVUSDTableWithHeaders">PVUSDTableWithHeaders</MenuItem>
                        <MenuItem value="RiskTableWithHeaders">RiskTableWithHeaders</MenuItem>
                        <MenuItem value="RiskTableWithHeadersLite">RiskTableWithHeadersLite</MenuItem>
                      </TextField>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" className="form-control">
                  <TextField
                    id="outputDirectory"
                    label="Enter Output Directory"
                    placeholder="\\global.nomura.com\gm\EU\Business_Reso\..."
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <FontAwesomeIcon icon={faFolderOpen} onClick={handleIconClick} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                      ),
                    }}
                    {...register('outputDirectory', { required: true })}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" className="form-control">
                  <TextField
                    id="curveData"
                    label="Enter Basis SOFR / Unmanaged Unsecured 3M Curve"
                    placeholder="Copy the curve (incl. tenors) from Excel without headers"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    {...register('curveData', { required: true })}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Form;

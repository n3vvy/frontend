import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Box, Alert, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { userRequest } from '../../services/requestMethods';

const ReportedPostsInfoTable = () => {
    const [reports, setReports] = useState([]);
    const [open, setOpen] = useState({});

    useEffect(() => {
        axios.get('https://nevvy.herokuapp.com/api/report/all-reports')
            .then(response => {
                const sortedReports = response.data.sort((a, b) => new Date(b.report_date) - new Date(a.report_date));
                setReports(sortedReports);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    

    const handleClick = (id) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }));
    };

    const tableCellStyle = {
        backgroundColor: '#1b0749',
        color: '#ffffff',
        fontWeight: 'bold',
        textShadow: '1px 1px 10px #8d66ad',
        border: '2px solid #8d66ad',
    };

    const alertStyle = {
        backgroundColor: '#1b0749',
        color: '#ffffff',
        fontWeight: 'bold',
        textShadow: '1px 1px 10px #8d66ad',
        border: '2px solid #8d66ad',
    };

    const handleDelete = (postId, reportId) => {
        userRequest
          .delete(`https://nevvy.herokuapp.com/api/post/deleteByAdmin/${postId}`)
          .then((response) => {
            // Aktualizuj listę zgłoszeń po usunięciu
            setReports((prevReports) =>
              prevReports.filter((report) => report.post_id !== postId)
            );
          })
          .catch((error) => {
            console.error('There was an error deleting the post!', error);
          });
          
          userRequest
          .delete(`https://nevvy.herokuapp.com/api/report/${reportId}`)
          .then((response) => {
            // Aktualizuj listę zgłoszeń po usunięciu
            setReports((prevReports) =>
              prevReports.filter((report) => report._id !== reportId)
            );
          })
          .catch((error) => {
            console.error('There was an error deleting the report!', error);
          });
      };


      

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={tableCellStyle}>ID zgłoszenia</TableCell>
                        <TableCell style={tableCellStyle}>ID posta</TableCell>
                        <TableCell style={tableCellStyle}>Powód zgłoszenia</TableCell>
                        <TableCell style={tableCellStyle}>Czy rozwiązane</TableCell>
                        <TableCell style={tableCellStyle}>Data zgłoszenia</TableCell>
                        <TableCell style={tableCellStyle}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((report) => (
                        <React.Fragment key={report._id}>
                            <TableRow onClick={() => handleClick(report._id)}>
                                <TableCell style={tableCellStyle}>{report._id}</TableCell>
                                <TableCell style={tableCellStyle}><Link to={`/post/${report.post_id}`}>{report.post_id}</Link></TableCell>
                                <TableCell style={tableCellStyle}>{report.report_reason}</TableCell>
                                <TableCell style={tableCellStyle}>{report.isResolved ? "Tak" : "Nie"}</TableCell>
                                <TableCell style={tableCellStyle}>{new Date(report.report_date).toLocaleString()}</TableCell>
                                <TableCell style={tableCellStyle}>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(report.post_id, report._id)}>Usuń</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open[report._id]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Alert severity="info" style={alertStyle}>
                                                <strong>ID zgłaszającego: </strong>{report.reporter_id}
                                            </Alert>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ReportedPostsInfoTable;

import React from 'react'
import Navbar from '../components/form/Navbar'
import { Helmet } from 'react-helmet'
import ReportedPostsInfoTable from '../components/form/ReportedPostsInfoTable'

const ReportPostsInfo = () => {
    return (
        
        <div className="home-container">
            <Helmet>
                <title>Zgłoszone posty - Admin</title>
            </Helmet>
            <Navbar></Navbar>
            <div className='report-post-title'>
            <p>Zgłoszone posty</p>
            </div>
            <ReportedPostsInfoTable></ReportedPostsInfoTable>
        </div>
    )
}

export default ReportPostsInfo
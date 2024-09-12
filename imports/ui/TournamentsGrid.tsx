import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';

const TournamentsGrid = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch('https://lichess.org/api/tournament');
                const data = await response.json();
                console.log("hello>>", data)
                const tournamentData = data.finished.map((tournament, index) => ({
                    id: tournament.id,
                    name: tournament.fullName,
                    creator: tournament.createdBy,
                    startsAt: new Date(tournament.startsAt).toLocaleString(),
                    status: tournament.status,
                }));
                setTournaments(tournamentData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournaments();
    }, []);

    const columns = [
        {
            field: 'name',
            headerName: 'Tournament Name',
            width: 300,
            renderCell: (params) => (
                <Link to={`/tournaments/${params.row.id}`}>
                    {params.value}
                </Link>
            ),
        },
        { field: 'creator', headerName: 'Created By', width: 200 },
        { field: 'startsAt', headerName: 'Start Time', width: 200 },
    ];

    return (
        <>
            <DataGrid
                sx={{mt: 1}}
                pagination
                pageSizeOptions={[5, 10, 25]}
                rows={tournaments}
                columns={columns}
                loading={loading}
            />
        </>
    );
};

export default TournamentsGrid;

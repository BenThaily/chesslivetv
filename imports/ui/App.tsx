import React from 'react';
import AppAppBar from "/imports/ui/components/AppAppBar";
import TournamentsGrid from "/imports/ui/TournamentsGrid";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Home} from "@mui/icons-material";
import Hello from "/imports/ui/Hello";
import {Info} from "/imports/ui/Info";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import GameViewer from "/imports/ui/GameViewer";
import TournamentPage from "/imports/ui/TournamentPage";


export const App = () => (
    <Router>
        <AppAppBar mode="light"/>
        <Container sx={{ py: { xs: 8, sm: 16 } }}>
            <Grid container >
                <Routes>
                    <Route path="/" element={<TournamentsGrid />} />
                    <Route path="/tournaments/:tournamentId" element={<TournamentPage />} />
                    <Route path="/tournaments/:tournamentId/:gameId" element={<GameViewer />} />
                </Routes>
            </Grid>
        </Container>
    </Router>

);

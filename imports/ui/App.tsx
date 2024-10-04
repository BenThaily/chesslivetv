import React from 'react';
import AppAppBar from "/imports/ui/components/AppAppBar";
import TournamentsGrid from "/imports/ui/TournamentsGrid";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Home} from "/imports/ui/Home";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import GameViewer from "/imports/ui/GameViewer";
import TournamentPage from "/imports/ui/TournamentPage";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";


export const App = () => {
    const mode = "dark"
    const defaultTheme = createTheme({ palette: { mode } });
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Router>
                <AppAppBar mode={mode}/>
                <Container sx={{ py: { xs: 8, sm: 16 } }}>
                    <Grid container >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tournaments" element={<TournamentsGrid />} />
                            <Route path="/tournaments/:tournamentId" element={<TournamentPage />} />
                            <Route path="/tournaments/:tournamentId/:gameId" element={<GameViewer />} />
                        </Routes>
                    </Grid>
                </Container>
            </Router>
        </ThemeProvider>
    )



};

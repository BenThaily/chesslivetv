import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChessGameViewer from "/imports/ui/components/ChessGameViewer";
import {Grid, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import Chat from "/imports/ui/components/Chat";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { CircularProgress, Box } from '@mui/material';

const cleanPgn = (pgn) => {
    // Remove any invisible characters or BOM
    return pgn.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
};

// Use this clean function before passing the PGN to the viewer


const fetchAndParseTournamentGames = async (pgnData) => {
    try {
        // Split the PGN data into individual games
        const games = pgnData.split(/\n\n(?=\[Event)/).filter(game => game.trim() !== '');

        // Extract metadata from each game
        const gameList = games.map((pgn, index) => {
            const name = pgn.match(/\[White "(.*?)"\]/)?.[1] + ' vs ' + pgn.match(/\[Black "(.*?)"\]/)?.[1];
            const id = index; // Use index as an identifier for simplicity

            return {
                id,
                name,
                pgn
            };
        });

        return gameList;
    } catch (error) {
        console.error('Error fetching or parsing tournament games:', error);
    }
};


const TournamentPage = () => {
    const { tournamentId } = useParams();
    const [games, setGames] = useState([]);
    const [pgn, setPgn] = useState()
    const [game, setGame] = useState()

    useEffect(() => {
        // Fetch games from Lichess API
        fetch(`https://api.chess.com/pub/player/mdelcid/games/2024/08`)
            .then(response => response.json())
            .then(data => {
                // Assume each game is separated by double newlines
                setGames(data.games);
                if (!game) {
                    selectGame(data.games[0])
                }
            });
    }, [tournamentId]);

    async function selectGame(game) {
        setPgn(game.pgn)
        setGame(game)
        console.log(game)
    }
    if (games.length == 0) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <div>
            { games.length > 0 &&
                <Card sx={{}}>
                    <CardContent>

                        <Grid container spacing={2} direction="row" >
                            <Grid item xs={2}
                                  sx={{
                                      maxHeight: '500px',
                                      width: '200px',
                                      overflowY: 'auto',
                                      scrollbarWidth: 'none',  // For Firefox
                                      '&::-webkit-scrollbar': {
                                          display: 'none',  // For Chrome, Safari, and Edge
                                      },
                                  }}
                            >
                                <List>
                                    {games.map((game, index) => (
                                        <ListItem
                                            button
                                            key={index}
                                            onClick={() => selectGame(game)}
                                            selected={pgn === game}
                                        >
                                            <ListItemText primary={`Game ${index + 1}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>

                            <Grid item xs={6}
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center">
                                {pgn ? (
                                    <>
                                        <ChessGameViewer pgn={pgn}/>
                                    </>
                                ) : (
                                    <div>
                                        <Typography variant="h6">Select a game to view</Typography>
                                    </div>
                                )}
                            </Grid>

                            <Grid item xs={4}>
                                {pgn ? (
                                    <>
                                        <Chat roomId={game.url}/>
                                    </>
                                ) : (
                                    <div/>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }


        </div>

    );
};

export default TournamentPage;

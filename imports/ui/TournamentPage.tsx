import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChessGameViewer from "/imports/ui/components/ChessGameViewer";
import {Grid, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import Chat from "/imports/ui/components/Chat";

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
            });
    }, [tournamentId]);

    async function selectGame(game) {
        setPgn(game.pgn)
        setGame(game)
        console.log(game)
    }
    return (
        <div>
            <h1>Games in Tournament: {tournamentId}</h1>
            <Grid container spacing={2}>
                {/* Left Column: List of Games */}
                <Grid item xs={4}
                      sx={{
                          maxHeight: '500px',
                          overflowY: 'auto'
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

                {/* Right Column: Chess Game Viewer */}
                <Grid item xs={8}>
                    {pgn ? (
                        <>
                            <ChessGameViewer pgn={pgn}/>
                            <br/>
                            <h1>Chat</h1>
                            <Chat roomId={game.url}/>
                        </>
                    ) : (
                        <Typography variant="h6">Select a game to view</Typography>
                    )}
                </Grid>
            </Grid>
        </div>

    );
};

export default TournamentPage;

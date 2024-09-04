import React, { useState, useEffect } from 'react';

const StockfishAnalytics = ({ pgn, turnNumber }) => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pgn || turnNumber === undefined) return;

        const fetchAnalysis = async () => {
            setLoading(true);
            setError(null);

            try {
                // Create a Web Worker for Stockfish
                const stockfishWorker = new Worker('/stockfish/stockfish.js');


                stockfishWorker.onmessage = (event) => {
                    const { data } = event;

                    if (data.includes('bestmove')) {
                        setAnalysis(data);
                        setLoading(false);
                    }
                };

                // Send commands to Stockfish
                stockfishWorker.postMessage('uci');
                stockfishWorker.postMessage('setoption name Hash value 128'); // Adjust options as needed
                stockfishWorker.postMessage('isready');

                // Load PGN and start analysis
                stockfishWorker.postMessage(`position fen ${getFenFromPgn(pgn, turnNumber)}`);
                stockfishWorker.postMessage('go depth 15');

                return () => {
                    stockfishWorker.terminate();
                };
            } catch (err) {
                setError('Failed to fetch Stockfish analysis');
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [pgn, turnNumber]);

    const getFenFromPgn = (pgn, turnNumber) => {
        // Convert PGN to FEN for the given turn number
        // Implement this based on your PGN parser
        return 'startpos'; // Placeholder: replace with actual FEN generation
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Stockfish Analysis</h2>
            <pre>{analysis}</pre>
        </div>
    );
};

export default StockfishAnalytics;


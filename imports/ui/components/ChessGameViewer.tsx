import React, { useEffect, useRef } from 'react';
import PGNV from '@mliebelt/pgn-viewer';

console.log("PGNV", PGNV)

const ChessGameViewer = ({ pgn }) => {
    const viewerRef = useRef(null);

    useEffect(() => {
        if (viewerRef.current) {
            PGNV.pgnView('chessBoard',{ pgn: pgn, pieceStyle: 'merida' });
        }
    }, [pgn]);

    return (
        <div>
            <div ref={viewerRef} id="chessBoard" />
        </div>
    );
};

export default ChessGameViewer;

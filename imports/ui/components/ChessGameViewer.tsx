import React, { useEffect, useRef } from 'react';
import PGNV from '@mliebelt/pgn-viewer';
import ChessAnalytics from "/imports/ui/components/GameAnalytics";

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
            {/*<div ref={viewerRef} id="chessBoard" />*/}
            <ChessAnalytics pgn={pgn} turnNumber={2}/>
        </div>
    );
};

export default ChessGameViewer;

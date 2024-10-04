import React, { useEffect, useRef } from 'react';
import PGNV from '@mliebelt/pgn-viewer';
import ChessAnalytics from "/imports/ui/components/GameAnalytics";


const ChessGameViewer = ({ pgn }) => {
    const viewerRef = useRef(null);

    useEffect(() => {
        if (viewerRef.current) {
            PGNV.pgnView('chessBoard',{
                mode: "view", layout: 'left',
                pgn: pgn, pieceStyle: 'merida' });
        }
    }, [pgn]);

    return (
        <div style={{width: "600px"}}>
            <div ref={viewerRef} id="chessBoard"/>
        </div>
    );
};

export default ChessGameViewer;

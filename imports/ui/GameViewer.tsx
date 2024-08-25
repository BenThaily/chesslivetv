import React from 'react';
import ChessGameViewer from './components/ChessGameViewer';

const pgn = `
[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5
7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 Bb7 12. Nbd2
Re8 13. cxb5 axb5 14. dxe5 dxe5 15. Bxf7+ Kxf7 16. Qb3+ Kf8
17. Ng5 Nc5 18. Qf7# 1-0
`;

const GameViewer = () => {
    return (
        <div>
            <h1>Chess Live TV</h1>
            <ChessGameViewer pgn={pgn} />
        </div>
    );
};

export default GameViewer;
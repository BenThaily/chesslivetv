import React from 'react';
import AppAppBar from "/imports/ui/components/AppAppBar";
import TournamentsGrid from "/imports/ui/TournamentsGrid";


export const App = () => (
    <div>
        <AppAppBar mode="light" />
        <TournamentsGrid />
    </div>
);

import React, { useEffect, useRef } from 'react';
import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';

const BlazeTemplate = ({ template, context = {} }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Render the Blaze template inside the React component
        const view = Blaze.renderWithData(Template[template], context, containerRef.current);

        // Clean up Blaze view when the component is unmounted
        return () => {
            Blaze.remove(view);
        };
    }, [template, context]);

    return <div ref={containerRef}></div>;
};

export default BlazeTemplate;

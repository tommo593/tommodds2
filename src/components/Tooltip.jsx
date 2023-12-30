import { isVisible } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';

export const Tooltip = ({text, children}) => {
    const [isvisible, setIsVisible] = useState(false);
    return (
        <div className="tooltip-container" onMouseEnter={() => setIsVisible(true)}
        onMouseLeave = {() => setIsVisible(false)}>
            {children}
            {isVisible &&
<div className="tooltip"></div>}
        </div>
    )
}
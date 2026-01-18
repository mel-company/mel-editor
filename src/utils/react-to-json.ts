import React from 'react';

export const reactToJSON = (element: any): any => {
    if (!element) return null;

    // Handle primitives (string, number, boolean)
    if (typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
        return element;
    }

    // Handle arrays
    if (Array.isArray(element)) {
        return element.map(reactToJSON);
    }

    // Handle React Elements
    if (React.isValidElement(element)) {
        const { type, props } = element;

        // Get component name
        let componentName = 'Unknown';
        if (typeof type === 'string') {
            componentName = type;
        } else if (typeof type === 'function') {
            componentName = (type as any).displayName || (type as any).name || 'Component';
        } else if (typeof type === 'object') {
            // Handle memo, forwardRef, etc.
            componentName = (type as any).displayName || 'Component';
        }

        const { children, ...otherProps } = props as any;

        // Process props to ensure they are serializable (simplify complex objects if needed)
        const serializedProps = Object.entries(otherProps).reduce((acc: any, [key, value]) => {
            // Skip functions in JSON output or convert them to a placeholder string
            if (typeof value === 'function') {
                acc[key] = '[Function]';
            } else if (React.isValidElement(value)) {
                acc[key] = reactToJSON(value);
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});

        return {
            type: componentName,
            props: serializedProps,
            children: children ? (Array.isArray(children) ? children.map(reactToJSON) : reactToJSON(children)) : null
        };
    }

    // Handle regular objects safely 
    if (typeof element === 'object') {
        return element;
    }

    return null;
};

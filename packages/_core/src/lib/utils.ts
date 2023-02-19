import { ReactNode } from "react";

export type ClassNameAtrribute = string | undefined | Array<string | undefined>

export type WithChildrenProps = {
    children?: ReactNode | ReactNode[];
}

export type WithClassNameProps = {
    className?: string | Array<string>
}


/**
 * Merge classes with class can be array or string or undefined. 
 * It's will remove wasted space, undefined and duplicate class
 * 
 * @param {Array<ClassNameAtrribute>} args 
 * 
 * @returns {string} the class name string
 */
export function classMerge(...args: Array<ClassNameAtrribute>): string {
    let processedClassNames = args
        .flat(Infinity)
        .filter(Boolean)
        .map((name) => (name as string).trim())
        .filter((name) => name.length > 0)

    // remove duplicate
    processedClassNames = [...new Set(processedClassNames)]
    return processedClassNames.join(" ");
}
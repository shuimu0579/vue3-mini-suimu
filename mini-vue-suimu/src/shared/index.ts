
export const extend = Object.assign;

export const EMPTY_OBJ = {};

export const isObject = (val) => {
    return val !== null && typeof val === "object"
}

export const hasChanged = (newValue, val) => {
    return !Object.is(newValue, val)
}

export const hasOwn = (val,key) => Object.prototype.hasOwnProperty.call(val, key)

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const toHandlerKey = (str: string) => {
    return str ? "on" + capitalize(str) : "";
}
export const camelize = (str: string) => {
    return str.replace(/-(\w)/g,(_, c: string) => {
        return c ? c.toUpperCase() : "";
    }) 
}
export const staticInterfaceMethods = <T>() => {
    return <U extends T>(constructor: U) => { constructor; };
};
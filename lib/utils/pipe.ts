/**
 * Pipe function for function composition
 * Allows chaining functions from left to right
 */
export const pipe = <T>(...fns: Array<(arg: T) => T>) => {
  return (value: T): T => {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
};

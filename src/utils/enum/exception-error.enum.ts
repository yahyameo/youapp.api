/**
 * Hold the values that supported based on the guideline
 * https://carsome.atlassian.net/wiki/spaces/TECH/pages/146800710/Error+Response#Common-Error
 */
export enum ExceptionErrorType {
    Validation = 'validation',
    Access = 'access',
    Exception = 'exception',
}

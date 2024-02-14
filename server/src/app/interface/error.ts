export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  errorMessage?: string;
  statusCode: number;
  message: string;
  errorSources?: TErrorSources;
};

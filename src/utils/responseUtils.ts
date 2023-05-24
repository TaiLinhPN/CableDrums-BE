interface IResponse {
  success: boolean;
  message?: string;
  data?: any;
  statusCode: number;
}

const createResponse = (
  res: any,
  statusCode: number,
  success: boolean,
  message?: string,
  data?: any
): IResponse => {
  const response: IResponse = { statusCode, success, message, data };
  return res.status(statusCode).json(response);
};

export { createResponse  as response};

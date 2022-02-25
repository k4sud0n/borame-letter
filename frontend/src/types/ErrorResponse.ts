interface ErrorResponse {
  detail: {
    loc: string[];
    msg: string;
    type: string;
  }[];
}

export default ErrorResponse;

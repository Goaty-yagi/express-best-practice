interface DetailsType {
  field: string;
  error: string;
}

interface BaseApiErrorClassProps {
  statusCode: number;
  error: string;
  message: string;
  details?: DetailsType[];
}

export { BaseApiErrorClassProps, DetailsType };

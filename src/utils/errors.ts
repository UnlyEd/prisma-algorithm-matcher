import IErrorData from '../interfaces/IErrorData';

export class CheckError extends Error {
  public data: IErrorData;

  constructor(data: IErrorData) {
    super();
    this.name = 'CheckError';
    this.message = `CheckError: ${data.reason}`;
    this.data = data;
  }
}

export class ValueNotFound extends Error {
  public data: IErrorData;

  constructor(data: IErrorData) {
    super();
    this.name = 'ValueNotFound';
    this.data = data;
    this.message = `ValueNotFound:${data.reason}`;
  }
}

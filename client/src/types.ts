export interface ITask {
  title: string;
  isFlagged: boolean;
  isCompleted: boolean;
  dueDate?: Date;
  createdOn: Date;
  modifiedOn: Date;
  createdBy: string;
}

export interface IAuthContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
}

export interface IUser {
  id: string | null;
  username: string | null;
  email: string | null;
  token: string | null;
}

export interface IToken {
  token: string;
}

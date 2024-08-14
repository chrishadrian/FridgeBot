import { CoreMessage } from 'ai'

export type Message = CoreMessage & {
  id: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
    sid: string;
  };
  accessToken: string;
  accessTokenScope: string;
  accessTokenExpiresAt: number;
  idToken: string;
  token_type: string;
}


export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

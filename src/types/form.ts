export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FormData {
  name: string;
  email: string;
  message: string;
} 
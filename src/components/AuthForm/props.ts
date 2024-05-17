export interface Props {
    title: string;
    buttonText: string;
    username: string;
    name?:string;
    password: string;
    confirmPassword?: string;
    isRegister?: boolean;
    setUsername: (e: any) => void;
    setName?: (e: any) => void;
    setPassword: (e: any) => void;
    setConfirmPassword?: (e: any) => void;
    onSubmit: (e: React.FormEvent) => void;
  }
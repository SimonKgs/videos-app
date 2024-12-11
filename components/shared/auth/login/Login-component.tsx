import { useAuthStore } from '@/store';
import { CustomButton } from '../../ui/custom-button/CustomButton';

const LoginButton = () => {
  const { login, logout, isAuthenticated } = useAuthStore();

  const handleLogin = () => {
    const mockUser = { id: '1', name: 'John Doe' };
    const mockToken = 'abc123';
    login(mockUser, mockToken);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {
        isAuthenticated
        ? <CustomButton className="text-gray-200 bg-red-600 hover:bg-red-800" text="Logout" attachedFunction={handleLogout} />
        : <CustomButton className="text-gray-200 bg-blue-600 hover:bg-blue-800" text="Login" attachedFunction={handleLogin} />
      }
    </>
  );
};

export default LoginButton;

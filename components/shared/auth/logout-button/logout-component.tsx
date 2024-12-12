import { useAuthStore } from '@/store';
import { CustomButton } from '../../ui/custom-button/CustomButton';


const LogoutButton = () => {
  const { logout } = useAuthStore();


  const handleLogout = () => {
    logout();
  };

  return (
    <CustomButton className="text-gray-200 bg-red-600 hover:bg-red-800" text="Logout" attachedFunction={handleLogout} />
  );
};

export default LogoutButton;

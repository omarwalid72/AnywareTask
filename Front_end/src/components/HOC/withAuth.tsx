import React from 'react';
import { useAppSelector } from '../../store/hooks';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';

interface WithAuthProps {}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithAuthProps> => {
  const AuthProtectedComponent: React.FC<P & WithAuthProps> = (props) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      return <LoginScreen />;
    }

    return <WrappedComponent {...props} />;
  };

  AuthProtectedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthProtectedComponent;
};

export default withAuth;

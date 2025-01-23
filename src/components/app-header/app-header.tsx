import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';
import { getUserInfo } from '../../../src/services/slices/UserDataSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserInfo);

  return (
    <>
      <AppHeaderUI userName={userName?.name} />;
    </>
  );
};

import { Box } from '@mui/material';

import { useGetCurrentUser } from '~/api/queries/get-current-user.query';
import { AccountAvatar } from '~/components/common/account-avatar';

interface AvatarUiProps {
  src?: string;
}

export function UploadAvatarUi({ src }: AvatarUiProps) {
  const { data: user } = useGetCurrentUser();

  return (
    <Box sx={{ border: '1px dashed #ccc', borderRadius: '50%', padding: '4px' }}>
      {src ? <>{/* <Avatar alt="Cindy Baker" src={src} />*/}</> : <></>}
      {user && <AccountAvatar width={125} height={125} isHideOnline user={user} />}
    </Box>
  );
}

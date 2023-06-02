import { Avatar } from '@mui/material';

import { type UserRes } from '~/api/queries/get-user.query';
import { getNameInitials } from '~/utils/get-name-initials.util';

type Props = {
  user: UserRes;
};

export function AccountAvatar(props: Props) {
  const { user } = props;
  const isFullNameExist = user.firstName && user.lastName;
  const isNickNameExist = user.nickname;
  const enhancedProps = {
    ...(isFullNameExist &&
      !user.profileImage && {
        children: getNameInitials(`${user.firstName} ${user.lastName}`),
      }),
    ...(!!isNickNameExist &&
      !user.profileImage && {
        children: getNameInitials(user.nickname),
      }),
    ...(user.profileImage && {
      src: user.profileImage,
    }),
  };

  return (
    <Avatar
      sx={({ breakpoints }) => ({
        height: 40,
        width: 40,
        ...((isFullNameExist || isNickNameExist) && {
          letterSpacing: '0.15px',
          lineHeight: '1.25rem',
          fontWeight: 600,
          fontSize: '1.25rem',
        }),
        [breakpoints.down('sm')]: {
          height: 32,
          width: 32,
          ...((isFullNameExist || isNickNameExist) && {
            lineHeight: '0.8125rem',
            fontSize: '0.8125rem',
          }),
        },
      })}
      {...enhancedProps}
    />
  );
}

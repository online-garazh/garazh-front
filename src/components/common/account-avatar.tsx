import { Avatar, Badge } from '@mui/material';

import { type CurrentUserRes } from '~/api/queries/get-current-user.query';
import { getNameInitials } from '~/utils/get-name-initials.util';

type Props = {
  user: CurrentUserRes;
};

export function AccountAvatar(props: Props) {
  const {
    user: {
      firstName,
      lastName,
      nickName,
      avatar,
      // avatarImage = 'https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg',
    },
  } = props;
  const isFullNameExist = firstName && lastName;
  const isNickNameExist = nickName;
  const enhancedProps = {
    ...(isFullNameExist &&
      !avatar && {
        children: getNameInitials(`${firstName} ${lastName}`),
      }),
    ...(!!isNickNameExist &&
      !avatar && {
        children: getNameInitials(nickName),
      }),
    ...(avatar && {
      src: avatar,
    }),
  };

  return (
    <Badge
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      overlap="circular"
      variant="dot"
      sx={({ palette }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: palette.success.main,
          boxShadow: `0 0 0 2px ${palette.common.black}`,
          color: palette.success.main,
          '&::after': {
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            position: 'absolute',
            content: '""',
            border: '1px solid currentColor',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      })}
    >
      <Avatar
        sx={({ breakpoints, palette }) => ({
          position: 'relative',
          height: 40,
          width: 40,
          ...(palette.mode !== 'dark' && {
            backgroundColor: palette.common.black,
            color: palette.common.white,
          }),
          ...((avatar || palette.mode === 'light') && {
            '&::after': {
              borderRadius: '50%',
              position: 'absolute',
              content: '""',
              border: `2px solid ${palette.common.white}`,
              height: '100%',
              width: '100%',
              left: 0,
              top: 0,
            },
          }),
          ...((isFullNameExist || isNickNameExist) && {
            letterSpacing: '0.15px',
            lineHeight: '1rem',
            fontWeight: 500,
            fontSize: '1rem',
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
    </Badge>
  );
}

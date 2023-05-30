// import { Header } from '~/components/common/header';
import styles from './styles.module.scss';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import Feed from '@mui/icons-material/FeedOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import Menu from '@mui/material/Menu';
export function HomeView() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/*<Header />*/}

      <div className={styles.home}>
        <div className={styles.header}>
          <div className={styles.header__wrapper}>
            <a className={styles.header__logo} href="#">
              <img src="/images/logo-icon.jpg" style={{ maxWidth: '45px' }} />

              <img src="/images/logo-text.jpg" style={{ maxWidth: '110px', marginLeft: '8px' }} />

              {/* <img src="/images/logo2.jpg" style={{maxWidth: '150px'}} />  */}
            </a>

            <div className={styles.header__rightCol}>
              <img src="/images/accord-white.png" style={{ maxWidth: '70px', marginTop: '40px' }} />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar
                      className={styles.header__avatar}
                      src="https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg"
                      sx={{ width: 48, height: 48 }}
                    >
                      M
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          </div>
        </div>
        <div className={styles.subHeader}>
          <div className={styles.sidebar__item}>
            <Feed />

            <p>Лента</p>
          </div>
          <div className={styles.sidebar__item}>
            <DirectionsCarFilledOutlinedIcon />
            <p>Машины</p>
          </div>
          <div className={styles.sidebar__item}>
            <AutoStoriesOutlinedIcon />

            <p>Бортжурналы</p>
          </div>

          <div className={styles.sidebar__item}>
            <PeopleAltOutlinedIcon />
            <p>Сообщества</p>
          </div>

          <div className={styles.sidebar__item}>
            <BuildOutlinedIcon />
            <p>Автосервисы и магазины</p>
          </div>

          <div className={styles.sidebar__item}>
            <TakeoutDiningOutlinedIcon />

            <p>Барахолка</p>
          </div>
        </div>
        <div className={styles.home__container}>
          <div className={styles.sidebar}>
            <div className={styles.sidebar__account}>
              <Avatar
                sx={{ width: 56, height: 56 }}
                alt="Remy Sharp"
                src="https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg"
              />

              <div className={styles.sidebar__info}>
                <p className={styles.sidebar__name}>Sergey Koval</p>
                <p className={styles.sidebar__subName}>Admin</p>
              </div>
            </div>
            <p className={styles.sidebar__labelMenu}>Загальне</p>
            <div className={styles.sidebar__item}>
              <Feed />

              <p>Лента</p>
              <p>Лента</p>
            </div>
            <div className={styles.sidebar__item}>
              <DirectionsCarFilledOutlinedIcon />
              <p>Машины</p>
            </div>
            <div className={styles.sidebar__item}>
              <AutoStoriesOutlinedIcon />

              <p>Бортжурналы</p>
            </div>

            <div className={styles.sidebar__item}>
              <PeopleAltOutlinedIcon />
              <p>Сообщества</p>
            </div>

            <div className={styles.sidebar__item}>
              <BuildOutlinedIcon />
              <p>Автосервисы и магазины</p>
            </div>

            <div className={styles.sidebar__item}>
              <TakeoutDiningOutlinedIcon />

              <p>Барахолка</p>
            </div>
          </div>
          <div>
            <div className={styles.headNews}>
              <p className={styles.headNews__title}>Стрічка</p>
              <div className={styles.headNews__icon}>
                <SettingsIcon />
              </div>
            </div>
            <div className={styles.postContainer}>
              <div className={styles.post}>
                <CardHeader
                  avatar={
                    <div className={styles.post__cardHeaderAvatar}>
                      <Avatar sx={{ width: 68, height: 68 }} src="https://a.d-cd.net/ac7e534s-200.jpg" />

                      <div className={styles.post__authorAvatar}>
                        <Avatar
                          className={styles.borderAvatar}
                          sx={{ width: 36, height: 36 }}
                          src="https://a.d-cd.net/1J3YI2nSo0Kj0Z1qMjqh1zmbGWk-960.jpg"
                        />
                      </div>
                    </div>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  className={styles.cardHeader}
                  title={
                    <>
                      <span className={styles.cardHeader__groupName}>Honda Accord Название не придумал</span>{' '}
                      <span>написав у спільноті</span>{' '}
                      <span className={styles.cardHeader__groupName}>Honda Accord Club</span>
                    </>
                  }
                  subheader="21 June 2022"
                />

                <div className={styles.post__wrapImage}>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://a.d-cd.net/JJdlQnVxsBZ85TYF_sE1T4AfjyE-1920.jpg"
                    alt="Paella dish"
                  />
                  <div className={styles.post__backgroundAva}></div>
                  <Avatar
                    className={styles.post__authorAvatar2}
                    sx={{ width: 28, height: 28 }}
                    src="https://a.d-cd.net/1J3YI2nSo0Kj0Z1qMjqh1zmbGWk-960.jpg"
                  />
                </div>

                <div className={styles.post__body}>
                  <CardContent>
                    <p className={styles.post__title}>ЗАГАДКА! Вибрация на колёса!</p>

                    <Typography className={styles.post__desc} variant="body2" color="text.secondary">
                      Ребзя привет! Начал саться главный радиатор. Какую марку посоветуете?
                    </Typography>
                  </CardContent>
                  {/*<p className={styles.post__desc}>*/}
                  {/* */}
                  {/*</p>*/}

                  <div className={styles.post__footer}>
                    <div className={styles.post__like}>
                      <FavoriteOutlinedIcon />
                      <span>2</span>
                    </div>
                    <div className={styles.post__comment}>
                      <ChatBubbleOutlineIcon />
                      <span>5</span>
                    </div>

                    <div className={styles.post__bookmark}>
                      <BookmarkIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/*-------*/}

              <div className={styles.post}>
                <CardHeader
                  avatar={
                    <div className={styles.post__cardHeaderAvatar}>
                      <Avatar sx={{ width: 68, height: 68 }} src="https://a.d-cd.net/ac7e534s-200.jpg" />

                      <div className={styles.post__authorAvatar}>
                        <Avatar
                          className={styles.borderAvatar}
                          sx={{ width: 36, height: 36 }}
                          src="https://a.d-cd.net/1J3YI2nSo0Kj0Z1qMjqh1zmbGWk-960.jpg"
                        />
                      </div>
                    </div>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  className={styles.cardHeader}
                  title={
                    <>
                      <span className={styles.cardHeader__groupName}>Sergey Koval</span>{' '}
                      <span>написав у спільноті</span>{' '}
                      <span className={styles.cardHeader__groupName}>Honda Accord Club</span>
                    </>
                  }
                  subheader="21 June 2022"
                />

                <div className={styles.post__wrapImage}>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://a.d-cd.net/JJdlQnVxsBZ85TYF_sE1T4AfjyE-1920.jpg"
                    alt="Paella dish"
                  />
                  {/*<div className={styles.post__backgroundAva}></div>*/}
                  {/*<img*/}
                  {/*  src="https://a.d-cd.net/JJdlQnVxsBZ85TYF_sE1T4AfjyE-1920.jpg"*/}
                  {/*  alt="img-post"*/}
                  {/*/>*/}
                </div>

                <div className={styles.post__body}>
                  <CardContent>
                    <p className={styles.post__title}>
                      ЗАГАДКА! Вибрация на колёса! Но не шины и не диски?))) Опыт исправления)
                    </p>

                    <Typography className={styles.post__desc} variant="body2" color="text.secondary">
                      Ребзя привет! Начал саться главный радиатор. Какую марку посоветуете? Стоимость радиков от 6500 до
                      22000р. AVA стоит 12к (не варик). Желательно до 10к…
                    </Typography>
                  </CardContent>
                  {/*<p className={styles.post__desc}>*/}
                  {/* */}
                  {/*</p>*/}

                  <div className={styles.post__footer}>
                    <div className={styles.post__like}>
                      <FavoriteOutlinedIcon />
                      <span>2</span>
                    </div>
                    <div className={styles.post__comment}>
                      <ChatBubbleOutlineIcon />
                      <span>5</span>
                    </div>

                    <div className={styles.post__bookmark}>
                      <BookmarkIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/*------*/}

              <div className={styles.post}>
                <CardHeader
                  avatar={
                    <div className={styles.post__cardHeaderAvatar}>
                      <Avatar sx={{ width: 68, height: 68 }} src="https://a.d-cd.net/ac7e534s-200.jpg" />

                      <div className={styles.post__authorAvatar}>
                        <Avatar
                          className={styles.borderAvatar}
                          sx={{ width: 36, height: 36 }}
                          src="https://a.d-cd.net/1J3YI2nSo0Kj0Z1qMjqh1zmbGWk-960.jpg"
                        />
                      </div>
                    </div>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  className={styles.cardHeader}
                  title={
                    <>
                      <span className={styles.cardHeader__groupName}>Sergey Koval</span>{' '}
                      <span>написав у спільноті</span>{' '}
                      <span className={styles.cardHeader__groupName}>Honda Accord Club</span>
                    </>
                  }
                  subheader="21 June 2022"
                />

                <div className={styles.post__wrapImage}>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://a.d-cd.net/JJdlQnVxsBZ85TYF_sE1T4AfjyE-1920.jpg"
                    alt="Paella dish"
                  />
                  {/*<div className={styles.post__backgroundAva}></div>*/}
                  {/*<img*/}
                  {/*  src="https://a.d-cd.net/JJdlQnVxsBZ85TYF_sE1T4AfjyE-1920.jpg"*/}
                  {/*  alt="img-post"*/}
                  {/*/>*/}
                </div>

                <div className={styles.post__body}>
                  <CardContent>
                    <p className={styles.post__title}>
                      ЗАГАДКА! Вибрация на колёса! Но не шины и не диски?))) Опыт исправления)
                    </p>

                    <Typography className={styles.post__desc} variant="body2" color="text.secondary">
                      Ребзя привет! Начал саться главный радиатор. Какую марку посоветуете? Стоимость радиков от 6500 до
                      22000р. AVA стоит 12к (не варик). Желательно до 10к…
                    </Typography>
                  </CardContent>
                  {/*<p className={styles.post__desc}>*/}
                  {/* */}
                  {/*</p>*/}

                  <div className={styles.post__footer}>
                    <div className={styles.post__like}>
                      <FavoriteOutlinedIcon />
                      <span>2</span>
                    </div>
                    <div className={styles.post__comment}>
                      <ChatBubbleOutlineIcon />
                      <span>5</span>
                    </div>

                    <div className={styles.post__bookmark}>
                      <BookmarkIcon />
                    </div>
                  </div>
                </div>
              </div>
              {/*-----*/}

              <div className={styles.post}>
                <CardHeader
                  avatar={
                    <div className={styles.post__cardHeaderAvatar}>
                      <Avatar sx={{ width: 68, height: 68 }} src="https://a.d-cd.net/ac7e534s-200.jpg" />

                      <div className={styles.post__authorAvatar}>
                        <Avatar
                          className={styles.borderAvatar}
                          sx={{ width: 36, height: 36 }}
                          src="https://a.d-cd.net/1J3YI2nSo0Kj0Z1qMjqh1zmbGWk-960.jpg"
                        />
                      </div>
                    </div>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  className={styles.cardHeader}
                  title={
                    <>
                      <span className={styles.cardHeader__groupName}>Sergey Koval</span>{' '}
                      <span>написав у спільноті</span>{' '}
                      <span className={styles.cardHeader__groupName}>Honda Accord Club</span>
                    </>
                  }
                  subheader="21 June 2022"
                />

                <div className={styles.post__wrapImage}>
                  <CardMedia
                    component="img"
                    height="280"
                    image="https://a.d-cd.net/JJdlQnVxsBZ85TYF_sE1T4AfjyE-1920.jpg"
                    alt="Paella dish"
                  />
                  {/*<div className={styles.post__backgroundAva}></div>*/}
                  {/*<img*/}
                  {/*  src="https://a.d-cd.net/JJdlQnVxsBZ85TYF_sE1T4AfjyE-1920.jpg"*/}
                  {/*  alt="img-post"*/}
                  {/*/>*/}
                </div>

                <div className={styles.post__body}>
                  <CardContent>
                    <p className={styles.post__title}>
                      ЗАГАДКА! Вибрация на колёса! Но не шины и не диски?))) Опыт исправления)
                    </p>

                    <Typography className={styles.post__desc} variant="body2" color="text.secondary">
                      Ребзя привет! Начал саться главный радиатор. Какую марку посоветуете? Стоимость радиков от 6500 до
                      22000р. AVA стоит 12к (не варик). Желательно до 10к…
                    </Typography>
                  </CardContent>
                  {/*<p className={styles.post__desc}>*/}
                  {/* */}
                  {/*</p>*/}

                  <div className={styles.post__footer}>
                    <div className={styles.post__like}>
                      <FavoriteOutlinedIcon />
                      <span>2</span>
                    </div>
                    <div className={styles.post__comment}>
                      <ChatBubbleOutlineIcon />
                      <span>5</span>
                    </div>

                    <div className={styles.post__bookmark}>
                      <BookmarkIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

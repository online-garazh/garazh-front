import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography } from '@mui/material';

import styles from '~/components/views/home-view/styles.module.scss';

export type Props = {};

export function Post(props: Props) {
  const {} = props;

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        marginBottom: '40px',
        padding: 2,
        paddingLeft: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gridTemplateColumns: '1fr',
        }}
      >
        <Box
          sx={{
            paddingRight: 1,
            flex: 1,
          }}
        >
          <CardHeader
            sx={{ paddingLeft: 0, paddingTop: 0 }}
            avatar={
              <div className={styles.post__cardHeaderAvatar}>
                <Avatar sx={{ width: 58, height: 58 }} src="https://a.d-cd.net/ac7e534s-200.jpg" />

                <div className={styles.post__authorAvatar}>
                  <Avatar
                    className={styles.borderAvatar}
                    sx={{ width: 30, height: 30 }}
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
                <span className={styles.cardHeader__groupName}>Your nick name</span> <span>написав у спільноті</span>{' '}
                <span className={styles.cardHeader__groupName}>Honda Accord Club</span>
              </>
            }
            subheader="21 June 2022"
          />

          <CardContent sx={{ paddingTop: 1, paddingLeft: 0 }}>
            <Typography sx={{ fontWeight: 'bold', lineHeight: '1.2' }} variant="h6">
              Антискрип підлокітника, тунелі та блоку клімата
            </Typography>

            <Typography className={styles.post__desc} variant="body2" color="text.secondary">
              Був гарний день та настрій, щоб щось зробити по машинці )) Особо неприємних скрипів не було, але все ж
              таки пару цвіркунів було )) Все повитирав та обкле
            </Typography>
          </CardContent>

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
        </Box>

        <div>
          <Box sx={{ position: 'relative', width: '250px', height: '250px' }}>
            <CardMedia
              component="img"
              height="100%"
              sx={{ borderRadius: '8px' }}
              width="100%"
              image="https://storage.googleapis.com/images.e-drive.com.ua/ryivkw9bd1e58b68.webp"
              alt="Paella dish"
            />

            {/* <div className={styles.post__backgroundAva} />*/}

            {/* <Avatar*/}
            {/*  className={styles.post__authorAvatar2}*/}
            {/*  sx={{ width: 28, height: 28 }}*/}
            {/*  src="https://a.d-cd.net/1J3YI2nSo0Kj0Z1qMjqh1zmbGWk-960.jpg"*/}
            {/*/ >*/}
          </Box>
        </div>
      </Box>

      {/* <div className={styles.post__body}>*/}
      {/*   <CardContent>*/}
      {/*    <p className={styles.post__title}>ЗАГАДКА! Вибрация на колёса!</p>*/}

      {/*    <Typography className={styles.post__desc} variant="body2" color="text.secondary">*/}
      {/*      Ребзя привет! Начал саться главный радиатор. Какую марку посоветуете?*/}
      {/*    </Typography>*/}
      {/*   </CardContent>*/}

      {/*  */}
      {/* </div>*/}
    </Box>
  );
}

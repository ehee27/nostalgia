import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUser, setUserArtifacts } from '../../store';
import { setCommunities } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import DialogBox from './DialogueBox';
import { setFriends } from '../../store';
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@material-ui/core';
import UserData from './UserData';
import UserProfilePic from './UserProfilePic';
import UserCommunities from './UserCommunities';
import MyFriendsList from '../friends/MyFriendsList';

const useStyles = makeStyles({
  greeting: {
    marginLeft: 20,
    padding: 10,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  topRow: {
    display: 'flex',
    borderRadius: '.25rem',
  },
  middleRow: {
    display: 'flex',
    borderRadius: '.25rem',
    marginTop: 5,
    border: '2pt solid rgb(246, 246, 246)',
  },
  profilePic: {
    border: '2pt solid rgb(246, 246, 246)',
    borderRadius: '.25rem',
  },
  artifactsGrid: {
    borderRadius: '.25rem',
    padding: 20,
    marginTop: 10,
    border: '2pt solid blue',
  },
  communitiesGrid: {
    padding: 10,
    marginTop: 5,
    // border: '2pt solid red',
  },
  artifactsGrid: {
    padding: 10,
    marginTop: 5,
    borderRadius: '.25rem',
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const UserProfile = () => {
  const classes = useStyles();
  const { auth, friends } = useSelector(state => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(setUserArtifacts(id));
  }, [id]);

  // useEffect(() => {
  //   dispatch(setFriends(auth.id));
  // }, [auth]);

  useEffect(() => {
    dispatch(setCommunities());
  }, []);

  // console.log('these are my friends...', friends);

  // useEffect(() => {
  //   dispatch(setUserArtifacts(id));
  // }, [id]);

  // useEffect(() => {
  //   dispatch(setUserArtifacts(id));
  // }, [id]);

  const { user, communities, artifacts } = useSelector(state => state);

  const currentUser = user.user;
  const userArtifacts = artifacts.user_artifacts;

  return (
    <>
      <Grid>
        {auth.id === id ? (
          <Grid className={classes.greeting}>
            <Typography variant="h5">Hello {currentUser.firstName}</Typography>
            <Typography>Today is {format(new Date(), 'MMMM do, Y')}</Typography>
          </Grid>
        ) : (
          <span></span>
        )}
        {auth.id === id &&
        !currentUser.age &&
        !currentUser.location &&
        !currentUser.bio ? (
          <DialogBox user={user} />
        ) : (
          <span></span>
        )}
      </Grid>
      <Container className={classes.mainContainer}>
        <Grid container spacing={2} className={classes.topRow}>
          <Grid item xs={12} sm={8} md={8}>
            <UserData user={currentUser} id={id} communities={communities} />
          </Grid>
          <Grid item className={classes.profilePic} xs={12} sm={4} md={4}>
            <UserProfilePic user={currentUser} />
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.middleRow}>
          <Grid item xs={12} sm={8} md={8}>
            <div>{currentUser.firstName}'s Artifacts</div>

            <ImageList className={classes.artifactsGrid}>
              {userArtifacts.map(artifact => {
                return (
                  <ImageListItem key={artifact.id}>
                    <Link to={`/artifacts/${artifact.id}`}>
                      <img
                        src={`.././public/artifactUploads/${artifact.fileName}`}
                      ></img>
                    </Link>

                    <ImageListItemBar title={artifact.name} />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Grid>
          <Grid item className={classes.communitiesGrid} xs={12} sm={4} md={4}>
            {currentUser.firstName}'s Communities
            {communities.map(community => {
              return (
                <div key={community.id} className={classes.card}>
                  <UserCommunities community={community} />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
// currently the content behind does not always update. Sometimes the 'id' param updates but the actual content does not render. When we then refresh the page all works fine. Can we do all of this at once?

// 1. Use history
// 2. update the 'Link' on friendCard to an onClick={handleFriendClick}
// 3. handleFriendClick - history.push => to that friend's page
// 4. also reloads the window to close out dialog and render everything

// onClick={handleFriendClick}

// const handleFriendClick = () => {
//   history.push(`/users/${friend.id}`);
//   window.location.reload();
//   console.log('clicked');
// };

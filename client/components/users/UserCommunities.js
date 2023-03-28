import React, { useEffect } from 'react';
import { Card, Grid, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserCommunities, removeUserFromCommunity } from '../../store';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles({
  communityCard: {
    display: 'flex',
    backgroundColor: 'rgb(200, 200, 200)',
    display: 'flex',
    height: '50px',
    padding: 5,
  },
  image: {
    marginRight: 5,
    maxWidth: '50px',
  },
  cardLeft: {
    display: 'flex',
    height: '90%',
    width: '95%',
  },
  cardRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    width: '20%',
    color: '#1f2833',
  },
  image: {
    margin: 'auto',
    height: '95%',
    width: '50px',
  },
  name: {
    marginLeft: 5,
    margin: 'auto',
    width: '70%',
    fontSize: '10pt',
    fontWeight: 800,
    color: '#0b0c10ef',
    '&:hover': {
      color: 'blue',
      cursor: 'pointer',
    },
  },
});

const UserMediaCommunity = ({ community, auth, user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserCommunities(auth.id));
  }, [auth.id]);

  const removeUserCommunity = async (comm, user) => {
    dispatch(removeUserFromCommunity(comm, user));
  };

  return (
    <Card key={community.id} elevation={2}>
      {/* <Link to={`/communities/${community.id}`}> */}
      <Grid className={classes.communityCard}>
        <Link to={`/communities/${community.id}`}>
          <Grid className={classes.cardLeft}>
            <img src={community.imageUrl} className={classes.image}></img>
            <Grid className={classes.name}>{community.name}</Grid>
          </Grid>
        </Link>
        {/* <img src={community.imageUrl} className={classes.image}></img>
          <div className={classes.name}>{community.name}</div> */}
        <Grid className={classes.cardRight}>
          <DeleteForeverIcon
            onClick={() => removeUserCommunity(community.id, user.id)}
            fontSize="large"
            cursor="pointer"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserMediaCommunity;

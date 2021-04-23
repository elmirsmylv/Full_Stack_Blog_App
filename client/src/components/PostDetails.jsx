import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {makeStyles} from '@material-ui/core/styles';
import { Typography, Paper, Divider, Button, Chip} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import noimage from '../images/noimage.svg';
import { fetchSinglePost } from '../actions/post';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(8),
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
      },
      content: {
        marginTop: theme.spacing(3),
      },
      contentText: {
        width: "90%",
        fontWeight: "400",
        lineHeight: "32px",
        fontSize: "21px",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      },
      image: {
        width: "100%",
        borderRadius: 5,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4),
      },
      chip: {
        marginTop: theme.spacing(1),
      },
}))


const PostDetails = ({match, history, location}) => {
    const dispatch = useDispatch();
    const { id } = match.params;

    useEffect(() => { 
        dispatch(fetchSinglePost(id));
    }, [dispatch])

    const currentPost = useSelector(state => state.posts.currentPost);

    const convertRelativeTime = (date) => {
      return moment(date).fromNow();
  }



    const classes = useStyles();
    return (
        <Paper className={classes.paper} elevation={0}>
          <div>
            <div className={classes.header}>
              <Typography variant="h5" gutterBottom>
                {currentPost?.title}
              </Typography>
              <div>
                <Button color="primary" variant="outlined" style={{marginRight: "15px"}} startIcon={<EditIcon/>}>Edit</Button>
                <Button color="secondary" variant="outlined"  startIcon={<DeleteIcon/>}>Delete</Button>
              </div>
            </div>
          </div>

          <Divider />

          <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography variant="caption" component="p">
            {convertRelativeTime(currentPost?.createdAt)} by Elmir 
           </Typography>
           <Chip label={` # ${currentPost?.tag} `} variant="outlined" className={classes.chip}></Chip>
           <div className={classes.content}>
             <img src={currentPost?.image || noimage} alt="Post" className={classes.image} />
             <Typography variant="body1" className={classes.contentText}>
               {currentPost?.content}
             </Typography>
           </div>
        </Paper>
    )
}

export default PostDetails

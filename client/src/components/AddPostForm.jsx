import React, {useState, useRef} from "react";
import {useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles"
import * as yup from "yup";
import {Form, Button, Modal} from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { createPost} from '../actions/post';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  titles : {
      fontFamily: 'Popins',
      fontSize: '1.1rem',
  }
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = Yup.object().shape({
  title: Yup.string().required(),
  subtitle: Yup.string().required(),
  content: Yup.string().min(20).required(),
  tags: Yup.mixed().oneOf(tags),
});

const AddPostForm = ({open, handleClose}) => {
    const dispatch = useDispatch();

    const ref = useRef();

    const [file, setFile] = useState(null);

    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(postSchema)
    });

    const submitForm = (data) => {
        dispatch(createPost({...data, image: file}));

        clearForm();
    }
    //{...register('password')}
    const clearForm = () => {
        reset();
        setFile(null);
        handleClose()
    }


    const classes = useStyles();
    return (
    <Modal size="lg" show={open} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Form.Group className={classes.textField}>
                    <Form.Label className={classes.titles}>Title</Form.Label>
                    <Form.Control id="title" type="text" {...register('title')}/>
                </Form.Group>
                <Form.Group className={classes.textField}>
                    <Form.Label className={classes.titles}>Subtitle</Form.Label>
                    <Form.Control id="subtitle" type="text" {...register('subtitle')}/>
                </Form.Group >
                <Form.Group>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control {...register('tags')} id="tags" as="select">
                        {tags.map((tag, index) => (
                            <option key={index}>{tag}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control {...register('content')} id="content" as="textarea" rows={4} />
                </Form.Group>
                <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)} />
                <Button variant="secondary" onClick={clearForm}>Cancel</Button>
                <Button type="submit" variant="primary" onClick={() => handleSubmit(submitForm) ()}>Publish</Button>

            </Form>
        </Modal.Body>
    </Modal>
    )
}

export default AddPostForm

//

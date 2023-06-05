import React from "react";
import s from './GoodDialog.module.scss';
import { Avatar, Button, Dialog, DialogActions, DialogContent, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useEffect } from "react";
import { purple} from "@mui/material/colors";
import { replaceImage, uploadImage, getDownloadURL } from "../../../utilites/firebase/storage";
import { addGood, updateGood } from "../../../utilites/firebase/firestore";


const GoodDialog = (props) => {
    let isEdit = props.edit && Object.keys(props.edit).length !== 0;
    useEffect(() => {
        isEdit = props.edit && Object.keys(props.edit).length !== 0;
        props.setFormFields(isEdit ? props.setFormFields(props.edit) : props.setFormFields({
            available: null,
            goodName: "",
            description: "",
            category: "Оберіть категорію",
            fileName: "Файл не обрано!",
            file: null,
            imgBucketURL: "",
            imgURL: "",
            price: undefined,
        }))
    }, [props.edit, props.showDialog])

    const updateFormField = (event, field) => {
        props.setFormField(field, event.target.value)
    }

    // Set the relevant fields for receipt image
    const setFileData = (target) => {
        const file = target.files[0];
        props.setFormField('fileName', file.name)
        props.setFormField('file', file)
    }

    const handleSubmit = async () => {
        props.setIsSubmitting(true);
    
        try {
          
          if (isEdit) {
            // Check whether image was changed - fileName will be not null
            if (props.formFields.fileName) {
              // Store image into Storage
              await replaceImage(props.formFields.file, props.formFields.imgBucketURL);
            }
            const newImageURL = await getDownloadURL(props.formFields.imgBucketURL);
            props.setFormField('imgURL', newImageURL)
            await updateGood(props.formFields.id, props.formFields.available, props.formFields.category, 
                props.formFields.description, props.formFields.goodName, props.formFields.imgBucketURL,
                props.formFields.imgURL, props.formFields.price);
          } else {
            // Adding receipt
            // Store image into Storage
              const bucket = await uploadImage(props.formFields.file, props.formFields.category);
              const newImageURL = await getDownloadURL(bucket);
              // Store data into Firestore
              await addGood(props.formFields.category, props.formFields.goodName, 
                props.formFields.description, props.formFields.price, props.formFields.available, 
                bucket, newImageURL);
            }
          //props.onSuccess(isEdit ? DISHES_ENUM.edit : DISHES_ENUM.add);
        } catch (error) {
          //props.onError(isEdit ? DISHES_ENUM.edit : DISHES_ENUM.add);
          console.log(error);
        }
    
        // Clear all form data
        closeDialog();
      };
    const closeDialog = () => {
        props.setAdminAction(undefined);
        props.setFormFields({
            available: null,
            goodName: "",
            description: "",
            category: "Оберіть категорію",
            fileName: "Файл не обрано!",
            file: null,
            imgBucketURL: "",
            imgURL: "",
            price: undefined,
        });
    }

    const isDisabled = () => {
            return (props.formFields.goodName.length === 0 || props.formFields.description.length === 0 ||
            props.formFields.category === 'Оберіть категорію' || props.formFields.fileName === "Файл не обрано!" ||
            !props.formFields.available || !props.formFields.price || props.formFields.price <= 0)
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: purple[800],
            },
            secondary: {
                main: purple[300],
            },
            textColor: {
                main: '#000'
            }
        },
    })

    return (
        !props.formFields ?
            <div>Preloader</div>
        :
        <ThemeProvider theme={theme}>
            <Dialog
                classes={{ paper: s.dialog }}
                onClose={closeDialog}
                open={props.showDialog}
                component="form">
                <Typography variant="h4" className={s.dialogTitle}>
                    {isEdit ? "РЕДАГУВАТИ" : "ДОДАТИ"} ТОВАР
                </Typography>
                <DialogContent className={s.dialogFields} >
                    <Stack direction="row" spacing={2} className={s.dialogGoodImage}>
                        {(isEdit) && <Avatar alt="receipt image" src={props.formFields.imgURL} />}
                        <Button variant="outlined" component="label" color="secondary" className={s.dialogImgPicker}>
                            Обрати зображення
                            <input type="file" hidden onInput={(event) => { setFileData(event.target) }} accept=".jpg, .jpeg, .png, .jfif" />
                        </Button>
                        <Typography className={s.dialogPickedImg}>{props.formFields.fileName}</Typography>
                    </Stack>
                    <TextField size="small" id="filled-basic" label="Назва страви" variant="filled" value={!props.formFields && props.formFields.goodName.length !== 0 ? '' : props.formFields.goodName} onChange={(e) => updateFormField(e, 'goodName')} />
                    <TextField size="small" id="filled-basic" label="Опис страви" multiline variant="filled" value={!props.formFields && props.formFields.description.length !== 0 ? '' : props.formFields.description} onChange={(e) => updateFormField(e, 'description')} />
                    <Select size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.formFields.category}
                        onChange={(e) => updateFormField(e, 'category')}
                        className={s.dialogSelect}
                        style={{ textTransform: 'capitalize' }}
                    >
                        <MenuItem value={'Оберіть категорію'}>Оберіть категорію</MenuItem>
                        {props.categories && props.categories.map((category, index) => (
                            <MenuItem value={category} key={index} style={{ textTransform: 'capitalize' }}>{category}</MenuItem>
                        ))}
                    </Select>
                    <TextField type="number" size="small" id="filled-basic" label="Ціна ₴" variant="filled" value={!props.formFields.price ? '' : Number(props.formFields.price)} onChange={(e) => updateFormField(e, 'price')} />
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={props.formFields.available}
                        name="radio-buttons-group"
                        onChange={(e) => updateFormField(e, 'available')}
                    >
                        <FormControlLabel value='true' control={<Radio />} label="Доступно" />
                        <FormControlLabel value='false' control={<Radio />} label="Недоступно" />
                    </RadioGroup>
                </DialogContent>
                <DialogActions className={s.dialogButtons}>
                    <Button variant="contained" onClick={closeDialog}>Закрити</Button>
                    {props.isSubmitting ?
                        <Button color="secondary" variant="contained" disabled={true}>
                            Відправка...
                        </Button> :
                        <Button color="secondary" variant="contained" onClick={handleSubmit} disabled={isDisabled()}>
                            Відправити
                        </Button>}
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default GoodDialog;
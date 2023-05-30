import React from "react";
import s from './GoodDialog.module.scss';
import { Avatar, Button, Dialog, DialogActions, DialogContent, FormControlLabel, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";


const GoodDialog = (props) => {
    let isEdit = props.edit && Object.keys(props.edit).length !== 0;
    useEffect(() => {
        isEdit = props.edit && Object.keys(props.edit).length !== 0;
        props.showDialog && props.setFormFields(isEdit ? props.edit : props.resetFormGood())
    }, [props.edit, props.showDialog])
    
    const updateFormField = (event, field) => {
        props.setFormFields(prevState => ({ ...prevState, [field]: event.target.value }))
    }

    // Set the relevant fields for receipt image
    const setFileData = (target) => {
        const file = target.files[0];
        props.setFormFields(prevState => ({ ...prevState, fileName: file.name }));
        props.setFormFields(prevState => ({ ...prevState, file }));
    }

    const handleSubmit = () => {
        console.log('Submit');
    }
    const closeDialog = () => {
        props.setAdminAction(undefined)
    }

    const isSubmitting = () => {
        console.log('isSubmitting');
    }

/*     const isDisabled = () => props.formFields.goodName.length === 0 || props.formFields.fileName === "Файл не обрано!" 
                            || props.formFields.category === "Оберіть категорію" || !props.formFields.price || props.formFields.price === '0'
                            || props.formFields.description.length === 0 || !props.formFields.available;
 */
    const isDisabled = () => {
        return true;
    }
    return (
        <Dialog
            onClose={() => props.setAdminAction(undefined)}
            open={props.adminAction === 'addGood'}
            component="form">
            <Typography variant="h4" className={s.dialogTitle}>
                {isEdit ? "РЕДАГУВАТИ" : "ДОДАТИ"} ТОВАР
            </Typography>
            <DialogContent className={s.dialogFields} >
                <Stack direction="row" spacing={2} className={s.dialogGoodImage}>
                    {(isEdit && !props.formFields.fileName) && <Avatar alt="receipt image" src={props.formFields.imageURL} />}
                    <Button variant="outlined" component="label" color="secondary" className={s.dialogImgPicker}>
                        Обрати зображення
                        <input type="file" hidden onInput={(event) => { setFileData(event.target) }} accept=".jpg, .jpeg, .png, .jfif" />
                    </Button>
                    <Typography className={s.dialogPickedImg}>{props.formFields.fileName}</Typography>
                </Stack>
                <TextField size="small" id="filled-basic" label="Назва страви" variant="filled" value={!props.formFields && props.formFields.dishName.length !== 0 ? '' : props.formFields.dishName} onChange={(e) => updateFormField(e, 'dishName')} />
                <TextField size="small" id="filled-basic" label="Опис страви" multiline variant="filled" value={!props.formFields.description && props.formFields.description.length !== 0 ? '' : props.formFields.description} onChange={(e) => updateFormField(e, 'description')} />
                <Select size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.formFields.category}
                    onChange={(e) => updateFormField(e, 'category')}
                    className={s.dialogSelect}
                >
                    {/* <MenuItem value={'Оберіть категорію'}>Оберіть категорію</MenuItem>
                    {props.categories && props.categories.map((category, index) => (
                        <MenuItem value={category} key={index}>{category}</MenuItem>
                    ))} */}
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
                {isSubmitting ?
                    <Button color="secondary" variant="contained" disabled={true}>
                        Відправка...
                    </Button> :
                    <Button color="secondary" variant="contained" onClick={handleSubmit} disabled={isDisabled()}>
                        Відправити
                    </Button>}
            </DialogActions>
        </Dialog>
    )
}

export default GoodDialog;
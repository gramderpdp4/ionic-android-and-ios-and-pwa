import { DatetimePicker } from '@capawesome-team/capacitor-datetime-picker';
import moment from 'moment-timezone';


export const pickerTime = async () => {
    return new Promise( async (resolve, reject) => {
        const date = moment()
        
        const { value } = await DatetimePicker.present({
            cancelButtonText: 'Cancelar',
            doneButtonText: 'Ok',
            mode: 'datetime',
            value: date.add(2, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
            min: date.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
            theme: 'dark',
            locale: 'pt-BR',
        });

        const value_to_moment = moment(value);
        const date_formatted = value_to_moment.utc().format("DD/MM/YYYY HH:mm");

        resolve({ value: date_formatted })
    })
};

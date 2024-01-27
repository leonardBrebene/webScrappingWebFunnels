import { format } from 'date-fns';

const getFormatedDate = () => {

    return format(new Date(), 'dd-MM-yyyy')

}
export default getFormatedDate;
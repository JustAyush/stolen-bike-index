import moment from 'moment';
import config from '../config';

export const dateDisplayFormat = (
  date,
  format = config.DATE_DISPLAY_FORMAT
) => {
  if (!date) return 'N/A';
  return moment(date * 1000).format(format);
};

const vFormatDate = {
  mounted(el, binding) {
    this.formatDate(el, binding.value, binding.arg);
  },
  updated(el, binding) {
    this.formatDate(el, binding.value, binding.arg);
  },
  formatDate(el, value, formatString = 'yyyy-MM-dd') {
    if (!value) {
      el.textContent = '';
      return;
    }

    let date;
    if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value);
    }

    console.log('Formatting date:', date, 'with format:', formatString);

    if (isNaN(date.getTime())) {
      el.textContent = 'Invalid Date';
      return;
    }

    try {
      const formattedDate = this.formatNativeDate(date, formatString);
      el.textContent = formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      el.textContent = 'Error Formatting';
    }
  },
  formatNativeDate(date, formatString) {
    const pad = (num) => String(num).padStart(2, '0');

    const replacements = {
      yyyy: date.getFullYear(),
      MM: pad(date.getMonth() + 1),
      dd: pad(date.getDate()),
      HH: pad(date.getHours()),
      mm: pad(date.getMinutes()),
      ss: pad(date.getSeconds()),
    };

    return formatString.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => replacements[match] || match);
  },
};

export default vFormatDate;
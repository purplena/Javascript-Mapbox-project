class FormatDate {
  static formatDateToFillInputs(date) {
    const modifiedDate = new Date(date);
    const year = modifiedDate.getFullYear();
    const month = ('0' + (modifiedDate.getMonth() + 1)).slice(-2); // Adding 1 to month because it is zero-based
    const day = ('0' + modifiedDate.getDate()).slice(-2);
    const hours = ('0' + modifiedDate.getHours()).slice(-2);
    const minutes = ('0' + modifiedDate.getMinutes()).slice(-2);
    const datetimeLocalString = `${year}-${month}-${day}T${hours}:${minutes}`;

    return datetimeLocalString;
  }

  static formatDateForPopups(date) {
    const modifiedDate = new Date(date);
    const year = modifiedDate.getFullYear();
    const month = ('0' + (modifiedDate.getMonth() + 1)).slice(-2); // Adding 1 to month because it is zero-based
    const day = ('0' + modifiedDate.getDate()).slice(-2);
    const hours = ('0' + modifiedDate.getHours()).slice(-2);
    const minutes = ('0' + modifiedDate.getMinutes()).slice(-2);
    const datetimeLocalString = `${day}/${month}/${year}, ${hours}:${minutes}`;

    return datetimeLocalString;
  }
}

export default FormatDate;

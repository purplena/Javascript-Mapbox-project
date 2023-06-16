class FormatDate {
  static formatDateToFillInputs(date) {
    const modifiedDate = new Date(date);
    const year = modifiedDate.getFullYear();
    const month = ('0' + (modifiedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + modifiedDate.getDate()).slice(-2);
    const hours = ('0' + modifiedDate.getHours()).slice(-2);
    const minutes = ('0' + modifiedDate.getMinutes()).slice(-2);
    const datetimeLocalString = `${year}-${month}-${day}T${hours}:${minutes}`;

    return datetimeLocalString;
  }

  static formatDateForPopups(date) {
    const modifiedDate = new Date(date);
    const year = modifiedDate.getFullYear();
    const month = ('0' + (modifiedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + modifiedDate.getDate()).slice(-2);
    const hours = ('0' + modifiedDate.getHours()).slice(-2);
    const minutes = ('0' + modifiedDate.getMinutes()).slice(-2);
    const datetimeLocalString = `${day}/${month}/${year}, ${hours}:${minutes}`;

    return datetimeLocalString;
  }

  static calcRemainingTime(dateStart) {
    let timeDiff = Date.parse(dateStart) - Date.parse(new Date());
    const secondsInDay = 24 * 60 * 60 * 1000;
    const secondsInHour = 60 * 60 * 1000;

    // Calculate the number of full days
    const days = Math.floor(timeDiff / secondsInDay);
    const secondsLeft = timeDiff - days * secondsInDay;
    const hours = Math.floor(secondsLeft / secondsInHour);
    if (timeDiff <= 3 * 24 * 60 * 60 * 1000 && timeDiff > 0) {
      return `<p class="alert-paragraph">L'événement commence dans: <strong>${days} jours</strong> et <strong>${hours} heures</strong></p>`;
    } else if (Date.parse(dateStart) <= Date.parse(new Date())) {
      return `<p class="missed-event-paragraph">Quel dommage! Vous avez raté cet événement!</p>`;
    } else {
      return '';
    }
  }
}

export default FormatDate;

//Create employee record
function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}
//Create employee records
function createEmployeeRecords(records) {
  return records.map(record => createEmployeeRecord(record));
}

//Create time in event
function createTimeInEvent(record, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  const newTimeIn = {
    type: "TimeIn",
    hour: parseInt(hour),
    date
  }

  record.timeInEvents.push(newTimeIn);
  return record;
}

//Create time out event
function createTimeOutEvent(record, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  const newTimeOut = {
    type: "TimeOut",
    hour: parseInt(hour),
    date
  }

  record.timeOutEvents.push(newTimeOut);
  return record;
}

//Calculate how many hours worked
function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find(timeInEvent => timeInEvent.date === date);
  const timeOut = record.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date);

  const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
}

//Calculate wages earned on date
function wagesEarnedOnDate(record, date) {
  const hoursWorked = hoursWorkedOnDate(record, date);
  const wage = hoursWorked * record.payPerHour;
  return wage;
}

//Calculate all wages
function allWagesFor(record) {
  const allWages = record.timeOutEvents.reduce((total, timeOutEvent) => {
    return total + wagesEarnedOnDate(record, timeOutEvent.date)
  }, 0)

  return allWages;
}

//Calculate payroll
function calculatePayroll(records) {
  const payroll = records.reduce((total, record) => {
    return total + allWagesFor(record)
  }, 0)

  return payroll;
}
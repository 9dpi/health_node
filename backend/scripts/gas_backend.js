/*
  HEALTH NODE - GOOGLE APPS SCRIPT BACKEND
  Sheet ID: 1Jr99SXQBVrmYJOnl0dIIi4gxuF667HZcNqaG_2Mwu0Y
  Folder ID: 1EJNVXZXkz4ckuoKzRbGsS6SR3lACWBbs
*/

const SPREADSHEET_ID = '1Jr99SXQBVrmYJOnl0dIIi4gxuF667HZcNqaG_2Mwu0Y';
const FOLDER_ID = '1EJNVXZXkz4ckuoKzRbGsS6SR3lACWBbs';

/**
 * Handle GET requests
 */
function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch (action) {
      case 'getElders':
        return listElders();
      case 'getVitalLogs':
        return getVitalLogs(e.parameter.id);
      default:
        return response({ status: 'success', message: 'Health Node API is Online' });
    }
  } catch (err) {
    return response({ status: 'error', message: err.toString() });
  }
}

/**
 * Handle POST requests (Register, Add Logs)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    switch (action) {
      case 'registerElder':
        return registerElder(data.payload);
      case 'addVitalLog':
        return addVitalLog(data.payload);
      default:
        return response({ status: 'error', message: 'Invalid Action' });
    }
  } catch (err) {
    return response({ status: 'error', message: err.toString() });
  }
}

/**
 * Core Services
 */

function registerElder(payload) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Elders') || ss.insertSheet('Elders');
  
  // Headers if empty
  if (sheet.getLastRow() == 0) {
    sheet.appendRow(['ID', 'Họ Tên', 'Ngày Sinh', 'CCCD', 'Địa Chỉ', 'SĐT Người Thân', 'Tiền Sử Bệnh', 'Ngày Đăng Ký']);
  }
  
  const id = 'HN-' + new Date().getTime();
  sheet.appendRow([
    id, 
    payload.fullName, 
    payload.dob, 
    payload.cccd, 
    payload.address, 
    payload.relativePhone, 
    payload.history, 
    new Date()
  ]);
  
  return response({ status: 'success', id: id });
}

function addVitalLog(payload) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('VitalLogs') || ss.insertSheet('VitalLogs');
  
  if (sheet.getLastRow() == 0) {
    sheet.appendRow(['Timestamp', 'ElderID', 'Huyết Áp', 'Đường Huyết', 'SpO2', 'Cân Nặng', 'Ghi Chú']);
  }
  
  sheet.appendRow([
    new Date(),
    payload.elderId,
    payload.bloodPressure,
    payload.glucose,
    payload.spo2,
    payload.weight,
    payload.note
  ]);
  
  return response({ status: 'success' });
}

function listElders() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Elders');
  if (!sheet) return response({ status: 'success', data: [] });
  
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  const result = data.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  
  return response({ status: 'success', data: result });
}

/**
 * Utility: Standard JSON Response
 */
function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

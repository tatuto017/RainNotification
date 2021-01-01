const weather_url     : string = 'https://www.mm-s.biz/weather/forecast.php';
const line_notify_url : string = 'https://notify-api.line.me/api/notify';

export const notice = () => {
  try {
    let json_url : string = weather_url + '?' + 'area=' + getProp('area');
    let json = UrlFetchApp.fetch(json_url).getContentText();
    let jsonData = JSON.parse(json);
    let result : string = jsonData.data[0].today[2];

    if ( result.indexOf('雨') != -1 || result.indexOf("雪") != -1 ) {
      lineNotify("雨予報です、傘を忘れずに！");
    }
    deleteTrigger();
  } catch {
    lineNotify("エラー");
  }
}

export const setTrigger = () => {
  let triggers = ScriptApp.getProjectTriggers().filter(trigger => trigger.getHandlerFunction() == 'createTrigger');
  if ( triggers.length == 0 ) {
    ScriptApp.newTrigger("createTrigger").timeBased().atHour(1).everyDays(1).create();
  }
}

export const createTrigger = () => {
  let h,m;
  [ h,m ] = getProp('NoticeTime').split(':');
  let triggerDay = new Date();
  triggerDay.setHours(Number(h));
  triggerDay.setMinutes(Number(m));
  ScriptApp.newTrigger("notice").timeBased().at(triggerDay).create();
}

export const getProp = (key : string) => {
  return (PropertiesService.getScriptProperties().getProperty(key) || '');
}

export const setProp = (key : string, value : string) => {
  PropertiesService.getScriptProperties().setProperty(key, value);
}
const deleteTrigger = () => {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() == "notice") {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

const lineNotify = (message : string) => {
  UrlFetchApp.fetch(line_notify_url, {
      "method"  : "post",
      "payload" : "message=" + message,
      "headers" : {"Authorization" : "Bearer "+ getProp('LineToken')}
    }
  )
}


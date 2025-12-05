export interface AlarmDataType {
  id: number;
  alarmType: AlarmType;
  alarmCategory: AlarmCategory;
  message: string;
  isChecked: boolean;
  dataId: string | null;
  createdAt: string;
}

export enum AlarmType {
  NEW_FRIEND_REQUEST = "NEW_FRIEND_REQUEST",
  NEW_FRIEND_PLACE_SHARING = "NEW_FRIEND_PLACE_SHARING",
  NEW_NOTICE = "NEW_NOTICE",
  NEW_KEYWORD_NOTICE = "NEW_KEYWORD_NOTICE",
  RENEW_TOP_RANK_PLACE = "RENEW_TOP_RANK_PLACE",
  RENEW_RANK_PLACE = "RENEW_RANK_PLACE",
}

export enum AlarmCategory {
  ALARM = "ALARM",
  ANNOUNCEMENT = "ANNOUNCEMENT",
}

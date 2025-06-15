export interface PracticeSchedule {
  id: number;
  classCode: string;
  subject: string;
  date: string;
  fromPeriod: number;
  toPeriod: number;
  effectiveDate: string;
  notes: string;
  semester: {
    id: number;
    semesterName: string;
  };
  users: {
    id: number;
    fullName: string;
  };
  room: {
    id: number;
    roomName: string;
  };
}

export interface Semester {
  id: number;
  name: string;
  semesterName: string;
}

export interface Teacher {
  id: number;
  fullName: string;
}

export interface PracticeScheduleForm {
  classCode: string;
  subject: string;
  date: string;
  fromPeriod: number;
  toPeriod: number;
  effectiveDate: string;
  notes: string;
  semesterId: number;
  userId: number;
  roomId: number;
}

import {Dispatch} from 'react';

export interface IGroupData {
  id: number;
  name: string;
  students: [];

}
export interface IUserInfo {
  id:number;
  email:string;
  password:string;
  name:string;
  course: ICoursesData[];
}
export interface ICoursesData {
  id: number;
  name: string;
  teacher: string;
}

export interface IEventsData {
  id: number;
  name: string;
  date: string;
  time:string;
  prize:{
    first:string;
    second:string;
    third:string;
  }
}

export interface ITeachersData {
  id:string;
  email:string;
  password:string;
  name:string;
  course: ICoursesData[];
}

export const InitialCourses: ICoursesData[] = [
];

export const InitialTeachers: IUserInfo[] = [
];

export interface IMeeting {
  title: string,
  date:string,
  start: string,
  end: string,
  participants: string[],
  id: string,
}

export interface SelectedMeetingProps {
  selectedEvent: {
    title: string,
    start: string,
    end: string,
    participants: string[],
    id: string,
  },
  setModalState: Dispatch<boolean>,
}

export enum ActionTypes {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',

}


export interface IUserData {
  id:string
  email:string
  password:string
  name:string

  course:string
}
export interface ICoursesData {
  id: number
  name: string
  teacher: string
}

export interface ITeachersData {
  id: number
  name: string
  course: string
}

export const InitialCourses: ICoursesData[] = [
];

export const InitialTeachers: IUserData[] = [
];

export enum ActionTypes {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  ADD_TEACHER = 'ADD_TEACHER',
  DELETE_TEACHER = 'DELETE_TEACHER',
  GET_TEACHERS = 'GET_TEACHERS',
  UPDATE_TEACHER ='UPDATE_TEACHER'

}
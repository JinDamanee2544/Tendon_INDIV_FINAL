export interface User {
    type: string
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    createAt: string
    updateAt: string
    password: string
    accessToken: string
    refreshToken: string
    courses: string[]
}

export interface Course {
    ID: string
    Title: string
    Description: string
    Access: string
    CreateBy?: string
    UpdatedAt?: string
    Lessons: string[]
}

export interface Lesson {
    [x: string]: any
    ID: string
    Title: string
    Description: string
    CreateBy?: string
    UpdatedAt?: string
    Nodes: string[]
    NextLessons: string[]
    PrevLessons: string[]
}
export interface Node {
    ID: string
    Title: string
    FileType: string
    Data: string
    Description: string
    CreateBy?: string
    UpdateAt?: string
}

export interface localStorageInterface {
    token: string
    refreshToken: string
    firstName: string
    lastName: string
    courseID: string
    courseName: string
    courseIDs: string[]
}

export interface ProgressBodyInterface {
    nodeID: string
    courseID: string
    lessonID: string
}

export interface ProgressInterface {
    progress: number
}

export enum MemType {
    token = 'token',
    refreshToken = 'refreshToken',
    firstName = 'firstName',
    lastName = 'lastName',
    courseID = 'courseID',
    courseName = 'courseName',
    courseIDs = 'courseIDs'
}

let TYPES = {
    UserService: Symbol("UserService"),
    AuthService: Symbol("AuthService"),
    NodeService: Symbol("NodeService"),
    LessonService: Symbol("LessonService"),
    CourseService: Symbol("CourseService"),
    MemoryService: Symbol("MemoryService"),
    APIService: Symbol("APIService"),
    ProgressService: Symbol("ProgressService"),
};

export default TYPES
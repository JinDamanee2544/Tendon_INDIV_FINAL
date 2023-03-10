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
    id: string
    type: string
    data: string
    createBy?: string
    updateAt?: string
}

export interface localStorageInterface {
    token: string
    firstName: string
    lastName: string
    courseID: string
    courseName: string
    courseIDs: string[]
}

let TYPES = {
    UserService: Symbol("UserService"),
    AuthService: Symbol("AuthService"),
    NodeService: Symbol("NodeService"),
    LessonService: Symbol("LessonService"),
    CourseService: Symbol("CourseService"),
    MemoryService: Symbol("MemoryService"),
    APIService: Symbol("APIService")
};

export default TYPES
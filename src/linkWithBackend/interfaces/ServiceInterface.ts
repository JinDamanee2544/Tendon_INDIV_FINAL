import { Course, Lesson, localStorageInterface, Node, User } from "./TendonType";

export interface GetResponse<Type> {
    status: number
    response: {
        [x: string]: Type; data: Type
    }
    message: string
}

export interface GetManyResponse<Type> {
    status: number
    response: {
        [x: string]: Type[]; data: Type[]
    }
    message: string
}

export interface APIServiceInterface {
    post<Type>(url: string, body: Type): Promise<{ response: Type, status: number, message: string }>;
    get<Type>(url: string): Promise<GetResponse<Type>>;
    update<Type>(url: string, body: Type, id: string): Promise<{ response: Type, status: number, message: string }>;
    delete<Type>(url: string, id: string): Promise<number>;
    getManyByID<Type>(url: string): Promise<GetManyResponse<Type>>;
}

export interface CourseServiceInterface {
    postCourse(body: Course): Promise<Course>;
    getCourseById(id: string): Promise<Course>;
    updateCourse(id: string, body: Course): Promise<Course>;
    deleteCourse(id: string): Promise<number>;
    getManyCourseByID(ids: string): Promise<Course[]>;
}

export interface LessonServiceInterface {
    postLesson(body: Lesson): Promise<Lesson>;
    getLessonById(id: string): Promise<Lesson>;
    updateLesson(id: string, body: Lesson): Promise<Lesson>;
    deleteLesson(id: string): Promise<number>;
    getManyLessonByID(ids: string): Promise<Lesson[]>;
}

export interface NodeServiceInterface {
    postNode(body: Node): Promise<Node>;
    getNodeById(id: string): Promise<Node>;
    updateNode(id: string, body: Node): Promise<Node>;
    deleteNode(id: string): Promise<number>;
}

export interface UserServiceInterface {
    getUserByID(id: string): Promise<{message: string, user:User}>;
    updateUser(id: string, body: User): Promise<User>;
    deleteUser(id: string): Promise<number>;
}

export interface AuthServiceInterface {
    signIn(body: User): Promise<User>;
    signUp(body: User): Promise<User>;
    signOut(token: string): Promise<number>;
}

export interface MemoryServiceInterface {           
    setLocalStorage(data: localStorageInterface): void;
    getLocalStorage(item: string): string;
}
import { Container } from "inversify";

import UserService from "./user_service";
import TYPES from "linkWithBackend/interfaces/TendonType";
import AuthService from "./auth_service";
import NodeService from "./node_service";
import LessonService from "./lesson_service";
import CourseService from "./course_service";
import MemoryService from "./memory_service";
import APIService from "./api_service";
import { APIServiceInterface, UserServiceInterface, CourseServiceInterface, LessonServiceInterface, MemoryServiceInterface, NodeServiceInterface, AuthServiceInterface, ProgressServiceInterface } from "linkWithBackend/interfaces/ServiceInterface";
import ProgressService from "./progress_service";

var container: Container = new Container();

container.bind<APIServiceInterface>(TYPES.APIService).to(APIService)
container.bind<UserServiceInterface>(TYPES.UserService).to(UserService)
container.bind<AuthServiceInterface>(TYPES.AuthService).to(AuthService)
container.bind<NodeServiceInterface>(TYPES.NodeService).to(NodeService)
container.bind<LessonServiceInterface>(TYPES.LessonService).to(LessonService)
container.bind<CourseServiceInterface>(TYPES.CourseService).to(CourseService)
container.bind<MemoryServiceInterface>(TYPES.MemoryService).to(MemoryService)
container.bind<ProgressServiceInterface>(TYPES.ProgressService).to(ProgressService)

export default container;
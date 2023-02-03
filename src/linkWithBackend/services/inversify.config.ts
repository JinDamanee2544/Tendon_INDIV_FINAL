import { Container } from "inversify";

import AuthService from "./user_service";
import TYPES from "linkWithBackend/interfaces/TendonType";
import SignService from "./sign_service";
import NodeService from "./node_services";
import LessonService from "./lesson_services";
import CourseService from "./course_services";
import MemoryService from "./memory_services";
import APIService from "./api_services";
import { APIServiceInterface, AuthServiceInterface, CourseServiceInterface, LessonServiceInterface, NodeServiceInterface, SignServiceInterface } from "linkWithBackend/interfaces/ServiceInterface";

var container: Container = new Container();

container.bind<APIServiceInterface>(TYPES.APIService).to(APIService)
container.bind<AuthServiceInterface>(TYPES.AuthService).to(AuthService)
container.bind<SignServiceInterface>(TYPES.SignService).to(SignService)
container.bind<NodeServiceInterface>(TYPES.NodeService).to(NodeService)
container.bind<LessonServiceInterface>(TYPES.LessonService).to(LessonService)
container.bind<CourseServiceInterface>(TYPES.CourseService).to(CourseService)
container.bind<MemoryService>(TYPES.MemoryService).to(MemoryService)

export default container;
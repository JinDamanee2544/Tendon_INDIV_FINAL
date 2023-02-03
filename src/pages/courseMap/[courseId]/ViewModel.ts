import TYPES from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";

export default function ViewModel() {
    const memService = container.get<MemoryService>(TYPES.MemoryService)
    const courseID = memService.getLocalStorage('courseID')
    const courseName = memService.getLocalStorage('courseName')
    return {
        courseID: courseID,
        courseName: courseName
    }
}
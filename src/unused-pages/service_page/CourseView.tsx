import React, { useMemo } from "react"
import { observer } from "mobx-react"
import { useState, useEffect } from "react";

import { useTendonContainer } from "linkWithBackend/services/container";
import CourseDataViewModel from "./CourseViewModel";
import TYPES, { Course } from "linkWithBackend/interfaces/TendonType";

import Xarrow from "react-xarrows";
import { useTheme } from "next-themes";
import ResumeItem from "@components/dashboard/resume/ResumeItem";
import ArrowBox from "@components/baseComponents/ArrowBox";
import GraphPathView from "../lessonMap/GraphShowView";
import { useRouter } from "next/router";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";

interface propsInterface {
    body: Course
}

interface realInterface {
    id: string,
    component: string
}

const memService = container.get<MemoryService>(TYPES.MemoryService)
var token = memService.getLocalStorage("token")

export const CourseCreateHandle = observer((props: propsInterface) => {
    const body = props.body
    const [courseView, setCourseView] = useState<Course>({} as Course)
    const [message, setMessage] = useState<String>("")
    const [status, setStatus] = useState<Number>(0)
    const viewModel = new CourseDataViewModel(useTendonContainer())

    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.createCourse(body, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setCourseView(viewModel.getCourse())
        setMessage(viewModel.getMessage())
        setStatus(viewModel.getStatus())
    })

    if (status === 201) {
        return (
            <div>
                <p> [ Course POST ] </p>
                {/* <CourseView viewModel={courseView} /> */}
            </div>
        )
    } else {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> Course POST ERROR ZONE:  </p>
                <p> {message} </p>
            </div>
        )
    }
})

export const CourseGetHandle = observer((props: realInterface) => {
    const router = useRouter()
    const { theme } = useTheme();
    const course_id = props.id
    const [courseView, setCourseView] = useState<Course>({} as Course)
    const [message, setMessage] = useState<String>("")
    const [isReady, setIsReady] = useState(false)
    const [status, setStatus] = useState<Number>(0)
    // const viewModel = new CourseDataViewModel(useTendonContainer())

    const viewModel = useMemo(() => {
        return new CourseDataViewModel(useTendonContainer())
    }, [])

    useEffect(() => {
        // const viewModel = new CourseDataViewModel(useTendonContainer())
        const mytoken = memService.getLocalStorage("token")
        const tmpCourse: Promise<Course> = viewModel.getCourseData(course_id, mytoken)
        tmpCourse.then((value) => {
            setCourseView(value)
            setMessage(viewModel.getMessage())
            setStatus(viewModel.getStatus())
        }).catch((error) => {
            console.log(error)
        })
    }, [course_id])

    // new Promise(function (myResolve, myReject) {
    //     useEffect(() => {
    //         var mytoken = getToken()
    //         const tmpValue = viewModel.getCourseData(course_id, mytoken)
    //         myResolve(tmpValue)
    //     }, [])
    // }).then(() => {
    //     // setCourseView({
    //     //     id: viewModel.getCourse().id,
    //     //     courseName: viewModel.getCourse().name,
    //     //     setIsReady: setIsReady
    //     // })            
    //     setCourseView(viewModel.getCourse())
    //     setMessage(viewModel.getMessage())
    //     setStatus(viewModel.getStatus())
    // })

    if (courseView.ID === undefined) {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        if (status === 409) {
            router.push("/login")
            return (
                <div> Expired Time YOU MUST LOGIN! </div>
            )
        } else {
            return (
                <div>
                    <p> Error {message} </p>
                </div>
            )
        }
    }

    if (props.component === "resume") {
        return (
            <>
                <ResumeItem key={courseView.ID} id={courseView.ID} courseData={courseView} setIsReady={setIsReady} />
                {
                    isReady && (
                        <ArrowBox>
                            <Xarrow
                                start={'dashboard'}
                                end={courseView.ID}
                                color={theme === 'light' ? '#475569' : '#961EFF'}
                            />
                        </ArrowBox>
                    )
                }
            </>
        )
    } else if (props.component === "map") {
        return (
            <>
                < GraphPathView courseView={courseView} />
            </>
        )
    } else {
        return (
            <></>
        )
    }
})

export const CourseUpdateHandle = observer((props: propsInterface) => {
    const course_id = props.body.ID!
    const body = props.body
    const [courseView, setCourseView] = useState<Course>({} as Course)
    const [message, setMessage] = useState<String>("")
    const viewModel = new CourseDataViewModel(useTendonContainer())
    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.updateCourseData(course_id, token, body)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setCourseView(viewModel.getCourse())
        setMessage(viewModel.getMessage())
    })

    if (courseView.ID === undefined) {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> Update Lesson is out-of-service </p>
                <p> Course UPDATE ERROR ZONE: </p>
                <p> {message} </p>
            </div>
        )
    }

    return (
        <div>
            <p> Update Lesson is out-of-service </p>
            <p> [ Course UPDATE ] </p>
            <p> Updated Successfully!</p>
        </div>
    )
})

export const CourseDeleteHandle = observer((props: propsInterface) => {
    const course_id = props.body.ID!
    const [deleteStatus, setDeleteStatus] = useState<Number>(0)
    const [message, setMessage] = useState<String>("")
    const viewModel = new CourseDataViewModel(useTendonContainer())

    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.deleteCourse(course_id, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setDeleteStatus(viewModel.getStatus())
        setMessage(viewModel.getMessage())
    })

    if (deleteStatus === 200) {
        return (
            <div>
                <p> [ Course DELETE ] </p>
                <p> Delete Complete </p>
            </div>
        )
    } else {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> Course DELETE ERROR ZONE: </p>
                <p> {message} </p>
            </div>
        )
    }
})

interface ShowDataViewProps {
    viewModel: Course
}

const CourseView = observer(({ viewModel }: ShowDataViewProps) => {
    return (
        <div>
            <div key={viewModel.ID}>
                <p> #### {viewModel.ID} #### </p>
                <li> {viewModel.Title} </li>
                <li> {viewModel.Description} </li>
                <li> lessons:
                    {viewModel.Lessons.map((data: string) => (
                        <div key={data}>
                            <p> {data} </p>
                        </div>
                    ))}
                </li>
                <hr></hr>
            </div>
        </div>
    )
})
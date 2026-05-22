import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
            <div className="card-body">

                {/* Department + Credits */}
                <div className="flex justify-between items-center mb-1">
                    <span className="text-primary text-sm font-semibold">{course.department}</span>
                    <div className="flex gap-2">
                        <span className="badge badge-outline text-xs">{course.type}</span>
                        <span className="badge badge-outline text-xs text-red-700">{course.credits} Credits</span>
                    </div>
                </div>

                {/* Course Code + Title */}
                <h2 className="card-title text-base-content">
                    <span className="text-primary font-bold">{course.code}</span> {course.title}
                </h2>

                {/* Instructor + Schedule */}
                <div className="text-sm text-base-content/70 flex flex-col gap-1 mt-1">
                    <span>👤 {course.instructor}</span>
                    <span>🕐 {course.schedule}</span>
                    <span>👥 {course.seatsLeft} / {course.capacity} seats left</span>
                </div>

                {/* Description */}
                <p className="text-sm text-base-content/60 mt-2 line-clamp-3">
                    {course.description}
                </p>

                {/* Enroll Button */}
                <Link to={`/course/${course._id}`} className="btn btn-primary btn-sm">
                    View Details →
                </Link>

            </div>
        </div>
    )
}

export default CourseCard;
